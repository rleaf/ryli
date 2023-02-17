<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import latex from './util/latex/dklmvgaus'

export default {
   components: {
      ContentsUtility,
      'vm': VueMathjax
   },
   data() {
      return {
         latex: latex
      }
   },

   created() {
      this.blog = blogs.find(el => el.route === 'dklmvgaus')
      window.scrollTo(0, 0)
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
            <ContentsUtility :blog="this.blog" />
            <nav>
               <ul>
                  <li><a href="#introduction">The "Meat & Potatoes"</a></li>
                  <li><a href="#properties">Properties Used & Explanation</a></li>
                  <li><a href="#alternative">Alternative Method</a></li>
               </ul>
            </nav>
         </div>
         <div class="blog-body">

            <section id="introduction">
               <h2>The "Meat & Potatoes"</h2>
               <p>
                  The KL divergence of continuous distributions is:
               </p>
               <div class="math-b">
                  <vm class="math" :formula='this.latex.dkl'></vm>
               </div>
               <p>
                  The density function of the multivariate normal distribution is:
               </p>
               <div class="math-b">
                  <vm class="math" :formula='this.latex.mvnormal'></vm>
               </div>
               <p>
                  Let <vm :formula='`$p(x)\\sim\\mathcal{N}(\\mu_1, \\Sigma_1)$`'></vm> and <vm :formula='`$q(x)\\sim\\mathcal{N}(\\mu_2, \\Sigma_2)$`'></vm>, both
                  in <vm :formula='`$\\mathbb{R}^n$`'></vm>.
                  The KL divergence between distribution <vm :formula='`$p(x)$`'></vm> and <vm :formula='`$q(x)$`'></vm> is:
               </p>
               <vm class="math" :formula='this.latex.ohboy'></vm>
            </section>

            <section id="properties">
               <h2>Properties Used & Explanation</h2>
               <p>
                  <ul style="list-style-type: none;">
                     <li>
                        Eq (1): Definition of KL divergence
                     </li>
                     <li>
                        Eq (2): Represent the integral as the expectation of continuous random variable <vm :formula='`$X$`'></vm> generated from distribution <vm :formula='`$p$`'></vm>.
                        In other reads I usually denote with <vm :formula='`$\\mathbb{E}_{X\\,\\sim{\\,p}}$`'></vm>, however not here to keep things simple.
                        [<a href="https://en.wikipedia.org/wiki/Expected_value#Random_variables_with_density" target="_blank">Link</a>]
                     </li>
                     <li>
                        Eq (3): Quotient rule. [<a href="https://mathinsight.org/logarithm_basics" target="_blank">Link</a>]
                     </li>
                     <li>
                        Eq (4): Substitute in the densities.
                     </li>
                     <li>
                        Eq (5): Log of reciprocal rule and Log of e rule. [See eq. 3]
                     </li>
                     <li>
                        Eq (6): Product rule. [See eq. 3]
                     </li>
                     <li>
                        Eq (7): Cancel terms and use log of power rule. [See eq. 3]
                     </li>
                     <li>
                        Eq (8): Quotient rule. [See eq. 3]
                     </li>
                     <li>
                        Eq (9): Segregate expectations via linearity property and take the expectation of the constant, which is equal to the constant.
                        [<a href="https://en.wikipedia.org/wiki/Expected_value#Properties" target="_blank">Link</a>]
                     </li>
                     <li>
                        Eq (10): <vm :formula='`$(x-\\mu)^\\top\\Sigma(x-\\mu)$`'></vm> is a real number, which can be interpreted as a 1x1 matrix, making it equal to its trace.
                     </li>
                     <li>
                        Eq (11): Use equation 16 of section 1.1 from the matrix cookbook. [<a href="https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf" target="_blank">Link</a>]
                     </li>
                     <li>
                        Eq (12): Distribute expectation again. For the middle term: <vm :formula='`$\\text{tr}(\\mathbb{E}(X)) = \\mathbb{E}(\\text{tr}(X))$`'></vm>, factor out the constant
                        inverse covariance matrix, and then you are left with the definition of the covariance matrix. [<a href="https://en.wikipedia.org/wiki/Covariance_matrix#Definition" target="_blank">Link</a>].
                        Right hand term: distribute.
                     </li>
                     <li>
                        Eq (13): Middle term: definition of matrix inverse. [<a href="https://en.wikipedia.org/wiki/Invertible_matrix" target="_blank">Link</a> ]. Right hand term: use trace/expectation property shown in eq 12
                        and then factor out the constant inverse covariance matrix.
                     </li>
                     <li>
                        Eq (14): Middle term: the trace of the identity is equal to the dimension of the matrix. Right hand term: Use equation 377 of section 8.2 in the matrix cookbook linked in equation 11. Then take the
                        expectation of <vm :formula='`$2x\\mu_2^\\top$`'></vm>, which is <vm :formula='`$2\\mu_1\\mu_2^\\top$`'></vm> since the expectation is generated from
                        distribution <vm :formula='`$p$`'></vm>.
                     </li>
                     <li>
                        Eq (15): Distribute <vm :formula='`$\\Sigma_2^{-1}$`'></vm> accordingly.
                     </li>
                     <li>
                        Eq (16): Factor right hand term.
                     </li>
                     <li>
                        Eq (17): Factor out <vm :formula='`$1/2$`'></vm>. Reorder the right hand term via commutative properties.
                     </li>
                     <li>
                        Eq (17.1): An alternative representation. Factor out -1 from both terms on the right hand side, which nullify. 
                     </li>
                  </ul>
               </p>
            </section>

            <section id="alternative">
               <h2>Alternative Method</h2>
               <p>
                  Starting from equation 11 defined above however we don't trace the right hand term in the expectation:
               </p>
               <div class="math-bt">
                  <vm class="math" :formula='this.latex.alt'></vm>
               </div>
               <p>
                  Eq (12): Instead of expanding the right hand term as shown above, use equation 380 in section 8.2 of the <a href="https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf" target="_blank">matrix cookbook</a>.
                  All other operations follow in suit from above.
               </p>
            </section>

         </div>
      </div>
   </div>
</template>

<style scoped>@import url(./util/blogStyles.css);</style>