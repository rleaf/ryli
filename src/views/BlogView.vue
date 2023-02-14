<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'
import blogs from '../assets/blogs/blogs'

export default {
   data() {
      return {
         experience: new Experience(),
         search: '',
         blogs: blogs
      }
   },

   created() {
      this.sphere = this.experience.world.sphere
      this.scene = this.experience.scene
   },

   mounted() {
      this.scene.remove(this.sphere.mesh)
      this.sphere.geometry.dispose()
      this.sphere.material.dispose()

      // gsap.from('.blog-text', {
      //    duration: 0.5,
      //    y: '200%',
      //    delay: 1,
      //    stagger: 0.1,
      //    ease: 'power2.inOut'
      // })

      gsap.from('.blog-head h2', {
         duration: 1,
         y: '200%',
         delay: 0.25,
         ease: 'power2.inOut'
      })

      gsap.from('.blog-post', {
         duration: 1,
         opacity: 0,
         delay: 0.75,
         stagger: 0.1,
         ease: 'power2.inOut'
      })
   },

   unmounted() {

   },

   computed: {
      filteredBlogs() {
         return this.blogs.filter(post => {
            return post.title.toLowerCase().includes(this.search.toLowerCase())
         })
      }
   },
}
</script>

<template>
   <div class="blog-main">
      <div class="blog-head">
         <div class="text-mask">
            <h2>A place for talking...</h2>
         </div>
         <!-- <h3>The things I write will usually be about math, food, music, design, machine learning, dev, and everything in between.</h3> -->
         <!-- <div class="text-mask">
            <p class="blog-text">
               A place to talk about some hobbies...
            </p>
         </div> -->
      </div>
      <div class="blog-body">
         <input type="text" v-model="search" placeholder="Search..." />
         <div class="blog-post" v-for="blog in filteredBlogs" :key="blog.route">
            <!-- <router-link :to="{ name: `${blog.route}`}">{{ blog.title }}</router-link> -->
            <a href="#">{{ blog.title }}</a>
            <p class="blog-date">
               {{ blog.date }}
            </p>
            <p class="blog-description">
               {{ blog.summary }}
            </p>
         </div>
      </div>
   </div>
</template>

<style scoped>

   .blog-main {
      padding-left: 8vw;
   }

   h1 {
      color: var(--light200);
   }

   h2 {
      font-size: 3rem;
   }

   .blog-body {
      /* display: block; */
      /* width: 45vw; */
      width: 800px;
      padding-top: 10vh;
   }

   .blog-body a {
      font-size: 1.1rem;
      color: var(--light000);
      /* text-decoration: none; */
      /* font-style: oblique; */
      /* font-weight: bold; */
   }

   .blog-body input {
      background: transparent;
      border: none;
      padding: 0.4rem 0.5rem;
      font-family: var(--displayTypeReg);
      font-style: oblique;
      color: var(--light000);
      border-bottom: 1px solid var(--light200);
      /* border-radius: 5px; */
      font-size: 1.5rem;
   }

   .blog-body input:focus {
      outline: none;
   }

   .blog-date {
      float: right;
      margin: 0;
   }
   .blog-post {
      padding-top: 8vh;
   }

   .blog-description {
      /* font-size: 0.9rem; */
      color: var(--light100);
   }

   .blog-head {
      /* position: relative; */
      padding-top: 20vh;
      /* width: 45vw; */
      top: 20vh;
      left: 8%;
   }

   .blog-text {
      font-size: 1.75rem;
   }
</style>