export default {
   formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$',
   bigO: '$f(n) = O(g(n))$',
   bigOmega: '$f(n) = \\Omega(g(n))$',
   bigTheta: '$f(n) = \\Theta(g(n))$',
   forLoop: 
`def simple(n):
   # Memory access
   x = n

   # Loop
   for i in range(x):
      ...
      
# Algorithm equals 1 + n(...)`,
   insertionSort: 
`def insertionSort(n):
   for i in range(len(n)):
      j = i
      while ((j>0) and s[j] < s[j-1])):
         swap(s[j], s[j-1])
         j -= 1`,
   insertionSort2: 
`def insertionSort(n):
   # Loop going around n times
   for i in range(len(n)):
      # Memory access
      j = i
      # Loop going around n times in *worst case scenario*
      while ((j>0) and s[j] < s[j-1])):
         # Simple call operation
         swap(s[j], s[j-1])
         # Memory access
         j -= 1
         
# Algorithm equals n(1+n(1+1)) -> 2n^2 + n`
}