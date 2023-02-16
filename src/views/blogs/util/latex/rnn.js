export default {
   rnnStep: '$$f_h(h_{t-1}, x_t) = h_t = tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)$$',
   yhatTransform: '$$f_y(h_{t}) = \\hat{y} = W_{hy}h_t + b_y$$',
   totalDeriv: `$$\\frac{\\partial{L}}{\\partial{h_t}} = 
      \\frac{\\partial{L_t}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{h_t}} +
      \\frac{\\partial{L}}{\\partial{h_{t+1}}}$$`,
   toad:
`  def rnn_step_forward(x, prev_h, Wx, Wh, b):
      # Vanilla RNN uses tanh
      # torch.tanh(x) applies an element-wise activation over it's input
      next_h = torch.tanh(prev_h.mm(Wh) + x.mm(Wx) + b)
      return next_h`,
   toad2:
`  def yhat(in_features, out_features, device, dtype):
      # Very simple linear transformation
      # https://pytorch.org/docs/stable/generated/torch.nn.Linear.html
      yhat = nn.Linear(in_features, out_features, device=device, dtype=dtype)
      return yhat`,
   toad3:
`  def oneStepBackwards(output_grad, cache):
      """
      Backward pass for a single timestep of a vanilla RNN.

      Inputs:
      - output_grad: Gradient of loss with respect to next hidden state, of shape (N, H)
      - cache: Cache object from the forward pass containing all local variables at t timestep
      """
      dWhy, dby, dht, dWhh, dprev_h, dbh, dWxh = None, None, None, None, None, None, None
      Why, by, ht, Whh, prev_h, bh, Wxh, next_h = cache

      # Gradients
      dWhy = output_grad.mm(ht.t())
      dby = torch.sum(output_grad, 0)
      dht = output_grad.mm(Why.t())

      # Non-linearity & upstream 
      dtanh = dht * (1 - next_h**2)
      
      dWhh = prev_h.t().mm(dtanh)
      dprev_h = dtanh.mm(Whh.t())
      dbh = torch.sum(dtanh, 0)
      dWxh = x.t().mm(dtanh)
      
      return dWhy, dby, dht, dWhh, dbh, dWxh, dprev_h`,
   toad4:
`  def rnn_backward(dh, cache):
      """
      Compute the backward pass for a vanilla RNN over an entire sequence of data.

      Inputs:
      - dh: Upstream gradients of all hidden states, of shape (N, T, H).
         Dimensions are ([minibatch size], [sequence length], [hidden_dim]).
         Example: dh[:, 4, :] is the upstream gradient for the 4th hidden step of shape (N, H).
      """
      # Initialize
      dWhy, dby, dht, dWhh, dprev_h, dbh, dWxh = None, None, None, None, None, None, None

      # Index through the sequences in reverse starting at the last time step
      for i in range(dh.shape[1]-1, -1, -1):

         # Initialize dprev_h to be the upstream gradient of our last sequence
         # Even though dprev_h, "derivative of previous h step" is conceptually not equal to
         # the upstream gradient, it serves as a temporary measure to get the ball rolling.
         if (i == dh.shape[1] - 1):
            dprev_h = dh[:, i, :]

         _dWhy, _dby, _dht, _dWhh, _dbh, _dWxh, dprev_h = oneStepBackwards(dprev_h, cache[i])

         # Populate variables with gradients as zero tensors with corresponding shape
         if (i == dh.shape[1] - 1):
            dWhy = torch.zeros_like(_dWhy).to(_dWhy.device).to(_dWhy.dtype)
            dby = torch.zeros_like(_dby).to(_dWhy.device).to(_dWhy.dtype)
            dht = torch.zeros_like(_dht).to(_dWhy.device).to(_dWhy.dtype)
            dWhh = torch.zeros_like(_dWhh).to(_dWhy.device).to(_dWhy.dtype)
            dbh = torch.zeros_like(_dbh).to(_dWhy.device).to(_dWhy.dtype)
            dWxh = torch.zeros_like(_dWxh).to(_dWhy.device).to(_dWhy.dtype)

         # After the first step backwards, sum the overlapping gradients as mentioned above.
         dprev_h += _dht

         dWhy += _dWhy 
         dby += _dby
         dht += _dht
         dWhh += _dWhh
         dbh += _dbh
         dWxh += _dWxh
         # the final dprev_h will be the initial hidden state.
         dh0 = dprev_h

         return dWhy, dby, dht, dWhh, dbh, dWxh, dh0`,
}