<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import latex from './util/latex/cnn'

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
   data() {
      return {
         latex: latex

      }
   },

   created() {
      this.blog = blogs.find(el => el.route === 'cnn')
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
                  <li><a href="#convolution">Convolutional Layer</a></li>
                  <ul>
                     <li><a href="#convForward">Forward</a></li>
                     <li><a href="#convBack">Backward</a></li>
                  </ul>
                  <li><a href="#activation">Activation (ReLU)</a></li>
                  <ul>
                     <li><a href="#activationForward">Forward</a></li>
                     <li><a href="#activationBack">Backward</a></li>
                  </ul>
                  <li><a href="#pooling">Pooling (Max Pooling)</a></li>
                  <ul>
                     <li><a href="#poolingForward">Forward</a></li>
                     <li><a href="#poolingBack">Backward</a></li>
                  </ul>
                  <li><a href="#thoughts">Thoughts</a></li>
               </ul>
            </nav>
         </div>
         <div class="blog-body">

            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Convolutional neural networks are an architecture of neural nets designed to process grid-like data such as images. They're a nice architecture to move onto
                  in the journey of learning neural nets because they help show the innate generalizing capabilites of networks, but not, in my opinion, too much such that it easily
                  confuses. Here, I focus on discussing the <i>forward</i> and <i>backward</i> transformations between layers in a CNN.
                  I may add transformations in the future, so everything will be listed in the table of contents provided above.
               </p>
               <p>
                  When understanding CNNs, colored RGB images are a solid example to think of as input because they are able to easily <i>and intuitively</i>
                  be represented as 3d tensors. Whenever I talk about inputs for a CNN here, I will be thinking of colored images.
               </p>
               <img class="image" style="box-shadow: none;" src="../../assets/blogs/cnn/cnnImage.png" alt="">
               <p class="caption">On the left shows the image isolated to the 3 color channels. When layered and blended properly, shown on the right, we get a properly colored image.</p>
            </section>

            <section id="convolution">
               <h2>Convolutional Layer</h2>
               <section id="convForward">
                  <h3>Forward</h3>
                  <p>
                     CNNs, similar to MLPs operate under the same archetype of <vm :formula='`$w^\\top x+b$`' />, except are designed to <i>preserve spatial
                     structure</i>. Because there is no dimension reduction, to deal with these high dimensional inputs, the weight matrix <i>w</i>, also frequently referred to as a <i>kernel</i>
                     or <i>filter</i> operates on a portion of the input by taking the dot product
                     then convolves/slides/translates to the next portion. The kernel usually extends to the full depth of the input; there are times
                     when this is not true. The output of the series of dot products composes the <i>activation map</i>. As the input traverses through a CNN, it is typically expected for
                     it to get progressively "<a href="https://i.imgur.com/H1pU0yu.png" target="_blank">stumpier</a>",
                     where what it loses in width & height grows in depth. The linked image shows 4 activation maps, producing a 4x4x4 output, from the original 3x5x5 input.   
                  </p>
                  <video class="image" autoplay loop muted src="../../assets/blogs/cnn/cnn_anim.webm" />
                  <p class="caption">
                     Simple animation showing a 3x2x2 kernel interacting with a 3x5x5 input. Stride is 1 and there is no padding. <br>
                     Right click on animation to toggle controls or open in a new tab to enlarge.
                  </p>
                  <p>
                     Code breakdown for a forward pass in a convolutional layer. PyTorch does have a <a href="https://pytorch.org/docs/1.9.1/generated/torch.nn.Conv2d.html" target="_blank">class</a> that does
                     this must faster, but for understanding - I am a fan of what's below. The actual operations occur within the nested for loops.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.cnnForward" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

               <section id="convBack">
                  <h3>Backward</h3>
                  <p>
                     Consider again thinking about the equation <vm :formula='`$f(x) = w^\\top x+b$`' />. Looking at the equation, it is very easy to find the desired local gradients
                     and then simply multiply them by the upstream:
                  </p>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{x}} = \\frac{\\partial{f}}{\\partial{x}} \\cdot upstream= w \\cdot dout$$`' />
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{w}} = \\frac{\\partial{f}}{\\partial{w}} \\cdot upstream= x \\cdot dout$$`' />
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{b}} = \\frac{\\partial{f}}{\\partial{b}} \\cdot upstream= dout$$`' />
                  <p>
                     The tricky part is thinking about the interaction between the tensor shapes. <i>"Okay...so we're indexing along dimension x and this 4x2x5x5 tensor multiples elementwise with this 2x3x3x3..."</i>
                     For more elaborate discussion, my post on
                     <router-link :to="{ name: 'bnbackpass'}">differentiating batch normalization</router-link> and 
                     <router-link :to="{ name: 'rnn' }">recurrent neural networks</router-link> may be helpful.
                     Keeping it simple however, here are some "rules" which work well for me:
                     <ul>
                        <li>Gradients, ie: <vm :formula='`$\\frac{\\partial{f}}{\\partial{x}}$`' />, match dimensionality of what is being differentiated wrt to.</li>
                        <li>Calculating the entire gradient is a running sum (note the <code class="code">+=</code> on lines 39, 46, and 47 where the gradient formulas are shown).</li>
                        <li>Make sure to properly "locate" where a gradient belongs. Consider what needs to be indexed in order to compute a gradient. For instance,
                        <code class="code">db</code> on line 39 <i>can</i> be next to <code class="code">dw</code> and <code>dx</code>,
                        but unlike <code class="code">dw</code> and <code class="code">dx</code>, it doesn't <i>need</i> to be since we're only indexing along f.</li>
                     </ul>
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.cnnBackward" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
            </section>

            <section id="activation">
               <h2>Activation</h2>
               <section id="activationForward">
                  <h3>Forward</h3>
                  <p>
                     The forward pass through activation layers operate element-wise. ReLU is shown below and iterates through each neuron to check if it is greater than 0. I discuss the forward pass for other
                     activations, such as tanh, in my post on RNNs linked above. PyTorch has a bunch of well documented
                     <a href="https://pytorch.org/docs/stable/nn.html#non-linear-activations-weighted-sum-nonlinearity" target="_blank">activation classes</a>.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.reluForward" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
   
               <section id="activationBack">
                  <h3>Backward</h3>
                  <p>
                     Backprop through this layer funtions similarly. A convenience of ReLU is that all the local gradients will equal to 1, so this transformation behaves like a mask that only allows the
                     corresponding index between the activated neurons and <code class="code">dout</code> to progress backwards unchanged.
                     <a href="https://pytorch.org/docs/stable/generated/torch.gt.html" target="_blank">Link</a> to <code class="code">torch.gt()</code>.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.reluBackward" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
                  <p>
                     An example below. Backpropagation through a single transformation can be broken down to two steps:
                     <br><br>
                     1) There is the local computation. For the convolutional backpass, this was
                     computing the local jacobian for <vm :formula='`$f(x) = w^\\top x+b$`' />. For ReLU, this means doing the same to the piecewise function which will provide 1's and 0's:
                     <vm :formula='`$$f(x) = \\begin{cases} 
                                          x & \\text{if $x \\gt 0$} \\\\  
                                          0 & \\text{otherwise} \\\\  
                                          \\end{cases} $$`' />
                     2) Multiply that local computation by the upstream. I use <code class="code">dout</code> to refer to the upstream.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.reluBackwardsExample" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
            </section>

            <section id="pooling">
               <h2>Pooling Layer</h2>
               <section id="poolingForward">
                  <h3>Forward</h3>
                  <p>
                     The pooling transformation is similar to the convolutional layer. A kernel that extends the full depth slides across the face of the input to "pool" together the sectioned values.
                     I show max pooling, but there are <a href="https://pytorch.org/docs/stable/nn.html#pooling-layers" target="_blank">other forms of pooling</a>. Even though the pooling kernel operates
                     on the full depth of the input, the pooling operation operates uniquely on each slice of the depth. So an arbitrary tensor, lets say [6x20x20], going through a pooling layer with
                     kernel of size 2 and stride 2 would output to [6x10x10].
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.poolForward" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
   
               <section id="poolingBack">
                  <h3>Backward</h3>
                  <p>
                     Backpass through a pooling transformation routes <code class="code">dout</code> values to the index of the largest value of the corresponding 
                     partition. Because pooling is a form of spatial <i>reduction</i>, on the backpass we have to upscale to produce a valid output tensor shape. Down below, I immediately produce the desired
                     shape for dx and populate it with zeros (line 24), then mutate the values of the desired index (line 26-40). 
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.poolBackward" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
                  <p>
                     An example below. With pooling kernel size of 2 and stride 2, look how the values (<code class="code">dout</code>) that get through the backwards pass
                     are indexed to the maximum value of every 2x2 square with stride 2.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.poolBackwardsExample" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
            </section>

            <section id="thoughts">
               <h2>Thoughts</h2>
               <p>
                  I've been wanting to do a little post on CNNs for a roughly a year now. They've been relatively low priority compared to some of the other topics I discuss, but I think (and I state this
                  at the top of the page) CNNs are a <i>great</i> architecture to focus on when learning about machine learning - so the more I thought about them, the more I wanted to write about them.
                  The goal was to concretely breakdown the processes going on during the forward and backward pass of a CNN and how the tensor values change. There are a lot of bells and whistles to a
                  CNN and neural networks in general I did not talk about here, but that's now another topic added to the list of things I want to write about.
               </p>
               <p>
                  Ryan
               </p>
            </section>

         </div>
      </div>
   </div>
</template>

<style scoped>@import url(./util/blogStyles.css);</style>