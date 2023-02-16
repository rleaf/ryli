export default {
   factor: `$\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}}$`,
   dldx: `$\\frac{\\partial{\\ell}}{\\partial{x_i}}$`,
   dldy: `$$\\frac{\\partial{\\ell}}{\\partial{y_i}} = \\mathrm{upstream}\\; \\mathrm{gradient} = \\mathrm{dout}$$`,
   dldxSolve: `$$\\frac{\\partial{\\ell}}{\\partial{\\hat{x_i}}} = \\mathrm{dout} \\cdot \\gamma$$`,
   dsigdmu: `$\\frac{\\partial{\\sigma^2_\\beta}}{\\partial{\\mu_\\beta}}$`,
   dsigdx: `$\\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}}$`,
   dxdsig: `$\\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}}$`,
   dydxhatSolve: `$$\\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} = \\gamma$$`, 
   dxhatdxSolve: `$$\\frac{\\partial{\\hat{x_i}}}{\\partial{x_i}} = \\frac{1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}}$$`,
   dxhatdmuSolve: `$$\\frac{\\partial{\\hat{x_i}}}{\\partial{\\mu_\\beta}} = \\frac{-1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}}$$`,
   dxhatdsigSolve: `$$\\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}} = \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-3/2}(x_i-\\mu_\\beta)$$`,
   dsigdmuSolve: `$$\\frac{\\partial{\\sigma^2_\\beta}}{\\partial{\\mu_\\beta}} = \\frac{-2}{m}\\sum_{i=1}^{m}(x_i-\\mu_\\beta)$$`,
   dmudxSolve: `$$\\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}} = \\frac{1}{m}$$`,
   dsigdxSolve: `$$\\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}} = \\frac{2}{m}(x_i-\\mu_\\beta)$$`,
   simplesigmoid: `$(1 - \\sigma(x))(\\sigma(x))$`,
   sigmoid: `$\\sigma^2_\\beta$`,
   xhat: `$\\hat{x_i}$`,
   xhatformula: `$\\frac{x_i-\\mu_\\beta}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}$`,
   mu: `$\\mu_\\beta$`,
   trickyPart1: `$\\frac{m\\mu_\\beta}{m}$`,
   expectation: `$\\frac{1}{m}\\sum_{i=1}^{m}x_i$`,
   secondSumSimplify: `$\\frac{-2}{m}\\sum_{i=1}^{m}(x_i-\\mu_\\beta)$`,
   rootTrick: `$(\\sigma^2_\\beta+\\epsilon)^{-3/2}$`,
   rootTrick2: `$(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}$`,
   dxhatdmu: `$\\frac{\\mathrm{d}{\\hat{x_i}}}{\\mathrm{d}{\\mu_\\beta}}$`,
   dxhatdmufull: `$$\\frac{\\mathrm{d}{\\hat{x_i}}}{\\mathrm{d}{\\mu_\\beta}} = \\frac{\\partial{\\hat{x_i}}}{\\partial{\\mu_\\beta}} +
                  \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}} \\cdot
                  \\frac{\\partial{\\sigma^2}}{\\partial{\\mu_\\beta}}$$`,
   redundant: `$\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot
               \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} = \\frac{\\partial{\\ell}}{\\partial{\\hat{x_i}}}$`,

   // The big boys
   // Line wrap is alt-z btw
   dldxSub1: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} + \\Biggl(\\sum_{i=1}^{m}\\biggl( \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}}\\biggr) \\cdot \\frac{1}{m} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot\\gamma \\cdot \\frac{-1}{2}\\color{lightgreen}{(\\sigma^2_\\beta+\\epsilon)^{-3/2}} (x_i -\\mu_\\beta)\\cdot \\frac{-2}{m}\\sum_{k=1}^{m}(x_k -\\mu_\\beta) \\biggr)\\frac{1}{m}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-3/2} (x_i -\\mu_\\beta)\\biggr) \\cdot \\frac{2}{m}(x_i-\\mu_\\beta) $$`,
   dldxSub2: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} + \\Biggl(\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot \\gamma \\cdot \\frac{-1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} \\biggr) \\frac{1}{m} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot\\gamma \\cdot \\frac{-1}{2}\\color{lightgreen}{(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}}(x_i-\\mu_\\beta) \\cdot \\color{lightgreen}{\\frac{-2}{m}\\sum_{k=1}^{m}(x_k-\\mu_\\beta)}\\biggr) \\frac{1}{m}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta)\\biggr) \\cdot \\frac{2}{m}(x_i-\\mu_\\beta) $$`,
   dldxSub3: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} + \\Biggl(\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot \\gamma \\cdot \\frac{-1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} \\biggr) \\frac{1}{m} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot\\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta) \\cdot \\color{lightgreen}{-2\\biggl(\\frac{1}{m}\\sum_{k=1}^{m}x_k-\\frac{1}{m}\\sum_{k=1}^{m}\\mu_\\beta\\biggr)}\\biggr) \\frac{1}{m}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta)\\biggr) \\cdot \\frac{2}{m}(x_i-\\mu_\\beta) $$`,
   dldxSub4: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} + \\Biggl(\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot \\gamma \\cdot \\frac{-1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} \\biggr) \\frac{1}{m} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot\\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta) \\cdot \\color{lightgreen}{-2\\Bigl(\\mu_\\beta-\\frac{m\\mu_\\beta}{m}\\Bigr)}\\biggr) \\frac{1}{m}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta)\\biggr) \\cdot \\frac{2}{m}(x_i-\\mu_\\beta) $$`,
   dldxSub5: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} + \\Biggl(\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot \\gamma \\cdot \\frac{-1}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} \\biggr) \\frac{1}{m} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}}\\cdot\\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta) \\cdot \\color{lightgreen}{-2\\Bigl(0\\Bigr)}\\biggr) \\frac{1}{m}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta)\\biggr) \\cdot \\frac{2}{m}(x_i-\\mu_\\beta) $$`,
   dldxSub6: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\gamma}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} - \\frac{\\gamma}{m\\sqrt{\\sigma^2_\\beta + \\epsilon}}\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot \\frac{-1}{2}(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{1}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}(x_i-\\mu_\\beta)\\biggr) \\cdot \\frac{2}{m}(x_k-\\mu_\\beta) $$`,
   dldxSub7: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\gamma}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} - \\frac{\\gamma}{m\\sqrt{\\sigma^2_\\beta + \\epsilon}}\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\gamma \\cdot -(\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{x_k-\\mu_\\beta}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\frac{x_i-\\mu_\\beta}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\biggr) $$`,
   dldxSub8: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\gamma}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} - \\frac{\\gamma}{m\\sqrt{\\sigma^2_\\beta + \\epsilon}}\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\biggr) - \\gamma \\cdot (\\sigma^2_\\beta+\\epsilon)^{-1/2}\\frac{x_k-\\mu_\\beta}{\\sqrt{\\sigma^2_\\beta+\\epsilon}} \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{x_i-\\mu_\\beta}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\biggr) $$`,
   dldxSub9: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\gamma}{\\sqrt{\\sigma^2_\\beta + \\epsilon}} - \\frac{\\gamma}{m\\sqrt{\\sigma^2_\\beta + \\epsilon}}\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\biggr) - \\frac{\\gamma}{\\sqrt{\\sigma^2_\\beta+\\epsilon}}\\cdot\\hat{x_k} \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\hat{x_i}\\biggr) $$`,
   dldxSub10: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\gamma}{\\sqrt{\\sigma^2_\\beta + \\epsilon}}\\Biggr(\\frac{\\partial{\\ell}}{\\partial{y_i}} - \\frac{1}{m} \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\biggr) - \\frac{\\hat{x_k}}{m} \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\hat{x_i}\\biggr)\\Biggl) $$`,

   dldxSimple3: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{x_i}} + \\Biggl(\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\mu_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}}\\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{\\mu_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}} $$`,
   dldxSimple2: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\Biggl(\\frac{\\partial{\\hat{x_i}}}{\\partial{x_i}} + \\Biggl(\\sum_{i=1}^{m}\\biggl( \\frac{\\partial{\\hat{x_i}}}{\\partial{\\mu_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}} + \\sum_{i=1}^{m}\\biggl( \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}} \\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{\\mu_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}}\\Biggr) + \\sum_{i=1}^{m}\\biggl( \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}}\\Biggr) $$`,
   dldxSimple1: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{x_i}} + \\Biggl(\\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\mu_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}} + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}}\\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{\\mu_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}}\\Biggr) + \\sum_{i=1}^{m}\\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}}\\biggr) \\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}} $$`,

   dldxFull: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot\\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{x_i}} + \\biggl(\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\mu_\\beta}} \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}} + \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}} \\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{\\mu_\\beta}} \\cdot \\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}}\\biggr) + \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot \\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot \\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}} \\cdot \\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}} $$`,
   dldxFullQuote: `$$\\frac{\\partial{\\ell}}{\\partial{x_i}} = \\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot\\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot\\frac{\\partial{\\hat{x_i}}}{\\partial{x_i}} +\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot\\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot\\frac{\\mathrm{d}{\\hat{x_i}}}{\\mathrm{d}{\\mu_\\beta}} \\cdot\\frac{\\partial{\\mu_\\beta}}{\\partial{x_i}} +\\frac{\\partial{\\ell}}{\\partial{y_i}} \\cdot\\frac{\\partial{y_i}}{\\partial{\\hat{x_i}}} \\cdot\\frac{\\partial{\\hat{x_i}}}{\\partial{\\sigma^2_\\beta}} \\cdot\\frac{\\partial{\\sigma^2_\\beta}}{\\partial{x_i}}$$`,
   bnChainCode: 
