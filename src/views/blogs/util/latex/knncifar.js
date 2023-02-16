export default {
   euclidean: `$\\sqrt{\\sum_{i=1}^{n}{(x_i-y_i)^2}}$`,
         distributed_euclidean: `$$\\sqrt{\\sum_{i=1}^{n}{(x_i-y_i)^2}} =
         \\sqrt{\\sum_{i=1}^{n}{x_i^2-2x_iy_i+y_i^2}}$$`,
         midterm: `$x_iy_i$`,
         full_cifar: 
`   from knn import KnnClassifier

   torch.manual_seed(0)
   x_train_all, y_train_all, x_test_all, y_test_all = cifar10()
   
   classifier = KnnClassifier(x_train_all, y_train_all)
   classifier.check_accuracy(x_test_all, y_test_all, k=best_k)

   # >>> Got 3399 / 10000 correct; accuracy is 33.99%
   # >>> 33.99`,
         best_k: 
`   def knn_get_best_k(k_to_accuracies):
      """
      Inputs:
      - k_to_accuracies: Dictionary mapping values of k to lists, where
      k_to_accuracies[k][i] is the accuracy on the ith fold of a KnnClassifier
      that uses k nearest neighbors.

      Returns:
      - best_k: best (and smallest if there is a conflict) k value based on
      the k_to_accuracies info
      """
      # Create best_k variable to return optimal k
      best_k = 0

      # Get keys and values from k_to_accuracies object
      keys = [k for k in k_to_accuracies.keys()]
      # >>> keys = [1, 3, 5, 8, 10, 12, 15, 20, 50, 100]
      values = [v for v in k_to_accuracies.values()]
      # >>> values = [[26.3, 25.7, 26.4, 27.8, 26.6], ..., [25.6, 27.0, 26.3, 25.6, 26.3]]

      # Get largest average of all the values
      max_avg = torch.argmax(torch.mean(torch.tensor(values), dim=1))
      # Get corresponding k for max_avg
      best_k = keys[max_avg]

      return best_k

      # >>> Best k is  10
      # >>> Got 141 / 500 correct; accuracy is 28.20%
      # >>> 28.2`,
         cross_validation:
`   def knn_cross_validate(x_train, y_train, num_folds=5, k_choices=None):
      """
      Inputs:
      x_train: Tensor of shape (num_train, C, H, W) giving all training data
      y_train: int64 tensor of shape (num_train,) giving labels for training data
      num_folds: Integer giving the number of folds to use
      k_choices: List of integers giving the values of k to try

      Returns:
      k_to_accuracies: Dictionary mapping values of k to lists, where
         k_to_accuracies[k][i] is the accuracy on the ith fold of a KnnClassifier
         that uses k nearest neighbors.
      """
      # Create a list of k's for testing
      if k_choices is None:
         k_choices = [1, 3, 5, 8, 10, 12, 15, 20, 50, 100]

      # Create empty lists to house the chunks for cross validation
      x_train_folds = []
      y_train_folds = []

      # Flatten x_train from [5000, 3, 32, 32] to [5000, 3072]
      x_train_flat = x_train.view(x_train.shape[0], -1)

      # Partition our training set to 5 tensors of training images of shape [1000, 3072] and 5 labels of shape [1000]
      x_train_folds = torch.chunk(x_train_flat, num_folds, dim=0)
      y_train_folds = torch.chunk(y_train, num_folds, dim=0)

      # Create object to house the combination of accuracies for different values k for different validation sets
      k_to_accuracies = {}

      # Iterate through every combination of k_choices and possible validation sets
      for k in k_choices:
         for folds in range(num_folds):
            # Setting validation sets
            x_valid = x_train_folds[folds]
            y_valid = y_train_folds[folds]

            # Setting new training sets 
            x_traink = torch.cat(x_train_folds[:folds] + x_train_folds[folds + 1:])
            y_traink = torch.cat(y_train_folds[:folds] + y_train_folds[folds + 1:])

            # Call our kNN with the newly defined sets
            knn = KnnClassifier(x_traink, y_traink)

            # Check accuracy 
            accuracy = knn.check_accuracy(x_valid, y_valid, k=k)

            # Append a list of accuracies for different values k to k_to_accuracies
            k_to_accuracies.setdefault(k, []).append(accuracy)

            return k_to_accuracies
      
   # Accuracies when running cross validation on our subsample
   # >>> k = 1 got accuracies: [26.3, 25.7, 26.4, 27.8, 26.6]
   # >>> k = 3 got accuracies: [23.9, 24.9, 24.0, 26.6, 25.4]
   # >>> k = 5 got accuracies: [24.8, 26.6, 28.0, 29.2, 28.0]
   # >>> k = 8 got accuracies: [26.2, 28.2, 27.3, 29.0, 27.3]
   # >>> k = 10 got accuracies: [26.5, 29.6, 27.6, 28.4, 28.0]
   # >>> k = 12 got accuracies: [26.0, 29.5, 27.9, 28.3, 28.0]
   # >>> k = 15 got accuracies: [25.2, 28.9, 27.8, 28.2, 27.4]
   # >>> k = 20 got accuracies: [27.0, 27.9, 27.9, 28.2, 28.5]
   # >>> k = 50 got accuracies: [27.1, 28.8, 27.8, 26.9, 26.6]
   # >>> k = 100 got accuracies: [25.6, 27.0, 26.3, 25.6, 26.3]`,
         running_kNN: 
`   from knn import KnnClassifier

   torch.manual_seed(0)
   num_train = 5000
   num_test = 500
   x_train, y_train, x_test, y_test = cifar10(num_train, num_test)

   classifier = KnnClassifier(x_train, y_train)
   classifier.check_accuracy(x_test, y_test, k=5)
   # >>> Got 139 / 500 correct; accuracy is 27.80%
   # >>> 27.8`,
         classify: 
`   class KnnClassifier:
      def __init__(self, x_train, y_train):
         """
         x_train: shape (num_train, C, H, W) tensor where num_train is batch size,
            C is channel size, H is height, and W is width.
         y_train: shape (num_train) tensor where num_train is batch size providing labels
         """

         self.x_train = x_train
         self.y_train = y_train

      def predict(self, x_test, k=1):
         """
         x_test: shape (num_test, C, H, W) tensor where num_test is batch size,
            C is channel size, H is height, and W is width.
         k: The number of neighbors to use for prediction
         """

         # Init output shape
         y_test_pred = torch.zeros(x_test.shape[0], dtype=torch.int64)

         # Find & store Euclidean distance between test & train
         dists = compute_distances_no_loops(self.x_train, x_test)

         # Index over test images
         for i in range(dists.shape[1]):
            # Find index of k lowest values
            x = torch.topk(dists[:,i], k, largest=False).indices

            # Index the labels according to x
            k_lowest_labels = self.y_train[x]

            # y_test_pred[i] = the most frequent occuring index
            y_test_pred[i] = torch.argmax(torch.bincount(k_lowest_labels))
         
         return y_test_pred

      def check_accuracy(self, x_test, y_test, k=1, quiet=False):
         """
         x_test: shape (num_test, C, H, W) tensor where num_test is batch size,
            C is channel size, H is height, and W is width.
         y_test: shape (num_test) tensor where num_test is batch size providing labels
         k: The number of neighbors to use for prediction
         quiet: If True, don't print a message.

         Returns:
         accuracy: Accuracy of this classifier on the test data, as a percent.
            Python float in the range [0, 100]
         """

         y_test_pred = self.predict(x_test, k=k)
         num_samples = x_test.shape[0]
         num_correct = (y_test == y_test_pred).sum().item()
         accuracy = 100.0 * num_correct / num_samples
         msg = (f'Got {num_correct} / {num_samples} correct; '
               f'accuracy is {accuracy:.2f}%')
         if not quiet:
            print(msg)
         return accuracy`,
         no_loops:
`   def compute_distances_no_loops(x_train, x_test):
      """
      Inputs:
      x_train: shape (num_train, C, H, W) tensor.
      x_test: shape (num_test, C, H, W) tensor.

      Returns:
      dists: shape (num_train, num_test) tensor where dists[i, j] is the
         Euclidean distance between the ith training image and the jth test
         image.
      """
      # Get number of training and testing images
      num_train = x_train.shape[0]
      num_test = x_test.shape[0]

      # Create return tensor with desired dimensions
      dists = x_train.new_zeros(num_train, num_test) # (500, 250)

      # Flattening tensors
      train = x_train.flatten(1) # (500, 3072)
      test = x_test.flatten(1) # (250, 3072)

      # Find Euclidean distance
      # Squaring elements
      train_sq = torch.square(train)
      test_sq = torch.square(test)

      # Summing row elements
      train_sum_sq = torch.sum(train_sq, 1) # (500)
      test_sum_sq = torch.sum(test_sq, 1) # (250)

      # Matrix multiplying train tensor with the transpose of test tensor
      mul = torch.matmul(train, test.transpose(0, 1)) # (500, 250)

      # Reshape enables proper broadcasting.
      # train_sum_sq = [500, 1] shape tensor and test_sum_sq = [1, 250] shape tensor.
      # This enables broadcasting to match desired dimensions of dists
      dists = torch.sqrt(train_sum_sq.reshape(-1, 1) + test_sum_sq.reshape(1, -1) - 2*mul)

      return dists`,
         nested_for_loops:
`   def compute_distances_two_loops(x_train, x_test):
      """
      Inputs:
      x_train: shape (num_train, C, H, W) tensor.
      x_test: shape (num_test, C, H, W) tensor.

      Returns:
      dists: shape (num_train, num_test) tensor where dists[j, i] is the
         Euclidean distance between the ith training image and the jth test
         image.
      """

      # Get the number of training and testing images
      num_train = x_train.shape[0] # (500)
      num_test = x_test.shape[0] # (250)
      

      # dists will be the tensor housing all distance measurements between testing and training
      dists = x_train.new_zeros(num_train, num_test) # (500, 250)

      # Flatten tensors
      train = x_train.flatten(1) # (500, 3072)
      test = x_test.flatten(1) # (250, 3072)

      # Find Euclidean distance using loops
      for i in range(num_test):
         for j in range(num_train):
            dists[j, i] = torch.sqrt(torch.sum(torch.square(train[j] - test[i])))


      return dists`,
         subsample:
`   # Subsample size
   num_train = 500
   num_test = 250

   # Redeclaring x_train...y_test with subsample
   x_train, y_train, x_test, y_test = cifar10(num_train, num_test)

   print('data shape:', x_train.shape)
   print('labels shape:', y_train.shape)
   # Training set:
   # >>> data shape: torch.Size([500, 3, 32, 32])
   # >>> labels shape: torch.Size([500])

   print('data shape:', x_test.shape)
   print('labels shape:', y_test.shape)
   # Testing set:
   # >>> data shape: torch.Size([250, 3, 32, 32])
   # >>> labels shape: torch.Size([250])`,
         classes:
`   classes = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
   # plane = 0, car = 1, bird = 2 ... truck = 9
      
   print(x_train[0].shape)
   # >>> torch.Size([3, 32, 32])

   # Finding integer label of corresponding 0th image
   print(y_train[0]) 
   # >>> tensor(6)
   # Element 6 in 'classes' list is a frog (which is correct, just take my word for it)`,
         declaration:
`   x_train, y_train, x_test, y_test = cifar10()
   """
   x_train: shape (B, C, H, W) tensor where B is batch size, C is channel size, H
      is height, and W is width.
   y_train: shape (B) tensor where B is batch size.
   x_test: shape (B, C, H, W) tensor where B is batch size, C is channel size, H
      is height, and W is width.
   y_test: shape(B) tensor where B is batch size.
   """

   
   # Training Set.
   # x_train is composed of 50,000 images where y_train references the corresponding labels
   print('data shape:', x_train.shape)
   print('labels shape:', y_train.shape)
   # >>> data shape: torch.Size([50000, 3, 32, 32])
   # >>> labels shape: torch.Size([50000])

   # Test Set
   # x_test is composed of 10,000 images where y_test references the corresponding labels
   print('data shape:', x_test.shape)
   print('labels shape', y_test.shape)
   # >>> data shape: torch.Size([10000, 3, 32, 32])
   # >>> labels shape: torch.Size([10000])`,
         load:
`   import os
   import torch
   from torchvision.datasets import CIFAR10

   def _extract_tensors(dset, num=None):
      x = torch.tensor(dset.data, dtype=torch.float32).permute(0, 3, 1, 2).div_(255)
      y = torch.tensor(dset.targets, dtype=torch.int64)
      if num is not None:
         if num <= 0 or num > x.shape[0]:
            raise ValueError('Invalid value num=%d; must be in the range [0, %d]'
                           % (num, x.shape[0]))
         x = x[:num].clone()
         y = y[:num].clone()
      return x, y
      
   def cifar10(num_train=None, num_test=None):
      download = not os.path.isdir('cifar-10-batches-py')
      dset_train = CIFAR10(root='.', download=download, train=True)
      dset_test = CIFAR10(root='.', train=False)
      x_train, y_train = _extract_tensors(dset_train, num_train)
      x_test, y_test = _extract_tensors(dset_test, num_test)
      
      return x_train, y_train, x_test, y_test`,
}