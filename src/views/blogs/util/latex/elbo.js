export default {
   logpx: `$$\\begin{align}
   \\log{p_\\theta(x)} & = \\mathbb{E}_{q_{\\phi}(z|x)}[\\log{p_\\theta(x)}] && \\mathbb{E}_p[C] = C, \\text{where C is constant to distribution p} \\tag{1.0} \\\\[2ex] 
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x, z)}{p_\\theta(z|x)}}\\biggr] && \\text{probability chain rule}\\tag{1.1} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x, z)q_\\phi(z|x)}{q_\\phi(z|x)p_\\theta(z|x)}}\\biggr] && \\text{multiply by "1"}\\tag{1.2} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x, z)}{q_\\phi(z|x)}\\biggr] + \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_\\phi(z|x)}{p_\\theta(z|x)}}}\\biggr] && \\text{segregate}\\tag{1.3} \\\\[2ex]
      & = \\mathcal{L} + D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) \\tag{1.4} \\\\[2ex]
   \\log{p_\\theta(x)} & \\geq \\mathcal{L} \\tag{1.5}
   \\end{align}$$`,
   bayes: `$\\begin{align}
   \\log{\\frac{p_\\theta(x|z)p_\\theta(z)}{p_\\theta(z|x)}} & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x|z)p_\\theta(z)}{p_\\theta(z|x)}}\\biggr] && \\text{Reasoning from (1.0)} \\tag{2.0} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x|z)q_\\phi(z|x)p_\\theta(z)}{p_\\theta(z|x)q_\\phi(z|x)}}\\biggr] && \\text{multiply by "1"} \\tag{2.1} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{p_\\theta(x|z)} - \\log{\\frac{q_\\phi(z|x)}{p_\\theta(z)}} + \\log{\\frac{q_\\phi(z|x)}{p_\\theta(z|x)}}\\biggr] && \\text{segregate}\\tag{2.2} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x|z)} \\bigr] - \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_\\phi(z|x)}{p_\\theta(z)}} \\biggr] +
            \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_\\phi(z|x)}{p_\\theta(z|x)}} \\biggr] \\tag{2.3} && \\text{distibute expectation} \\\\[2ex]
      & = \\underbrace{\\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x|z)} \\bigr] - D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z))}_{\\text{Variational Lower Bound, }\\mathcal{L}} + D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) && \\text{*check below}\\tag{2.31} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x|z)} \\bigr] + \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(z)}{q_\\phi(z|x)}} \\biggr] +
         D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) && \\text{log reciprocal & definition of KL divergence} \\tag{2.4} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x|z)p_\\theta(z)}{q_\\phi(z|x)}} \\biggr] + D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) && \\text{log product rule} \\tag{2.5} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(x, z)}{q_\\phi(z|x)}} \\biggr] + D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) && \\text{probability chain rule} \\tag{2.6} \\\\[2ex]
      & = \\mathcal{L} + D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) \\tag{2.7} \\\\[2ex]
   \\end{align}$`,
   dkl: `$$\\begin{align}
   D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z|x)) & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_{\\phi}(z|x)}{p_\\theta(z|x)}} \\biggr] && \\text{definition of kl divergence} \\tag{3.0} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_{\\phi}(z|x)p_\\theta(x)}{p_\\theta(z,x)}} \\biggr] && p(z|x) = \\frac{p(z, x)}{p(x)}\\, \\text{and reciprocal} \\tag{3.1} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_{\\phi}(z|x)}{p_\\theta(z,x)}} + \\log{p_\\theta(x)} \\biggr] && \\text{segregate} \\tag{3.2} \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{q_{\\phi}(z|x)}{p_\\theta(z,x)}}\\biggr] +  \\mathbb{E}_{q_{\\phi}(z|x)}[\\log{p_\\theta(x)}] && \\text{distribute expectation} \\tag{3.3} \\\\[2ex]
      & = -\\mathbb{E}_{q_{\\phi}(z|x)}\\biggl[\\log{\\frac{p_\\theta(z,x)}{q_{\\phi}(z|x)}}\\biggr] +  \\log{p_\\theta(x)} && \\text{log reciprocal and reasoning from (1.0) & (2.0)} \\tag{3.4} \\\\[2ex]
      & = - \\mathcal{L} + \\log{p_\\theta(x)}  \\tag{3.5} \\\\[2ex]
   \\end{align}$$`,
   l: `$\\mathcal{L} = \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x|z)} \\bigr] - D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z))$`,
   l1: `$$\\mathcal{L} = \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x|z)} \\bigr] - D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z))$$`,
   l2: `$\\mathcal{L} = \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}\\bigr]$`,
   gradtheta: `$$\\begin{align}
   \\nabla_\\theta \\mathcal{L} & =  \\nabla_\\theta\\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}\\bigr] \\\\[2ex]
      & = \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\nabla_\\theta(\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x))}\\bigr] \\\\[2ex]
      & \\approx \\nabla_\\theta(\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}) \\quad \\text{Monte Carlo estimate where } z \\sim q_\\phi(z|x) \\\\[2ex]
      & = \\nabla_\\theta(\\log{p_\\theta(x, z))}  \\\\[2ex]
   \\end{align}$$`,
   gradphi: `$$\\begin{align}
   \\nabla_\\phi \\mathcal{L} & =  \\nabla_\\phi\\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}\\bigr] && \\text{definition of } \\mathcal{L}\\tag{5.0} \\\\[2ex]
      & = \\nabla_\\phi \\int (\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)})q_{\\phi}(z|x)dz && \\text{continuous latent space z} \\tag{5.1}\\\\[2ex]
      & = \\nabla_\\phi \\int \\log{p_\\theta(x, z)}q_{\\phi}(z|x)dz - \\nabla_\\phi \\int \\log{q_\\phi(z|x)}q_{\\phi}(z|x)dz && \\text{distribute terms} \\tag{5.2}\\\\[2ex]
      & =  \\int \\log{p_\\theta(x, z)}\\nabla_\\phi q_{\\phi}(z|x)dz - \\int \\bigl(\\log{q_\\phi(z|x)} \\nabla_\\phi q_{\\phi}(z|x) + \\nabla_\\phi q_{\\phi}(z|x)\\bigr)dz && \\text{product rule on RHS} \\tag{5.3}\\\\[2ex]
      & =  \\int \\log{p_\\theta(x, z)}\\nabla_\\phi q_{\\phi}(z|x)dz - \\int \\log{q_\\phi(z|x)} \\nabla_\\phi q_{\\phi}(z|x)dz + \\nabla_\\phi \\int q_{\\phi}(z|x)dz && \\text{distribute integral on RHS} \\tag{5.4}\\\\[2ex]
      & =  \\int \\log{p_\\theta(x, z)}\\nabla_\\phi q_{\\phi}(z|x)dz - \\int \\log{q_\\phi(z|x)} \\nabla_\\phi q_{\\phi}(z|x)dz && \\int q_\\phi(z|x)dz = 1, \\nabla_\\phi 1 = 0 \\tag{5.5}\\\\[2ex]
      & =  \\int (\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}) \\nabla_\\phi q_{\\phi}(z|x)dz && \\text{combine terms & factor out } \\nabla_\\phi q_\\phi(z|x) \\tag{5.6}\\\\[2ex]
      & =  \\int (\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}) q_{\\phi}(z|x) \\nabla_\\phi \\log{q_{\\phi}(z|x)}dz && \\text{chain rule, }\\frac{d}{dx}\\log{(x)} = \\frac{1}{x}\\log{\\biggl(\\frac{d}{dx}x\\biggr)}   \\tag{5.7}\\\\[2ex]
      & =  \\mathbb{E}_{q_{\\phi}(z|x)}\\bigl[(\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}) \\nabla_\\phi \\log{q_{\\phi}(z|x)}\\bigr] && \\text{convert back to expectation}  \\tag{5.8}\\\\[2ex]
      & \\approx  (\\log{p_\\theta(x, z)} - \\log{q_\\phi(z|x)}) \\nabla_\\phi \\log{q_{\\phi}(z|x)} && \\text{Monte Carlo estimate where } z \\sim q_\\phi(z|x) \\tag{5.9}\\\\[2ex]
   \\end{align}$$`,
   controlvariate: `\\begin{align}
   \\int f(x)dx & = \\int g(x)dx + \\int (f(x) - g(x))dx \\tag{6.0} \\\\
      & \\approx \\mathbb{E}[g(x)] + \\frac{1}{n}\\sum_n(f(x) - g(x)) && \\text{take n samples} \\tag{6.1} \\\\ 
   \\text{Var of eq (6.1)}& = \\frac{1}{n}\\text{Var}\\biggl(\\sum_n(f(x) - g(x))\\biggr) && \\text{Var}(X + c) = \\text{Var}(X), \\text{where c is constant} \\tag{6.2} \\\\
   \\end{align}`,
   sgvb: `$$\\begin{align}
   \\mathcal{L} & \\approx \\mathcal{\\widetilde{L}}^A \\\\
      & = \\frac{1}{L}\\sum_{l=1}^L \\log{p_\\theta(x, z^l)} - \\log{q_\\phi(z^l|x)} && \\text{where } z^l = g(\\phi, x, \\epsilon^l) \\text{ and } \\epsilon^l \\sim p(\\epsilon) \\\\
      & \\text{and} \\\\[2ex]
   \\mathcal{L} & \\approx \\mathcal{\\widetilde{L}}^B \\\\
      & = - D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z)) + \\frac{1}{L}\\sum_{l=1}^L\\log{p_\\theta(x|z^l)} && \\text{where } z^l = g(\\phi, x, \\epsilon^l) \\text{ and } \\epsilon^l \\sim p(\\epsilon) \\\\
      & = \\frac{1}{2}\\sum_i\\Biggl(\\log{\\sigma_i^2} + 1 - \\sigma_i^2 - \\mu_i^2\\Biggr) + \\frac{1}{L}\\sum_{l=1}^L\\log{p_\\theta(x|z^l)} && \\text{sub in eq 4.5}
   \\end{align}$$`,
   encoderprior: `\\begin{align}
   D_{\\mathbb{KL}}(q_\\phi(z|x)\\,||\\,p_\\theta(z)) & = \\frac{1}{2}\\Biggl(\\log\\Bigl(\\frac{|I|}{|\\Sigma|}\\Bigr) - n +
         \\text{tr}\\bigl(I^{-1}\\Sigma\\bigr)+\\bigl(0-\\mu\\bigr)^\\top I^{-1}\\bigl(0-\\mu\\bigr)\\Biggr) && \\text{definition. Change det(x) to |x| for readability} \\tag{4.0} \\\\[2ex]
      & = \\frac{1}{2}\\Biggl(\\log{|I|} - \\log{|\\Sigma|} - n + \\text{tr}\\bigl(\\Sigma\\bigr)+\\mu^\\top\\mu\\Biggr)
         && \\text{log quotient property}, I=I^{-1}, IA = A, -1\\times -1 = 1\\times 1 \\tag{4.1} \\\\[2ex]
      & = \\frac{1}{2}\\Biggl(0 - \\log{\\prod_i{\\sigma_i^2}} - n + \\text{tr}\\bigl(\\Sigma\\bigr)+\\mu^\\top\\mu\\Biggr)
         && |I| = 1, ln(1) = 0, \\text{det of diag matrix = product of diag values} \\tag{4.2} \\\\[2ex]
      & = \\frac{1}{2}\\Biggl(-\\sum_i{\\log{\\sigma_i^2}} - n + \\sum_i{\\sigma_i^2}+\\sum_i{\\mu_i^2}\\Biggr)
         && \\text{convert to sums. Recall diagonal of covariance mat is }\\sigma^2 \\tag{4.3} \\\\[2ex]
      & = \\frac{1}{2}\\Biggl(-\\sum_i{\\bigl(\\log{\\sigma_i^2}} + 1\\bigr) + \\sum_i{\\sigma_i^2}+\\sum_i{\\mu_i^2}\\Biggr)
         && \\text{n = dimension of latent space} \\tag{4.4} \\\\[2ex]
      & = \\frac{1}{2}\\sum_i\\Biggl(-\\bigl(\\log{\\sigma_i^2} + 1\\bigr) + \\sigma_i^2 +\\mu_i^2\\Biggr)
         && \\text{simplify} \\tag{4.5}

   \\end{align}`,
   reparam: `\\begin{align}
   \\nabla_\\phi\\mathbb{E}_{q_\\phi(z|x)}[f(z)] & = \\nabla_\\phi\\mathbb{E}_{p(\\epsilon))}[f(g(\\phi, x, \\epsilon))] && \\text{where } z = g(\\phi, x, \\epsilon), \\epsilon \\sim p(\\epsilon) \\\\[2ex]
      & = \\mathbb{E}_{p(\\epsilon))}[\\nabla_\\phi f(g(\\phi, x, \\epsilon))] \\\\[2ex]
      & \\approx \\nabla_\\phi f(g(\\phi, x, \\epsilon)) && \\text{Monte Carlo estimate where } \\epsilon \\sim p(\\epsilon)
   \\end{align}`
}