<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import latex from './util/latex/bnbackpass'

import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-nord.css'

export default {
   components: {
      ContentsUtility,
      PrismEditor,
      'vm': VueMathjax
   },
   head: {
      meta: [
         {
            name: 'author',
            content: 'Ryan Lin'
         },
         {
            name: 'description',
            content: `An explanation on providing faster means to derive the gradient of the batch normalization process. A step by step walkthrough through all of the needed math with some code.`
         },
         {
            name: 'keywords',
            content: 'batch normalization, derivative, gradient, shortcut, neural networks, machine learning, artificial intelligence, ai, ml, backpropagation, backwards pass, regularization, optimization'
         },
         {
            property: 'og:description',
            content: `An explanation on providing faster means to derive the gradient of the batch normalization process. A step by step walkthrough through all of the needed math with some code.`
         }
      ]
   },
   data() {
      return {
         latex: latex
      }
   },

   created() {
      this.blog = blogs.find(el => el.route === 'bnbackpass')
      window.scrollTo(0, 0)
   },

   mounted() {
      util.contentObserver()
      util.titleTween()
   },

   methods: {
      highlighter(code) {
         return highlight(code, languages.py); // languages.<insert language> to return html with markup
      }
   },
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
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#total_derivative">Total Derivative Representation</a></li>
                  <li><a href="#summations">Integrate Summations</a></li>
                  <li><a href="#partials">Solving the Partials</a></li>
                  <li><a href="#substitute">Substitute in Partials & Simplify</a></li>
                  <li><a href="#thoughts">Thoughts</a></li>
               </ul>
            </nav>
         </div>
         <div class="blog-body">

            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  <i>This read may be a little ridiculous because instead of substituting partials as needed when working through the math, I do everything at once in the most expanded form.
                     I link an alternative, maybe more interpretable, blog down below in the conclusion. This read is not very suitable for smaller screens. </i>
               </p>
               <p>
                  The image below defines "whitening". An application to a batch of inputs with the goal to reduce the <i>internal covariate shift</i>. This procedure occurs during the forward pass.
                  In order to preserve training, the backward pass must also be defined. Similarly to how the gradient of the sigmoid function simplifies to <vm :formula='this.latex.simplesigmoid'></vm>,
                  the gradient for batch normalization can also undergo a similar process to promote computational efficiency (<a href="https://arxiv.org/pdf/1502.03167.pdf" target="_blank">link to paper</a>).
               </p>
               <img class="image" src="../../assets/blogs/bnbackpass/bn_forward.png" alt=""> 
               <p>
                  During training, the chain rule is shown to backpropagate through the batch normalization transformation (page 4 of the paper). The code block was my implementation.
               </p>
               <img class="image" src="../../assets/blogs/bnbackpass/bn_backward.png" alt="">
               <prism-editor class="codeblock" v-model="this.latex.bnChainCode" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="total_derivative">
               <h2>Total Derivative Representation</h2>
               <vm class="math" :formula='this.latex.dldxFullQuote'></vm>
               <p>
                  Now lets find a better way to pass backwards through batch normalization using the derivative. Above is a "full" representation of the total derivative of <vm :formula='this.latex.dldx'></vm>.
                  I wrote the "full" (as opposed to the truly full) representation first for ease of understanding. The third term in the second summand: 
                  <vm :formula='this.latex.dxhatdmu'></vm>, can be further decomposed because <vm :formula='this.latex.mu'></vm> is an argument of <vm :formula='this.latex.xhat'></vm> and the
                  intermediate variable <vm :formula='this.latex.sigmoid'></vm>.
                  It looks like:
               </p>
               <div class="math-b">
                  <vm class="math" :formula='this.latex.dxhatdmufull'></vm>
               </div>
               <p>
                  The full represetation without quotes:
               </p>
               <vm class="math" :formula='this.latex.dldxFull'></vm>
            </section>

            <section id="summations">
               <h2>Integrate Summations</h2>
               <p>
                  The downstream gradient will always match the dimensionality of whatever you're differentiating with respect to.
                  This means you have to sum over the elements if the upstream is of a higher rank than your downstream. For batch normalization, the metaphorical local jacobian, which you multiply by the upstream,
                  will instead be a conglomeration of intermediary functions. Below I integrate summations into the total derivative to reduce dimensionality as the betas all reference a scalar value for each feature
                  of the entire batch. (aka: Derivative of rank 2 tensor wrt rank 1 tensor goes through summation to produce a rank 1 tensor which matches dimensionality of what we're differentiating wrt to).
               </p>
               <div class="math-b">
                  <vm class="math" :formula='this.latex.dldxSimple1'></vm>
               </div>
               <p>
                  For clarity, you can rewrite redundant partials into a generalized form: <vm :formula='this.latex.redundant'></vm>
               </p>
               <vm class="math" :formula='this.latex.dldxSimple3'></vm>
            </section>

            <section id="partials">
               <h2>Solving the Partials</h2>
               <p>
                  Solve for all of the partials shown above. This is the easiest part. The upstream gradient defined immediately below is automatically provided to the function when backpropagating.
                  Special consideration to <vm :formula='this.latex.dsigdmu'></vm> and <vm :formula='this.latex.dsigdx'></vm> as there are summations in
                  their functions. The sigma notation in <vm :formula='this.latex.dsigdx'></vm> does not carry over because we are differentiating wrt a vector.
               </p>
               <vm class="math" :formula='this.latex.dldy'></vm>
               <br>
               <vm class="math" :formula='this.latex.dydxhatSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dldxSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dxhatdxSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dxhatdmuSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dxhatdsigSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dsigdmuSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dmudxSolve'></vm>
               <br>
               <vm class="math" :formula='this.latex.dsigdxSolve'></vm>
            </section>

            <section id="substitute">
               <h2>Substitute in Partials & Simplify</h2>
               <p>
                  Every partial is evaluated. <b>Substitute in everything except dout</b> to the template from step 1. Leaving it's partial provides headspace for knowing what some of the summations will be operating on.
                  Note that I've changed the nested summations index to <i>k</i>. It will initially look more confusing, but simplifies well :). <i>(be careful to consider equations overflowing to the next line)</i>
               </p>
               <h3>1</h3>
               <vm class="math" :formula='this.latex.dldxSub1'></vm>
               <p>
                  I'm going to work on the middle summand first. Rewrite <vm :formula='this.latex.rootTrick'></vm> as <vm :formula='this.latex.rootTrick2'></vm>. I will also slowly
                  be removing the dot notation where multiplication is obvious.
               </p>
               <h3>2</h3>
               <vm class="math" :formula='this.latex.dldxSub2'></vm>
               <p>
                  Further simplify the nested summation <vm :formula='this.latex.secondSumSimplify'></vm> by distributing the sigma to it's terms.
               </p>
               <h3>3</h3>
               <vm class="math" :formula='this.latex.dldxSub3'></vm>
               <br>
               <h3>4</h3>
               <vm class="math" :formula='this.latex.dldxSub4'></vm>
               <br>
               <h3>5</h3>
               <vm class="math" :formula='this.latex.dldxSub5'></vm>
               <br>
               <h3>6</h3>
               <vm class="math" :formula='this.latex.dldxSub6'></vm>
               <p>
                  On equation 4 after distributing the sums, the values both simplify to the expectation over the batch <vm :formula='this.latex.mu'></vm>. I do not break down 
                  <vm :formula='this.latex.trickyPart1'></vm> immediately as I did for <vm :formula='this.latex.expectation'></vm> for understanding; <vm :formula='this.latex.mu'></vm>
                  is being summed up <i>m</i> times then divided by <i>m</i>. The difference in the parenthesis evaluates to 0 and then the labor of <i>"10 steps backwards 11 steps forward"</i> is shown.
                  Equation 6 drops everything multiplied by zero and cleans up some of the left hand side of the equation.
                  <br>
                  <br>
                  Now we begin simplifying right-most summand. Before we factor out constants, we combine a couple of the terms (money step). For ease of understanding, I've also put it in equation 6, but I change
                  the index of the right-most product from <i>i</i> to <i>k</i>. This is because it has to be treated as a constant to the summation.
               </p>
               <h3>7</h3>
               <vm class="math" :formula='this.latex.dldxSub7'></vm>  
               <p>
                  Factor out constants
               </p>         
               <h3>8</h3>
               <vm class="math" :formula='this.latex.dldxSub8'></vm>
               <p>
                  The reason I mentioned combining terms in equation 7 was the money step is because the term <vm :formula='this.latex.xhatformula'></vm> is equal to the normalization step 
                  <vm :formula='this.latex.xhat'></vm> in the backward pass of batch normalization. I substitute in <vm :formula='this.latex.xhat'></vm>, which will be a parameter passed to
                  our backward pass function from the forward pass stored in the cache (shown later), I change the square root representation to make factoring later more amenable, and I clean up stray terms.
               </p>
               <h3>9</h3>
               <vm class="math" :formula='this.latex.dldxSub9'></vm>
               <p>
                  Some final cleaning by factoring our similarities from the 3 terms. 
               </p>     
               <h3>10</h3>
               <vm class="math" :formula='this.latex.dldxSub10'></vm>
               <p>
                  Below is a codeblock implemented with equation 10. With a 276 character difference, the shortcut performs a backwards pass much faster than the original implementation.
               </p>
               <prism-editor class="codeblock" v-model="this.latex.finalAnswerCode" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="thoughts">
               <h2>Thoughts</h2>
               <p>
                  I made a joke to it earlier by stating <i>"10 steps backwards 11 steps forward"</i>, but this exercise really embodied that expression.
                  Originally I had trouble with understanding where summations belonged so there were a handful of errors by the time I got to step 3 causing me to scrap a chunk of the work.
                  I found out that defining them rigidly in my current step 1 helped tremendously to save brain space. I also realized that you can "interweave" total derivatives
                  with partials (prior to step 1) - doubt I'll be doing that again. If you're looking for a more readable interpretation of this exercise, check out
                  <a href="https://kevinzakka.github.io/2016/09/14/batch_normalization/" target="_blank">this</a> blog post. The author substitutes in the partials as needed as opposed to doing it all at once as I did.
                  The reason why I did it all at once was a combination of solidifying understanding, <b>making explanations unambiguous</b>, and having fun. Some of the simplifications in equations 1-10 are
                  inefficient for the same reasons. If anybody struggles with concepts
                  affiliated to total/partial derivatives wrt vectors this is a good exercise to do. Feel free to ping me if you see any errors or have any suggestions/considerations :).
               </p>
               <p>
                  Ryan Lin
               </p>
            </section>
         </div>
      </div>
   </div>
</template>

<style scoped>
   @import url(./util/blogStyles.css);
   
   .math {
      width: 100%;
   }
</style>