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
      this.blog = blogs.find(el => el.route === 'transformer')
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

            </section>

            <section id="preparation">
               <h2>Preparation</h2>

               <section id="positionalencoding">
                  <h3>Positional Encoding</h3>
               </section>

            </section>

            <section id="sdpa">
               <h2>Scaled Dot Product Attention</h2>
            </section>

            <section id="attention">
               <h2>Attention Implementation</h2>

               <section id="selfattention">
                  <h3>Self Attention</h3>
               </section>

               <section id="multiheadedattention">
                  <h3>Multi Headed Attention</h3>
               </section>

               <section id="maskedattention">
                  <h3>Masked Multi Headed Attention</h3>
               </section>

               <section id="crossattention">
                  <h3>Cross Attention</h3>
               </section>
            </section>

            <section id="ffn">
               <h2>Feed Forward Network</h2>
            </section>

            <section id="blocks">
               <h2>Blocks</h2>

               <section id="encoderblock">
                  <h3>Encoder Block</h3>
               </section>

               <section id="decoderblock">
                  <h3>Decoder Block</h3>
               </section>
            </section>

            <section id="encdec">
               <h2>Encoder & Decoder Layers</h2>
            </section>

            <section id="transformer">
               <h2>Transformer</h2>
            </section>

            <section id="thoughts">
               <h2>Thoughts</h2>
            </section>

            
         
         </div>
      </div>
   </div>
</template>

<style scoped>@import url(./util/blogStyles.css);</style>