`   @staticmethod
   def backward(dout, cache):

      # dout: upstream gradient
      # cache: cache of intermediate variables to construct local gradient

      dx, dgamma, dbeta = None, None, None
      x, xhat, bMean, bVar, eps, gamma, beta = cache
      N, D = dout.shape

      dxhat = dout * gamma
      dbVar1 = torch.sum(dxhat * (x - bMean), 0)
      dbVar2 = ((-1/2)*((bVar + eps))**(-3/2))
      dbVar =  dbVar1 * dbVar2
      dMean = torch.sum(dxhat * -1/torch.sqrt(bVar + eps), 0) + dbVar * (torch.sum(-2*(x - bMean), 0))/ N
      x1 = dxhat * (1/torch.sqrt(bVar + eps)) 
      x2 = dbVar * (2 * (x - bMean)/ N)
      x3 = dMean * (1 / N)
      # Standard dl/dx composed of 373 characters
      dx = x1 + x2 + x3

      dgamma = torch.sum(dout * xhat, 0)
      dbeta = torch.sum(dout, 0)

      return dx, dgamma, dbeta`,
   finalAnswerCode:
`   @staticmethod
   def backward_alt(dout, cache):

      # dout: upstream gradient
      # cache: cache of intermediate variables to construct local gradient

      dx, dgamma, dbeta = None, None, None
      x, xhat, bMean, bVar, eps, gamma, beta = cache
      N, D = dout.shape

      dbeta = torch.sum(dout, 0)
      dgamma = torch.sum(dout * xhat, 0)
      # Optimized dl/dx composed of 97 characters
      dx = gamma/torch.sqrt(bVar + eps) * (dout - torch.sum(dout, 0)/N - xhat/N * torch.sum(dout * xhat, 0))

      return dx, dgamma, dbeta
   # >>> ~3-10x faster than backward()`
}