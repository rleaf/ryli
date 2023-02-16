export default {
   cnnForward:
`  def forward(x, w, b, conv_param):
      """
      - x: Input data of shape (N, C, H, W). The input is 4 dimensional here because
        NNs usually operate on batches of data: (Batch size x Channel x Height x Width).
      - w: Filters of shape (F, C, HH, WW). Aka: (Fiter count x Channel x Filter Height x Filter Width)
      - b: Biases, of shape (F)

      Returns a tuple of:
      - out: Output data, of shape (N, F, H', W') where H' and W' are given by
      H' = 1 + (H + 2 * pad - HH) / stride
      W' = 1 + (W + 2 * pad - WW) / stride
      - cache: (x, w, b, conv_param)
      """

      # Getting shape sizes. We don't actually need w.shape[1] (channels), so that is omitted with '_'.
      N, C, H, W = x.shape
      F, _, HH, WW = w.shape

      # Get hyperparameters. Default to stride = 1, padding = 0.
      stride = conv_param.get('stride', 1)
      pad = conv_param.get('pad', 0)

      # Formula for calculating the width & height of activation map with hyperparameters.
      hPrime = 1 + (H + 2 * pad - HH) // stride
      wPrime = 1 + (W + 2 * pad - WW) // stride

      # Wrap input x with pad: https://pytorch.org/docs/stable/generated/torch.nn.functional.pad.html
      xpad = torch.nn.functional.pad(x, (pad,pad,pad,pad)).to(x.dtype).to(x.device)

      # Define output/activation map shape
      out = torch.zeros(N, F, hPrime, wPrime).to(x.dtype).to(x.device)

      # For each image in the batch
      for n in range(N):
         # For each filter
         for f in range(F):
            # Index along the height of activation map
            for h in range(0, hPrime):
               # Index along the width of activation map
               for W in range(0, wPrime):
                  # CNN takes the sum of the elementwise multiplication (dot product) between kernel
                  # and input and then adds the bias associated with that filter.
                  #
                  # Number of bias always corresponds 1:1 with number of filters
                  #
                  # We are demarcating the portion of the input to dot product with. Referring back
                  # to the animation above may help.
                  out[n, f, h, W] = torch.sum(xpad[n, :, h*stride:h*stride+HH, W*stride:W*stride+WW] * w[f, :, :, :]) + b[f]

      cache = (x, w, b, conv_param)
      return out, cache`,
      cnnBackward:
`  def backward(dout, cache):
      """
      Inputs:
      - dout: Upstream derivatives.
      - cache: A tuple of (x, w, b, conv_param).

      Returns a tuple of:
      - dx: Gradient with respect to x
      - dw: Gradient with respect to w
      - db: Gradient with respect to b
      """

      # Same as before, get shape sizes and hyperparameters stored in cache.
      x, w, b, conv_param = cache
      N, C, H, W = x.shape
      F, _, HH, WW = w.shape

      # Same as before, get the stride and padding. If DNE, set to 1 and 0 respectively.
      stride = conv_param.get('stride', 1)
      pad = conv_param.get('pad', 0)

      # Also same as forward pass
      xpad = torch.nn.functional.pad(x, (pad, pad, pad, pad)).to(x.dtype).to(x.device)
      hPrime = 1 + (H + 2 * pad - HH) // stride
      wPrime = 1 + (W + 2 * pad - WW) // stride

      dxpad = torch.zeros_like(xpad).to(x.dtype).to(x.device)
      dx = torch.zeros_like(x).to(x.dtype).to(x.device)
      dw = torch.zeros_like(w).to(x.dtype).to(x.device)
      db = torch.zeros_like(b).to(x.dtype).to(x.device)

      # For each image in the batch
      for n in range(N):
         # For each filter
         for f in range(F):
            # Derivative wrt bias. Since there is only 1 bias per filter, we can evaluate the gradient when
            # indexing through those filters, F. The gradient wrt to bias is simply dout indexed corresponding
            # to the respective bias.
            db[f] += torch.sum(dout[n, f])
            # Indexing along the height
            for h in range(0, hPrime):
               # Indexing a long the width
               for i in range(0, wPrime):
                  # Note how we deal with padding & striding. Striding should be intuitive, but for padding
                  # we use dxpad as an intermediary step and then on line 49, clip the padding to get dx. 
                  dw[f] += xpad[n, :, h * stride:h * stride + HH, i * stride:i * stride + WW] * dout[n, f, h, i]
                  dxpad[n, :, h * stride:h * stride + HH, i * stride:i * stride + WW] += w[f] * dout[n, f, h, i]
      
      dx = dxpad[:, :, pad:pad+H, pad:pad+W]
      return dx, dw, db`,
      reluForward: 
`  def forward(x):
      """
      Input:
      - x: Input; a tensor of any shape
      Returns a tuple of:
      - out: Output, a tensor of the same shape as x
      - cache: x
      """

      k = torch.tensor([0])
      out = torch.maximum(x, k.to(x.device))
      
      cache = x
      return out, cache`,
      reluBackward:
`  def backward(dout, cache):
      """
      Input:
      - dout: Upstream derivatives, of any shape
      - cache: Input x, of same shape as dout
      Returns:
      - dx: Gradient with respect to x
      """

      # torch.gt() returns truthy if x > 0. Having the dtype of tensor
      # g match x translates boolean values to 1's and 0's.
      g = torch.tensor(torch.gt(x, 0), dtype=x.dtype, device=x.device)
      dx = dout*g

      return dx`,
      reluBackwardsExample:
`   # An example of the local operation for the backwards pass of a ReLU transformation.
   # Input tensor retrieved from cache
   tensor([[-0.3, -0.0,  0.2, -2.3,  0.5,  0.6, -0.1,  1.0, -0.2, -0.5],
         [ 0.6,  1.3, -1.9, -0.0,  1.2,  1.4, -1.1, -0.0, -1.4, -1.3],
         [ 0.7, -0.3, -0.8, -0.5,  3.2,  0.0, -1.6,  1.3, -0.4, -0.7],
         [-1.4, -0.1, -0.2, -0.6, -0.0,  0.1, -0.7,  0.1,  1.3, -1.9],
         [ 0.8, -0.6,  1.1,  1.3,  0.2,  0.1, -0.4,  0.1, -0.3, -0.8],
         [ 0.6, -1.1,  1.1,  0.2, -0.3, -0.9,  0.6, -0.2, -0.6, -1.0],
         [-1.5, -0.9, -1.4, -0.0,  0.1,  0.8, -0.7,  0.9,  0.4,  0.1],
         [ 1.9,  0.3,  0.3, -1.0, -1.4, -0.9, -1.0, -0.1,  1.0,  0.8],
         [ 0.2,  1.4, -0.8,  1.1,  1.1,  1.8, -0.5, -1.0,  1.9,  0.8],
         [ 1.0,  1.1, -2.6, -2.1,  1.9,  0.0, -0.2,  0.6, -0.7, -0.5]],
         device='cuda:0', dtype=torch.float64)

   # The "masking" that ReLU provides. All greater than 0 values evaluate
   # to 1 to be multiplied by dout. All less than 0 values == 0.
   tensor([[0., 0., 1., 0., 1., 1., 0., 1., 0., 0.],
         [1., 1., 0., 0., 1., 1., 0., 0., 0., 0.],
         [1., 0., 0., 0., 1., 1., 0., 1., 0., 0.],
         [0., 0., 0., 0., 0., 1., 0., 1., 1., 0.],
         [1., 0., 1., 1., 1., 1., 0., 1., 0., 0.],
         [1., 0., 1., 1., 0., 0., 1., 0., 0., 0.],
         [0., 0., 0., 0., 1., 1., 0., 1., 1., 1.],
         [1., 1., 1., 0., 0., 0., 0., 0., 1., 1.],
         [1., 1., 0., 1., 1., 1., 0., 0., 1., 1.],
         [1., 1., 0., 0., 1., 1., 0., 1., 0., 0.]],
         device='cuda:0', dtype=torch.float64)`,
      poolForward: 
`  def forward(x, pool_param):
      """
      Inputs:
      - x: Input data, of shape (N, C, H, W)

      Returns a tuple of: 
      - out: Output data, of shape (N, C, H', W') where H' and W' are given by
         H' = 1 + (H - pool_height) / stride
         W' = 1 + (W - pool_width) / stride
      - cache: (x, pool_param)
      """
      # Initialize x shape values
      N, C, H, W = x.shape

      # Get the width, height, and stride of pooling kernel stored inside pool_param
      pHeight = pool_param.get('pool_height', 2)
      pWidth = pool_param.get('pool_width', 2)
      stride = pool_param.get('stride', 2)

      # Define the output shape for us to index over
      hPrime = 1 + (H - pHeight) // stride
      wPrime = 1 + (W - pWidth) // stride

      # Init out tensor of desired shape
      out = torch.zeros((N, C, hPrime, wPrime)).to(x.dtype).to(x.device)

      # Max pooling. torch.max method returns a list of 2 elements: [0] = lowest value(s) along optional dimension
      # and [1] = the index of the lowest value(s). We're only needing the zeroth of the list. The second argument
      # is such that we find the max value over the last dimension.
      for h in range(hPrime):
         for j in range(wPrime):
            out[:, :, h, j] = torch.max(torch.max(x[:, :, h*stride:h*stride+hPrime ,j*stride:j*stride+wPrime], -1)[0], -1)[0]

      cache = (x, pool_param)
      return out, cache`,
      poolBackward:
`  def backward(dout, cache):
      """
      Inputs:
      - dout: Upstream derivatives

      Returns:
      - dx: Gradient with respect to x
      """
      # Init values to index through
      x, pool_param = cache
      N, C, H, W = x.shape

      # Get the width, height, and stride of pooling kernel stored inside pool_param
      pHeight = pool_param.get('pool_height', 2)
      pWidth = pool_param.get('pool_width', 2)
      stride = pool_param.get('stride', 2)

      # Define the output shape for us to index over 
      hPrime = 1 + (H - pHeight) // stride
      wPrime = 1 + (W - pWidth) // stride

      # Init our output variable. We populate with zeros first and then mutate the activated values
      # in the backpass
      dx = torch.zeros_like(x).to(x.device)

      for n in range(N):
         for c in range(C):
               for j in range(hPrime):
                  for i in range(wPrime):
                     # May look a little confusing but just note that
                     # x[n, c, j*stride:j*stride+pHeight, i*stride:i*stride+pWidth] just references the partition
                     # our kernel slides over at every iteration.
                     #
                     # ind gets the index for the maximum value in the partition, which afterwards we index
                     # through that same partition and mutate it's maximum value using ind. Note again this is
                     # for max pooling, so we desire the largest value.
                     ind = (x[n, c, j*stride:j*stride+pHeight, i*stride:i*stride+pWidth]==torch.max( \\
                     x[n, c, j*stride:j*stride+pHeight, i*stride:i*stride+pWidth])).nonzero()
                     dx[n, c, j*stride:j*stride+pHeight, i*stride:i*stride+pWidth][ind[0][0], ind[0][1]] = dout[n, c, j, i]
                     # dx[n, c, j*stride:j*stride+pHeight, i*stride:i*stride+pWidth][ind] = dout[n, c, j, i]

      return dx`,
      poolBackwardsExample: 
`   # An example of the local operation for the backwards pass of a Max Pooling transformation.
   # An 8x8 slice of a tensor
   tensor([[-0.3104, -0.0343,  0.1756, -2.2804,  0.5039,  0.5596, -0.0750,  0.9691],
         [-0.2357, -0.4582,  0.5661,  1.2851, -1.8667, -0.0312,  1.2433,  1.3689],
         [-1.0753, -0.0158, -1.4481, -1.3089,  0.6980, -0.3300, -0.7708, -0.4946],
         [ 3.1702,  0.0387, -1.5728,  1.2985, -0.4419, -0.6965, -1.4002, -0.0884],
         [-0.2369, -0.5956, -0.0263,  0.0546, -0.7082,  0.0642,  1.2830, -1.8728],
         [ 0.7562, -0.6345,  1.1176,  1.3382,  0.1994,  0.0671, -0.4159,  0.1468],
         [-0.2672, -0.7882,  0.5857, -1.0649,  1.0950,  0.2490, -0.3271, -0.8691],
         [ 0.5576, -0.1883, -0.5894, -1.0192, -1.4553, -0.8599, -1.3645, -0.0069]],
         device='cuda:0', dtype=torch.float64)

   # The backpass of the tensor for max pooling. Kernel size = 2, stride = 2
   tensor([[ 0.0000,  0.3292,  0.0000,  0.0000,  0.0000,  0.9055,  0.0000,  0.0000],
         [ 0.0000,  0.0000,  0.0000,  0.2507,  0.0000,  0.0000,  0.0000, -0.4100],
         [ 0.0000,  0.0000,  0.0000,  0.0000, -0.5062,  0.0000,  0.0000,  0.0000],
         [-0.9453,  0.0000,  0.0000,  2.1075,  0.0000,  0.0000,  0.0000,  0.0700],
         [ 0.0000,  0.0000,  0.0000,  0.0000,  0.0000,  0.0000,  0.0783,  0.0000],
         [-1.0990,  0.0000,  0.0000,  0.9257,  0.4166,  0.0000,  0.0000,  0.0000],
         [ 0.0000,  0.0000, -1.1410,  0.0000,  0.6921,  0.0000,  0.0000,  0.0000],
         [ 2.2135,  0.0000,  0.0000,  0.0000,  0.0000,  0.0000,  0.0000, -0.3034]],
         device='cuda:0', dtype=torch.float64)`
}