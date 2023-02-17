export default {
   dkl: '$$D_{\\mathbb{KL}}(p\\,||\\,q)\\triangleq\\int_x{p(x)\\log\\frac{{p(x)}}{q(x)}}dx$$',
   mvnormal: '$$p(x;\\,\\mu,\\Sigma)=\\frac{1}{(2\\pi)^{n/2}\\det{(\\Sigma)}^{1/2}}\\exp{\\biggl(-\\frac{1}{2}(x-\\mu)^\\top\\Sigma^{-1}(x-\\mu)\\biggr)}$$',
   ohboy: `\\begin{align}
   D_{\\mathbb{KL}}(p\\,||\\,q) & = \\int_x{p(x)\\log\\frac{{p(x)}}{q(x)}}dx \\tag{1} \\\\[2ex] 
      & = \\mathbb{E}_p\\Biggl[\\log\\frac{p(x)}{q(x)}\\Biggr] \\tag{2}\\\\[2ex]
      & = \\mathbb{E}_p[\\log{p(x)} - \\log{q(x)}] \\tag{3}\\\\[2ex]
      & = \\mathbb{E}_p\\Bigg[\\log\\Biggl(\\frac{1}{(2\\pi)^{n/2}\\det{(\\Sigma_1)}^{1/2}}\\exp{\\biggl(-\\frac{1}{2}(x-\\mu_1)^\\top\\Sigma_1^{-1}(x-\\mu_1)\\biggr)}\\Biggr) - 
            \\log\\Biggl(\\frac{1}{(2\\pi)^{n/2}\\det{(\\Sigma_2)}^{1/2}}\\exp{\\biggl(-\\frac{1}{2}(x-\\mu_2)^\\top\\Sigma_2^{-1}(x-\\mu_2)\\biggr)}\\Biggr)\\Biggr] \\tag{4} \\\\[2ex]
      & = \\mathbb{E}_p\\Bigg[-\\log\\Bigl((2\\pi)^{n/2}\\det{(\\Sigma_1)}^{1/2}\\Bigr)-\\frac{1}{2}(x-\\mu_1)^\\top\\Sigma^{-1}_1(x-\\mu_1) +
            \\log\\Bigl((2\\pi)^{n/2}\\det{(\\Sigma_2)}^{1/2}\\Bigr)+\\frac{1}{2}(x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Biggr] \\tag{5} \\\\[2ex]
      & = \\mathbb{E}_p\\Bigg[-\\log\\Bigl((2\\pi)^{n/2}\\Bigr)-\\log\\Bigl(\\det{(\\Sigma_1)}^{1/2}\\Bigr)-\\frac{1}{2}(x-\\mu_1)^\\top\\Sigma^{-1}_1(x-\\mu_1) +
            \\log\\Bigl((2\\pi)^{n/2}\\Bigr)+\\log\\Bigl(\\det{(\\Sigma_2)}^{1/2}\\Bigr)+\\frac{1}{2}(x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Biggr] \\tag{6} \\\\[2ex]
      & = \\mathbb{E}_p\\Bigg[-\\frac{1}{2}\\log\\Bigl(\\det{(\\Sigma_1)}\\Bigr)-\\frac{1}{2}(x-\\mu_1)^\\top\\Sigma^{-1}_1(x-\\mu_1) +
            \\frac{1}{2}\\log\\Bigl(\\det{(\\Sigma_2)}\\Bigr)+\\frac{1}{2}(x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Biggr] \\tag{7} \\\\[2ex]
      & = \\mathbb{E}_p\\Bigg[\\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)-\\frac{1}{2}(x-\\mu_1)^\\top\\Sigma^{-1}_1(x-\\mu_1) +
            \\frac{1}{2}(x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Biggr] \\tag{8} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)+ \\mathbb{E}_p\\Bigg[-\\frac{1}{2}(x-\\mu_1)^\\top\\Sigma^{-1}_1(x-\\mu_1) +
            \\frac{1}{2}(x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Biggr] \\tag{9} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)+ \\frac{1}{2}\\mathbb{E}_p\\Bigg[-\\text{tr}\\Bigl((x-\\mu_1)^\\top\\Sigma^{-1}_1(x-\\mu_1)\\Bigr) +
            \\text{tr}\\Bigl((x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Bigr)\\Biggr] \\tag{10} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)+ \\frac{1}{2}\\mathbb{E}_p\\Bigg[-\\text{tr}\\Bigl(\\Sigma^{-1}_1(x-\\mu_1)(x-\\mu_1)^\\top\\Bigr) +
            \\text{tr}\\Bigl(\\Sigma^{-1}_2(x-\\mu_2)(x-\\mu_2)^\\top\\Bigr)\\Biggr] \\tag{11} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{1}{2}\\text{tr}\\Bigl(\\Sigma^{-1}_1\\Sigma_1\\Bigr) +
            \\frac{1}{2}\\mathbb{E}_p\\Bigg[\\text{tr}\\Bigl(\\Sigma^{-1}_2(xx^\\top-2x\\mu_2^\\top+\\mu_2\\mu_2^\\top)\\Bigr)\\Biggr] \\tag{12} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{1}{2}\\text{tr}\\bigl(\\mathit{I}_n\\bigr) +
            \\frac{1}{2}\\text{tr}\\Bigl(\\Sigma^{-1}_2\\mathbb{E}_p\\Big[(xx^\\top-2x\\mu_2^\\top+\\mu_2\\mu_2^\\top)\\Bigr]\\Bigr) \\tag{13} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{n}{2} +
            \\frac{1}{2}\\text{tr}\\Bigl(\\Sigma^{-1}_2(\\Sigma_1+\\mu_1\\mu_1^\\top-2\\mu_1\\mu_2^\\top+\\mu_2\\mu_2^\\top)\\Bigr) \\tag{14} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{n}{2} +
            \\frac{1}{2}\\text{tr}\\bigl(\\Sigma^{-1}_2\\Sigma_1\\bigr)+\\Sigma^{-1}_2\\bigl(\\mu_1\\mu_1^\\top-2\\mu_1\\mu_2^\\top+\\mu_2\\mu_2^\\top\\bigr) \\tag{15} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{n}{2} +
            \\frac{1}{2}\\text{tr}\\bigl(\\Sigma^{-1}_2\\Sigma_1\\bigr)+\\Sigma^{-1}_2\\bigl(\\mu_1-\\mu_2\\bigr)\\bigl(\\mu_1-\\mu_2\\bigr)^\\top \\tag{16} \\\\[2ex]
      & = \\frac{1}{2}\\Biggl(\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr) - n +
            \\text{tr}\\bigl(\\Sigma^{-1}_2\\Sigma_1\\bigr)+\\bigl(\\mu_1-\\mu_2\\bigr)^\\top\\Sigma^{-1}_2\\bigl(\\mu_1-\\mu_2\\bigr)\\Biggr) \\tag{17} \\\\[2ex]
      & = \\frac{1}{2}\\Biggl(\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr) - n +
            \\text{tr}\\bigl(\\Sigma^{-1}_2\\Sigma_1\\bigr)+\\bigl(\\mu_2-\\mu_1\\bigr)^\\top\\Sigma^{-1}_2\\bigl(\\mu_2-\\mu_1\\bigr)\\Biggr) \\tag{17.1} \\\\[2ex]
   \\end{align}`,
   
   alt: `\\begin{align}
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)+ \\frac{1}{2}\\mathbb{E}_p\\Bigg[-\\text{tr}\\Bigl(\\Sigma^{-1}_1(x-\\mu_1)(x-\\mu_1)^\\top\\Bigr) +
            \\Sigma^{-1}_2(x-\\mu_2)(x-\\mu_2)^\\top\\Biggr] \\tag{11} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{1}{2}\\text{tr}\\Bigl(\\Sigma^{-1}_1\\Sigma_1\\Bigr) +
            \\frac{1}{2}\\mathbb{E}_p\\Bigl[(x-\\mu_2)^\\top\\Sigma^{-1}_2(x-\\mu_2)\\Bigr] \\tag{12} \\\\[2ex]
      & = \\frac{1}{2}\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- \\frac{n}{2} +
            \\frac{1}{2}\\Bigl((\\mu_1-\\mu_2)^\\top\\Sigma^{-1}_2(\\mu_1-\\mu_2) + \\text{tr}(\\Sigma^{-1}_2\\Sigma_1)\\Bigr) \\tag{13}\\\\[2ex]
      & = \\frac{1}{2}\\Biggl(\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr)- n + \\text{tr}(\\Sigma^{-1}_2\\Sigma_1) +
            (\\mu_1-\\mu_2)^\\top \\Sigma^{-1}_2(\\mu_1-\\mu_2)\\Biggr) \\tag{14} \\\\[2ex]
   \\end{align}`
}