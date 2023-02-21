<script>
import VueMathjax from 'vue-mathjax-next'
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'
import latex from './util/latex/entropy'

export default {
   components: {
      ContentsUtility,
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
            content: `An explanation on entropy from a Machine Learning perspective. I incorporate philosophy drawn from Claude Shannon's "A Mathematical Theory of Communication" and provides examples, while walking through the math, of the different types of entropy.`,
         },
         {
            name: 'keywords',
            content: 'entropy in machine learning, entropy, machine learning, self information, cross entropy, cross entropy loss, joint entropy, conditional entropy, kullback leibler divergence, kl divergence, relative entropy'
         },
         {
            property: 'og:description',
            content: `An explanation on entropy from a Machine Learning perspective. I incorporate philosophy drawn from Claude Shannon's "A Mathematical Theory of Communication" and provides examples, while walking through the math, of the different types of entropy.`,
         }
      ]
   },
   
   data() {
      return {
         latex: latex
      }
   },

   created() {
      this.blog = blogs.find(el => el.route === 'entropy')
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
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#entropy">Entropy</a></li>
                  <ul>
                     <li><a href="#intuition">Intuition & Explanation</a></li>
                     <li><a href="#entropymath">Mathematical Formalism</a></li>
                     <li><a href="#entropyexamples">Examples</a></li>
                  </ul>
                  <li><a href="#selfinformation">Self Information</a></li>
                  <li><a href="#cross">Cross Entropy</a></li>
                  <ul>
                     <li><a href="#crossexample">Example</a></li>
                  </ul>
                  <li><a href="#joint">Joint Entropy</a></li>
                  <ul>
                     <li><a href="#jointexample">Example</a></li>
                  </ul>
                  <li><a href="#conditional">Conditional Entropy</a></li>
                  <ul>
                     <li><a href="#61">Example (6.1)</a></li>
                     <li><a href="#645">Example (6.4) & (6.5)</a></li>
                     <li><a href="#70">Example (7.0)</a></li>
                  </ul>
                  <li><a href="#thoughts">Thoughts</a></li>
               </ul>
            </nav>
         </div>
         <div class="blog-body">

            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Although this read
                  is catered to explaining entropy through a Machine Learning perspective, I encourage reading through some of the originating paper:
                  <a href="https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf" target="_blank">A Mathematical Theory of Communication</a>. All random variables mentioned here, unless
                  specifically mentioned otherwise, are discrete.
               </p>
            </section>

            <section id="entropy">
               <h2>Entropy</h2>

               <section id="intuition">
                  <h3>Intuition & Explanation</h3>
                  <p>
                     Entropy, in <a href="https://en.wikipedia.org/wiki/Information_theory" target="_blank">Information Theory</a>, is the innate uncertainty of a random variable with its associated probability
                     distribution. The word "uncertainty" is synonymous to other interpretations used to define entropy such as "missing information", "surprisal", and "lack of predictability". The higher the entropy, the more
                     uncertainty there is encoded into a random variable. By this logic a uniform distribution encodes the maximum entropy on a discrete random variable as each value is equally probable - there is total
                     uncertainty as to which value will be sampled. 
                  </p>
                  <p>
                     As an example and to briefly
                     generalize outside of Machine Learning, entropy is the measurement of information. <i>"To be sure, this word information in communication theory
                     relates not so much to what you do say, as to what you could say. That is, information is a measure of one's freedom of choice when one selects a message"
                     (<a href="https://pure.mpg.de/rest/items/item_2383164/component/file_2383163/content" target="_blank">Preface of A Mathematical Theory of Communication, p. 9</a></i>). 
                     <!-- <br> -->
                     If I say to you, <i>"The rain in Spain falls mainly on the..."</i>, you might infer the next word in that statement
                     to be <i>"plain"</i>. For context, this is a famous quote from the film <a href="https://en.wikipedia.org/wiki/My_Fair_Lady_(film)" target="_blank">My Fair Lady</a>. In the example the word
                     is the random variable and what is inferred, "plain", is what is sampled from the distribution of possible values.
                     We can say, because of the quote's fame, that there is high certainty of the random variable to be the word "plain" thus yielding low entropy. However, it may
                     be too ambitious to assert that there is <i>no</i> entropy at all, indicating certainty, <vm :formula="`$p(X = \\textit{plain}) = 1$`" />, because maybe I lied about attributing 
                     my partially finished quote to <i>My Fair Lady</i> and instead just wanted to say <i>"The rain in Spain falls mainly on the ground"</i>.
                  </p>
               </section>
   
               <section id="entropymath">
                  <h3>Mathematical Formalism of Entropy</h3>
                  <p>
                     Entropy can be represented with different units depending on the base of the logarithm: nats (<vm :formula="`$\\ln$`" />),
                     bits &  shannons (<vm :formula="`$\\log_2$`" />), or bans (<vm :formula="`$\\log_{10}$`" />); anecdotally, I have never seen entropy defined in bans.
                     Defined as <vm :formula="`$\\mathbb{H}$`" />, the entropy of the random variable <vm :formula="`$X$`" /> with distribution
                     <vm :formula="`$p$`" /> is: 
                  </p>
                  <div class="math-b">
                     <vm class="math" :formula='this.latex.entropy' />
                  </div>
                  <p>
                     As an example we can represent the entropy of random variable <vm :formula="`$X$`" /> with the aforementioned uniform distribution,
                     <vm :formula="`$X\\sim\\mathcal{U}$`" />, as such:
                  </p>
                  <div class="math-b">
                     <vm class="math" :formula='this.latex.uniform' />
                  </div>
               </section>
   
               <section id="entropyexamples">
                  <h3>Examples</h3>
                  <p>
                     Let's pretend we're rolling a fair 4 sided die where each vertex has equal probability of pointing up (you look at the vertices on a 4 sided die, not
                     the face). Taking the uniform distribution where the random variable, the die, has 4 possible outcomes, <vm :formula="`$X=\\{1, 2, 3, 4\\}$`" />, we can calculate the entropy simply with
                     <vm :formula="`$\\log_2{4} = 2\\,\\text{bits}$`" />. With a 6 sided die, this would be <vm :formula="`$\\log_2{6} = 2.58\\dots\\text{bits}$`" />.
                     As mentioned previously about the uniform distribution, these answers not only represent the amount of entropy
                     present in our dice random variables, but are also the upper bound of possible entropy. 
                  </p>
                  <div class="math-t">
                     <vm class="math" :formula="`$$\\mathbb{H}(X),\\; X \\sim \\mathcal{U}(1, 3)$$`" />
                     <br>
                     <vm class="math" :formula='this.latex.uniformThree' />
                  </div>
                  <div class="math-t">
                     <i>A fair Bernoulli distribution</i>
                     <vm class="math" :formula="`$$\\mathbb{H}(X),\\; X \\sim \\mathcal{U}(1, 2)$$`" />
                     <br>
                     <vm class="math" :formula='this.latex.uniformBernoulli' />
                  </div>
                  <div class="math-t">
                     <vm class="math" :formula="`$$\\mathbb{H}(X),\\; X \\sim p\\;\\text{where}$$`" />
                     <br>
                     <vm class="math" :formula='`$$p(x) = \\begin{cases} 
                        0.8 & \\text{if}\\; x = 0 \\\\
                        0.2 & \\text{if}\\; x = 1 \\\\  
                        \\end{cases} $$`' />
                     <br>
                     <vm class="math" :formula='this.latex.unfairBernoulli' />
                  </div>
                  <div class="math-bt">
                     <vm class="math" :formula="`$$\\mathbb{H}(X),\\; X \\sim p\\;\\text{where}$$`" />
                     <br>
                     <vm class="math" :formula='`$$p(x) = \\begin{cases} 
                        0.95 & \\text{if}\\; x = 0 \\\\  
                        0.05 & \\text{if}\\; x = 1 \\\\  
                        \\end{cases} $$`' />
                     <br>
                     <vm class="math" :formula='this.latex.extremeBernoulli' />
                  </div>
                  <p>
                     The amount of entropy is predicated primarily on the distribution a random variable follows. It may seem that the amount of values in a random variable participates to the entropy given the examples:
                     <vm :formula="`$X\\sim\\mathcal{U}(1,4) = 2\\,\\text{bits}$`" /> and <vm :formula="`$X\\sim\\mathcal{U}(1,3) = 1.58\\dots\\text{bits}$`" /> where the only difference
                     is <vm :formula="`$X=\\{1, 2, 3, 4\\}$`" /> versus <vm :formula="`$X=\\{1, 2, 3\\}$`" />, however this is not accurate. We can see this by assigning a categorical
                     distribution to random variable <vm :formula="`$Z=\\{1, 2, 3, 4\\}$`" /> such that <vm :formula="`$p(Z=1)=0$`" /> and
                     <vm :formula="`$ p(Z=2) = p(Z=3) = p(Z=4) = \\frac{1}{3}$`" />. This random variable, <vm :formula="`$Z$`" />, although composed of four values yields the same
                     entropy as <vm :formula="`$X\\sim\\mathcal{U}(1,3)$`" />, composed of three. Of course if we know that there is no impossible value in a random variable,
                     <vm :formula="`$p(X=x)=0$`" />, we can then attribute the amount of values to the entropy.
                  </p>
                  <p>
                     Looking at entropy like this we can decompose the measurement to be a combination of a random variable's probability distribution and i.f.f the random variable has no impossible values, the total amount
                     of values in that random variable.
                  </p>
               </section>

            </section>

            <section id="selfinformation">
               <h2>Self Information</h2>
               <p>
                  If entropy is the measure of the expected uncertainty of a random variable and its associated probability distribution, self information is the measure of uncertainty for a specific value in a random
                  variable and its associated probability distribution. Self information is the basic quantity that tells us how much uncertainty is present in a particular event. 
                  Defined as <vm :formula="`$I$`" /> the self information of random variable <vm :formula="`$X$`" /> with distribution <vm :formula="`$p$`" /> is:
               </p>
               <vm class="math" :formula="`$I(x) \\triangleq -\\log_bp(x)$`" />
               <p>
                  where once again the base <vm :formula="`$b$`" /> in <vm :formula="`$\\log_b$`" /> denotes the unit. Using the most recent example in the <a href="#entropyexamples">entropy</a>
                  section with the Bernoulli distribution where <vm :formula="`$p(X=0) = 0.95$`" />, we can calculate entropy of that event as
                  <vm :formula="`$I(X=0) = -\\log_20.95 = 0.07400\\dots\\text{bits}$`" />. This event encodes approximately 3.8x less information
                  compared to its entropy of
                  <vm :formula="`$0.28639\\dots\\text{bits}$`" />.
               </p>
            </section>

            <section id="cross">
               <h2>Cross Entropy</h2>
               <p>
                  Cross entropy tells us how much more entropy there will be on a random variable with its associated innate distribution if we sample it from a new prescribed distribution.
                  Because two distributions are embedding onto a random variable, cross entropy is a metric that quantifies the difference between those two probability distributions.
                  It tells us how many more expected bits we will need, assuming <vm :formula="`$\\log_2$`" />, if we calculate information that has distribution <vm :formula="`$p(x)$`" />
                  using a new distribution <vm :formula="`$q(x)$`" />.
                  Cross entropy can also be thought of as the average uncertainty of information, generated from <vm :formula="`$p(x)$`" />,
                  of self information for all values in <vm :formula="`$q(x)$`" />.
                  
                  Defined as <vm :formula="`$\\mathbb{H}$`" /> the cross entropy of random variable <vm :formula="`$X$`" /> between distributions
                  <vm :formula="`$p$`" /> and <vm :formula="`$q$`" /> is:
               </p>
               <div class="math-bt">
                  <vm class="math" :formula='this.latex.crossEntropy' />
               </div>
               <p>
                  Cross entropy is inclusively lower bounded by the originating distribution's entropy, <vm :formula="`$\\mathbb{H}(p)$`" />, and has no upper bound. The lower the cross entropy
                  between distributions <vm :formula="`$p(x)$`" /> and <vm :formula="`$q(x)$`" /> the more similar the two distributions are. If
                  <vm :formula="`$\\mathbb{H}(p,q) = \\mathbb{H}(p,p)$`" />, then <vm :formula="`$q(x) = p(x)$`" /> and we are simply calculating the entropy
                  <vm :formula="`$\\mathbb{H}(p)$`" />. Conversely, the higher the cross entropy or the expected bits between two distributions, the more idiosyncratic the two distributions will be
                  from one another.
                  <br><br>
                  Machine learning considers two distributions, <vm :formula="`$p(x)$`" /> and <vm :formula="`$q(x)$`" /> in this case, where one is the ground truth distribution
                  of the dataset we are training a model on (let's make that <vm :formula="`$p(x)$`" />) and the other is predicted distribution (let's make that <vm :formula="`$q(x)$`" />).
                  An implementation of cross entropy called <a href="https://en.wikipedia.org/wiki/Cross_entropy#Cross-entropy_loss_function_and_logistic_regression">cross entropy loss</a> is a popular loss function to find how
                  dissimilar the two distributions <vm :formula="`$p(x)$`" /> and <vm :formula="`$q(x)$`" /> are from each other.
               </p>

               <section id="crossexample">
                  <h3>Example</h3>
                  <p>
                     Let random variable <vm :formula="`$X=\\{1, 2, 3, 4\\}$`" /> and
                  </p>
                  <vm class="math-inline" :formula='`$p(x) = \\begin{cases} 
                  0.15 & \\text{if}\\; x = 1 \\\\  
                  0.30 & \\text{if}\\; x = 2 \\\\  
                  0.20 & \\text{if}\\; x = 3 \\\\  
                  0.35 & \\text{if}\\; x = 4 \\\\  
                  \\end{cases} \\qquad$`' />
                  <vm class="math-inline" :formula='`$q(x) = \\begin{cases} 
                  0.25 & \\text{if}\\; x = 1 \\\\  
                  0.10 & \\text{if}\\; x = 2 \\\\  
                  0.40 & \\text{if}\\; x = 3 \\\\  
                  0.25 & \\text{if}\\; x = 4 \\\\  
                  \\end{cases} $`' />
                  <div class="math-bt">
                     <vm class="math" :formula='this.latex.crossEntropyExample1' />
                     <vm class="math" :formula='this.latex.crossEntropyExample2' />
                  </div>
                  <p>
                     Unless <vm :formula="`$q(x)=p(x)$`" />, <vm :formula="`$\\mathbb{H}(p, q) \\neq \\mathbb{H}(q, p)$`" />. Introducing a third distribution which will be <i>very</i>
                     similar to <vm :formula="`$p(x)$`" /> to better illustrate the lower bounds of cross entropy, let
                  </p>
                  <vm class="math" :formula='`$$z(x) = \\begin{cases} 
                  0.17 & \\text{if}\\; x = 1 \\\\  
                  0.28 & \\text{if}\\; x = 2 \\\\  
                  0.20 & \\text{if}\\; x = 3 \\\\  
                  0.35 & \\text{if}\\; x = 4 \\\\  
                  \\end{cases}$$`' />
                  <div class="math-bt">
                     <vm class="math" :formula='this.latex.crossEntropyExample3' />
                     <vm class="math" :formula='this.latex.crossEntropyExample4' />
                  </div>
                  <p>
                     It may be discussed later, but the difference between <vm :formula="`$\\mathbb{H}(p, z)$`" /> and <vm :formula="`$\\mathbb{H}(p)$`" />
                     is known as the <a href="https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence" target="_blank">Kullback-Leibler divergence / Relative entropy</a>:
                     <vm :formula="`$$D_\\mathbb{KL}(p\\;\\lvert\\rvert \\;z) = \\mathbb{H}(p, z) - \\mathbb{H}(p) = 0.00277$$`" />
                  </p>
               </section>

            </section>

            <section id="joint">
               <h2>Joint Entropy</h2>
               <p>
                  Joint entropy carries analagous concept and definition as <a href="#intuition">entropy</a> however operates on a set of random variables as opposed to one.
                  Defined as <vm :formula="`$\\mathbb{H}$`" />, the joint entropy of the random variables <vm :formula="`$X$`" /> and <vm :formula="`$Y$`" />
                  with joint distribution <vm :formula="`$p$`" /> is:
               </p>
               <vm class="math" :formula='this.latex.jointEntropy' />
               <p>
                  Although similar to entropy, <vm :formula="`$\\mathbb{H}(X)$`" />, an important difference is the potential correlation between the multiple random variables. As correlation is a metric
                  of interdependence of data, it should be obvious that higher the correlation, the more certainty or information we will have, which will result in lower entropy. Because of this relationship
                  we can say that unless the events sampled from random variables of a joint distribution indicate independence, the joint entropy will usually be less than the sum of each random variable's entropy:
                  <vm :formula="`$\\mathbb{H}(X, Y) \\lt \\mathbb{H}(X) + \\mathbb{H}(Y)$`" /> and if they are independent:
                  <vm :formula="`$\\mathbb{H}(X, Y) = \\mathbb{H}(X) + \\mathbb{H}(Y)$`" />.
               </p>

               <section id="jointexample">
                  <h3>Example</h3>
                  <p>
                     Given the joint distribution between <vm :formula="`$X$`" /> and <vm :formula="`$Y$`" />:
                  </p>
                  <table>
                     <tr>
                        <th style="border-right: 1px solid; border-bottom: 1px solid;" ><vm :formula="`$p(X,Y)$`" /></th>
                        <th style="border-bottom: 1px solid;"><vm :formula="`$Y = 0 $`" /></th>
                        <th style="border-bottom: 1px solid;"><vm :formula="`$Y = 1 $`" /></th>
                     </tr>
                     <tr>
                        <th style="border-right: 1px solid;"><vm :formula="`$X = 0$`" /></th>
                        <td><vm :formula="`$1/6$`" /></td>
                        <td><vm :formula="`$2/6$`" /></td>
                     </tr>
                     <tr>
                        <th style="border-right: 1px solid;"><vm :formula="`$X = 1$`" /></th>
                        <td><vm :formula="`$1/6$`" /></td>
                        <td><vm :formula="`$2/6$`" /></td>
                     </tr>
                  </table>
                  <div class="math-t">
                     <vm class="math" :formula='this.latex.jointEntropy2' />
                  </div>
               </section>
            </section>

            <section id="conditional">
               <h2>Conditional Entropy</h2>
               <p>
                  The conditional entropy tells us how much uncertainty there will be in calculating <vm :formula="`$Y$`" /> given <vm :formula="`$X$`" />. Because of
                  the relationship between joint and conditional probability, specifically the <a href="https://en.wikipedia.org/wiki/Chain_rule_(probability)" target="_blank">chain rule of probability</a>:
                  <vm :formula="`$p(x, y) = p(x\\,|\\, y)\\,p(y) = p(y\\,|\\,x) \\,p(x)$`" />, there are a 
                  handful of different interpretations to the conditional entropy. Most, if not all, of these interpretations are built directly on concepts defined above. As such, I would like to initially
                  define conditional entropy with what seems the most intuitive and then work through the remaining rigor to show those other interpretations. Defined as
                  <vm :formula="`$\\mathbb{H}$`" />, the conditional entropy of the random variable <vm :formula="`$Y$`" /> given <vm :formula="`$X$`" />
                  with distribution <vm :formula="`$p$`" /> is:
               </p>
               <div class="math-bt">
                  <vm class="math" :formula='this.latex.conditionalEntropy1' />
               </div>
               <p>
                  Equation 6.1, 6.4, 6.5, and 7.0 are the different interpretations I am going to focus on. The differences between these interpretations is that they each require a different combination of understanding
                  for concepts in probability theory, <a href="#intuition">entropy</a>, <a href="#selfinformation">self information</a> and <a href="#joint">joint entropy</a>. The examples refer to the
                  distribution defined immediately below.
                  <br><br>
                  Rolling a fair die, let <vm :formula="`$X=1$`" /> to indicate the rolled number is even and <vm :formula="`$X=0$`" /> otherwise. Let
                  <vm :formula="`$Y=1 $`" /> to indicate the rolled number is prime and <vm :formula="`$Y = 0$`" /> otherwise.
               </p>
               <table>
                  <tr>
                     <th style="border-right: 1px solid; border-bottom: 1px solid;"><vm :formula="`$n$`" /></th>
                     <th style="border-bottom: 1px solid;">1</th>
                     <th style="border-bottom: 1px solid;">2</th>
                     <th style="border-bottom: 1px solid;">3</th>
                     <th style="border-bottom: 1px solid;">4</th>
                     <th style="border-bottom: 1px solid;">5</th>
                     <th style="border-bottom: 1px solid;">6</th>
                  </tr>
                  <tr>
                     <th style="border-right: 1px solid;"><vm :formula="`$X$`" /></th>
                     <th>0</th>
                     <th>1</th>
                     <th>0</th>
                     <th>1</th>
                     <th>0</th>
                     <th>1</th>
                  </tr>
                  <tr>
                     <th style="border-right: 1px solid;"><vm :formula="`$Y$`" /></th>
                     <th>0</th>
                     <th>1</th>
                     <th>1</th>
                     <th>0</th>
                     <th>1</th>
                     <th>0</th>
                  </tr>
               </table>
               <p>
                  <table>
                     <tr>
                        <th style="border-right: 1px solid; border-bottom: 1px solid;" ><vm :formula="`$p(X,Y)$`" /></th>
                        <th style="border-bottom: 1px solid;"><vm :formula="`$Y = 0 $`" /></th>
                        <th style="border-bottom: 1px solid;"><vm :formula="`$Y = 1 $`" /></th>
                     </tr>
                     <tr>
                        <th style="border-right: 1px solid;"><vm :formula="`$X = 0$`" /></th>
                        <td><vm :formula="`$1/6$`" /></td>
                        <td><vm :formula="`$2/6$`" /></td>
                     </tr>
                     <tr>
                        <th style="border-right: 1px solid;"><vm :formula="`$X = 1$`" /></th>
                        <td><vm :formula="`$2/6$`" /></td>
                        <td><vm :formula="`$1/6$`" /></td>
                     </tr>
                  </table>
               </p>

               <section id="61">
                  <h3>Example 6.1</h3>
                  <p>
                     Equation 6.1 most succinctly defines the relationship, in terms of entropy, between joint and conditional probability. Conditional probability is joint probability except the only difference is that, in
                     the case of two random variables, one of those random variables are fixed. This means the conditional distribution is restricted to a subspace of the joint distribution's sample space. This
                     intuition is directly transferable to the concept of uncertainty. If I have <vm :formula="`$p(y\\,|\\,x)$`" />, because the event of random variable
                     <vm :formula="`$X$`" /> is predetermined, the entropy it provides is equal to 0. We can reformulate this as the joint entropy,
                     <vm :formula="`$\\mathbb{H}(X, Y)$`" />, except again because random variable <vm :formula="`$X$`" /> should be 0 as it has no entropy (because it is given), it has to be subtracted. 
                     This provides us with equation 6.1.
                  </p>
                  <div class="math-t">
                     <vm class="math" :formula='this.latex.conditionalEntropy2' />
                  </div>
               </section>

               <section id="645">
                  <h3>Examples 6.4 & 6.5</h3>
                  <p>
                     Both 6.4 and 6.5 have a couple "sub" interpretations. One way to look at it is taking the joint cross entropy where <vm :formula="`$P = p(x, y)$`" /> and
                     <vm :formula="`$Q = p(y\\,|\\,x)$`" />. Through this lens, we are calculating the combined expected entropy between random variables <vm :formula="`$X$`" />
                     and <vm :formula="`$Y$`" /> of their joint distribution when encoded to a new conditional distribution. This is synonymous to quantifying the difference between the two distributions.
                     A second way to look at it is by taking the expectation generated from distribution <vm :formula="`$P$`" /> of the self information of distribution
                     <vm :formula="`$Q$`" />. A third way can be seen as finding the KL Divergence <vm :formula="`$D_{\\mathbb{KL}}(p(x, y)\\,||\\,p(x))$`" />.
                  </p>
                  <div class="math-t">
                     <vm class="math" :formula='this.latex.conditionalEntropy3' />
                  </div>
               </section>

               <section id="70">
                  <h3>Example 7.0</h3>
                  <p>
                     Equation 7.0 says "the conditional entropy of <vm :formula="`$Y$`" /> given <vm :formula="`$X$`" /> is equal to the expectation, generated
                     from the marginal distribution of <vm :formula="`$X$`" />, of the entropy of the distribution <vm :formula="`$Y$`" /> given
                     <vm :formula="`$X$`" />. It is subtle and may look visually deceiving, 
                     but the right hand term inside the expectation is not conditional entropy, it is the entropy of the conditional distribution.
                  </p>
                  <div class="math-t">
                     <vm class="math" :formula='this.latex.conditionalEntropy4' />
                  </div>
               </section>

               <section id="thoughts">
                  <h2>Thoughts</h2>
                  <p>
                     My first run-in with entropy was cross entropy loss maybe half a year ago at the time of writing this. My second was with the KL divergence very quickly after that. My third happened about a week ago and
                     is what made me want to write this, I was reading about the lower variational bound on a variational autoencoder. Originally I did not intend to delve into the different ways you can view some of the
                     entropies such as the conditional entropy but the more I thought about it, the more I realized "Oh...you can look at it like this too, let me quickly write that down". I think it's important in all of math,
                     but I'd like to emphasize trying to understand the different interpretations of entropy found here and in any other read. Because a lot of machine learning is defined probabilistically, information (entropy)
                     has become a very useful tool in reconfiguring mechanics in deep learning.
                  </p>
                  <p>
                     Ryan
                  </p>
               </section>
            </section>

         </div>
      </div>
   </div>
</template>

<style scoped>@import url(./util/blogStyles.css);</style>