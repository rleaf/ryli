<script>
import ContentsUtility from '../../components/ContentsUtility.vue'
import blogs from '../../assets/blogs/blogs'
import util from './util/util'

export default {
   components: {
      ContentsUtility,
   },
   data() {
      return {
         // blog: null
      }
   },

   created() {
      const idx = blogs.findIndex(el => el.route === 'elbo')
      this.blog = blogs[idx]
   },

   mounted() {
      util.titleTween()
   }
}
</script>

<template>
   <div class="blog-wrapper">
      <div class="blog-landing">
         <div class="blog-head">
            <h1>{{ this.blog.title }}</h1>
            <h3>{{ this.blog.date }}</h3>
         </div>
      </div>
      <div class="blog-main">
         <div class="sidebar">
            <ContentsUtility :blog="this.blog"/>
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#problem">Problem</a></li>
                  <li><a href="#goals">Goals</a></li>
                  <li><a href="#research">Research</a></li>
                  <li><a href="#earlyideation">Early Ideation</a></li>
                  <ul>
                     <li><a href="#navigation">Navigation</a></li>
                     <li><a href="#store">Store</a></li>
                     <li><a href="#library">Library</a></li>
                  </ul>
                  <li><a href="#finaldesigns">Final Designs</a></li>
                  <ul>
                     <li><a href="#anoverview">An Overview</a></li>
                     <li><a href="#acloserlook">A Closer Look</a></li>
                  </ul>
                  <li><a href="#conclusion">Conclusion</a></li>
               </ul>
            </nav>
         </div>
         <div class="body">
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
               </p>
            </section>
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero eveniet eligendi sit accusamus, praesentium nam error adipisci impedit aperiam dolore modi? Aspernatur, dolorum quos earum omnis porro quo doloribus?
               </p>
            </section>
         </div>
      </div>
      
   </div>
</template>

<style scoped>
   @import url(./util/blogStyles.css);
</style>