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
         elbo: elbo
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
         <div class="body">
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Tractibility concerns become evident when considering likelihood estimation for a Variational Autoencoder. Unable to maximize the marginal distribution
                  <vm :formula='`$p_\\theta(x) = \\int{p_\\theta(x|z)p_\\theta(z)dz}$`'></vm> due to complexity of integrating over the high dimensional latent space <vm :formula='`$z$`'></vm>,
                  it is also prohibitive to maximize the bayesian representation <vm :formula='`$p_\\theta(x) = p_\\theta(x|z)p_\\theta(z)/p_\\theta(z|x)$`'></vm>
                  because of the posterior <vm :formula='`$p_\\theta(z|x)$`'></vm>. To circumvent this tractibility concern an auxiliary network,
                  <vm :formula='`$q_\\phi(z|x)$`'></vm>, is introduced to approximate the posterior: <vm :formula='`$q_\\phi(z|x) \\approx p_\\theta(z|x)$`'></vm>.
                  <br><br>
                  The relationship between the auxiliary network, popularly referred to as the <i>encoder</i>, and the posterior distribution will provide a tractible means for likelihood estimation
                  and is what will become known as the <i>variational lower bound</i> or the <i> evidence lower bound (ELBO)</i>. Then by jointly updating parameters 
                  <vm :formula='`$\\phi$`'></vm> and <vm :formula='`$\\theta$`'></vm> via some gradient optimization (maximizing likelihood), the Variational
                  Autoencoder increases in efficacy.
                  <br><br>
                  The goal here is to "homogenize" the information I've found on VAEs. Different sources on the network begin explanation differently, so some people (me) are prone to confusion.
                  By sewing together these sources, the different philosophies are packaged together and presented, hopefully, with a bow on top.
               </p>
            </section>
            <section id="elbo">
               <h2>Variational Lower Bound (or ELBO)</h2>
               <p>
                  The variational lower bound, <vm :formula='`$\\mathcal{L}$`'></vm>,
                  is a value that is always less than or equal to the proposed density <vm :formula='`$\\log{p_\\theta(x)}$`'></vm>. By maximizing the tractible
                  <vm :formula='`$\\mathcal{L}$`'></vm>, the intractible marginal likelihood, <vm :formula='`$p_\\theta(x)$`'></vm>, is also maximized. Note that
                  applying the monotonic transformation <vm :formula='`$\\log{f(x)}$`'></vm> to some function <vm :formula='`$f(x)$`'></vm> preserves local extrema which does
                  not conflict with maximum likelihood estimation. Below are three different ways to arrive at <vm :formula='`$\\mathcal{L}$`'></vm>.
               </p>

               <section id="logpx">
                  <h3>Starting with: log p(x)</h3>
                  <vm :formula='this.elbo.logpx'></vm>
                  <p>

                  </p>
               </section>
            </section>
         </div>
      </div>
      
   </div>
</template>

<style scoped>
   @import url(./util/blogStyles.css);
</style>