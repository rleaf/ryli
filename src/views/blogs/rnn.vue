<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import latex from './util/latex/rnn'

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
      this.blog = blogs.find(el => el.route === 'rnn')
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
                  <li><a href="#sequenceprocessing">Sequence Processing</a></li>
                  <li><a href="#forward">Forward Pass Transformations</a></li>
                  <ul>
                     <li><a href="#forwardhidden">Between hidden steps</a></li>
                     <li><a href="#forwardpred">Between hidden steps & prediction</a></li>
                  </ul>
                  <li><a href="#onestepback">One Step Backwards</a></li>
                  <li><a href="#fullback">All the way Back</a></li>
                  <li><a href="#rnn_thoughts">Thoughts</a></li>
               </ul>
            </nav>
         </div>
         <div class="blog-body">

            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Just as how a CNN's specialty is processing grid-like data such as images, a RNN specializes in procesing <i>sequential data</i> - data that is discretized. A very common example of a sequence
                  could be a sentence. Each word in a sentence stands wholly on its own but when strung together constitute something new. Depending on the design and intended use of the RNN, we can parse a sequence in a
                  handful of different ways. This "parsing" is specifically <a href="#sequenceprocessing">sequence processing</a>, which I briefly talk
                  about soon. I want to mention this now however since there is a lot of nuance in the math between different types of sequence processing. Because of this, the sections
                  <a href="#forward">Forward Pass Transformations</a> and beyond presume the type of sequence shown immediately below called a <i>many to many</i>.
               </p>
               <img class="image" src="../../assets/blogs/rnn/rnn4.png" alt="">
               <p class="caption">
                  <vm :formula='`$x_t$`'></vm> represents the input sequence, <vm :formula='`$h_t$`'></vm> the hidden states,
                  <vm :formula='`$y_t$`'></vm> the prediction, and <vm :formula='`$L_t$`'></vm>, the individual loss.
               </p>
               <p>
                  A couple of "top level" things to look at. I discuss some of these points further below, but they're nice to acknowledge in the beginning - confusion is okay. <u>One:</u> every timestep function
                  <vm :formula='`$f_h$`'></vm> requires, as arguments, it's corresponding input <vm :formula='`$x_t$`'></vm> and prior hidden state
                  <vm :formula='`$h_{t - 1}$`'></vm> to produce the next hidden state <vm :formula='`$h_t$`'></vm>. <u>Two:</u> The gradients in backpropagation will be summed at each
                  step as RNNs use shared weights at every timestep. <u>Three:</u> both the input and output sequence, shown as red and
                  yellow respectively, are arbitrarily partitioned <i>t</i> times.
                  This is one of a <i>"handful of different ways"</i> to represent the input and output for an RNN. <u>Four:</u> a inital hidden state, <vm :formula='`$h_0$`'></vm>, must be provided for the forward pass
                  of an RNN. The initial hidden state is either learnt (the output of  network <i>x</i> can be used to to populate <vm :formula='`$h_0$`'></vm> in RNN <i>y</i> ) or set to 0.
                  <u>Five:</u> the total loss is a sum over every individual loss.
               </p>
            </section>
            
            <section id="sequenceprocessing">
               <h2>Sequence Processing</h2>
               <p>
                  The picture above is referred to as a <i>"many to many"</i> RNN. Depending on the task of the network,
                  there are different ways of processing the data. For the many to many shown above, consider a video as input where the frames of the video compose the sequence. <vm :formula='`$x_1$`'></vm> would be the first frame,
                  <vm :formula='`$x_2$`'></vm> would be the second... and so on. For this type of many-to-many, our output at each timestep could then be some decision/classification
                  based off the input at that same timestep. So our RNN would be producing some output for every frame of video. Below are different types of models for processing different sequences.
                  Note that although labeling and some intricacies are omitted, the many to many show below is not the same as the one shown above.  
               </p>
               <img class="image" src="../../assets/blogs/rnn/types.png" alt="">
               <p class="caption">
                  <b>Examples:</b> <i>one to one</i>: Image classification, <i>one to many</i>: Image captioning, <i>many to one</i>: Video classification, <i>many to many</i>:
                  Machine translation <br> Captioning refers to a sequence of symbols. For image captioning our output would be a sequence of, ideally coherent, words describing what's happening in the image.
                  Another example of a caption could be a sequence of letters, which at the end, would produce a word.
               </p>
            </section>

            <section id="forward">
               <h2>Forward Pass Transformations</h2>
               <p>
                  As mentioned above, a characteristic to RNNs is that weights are shared temporally, between all time steps. A simple Vanilla RNN can have three weight tensors: <vm :formula='`$W_{hh}$`'></vm>, <vm :formula='`$W_{xh}$`'></vm>,
                  <vm :formula='`$W_{hy}$`'></vm> and only a couple of bias parameters <vm :formula='`$b_h$`'></vm> and <vm :formula='`$b_y$`'></vm>. Each of these parameters
                  are recycled at each hidden step to compute either a local prediction or the next hidden step.
                  It helps me to think of the index of tensors as <vm :formula='`$W_{(from)\\;(to)}$`'></vm>
                  to visualize where that particular tensor belongs. Excluding the loss function, the two transformations shown below are fundamental to a Vanilla RNN. 
               </p>

               <section id="forwardhidden">
                  <h3>Between hidden steps</h3>
                  <p>
                     Transformation between hidden steps <vm :formula='`$h_{t-1} \\rightarrow h_t$`'></vm>: 
                     <vm class="math" :formula='this.latex.rnnStep'></vm>
                  </p>
                  <img class="image" src="../../assets/blogs/rnn/graph.png" alt="">
                  <prism-editor class="codeblock" v-model="this.latex.toad" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

               <section id="forwardpred">
                  <h3>Between hidden steps & prediction</h3>
                  <p>
                     Transformation between hidden steps & prediction <vm :formula='`$h_{t} \\rightarrow \\hat{y}$`'></vm>:
                     <vm class="math" :formula='this.latex.yhatTransform'></vm>
                  </p>
                  <img class="image" src="../../assets/blogs/rnn/graph2.png" alt="">
                  <prism-editor class="codeblock" v-model="this.latex.toad2" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
            </section>

            <section id="onestepback">
               <h2>One Step Backwards</h2>
               <img class="image" src="../../assets/blogs/rnn/combinedgraphs.png" alt="">
               <p class="caption">
                  Combined picture of both computational graphs.
               </p>
               <p>
                  Time to go backwards. Before talking about anything, there are a handful of idiosyncrasies between the different sequence styles of RNNs. <b>Everything below assumes a many to many sequence</b>, very similar
                  to the first picture at the top of this page. This is important because the process of computing some gradients is different between sequence styles.
               </p>
               <p>
                  I first show the process of <u>only going back only a single hidden step</u>. Afterwards I discuss fully propagating backwards <i>t</i> times to the first values.
               </p>
               <p>
                  Here are the partials we're looking for: <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{W_{hy}}},
                                    \\frac{\\partial{L}}{\\partial{b_y}},
                                    \\frac{\\partial{L}}{\\partial{h_{t}}},
                                    \\frac{\\partial{L}}{\\partial{W_{hh}}},
                                    \\frac{\\partial{L}}{\\partial{h_{t-1}}},
                                    \\frac{\\partial{L}}{\\partial{b_h}},
                                    \\frac{\\partial{L}}{\\partial{W_{xh}}}$$`'></vm>
               </p>
               <p>
                  Here are the transformations again:
                  <vm class="math" :formula='this.latex.rnnStep'></vm>
                  <vm class="math" :formula='this.latex.yhatTransform'></vm>
               </p>
               <p>
                  Above are the local gradients. The upstream gradient will be the derivative of the loss wrt to the prediction
                  of the model at the subsequent timestep and will be represented as <i>output_grad</i>. We can now begin finding the desired gradients. Note that when differentiating wrt to a bias parameter, I sum along the Nth
                  dimension to match the shape of said bias parameter.
               </p>
               <div class="math-b">
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{W_{hy}}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{W_{hy}}}=output\\_grad\\;\\cdot h_t^\\top$$`'></vm>
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{b_y}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{b_y}}=\\sum^N{output\\_grad}$$`'></vm>
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{h_t}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{h_t}}=output\\_grad\\;\\cdot W_{hy}^\\top$$`'></vm>
               </div>
               <p>
                  Everything beyond <vm :formula='`$h_t$`'></vm> runs through the element-wise <i>tanh</i> non-linearity so I create an intermediary variable which I will call <vm :formula='`$dtanh$`'></vm> that uses a hyperbolic identity:
                  <vm :formula='`$\\frac{\\mathrm{d}tanh(x)}{\\mathrm{d}} = sech^2(x) = 1-tanh^2(x)$`'></vm> to simplify finding the derivative since <vm :formula='`$tanh(x)$`'></vm> is already provided to us in from the forward pass.
                  For clarification, the <i>x</i> argument inside the <i>tanh</i> function is the argument in the forward pass at the current timestep.
               </p>
               <div class="math-b">
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{W_{hh}}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{h_t}}\\cdot\\frac{\\partial{h_t}}{\\partial{W_{hh}}}=dtanh\\;\\cdot h_{t-1}^\\top$$`'></vm>
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{h_{t-1}}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{h_t}}\\cdot\\frac{\\partial{h_t}}{\\partial{h_{t-1}}}=dtanh\\;\\cdot W_{hh}^\\top$$`'></vm>
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{b_h}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{h_t}}\\cdot\\frac{\\partial{h_t}}{\\partial{h_{t-1}}}=\\sum^N{dtanh}$$`'></vm>
                  <br>
                  <vm class="math" :formula='`$$\\frac{\\partial{L}}{\\partial{W_{xh}}} = \\frac{\\partial{L}}{\\partial{\\hat{y_t}}}\\cdot\\frac{\\partial{\\hat{y_t}}}{\\partial{h_t}}\\cdot\\frac{\\partial{h_t}}{\\partial{W_{xh}}}=dtanh\\;\\cdot x_t^\\top$$`'></vm>
               </div>
               <prism-editor class="codeblock" v-model="this.latex.toad3" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="fullback">
               <h2>Full Backpropagation</h2>
               <p>
                  We can now implement backpropagation by repeating this process to reach the initial nodes. (Remember above where I talked about the idiosyncrasies in computing gradients between sequence styles? 
                  This second concern is an example of one).
                  A couple of important concerns:
               </p>
               <p>
                  First: Because we're using the same weights throughout the network, to find 
                  the loss with respect to every parameter at each hidden state, we sum the weights at every timestep as we backpropagate. This is because for something like a many to many RNN, a weight tensor at an
                  arbitrary timestep affects the individual output of every future timestep. Summing the gradients at each timestep as we backpropagate calculates the total impact the weight tensor had on those future outputs.
               </p>
               <p>
                  Second: As we proceed to the next hidden state during backpropagation, there can be a "redundancy" of computed gradients. To be more concrete, lets say we've computed the gradients at time step <vm :formula='`$h_3$`'></vm>
                  of a many to many styled RNN.
                  As we proceed to find the gradients at time step <vm :formula='`$h_2$`'></vm>, the gradient <vm :formula='`$\\frac{\\partial{L}}{\\partial{h_{t-1}}}$`'></vm> from time step <vm :formula='`$h_3$`'></vm>
                  overlaps with <vm :formula='`$\\frac{\\partial{L}}{\\partial{h_{t}}}$`'></vm> at time step <vm :formula='`$h_2$`'></vm>. This isn't a problem, just food for thought. Similar to the resolution in the first
                  concern, we simply sum the redundant gradients.
               </p>
               <p>
                  Although both concerns are resolved in the same manner, the philosophy behind <i>why</i> is a little different. The first is a summation of a parameter's gradient at each time step - simple enough.
                  The second is a series of summing two overlapping, but different, gradients. Even though <vm :formula='`$\\frac{\\partial{L}}{\\partial{h_{t-1}}}$`'></vm> and <vm :formula='`$\\frac{\\partial{L}}{\\partial{h_{t}}}$`'></vm>
                  calculate the gradient wrt to the same variable between two backward steps, <vm :formula='`$\\frac{\\partial{L}}{\\partial{h_{t-1}}}$`'></vm> computes it's value from all upstream gradients
                  through <vm :formula='`$f_h$`'></vm> while <vm :formula='`$\\frac{\\partial{L}}{\\partial{h_{t}}}$`'></vm> computes it's value from the local loss through 
                  <vm :formula='`$f_y$`'></vm>.
               </p>
               <prism-editor class="codeblock" v-model="this.latex.toad4" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="thoughts">
               <h2>Thoughts</h2>
                 <p>
                  I originally wrote this wanting to talk about LSTM... I'll still probably make one about LSTM, now I just have an excuse to not make it as detailed. Something about RNNs though is that a lot of sources
                  seem to have different information on them. Some people use a linear transformation between <vm :formula='`$h_t$`'></vm> and <vm :formula='`$\\hat{y}_t$`'></vm> as I did, 
                  while others use non-linear transformations (tanh, relu, sigmoid, etc...). Some explanations on RNNs don't even use a transformation - which makes sense pedagogically, but could be a detriment as well. Understanding
                  backpropagation tripped me up for a couple of hours, but it helps to think about things <i>very</i> slowly. The summing for the parameters wasn't difficult to grasp, but the section where I talked about summing
                  two unique gradients because of a redundancy was a little annoying. Felt nice figuring it out though. Feel free to reach out. I'm going to bed :).
               </p>
               <p>
                  Ryan
               </p>
            </section>
         </div>
      </div>
   </div>
</template>

<style scoped>
   @import url(./util/blogStyles.css);

</style>