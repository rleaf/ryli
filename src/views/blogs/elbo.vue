<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import elbo from './util/latex/elbo'

export default {
   components: {
      ContentsUtility,
      'vm': VueMathjax
   },
   data() {
      return {
         latex: elbo
      }
   },

   created() {
      this.blog = blogs.find(el => el.route === 'elbo')
   },

   mounted() {
      util.contentObserver()
      util.titleTween()
   }
}
</script>

<template>
   <div class="blog-wrapper">
      <div class="blog-landing">
         <div class="blog-head">
            <h1>{{ this.blog.title }}</h1>
            <h4>{{ this.blog.date }}</h4>
         </div>
      </div>
      <div class="blog-main">
         <div class="sidebar">
            <ContentsUtility :blog="this.blog"/>
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#elbo">Variational Lower Bound (or ELBO)</a></li>
                  <ul>
                     <li><a href="#logpx">Starting with: log p(x)</a></li>
                     <li><a href="#bayes">Starting with: Bayes Rule</a></li>
                     <li><a href="#kldivergence">Starting with: KL divergence</a></li>
                  </ul>
                  <li><a href="#dkl-encoder-prior">Closed Form Computation of KL Divergence in the ELBO</a></li>
                  <li><a href="#gradientflow">Gradient Flow</a></li>
                  <ul>
                     <li><a href="#reparameterization">Reparameterization Trick</a></li>
                  </ul>
               </ul>
            </nav>
         </div>
         <div class="blog-body">
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Tractibility concerns become evident when considering likelihood estimation for a Variational Autoencoder. Unable to maximize the marginal distribution
                  <vm :formula='`$p_\\theta(x) = \\int{p_\\theta(x|z)p_\\theta(z)dz}$`' /> due to complexity of integrating over the high dimensional latent space <vm :formula='`$z$`' />,
                  it is also prohibitive to maximize the bayesian representation <vm :formula='`$p_\\theta(x) = p_\\theta(x|z)p_\\theta(z)/p_\\theta(z|x)$`' />
                  because of the posterior <vm :formula='`$p_\\theta(z|x)$`' />. To circumvent this tractibility concern an auxiliary network,
                  <vm :formula='`$q_\\phi(z|x)$`' />, is introduced to approximate the posterior: <vm :formula='`$q_\\phi(z|x) \\approx p_\\theta(z|x)$`' />.
                  <br><br>
                  The relationship between the auxiliary network, popularly referred to as the <i>encoder</i>, and the posterior distribution will provide a tractible means for likelihood estimation
                  and is what will become known as the <i>variational lower bound</i> or the <i> evidence lower bound (ELBO)</i>. Then by jointly updating parameters 
                  <vm :formula='`$\\phi$`' /> and <vm :formula='`$\\theta$`' /> via some gradient optimization (maximizing likelihood), the Variational
                  Autoencoder increases in efficacy.
                  <br><br>
                  The goal here is to "homogenize" the information I've found on VAEs. Different sources on the network begin explanation differently, so some people (me) are prone to confusion.
                  By sewing together these sources, the different philosophies are packaged together and presented, hopefully, with a bow on top.
               </p>
            </section>
            <section id="elbo">
               <h2>Variational Lower Bound (or ELBO)</h2>
               <p>
                  The variational lower bound, <vm :formula='`$\\mathcal{L}$`' />,
                  is a value that is always less than or equal to the proposed density <vm :formula='`$\\log{p_\\theta(x)}$`' />. By maximizing the tractible
                  <vm :formula='`$\\mathcal{L}$`' />, the intractible marginal likelihood, <vm :formula='`$p_\\theta(x)$`' />, is also maximized. Note that
                  applying the monotonic transformation <vm :formula='`$\\log{f(x)}$`' /> to some function <vm :formula='`$f(x)$`' /> preserves local extrema which does
                  not conflict with maximum likelihood estimation. Below are three different ways to arrive at <vm :formula='`$\\mathcal{L}$`' />.
               </p>

               <section id="logpx">
                  <h3>Starting with: log p(x)</h3>
                  <div class="math-b">
                     <vm class="math" :formula='this.latex.logpx' /> 
                  </div>
                  <p>
                     This is, from what I've seen, the most popular way to formulate <vm :formula='`$\\mathcal{L}$`'></vm>. Equation 1.4 shows the relationship between the marginal likelihood,
                     <vm :formula='`$\\log{p_\\theta(x)}$`'></vm>, and <vm :formula='`$\\mathcal{L}$`'></vm> where the difference between the two values is the KL divergence
                     from the encoder, <vm :formula='`$q_\\phi(z|x)$`'></vm>, to the posterior, <vm :formula='`$p_\\theta(z|x)$`'></vm>. Because the KL divergence is non negative,
                     by subtracting it from the RHS we ensure <vm :formula='`$\\log{p_\\theta(x) \\geq \\mathcal{L}}$`'></vm>.
                  </p>
               </section>

               <section id="bayes">
                  <h3>Starting with: Bayes Rule</h3>
                  <div class="math-b">
                     <vm class="math" :formula='this.latex.bayes' />
                  </div>
                  <p>
                     This explanation is unnecessarily long because it should seem apparent how to get from eq 2.2 to eq 2.7 with understanding of eq 1.0 - 1.5.
                     However eq 2.31 shows a further, very popular, representation of the variational lower bound, also referenced later on: <vm :formula='this.latex.l' />.
                     The left term is the <i>reconstruction error</i> or <i>expected reconstruction error</i> and the right is the KL divergence from the encoder to the prior distribution. An alternative
                     formulation is: <vm :formula='this.latex.l2' />.
                  </p>
               </section>

               <section id="kldivergence">
                  <h3>Starting with: KL divergence</h3>
                  <vm class="math" :formula='this.latex.dkl' />
               </section>
            </section>

            <section id="dkl-encoder-prior">
               <h2>Closed Form Computation of KL Divergence in the ELBO</h2>
               <p>
                  This section is more of an aside to show the breakdown of the KL divergence term in <vm :formula='`$\\mathcal{L}$`' /> when the prior and encoder are initialized
                  to certain densities. To make sure our ducks are in a row:
                  <ul>
                     <li><b>Duck 1:</b> For reference, the lower variational bound referenced in eq 2.31 is: <vm :formula='this.latex.l1' /></li>
                     <li><b>Duck 2:</b> The KL divergence between two multivariate gaussians simplifies to (<a href="/blog/kl-divergence-mv-gaussian" target="_blank">shown here</a>):
                     <vm :formula='`$$D_{\\mathbb{KL}}(q\\,||\\,p) \\triangleq \\frac{1}{2}\\Biggl(\\log\\Bigl(\\frac{\\det{(\\Sigma_2)}}{\\det{(\\Sigma_1)}}\\Bigr) - n +
                        \\text{tr}\\bigl(\\Sigma^{-1}_2\\Sigma_1\\bigr)+\\bigl(\\mu_2-\\mu_1\\bigr)^\\top\\Sigma^{-1}_2\\bigl(\\mu_2-\\mu_1\\bigr)\\Biggr)$$`' /></li>
                  </ul>
                  When both the encoder <vm :formula='`$q_\\phi(z|x)$`' /> and prior <vm :formula='`$p_\\theta(z)$`' /> are multivariate diagonal gaussians, where
                  <vm :formula='`$q_\\phi(z|x) = \\mathcal{N}(\\mu_1, \\Sigma_1) = \\mathcal{N}(\\mu, \\Sigma)$`' /> and <vm :formula='`$p_\\theta(z) = \\mathcal{N}(\\mu_2, \\Sigma_2) =\\mathcal{N}(0, I)$`' />, the
                  KL divergence term in <vm :formula='`$\\mathcal{L}$`' /> can be computed.
               </p>
               <div class="math-t">
                  <vm class="math" :formula='this.latex.encoderprior' />
               </div>
            </section>
            <section id="gradientflow">
               <h2>Gradient Flow</h2>
               <p>
                  Monte Carlo estimates are used to show the gradients wrt <vm :formula='`$\\theta$`' /> and <vm :formula='`$\\phi$`' />
                  for the variational lower bound <vm :formula='`$\\mathcal{L}$`' />.
                  In the case of <vm :formula='`$\\nabla_\\theta$`' /> and using <vm :formula='this.latex.l2' />, the gradient will be:
               </p>
               <div class="math-bt">
                  <vm class="math" :formula="this.latex.gradtheta" />
               </div>
               <p>
                  For <vm :formula='`$\\nabla_\\phi$`' /> the process is a little more convoluted because we're seeking the gradient for the parameters of the expectation.
               </p>
               <div class="math-bt">
                  <vm class="math" :formula="this.latex.gradphi" />
               </div>

               <section id="reparameterization">
                  <h3>Reparameterization Trick</h3>
                  <p> 
                     The reparameterization trick is a procedure that segregates the stochasticity in <vm :formula='`$z$`' /> from the desired parameters for backpropogation.
                     This provides two benefits. One, reparameterization is a variance reduction technique. Although these estimates can provide tractible means to calculate <vm :formula='`$\\nabla_{\\theta,\\phi}$`' />,
                     they express high variance making them impractical for use.
                     By reducing variance, we ensure a more appropriate gradient for the model to learn. Two, reparameterization also guarantees
                     the function to be differentiable because <vm :formula='`$\\nabla_\\phi q_\\phi(z|x)$`' /> is not always possible to compute. By eschewing the gradient's parameters from this density's parameters, we circumvent this issue.
                  </p>
                  <img src="../../assets/blogs/elbo/reparameterization3.png" alt="" class="image">
                  <p class="caption"><a href="https://arxiv.org/abs/1906.02691" target="_blank">Figure 2.3 from "An Introduction to Variational Autoencoders"</a></p>
                  <p>
                     Reparameterization introduces an intermediary function <vm :formula='`$g$`' /> such that instead of <vm :formula='`$z \\sim q_\\phi(z|x)$`' />,
                     <vm :formula='`$z = g(\\phi, x, \\epsilon)$`' /> where the stochasticity is delegated to random variable <vm :formula='`$\\epsilon \\sim p(\\epsilon)$`' />. The desired parameter for backpropagation,
                     <vm :formula='`$\\phi$`' />, now becomes deterministic and provides a more reliable flow downstream.
                     On a more tangible level this converts a lot of the headache witnessed in equations 5.X to something more approachable because, by
                     reparameterizing <vm :formula='`$z$`' />, the parameters of the density of the expectation changes, which in turn allows the gradient to be inside the expectation.
                  </p>
                  <div class="math-bt">
                     <vm class="math" :formula='this.latex.reparam' />
                  </div>
                  <p>
                     With reparameterization, the two representations of the variational lower bound <vm :formula='`$\\mathcal{L}$`' />  shown in "<a href="#bayes">Starting with: Bayes Rule</a>" are called
                     the Stochastic Gradient Variational Bayes Estimator (SGVB) and can be represented as:
                  </p>
                  <div class="math-t">
                     <vm class="math" :formula='this.latex.sgvb' />
                  </div>
               </section>
            </section>
         </div>
      </div>
      
   </div>
</template>

<style scoped>
   @import url(./util/blogStyles.css);
</style>