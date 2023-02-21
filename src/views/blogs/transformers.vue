<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import latex from './util/latex/transformer'

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
            content: `A thorough breakdown on the operations and overall construction of a Transformer neural network. I show code for each module of the Transformer while also explaining the purpose of each one.`,
         },
         {
            name: 'keywords',
            content: 'transformer, neural network, machine learning, attention, self attention, scaled dot product'
         },
         {
            property: 'og:description',
            content: `A thorough breakdown on the operations and overall construction of a Transformer neural network. I show code for each module of the Transformer while also explaining the purpose of each one.`,
         }
      ]
   },

   data() {
      return {
         latex: latex
      }
   },

   created() {
      this.blog = blogs.find(el => el.route === 'transformer')
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
                  <li><a href="#preparation">Preparation</a></li>
                  <ul>
                     <li><a href="#positionalencoding">Positional Encoding</a></li>
                  </ul>
                  <li><a href="#sdpa">Scaled Dot Product Attention</a></li>
                  <li><a href="#attention">Attention Implementation</a></li>
                  <ul>
                     <li><a href="#selfattention">Self Attention</a></li>
                     <li><a href="#multiheadedattention">Multi Headed Attention</a></li>
                     <li><a href="#maskedattention">Masked Multi Headed Attention</a></li>
                     <li><a href="#crossattention">Cross Attention</a></li>
                  </ul>
                  <li><a href="#ffn">Feed Forward Network</a></li>
                  <li><a href="#blocks">Blocks</a></li>
                  <ul>
                     <li><a href="#encoderblock">Encoder Block</a></li>
                     <li><a href="#decoderblock">Decoder Block</a></li>
                  </ul>
                  <li><a href="#encdec">Encoder & Decoder Layers</a></li>
                  <li><a href="#transformer">Transformer</a></li>
                  <li><a href="#thoughts">Thoughts</a></li>
               </ul>
            </nav>
         </div>
         <div class="blog-body">

            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  I'm going to explain, hopefully thoroughly enough, the mechanisms present in Transformers. I reference the accompanied paper to the network
                  <a href="https://arxiv.org/pdf/1706.03762.pdf" target="_blank"><i>Attention Is All You Need</i></a>
                  a couple times throughout this read. Feel free to click around through the
                  contents displayed above to read more about a particular section and the affiliated code. Similarly to other articles I've written, all code uses the PyTorch framework.
               </p>
               <p>
                  It is mentioned in the opening of the <i>Attention is All You Need</i> that the Transformer model was introduced to ameliorate and <i>"push the boundaries of recurrent language
                  models and encoder-decoder architectures"</i>. While this was certainly true back when Transformers were new, it is worth mentioning that the impact of Transformers has broached
                  well into other domains of machine learning. <a href="https://arxiv.org/pdf/2010.11929.pdf" target="_blank">Visual Transformers</a> and <a href="https://arxiv.org/pdf/2103.14030.pdf" target="_blank">Swin Transformers</a>
                  are good examples. Although Computer Vision already has sequential tasks such as image captioning, those linked papers use the attention mechanism to process the image data itself, which is not inherently
                  sequential.
               </p>
               <p>
                  Transformers can be laid out in the following:
               </p>
               <prism-editor class="codeblock" v-model="this.latex.transformerArch" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               <p>
                  By decomposing Transformers as such, it becomes easier to see the constituent parts. For example, you can see there's a lot of importance on <i>Scaled dot product attention</i> because it is
                  used heavily throughout the entire model. Every attention mechanism, whether it be masked, multiheaded, or cross employs <i>SDP attention</i>.
                  Below is the visualization of a Transformer from the orginitating paper (linked above). It is easy to see features such as the information flow throughout the network and finer detail such as how
                  each attention block takes in three arguments (queries, keys, values) and skip connections to aid gradient flow.
               </p>
               <img class="image no-invert" src="../../assets/blogs/transformer/transformer.png" alt="">
               <p class="caption">
                  Transformer layout from "Attention is All You Need"
               </p>
            </section>

            <section id="preparation">
               <h2>Preparation</h2>
               <p>
                  Before the sequence inputs can be fed into the encoder and decoder, they must be tokenized, pass go through an embedding layer, and then have positional encoding added to them.
                  Tokenization is the process of converting a sequence,
                  for example something that can be human interpretable, into a sequence of tokens represented as integers. For the embedding layer, I am going to be using 
                  <code class="code">nn.Embedding</code> available through <a href="https://pytorch.org/docs/stable/generated/torch.nn.Embedding.html" target="_blank">PyTorch</a>.
                  Positional encoding is defined below.
               </p>
               <section id="positionalencoding">
                  <h3>Positional Encoding</h3>
                  <p>
                     We positionally encode our sequences to fortify structure because there is no inherint order during operation due to the parallelization of Transformers. Displayed here is sinusoidal positional
                     encoding discussed in the original <i>Attention Is All You Need</i> paper, however there are many different ways to positionally encode a sequence such as
                     <a href="https://arxiv.org/pdf/1803.02155.pdf" target="_blank">Relative Positinal Encoding</a>. Sinusoidal encoding works by oscillating between two different functions based of the 
                     sequence index. If we have a sequence tensor of shape <code class="code">(K, E)</code> where <i>p</i> traverses the <i>Kth</i> dimension and <i>i</i> the <i>Eth</i>,
                     then:
                  </p>
                  <div class="math-bt">
                     <vm class="math-inline" :formula='this.latex.PEsin' />
                     <vm class="math-inline" :formula='this.latex.PEcos' />
                     <vm class="math-inline" :formula='`$a = \\biggr\\lfloor{\\frac{2i}{E}}\\biggl\\rfloor$`' />
                  </div>
                  <prism-editor class="codeblock" v-model="this.latex.positionalencoding" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

            </section>

            <section id="sdpa">
               <h2>Scaled Dot Product Attention</h2>
               <p>
                  Scaled dot product attention takes three arguments as input: <i>queries</i>, <i>keys</i>, and <i>values</i>. These inputs originate from the same tensor and each go through the same shape
                  transformation except with unique weights. More is discussed specifically about this in the <a href="#selfattention">Self Attention</a> class section. 
               </p>
               <p>
                  Supplied with our Q, K, and V (queries/keys/values respectively), scaled dot product attention on a <u>single element from the batch</u> will look like:
               </p>
               <vm class="math" :formula='this.latex.sdp' />
               <p>
                   where
                  <vm :formula='`$K \\in \\mathbb{R}^{k \\times e}, Q \\in \\mathbb{R}^{k \\times e}, V \\in \\mathbb{R}^{k \\times e}$`' />.
               </p>
               <p>
                  Fortunately in code, we can perform batch operations to calculate the attention values all at once. I encourage looking at the PyTorch SDP Attention implementation found <a href="https://github.com/pytorch/pytorch/blob/master/torch/nn/functional.py#L4765" target="_blank">here</a>
                  (You may need to ctrl+f "scaled_dot_product_attention"). I will sprinkle in the corresponding PyTorch code at every now and then.
               </p>
               <prism-editor class="codeblock" v-model="this.latex.scaleddotproduct" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="attention">
               <h2>Attention Implementation</h2>
               <p>
                  We can now construct the classes that house SDP Attention. It's worth mentioning that there are <a href="https://www.catalyzex.com/paper/arxiv:1706.03762/code" target="_blank">different ways</a> how you can
                  code the model (<a href="https://pytorch.org/docs/stable/_modules/torch/nn/modules/transformer.html#Transformer" target="_blank">Pytorch's Transformer</a>). The way shown here will certainly have its idiosyncrasies,
                  so my goal is to really convey the main mechanisms present in all of these variations. I will occasionally toss in different characteristics of other Transformer models.
               </p>
               <section id="selfattention">
                  <h3>Self Attention</h3>
                  <p>
                     The purpose of the self attention class is to house the weights for transforming the input into the queries, keys, and values matrices. These values are then passed into the
                     <code class="code">scaled_dot_product_attention(q, k, v)</code> as defined above. I've noticed a lot of people usually leave the weights
                     initialized by <code class="code">nn.Linear</code> default, however it is not uncommon to see custom initializations displayed in the comments below.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.self_attn" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

               <section id="multiheadedattention">
                  <h3>Multi Headed Attention</h3>
                  <p>
                     After creating our <code class="code">Self Attention</code> class, we can instantiate it inside a Module List based off the number of heads we have, which will be a hyperparameter. The
                     forward pass of multi headed attention feeds the input through <code class="code">num_heads</code> self attention classes and then concatenates each of the self attention
                     outputs along the trailing dimension. Lastly the concatenated tensor is fed through a linear layer to transform it back to the input shape.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.multi_head_attn" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

               <section id="maskedattention">
                  <h3>Masked Multi Headed Attention</h3>
                  <p>
                     Masking is simply the procedure to inhibit the decoder block from accessing information from future elements in the sequence. Because Transformers operate on sequence elements in parallel, for certain
                     tasks such as translation, we set subsequent values in the <code class="code">softmax_weights</code> matrix to <code class="code">-1e9</code>.
                     With the code displayed above, all we have to is pass a mask into our instantiated <code class="code">MultiHeadAttention</code> class. The mask will be a tensor of
                     boolean values, where <code class="code">true</code> will indicate masking that index in the matrix to <code class="code">-1e9</code>.
                     It is easier to think about the masking operation when looking at the hierarchy: the mask gets passed to the forward pass of <code class="code">MultiHeadAttention</code>, which
                     in turn passes the mask to each <code class="code">SelfAttention</code>, then finally passing the mask to each <code class="code">scaled_dot_product_attention</code>.
                     The function below produces our mask which we will pass as a parameter down to the <code class="code">scaled_dot_product_attention</code>. Below in
                     <code class="code">get_subsequent_mask</code>, I've shown two different ways of producing the mask.
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.getsubmask" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

               <section id="crossattention">
                  <h3>Cross Attention</h3>
                  <p>
                     Cross attention, like masked attention, is another unique mechanism inside a decoder block that enables communication to flow between the encoder and decoder.
                     Cross attention accepts as inputs the queries from the previous output of the decoder sublayer and the keys and values
                     from the output of the encoder. Refer to the <a href="#decoderblock">decoder block</a> and the visual aid on Transformers to see how
                     <code class="code">self.cross_attetion</code> interacts.
                  </p>
               </section>
            </section>

            <section id="ffn">
               <h2>Feed Forward Network</h2>
               <p>
                  A standard feed forward network composed of a linear -> ReLU -> linear tranformation is used at the end of every block. The first linear layer transforms the input into dimension
                  <vm :formula='`$d_{ff}$`' />, which will be a provided hyperparameter - <i>Attention Is All You Need</i> uses 2048. The second linear layer reforms that 
                  <vm :formula='`$d_{ff}$`' /> tensor back to a <vm :formula='`$d_{in}$`' /> dimensional tensor, another provided hyperparameter.
                  Retaining original shape is important as generally the feed forward nets will need to feed into another encoder or decoder block.
               </p>
               <div class="math-bt">
                  <vm class="math" :formula='`$$FFN(x) = max(0,\\;xW_1 + b_1)W_2 + b_2$$`' />
               </div>
               <prism-editor class="codeblock" v-model="this.latex.mlp" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="blocks">
               <h2>Blocks</h2>
               <p>
                  We can now build both the encoder and decoder blocks. All of the constituent pieces to the blocks have been built and we are ready to instantiate everything inside a
                  <code class="code">EncoderBlock</code> class and <code class="code">DecoderBlock</code> class. Once we've finished creating
                  the blocks, we then need to wrap them one more time in an <code class="code">Encoder</code> and <code class="code">Decoder</code>
                  class respectively. This is to modularize them so we can have <i>N</i> layers for our encoder and decoder stack.
                  Following along using the image of the Transformer at the top may help. Normalization, residual, and regularization techniques will also
                  be pointed out in the forward passes of each block here.
               </p>

               <section id="encoderblock">
                  <h3>Encoder Block</h3>
                  <p>
                     Defining the constructor of both the blocks will be simple, we define what we're going to use and distribute the hyperparameters accordingly. It is important
                     to notice that <code class="code">emb_dim // num_heads</code> is used as the parameter for <code class="code">dim_out</code>
                     in the <code class="code">MultiHeadAttention</code> sublayer. Here is <a href="https://github.com/pytorch/pytorch/blob/master/torch/nn/modules/transformer.py#L262" target="_blank">
                     Pytorch's</a> implementation of the encoder block - look at lines 423 & 424 particularly. This is to ensure a smooth transformation between the concatenated tensor and the linear layer. The forward
                     pass is laid out in a manner such that:
                  </p>
                  <div class="math-t">
                     <vm class="math" :formula='`$$sublayer_1(x) = dropout(layernorm(multihead(x, x, x) + residual))$$`' />
                  </div>
                  <div class="math-bt">
                     <vm class="math" :formula='`$$sublayer_2(sublayer_1) = dropout(layernorm(feedforward(sublayer_1) + residual))$$`' />
                  </div>
                  <prism-editor class="codeblock" v-model="this.latex.encoderblock" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>

               <section id="decoderblock">
                  <h3>Decoder Block</h3>
                  <p>
                     The decoder block follows along the same vein as the encoder block. We declare all of the constituent parts we are going to use in the constructor and then implement the forward pass accordingly.
                     Remember that the forward pass for the decoder block accepts two inputs: one from the predicted sequence and another from the output of the encoder block. First we do self attention with
                     <code class="code">dec_inp</code> making sure to also pass the mask, and then we feed that output as queries into the cross attention.
                     <a href="https://github.com/pytorch/pytorch/blob/master/torch/nn/modules/transformer.py#L443" target="_blank">Albeit added complexities</a>, you can see that Pytorch's decoder block follows the same
                     fundamentals (look at the forward method, specifically line 536 - 538).
                  </p>
                  <prism-editor class="codeblock" v-model="this.latex.decoderblock" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               </section>
            </section>

            <section id="encdec">
               <h2>Encoder & Decoder Layers</h2>
               <p>
                  As mentioned in the <a href="#blocks">blocks</a> section, let us now  wrap everything in an <code class="code">Encoder</code> and <code class="code">Decoder</code>
                  class. This is so we can easily define a model with <i>N</i> encoder and decoder layers. The only thing I'd like to point out here is the final linear transformation present in the
                  <code class="code">Decoder</code> class. After all we need to transform the embedding dimension of our tensor from the embedding size back to the size of
                  possible classifications for a sequence element. 
               </p>
               <prism-editor class="codeblock" v-model="this.latex.encoder" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
               <br>
               <prism-editor class="codeblock" v-model="this.latex.decoder" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="transformer">
               <h2>Transformer</h2>
               <p>
                  The Transformer model can finally be put together. Everything up to line 50 should look normal. In the constructor we instantiate the required classes with the according hyperparameters. In the
                  forward pass, we pass both the tokenized <code class="code">enc_seq</code> and <code class="code">trg_seq</code> through
                  <code class="code">nn.Embedding</code> and then add their positional encodings with <code class="code">positionalEncoding</code>.
                  The results <code class="code">src_inp</code> and <code class="code">trg_inp</code> are then fed to the encoder and decoder
                  respectively where the decoder will also take as input the output from the encoder to be used in the <a href="#crossattention">cross attention</a> sublayer and a mask for the 
                  <a href="#maskedattention">masked multi headed attention</a> sublayer.
                  <br><br>
                  The reshaping at the end, on line 51, is such that the loss function takes in an appropiately sized input outputted from the Transformer. I usually use
                  <a href="https://pytorch.org/docs/stable/generated/torch.nn.functional.cross_entropy.html#torch.nn.functional.cross_entropy" target="_blank">cross entropy</a>, in which case the prediction is shape
                  <code class="code">(B * K, class_len)</code> and the ground truth is shape <code class="code">(B * K)</code>. The prediction
                  variable houses the unnormalized scores (hence not softmaxing as shown in the Transformer image) and the ground truth variable houses the corresponding ground truth indices for each element of each
                  sequence of every batch.
   
               </p>
               <prism-editor class="codeblock" v-model="this.latex.transformer" :highlight="highlighter" :line-numbers="true" :readonly="true"></prism-editor>
            </section>

            <section id="thoughts">
               <h2>Thoughts</h2>
               <p>
                  I <i>*think*</i> Transformers are the architecture I've spent the longest time reading about. In mid 2021, I was listening in on a discussion where different people gave their reponse to the question
                  <i>"what big changes do you expect to happen in ML?"</i>. One of the speakers was very confident that Transformers were going to take over industries as the flagship architecture. Not speaking
                  to the creedence of that statement, the only thing I was made curious about were Transformers themselves. At the time, not only was I very unfamiliar with them, but I did not even know about
                  <a href="/rnn">Recurrent Networks</a>. I remember reading about Transformers the following day, specifically the <i>Attention Is All You Need</i> paper, and feeling as if I had skipped a couple steps.
               </p>
               <p>
                  They're a pretty cool architecture though, no? The attention mechanism and all of its variations have introduced, for me at least, very unique ways you can go about manipulating information. And
                  when arranged appropiately to constitute a single Transformer network, the strengths are very evident. The weaknesses are there too, however since one of its biggest is tied to
                  hardware capability, I am a little forgiving.
               </p>
               <p>
                  I wanted to remain impartial to that one person who said Transformers are taking over every industry, but there has been some <a href="https://arxiv.org/pdf/2201.03545.pdf" target="_blank">retaliation</a>
                  in favor  of CNNs.
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