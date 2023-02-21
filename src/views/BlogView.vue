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

      gsap.from('.blog-head h2', {
         duration: 1,
         y: '200%',
         delay: 0.5,
         ease: 'power2.inOut'
      })
      gsap.from('.blog-head p', {
         duration: 1,
         y: '200%',
         delay: 0.5,
         ease: 'power2.inOut'
      })

      gsap.from('.blog-post', {
         duration: 1,
         opacity: 0,
         delay: 0.75,
         stagger: 0.1,
         ease: 'power2.inOut'
      })

      setTimeout(() => {
         window.scrollTo(0, 0)
      }, 10)
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
            <h2>A place for talking</h2>
         </div>
         <div class="text-mask">
            <p>
               The things I write will usually be about math, food, music, design, machine learning, dev, and everything in between.
            </p>
         </div>
         <!-- <input type="text" v-model="search" placeholder="Search..." /> -->
      </div>
      <div class="blog-body">
         <div class="blog-post" v-for="blog in filteredBlogs" :key="blog.route">
            <router-link :to="{ name: `${blog.route}`}">{{ blog.title }}</router-link>
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
      padding-left: 2rem;
   }

   h3 {
      font-family: var(--serifType);
      font-size: 1.3rem;
   }

   .blog-body {
      width: 800px;
      padding-top: 10vh;
   }

   .blog-body a {
      font-size: 1.3rem;
      color: var(--light200);
   }
   .blog-body a:hover {
      color: var(--light000);
   }

   input {
      background: transparent;
      border: none;
      padding: 0.4rem 0.5rem;
      font-family: var(--displayTypeReg);
      font-style: oblique;
      color: var(--light000);
      border-bottom: 1px solid var(--light200);
      font-size: 1.5rem;
   }

   input:focus {
      outline: none;
   }

   .blog-date {
      float: right;
      margin: 0;
   }
   .blog-post {
      padding-top: 4vh;
      font-size: 1.15rem;
   }

   .blog-post a {
      text-decoration: none;
      font-weight: bold;
   }

   .blog-description {
      margin-left: 1.5rem;
      margin-top: 0.5rem;
      color: var(--light100);
   }

   .blog-head {
      padding-top: 20vh;
      top: 20vh;
      left: 8%;
   }

   .blog-head p {
      font-size: 1.15rem;
   }

   .blog-text {
      font-size: 1.75rem;
   }
</style>