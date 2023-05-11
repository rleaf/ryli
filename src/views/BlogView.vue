<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'
import blogs from '../assets/blogs/blogs'

export default {
   data() {
      return {
         experience: new Experience(),
         search: '',
         tags: [],
         filter: [],
         blogs: blogs
      }
   },

   created() {
      this.sphere = this.experience.world.sphere
      this.scene = this.experience.scene

      for (let i = 0; i < blogs.length; i++) {
         const blog = blogs[i]

         if (blog.tags) {
            for (let j = 0; j < blog.tags.length; j++) {
               const tag = blog.tags[j];

               if (!this.tags.includes(tag)) this.tags.push(tag)
            }
         }
      }

      // this.filter = this.tags.slice()
   },
   
   mounted() {
      this.scene.remove(this.sphere.mesh)
      this.sphere.geometry.dispose()
      this.sphere.material.dispose()

      const tl = gsap.timeline({
         defaults: {
            duration: 1,
            ease: 'power2inOut'
         }
      })

      tl.from('.blog-head h2', {
         yPercent: '200',
         delay: 0.5,
      })
      .from('.tags-wrapper', {
         yPercent: '200'
      }, '<+0.2')
      .from('.blog-head p', {
         yPercent: '200'
      }, '<+0.2')
      .from('.blog-post', {
         opacity: 0,
         stagger: 0.1
      }, '<+0.3')

      setTimeout(() => {
         window.scrollTo(0, 0)
      }, 10)
   },

   methods: {
      filterClick(tag) {
         const idx = this.filter.indexOf(tag)         
         idx > -1 ? (this.filter.splice(idx, 1)) : (this.filter.push(tag))
      }
   },

   computed: {
      filteredBlogs() {
         return (this.filter.length === 0) ?
         this.blogs : 
         this.blogs.filter(post => post.tags.some(r => this.filter.includes(r)))
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
               It helps to understand material when I'm able to write about it. Viewing math related topics, along with some ml topics, on a wide screen is recommended
               due to mathjax rendering.
            </p>
         </div>
         <div class="text-mask">
            <div class="tags-wrapper">
               <p>
                  Topics include:
               </p>
               <div class="blog-tags-filter">
                  <button :class="{ true: this.filter.includes(tag) }" @click="filterClick(tag)" v-for="tag in this.tags.sort()" :key="tag" >
                     {{ tag }}
                  </button>
               </div>
            </div>
         </div>
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
            <div class="blog-tags">
               <span v-for="tag in blog.tags.sort()" :key="tag">
                  {{ tag }}
               </span>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>

   .tags-wrapper {
      /* margin-top: 5rem; */
      border-bottom: 1px solid var(--light200);
      padding-bottom: 5vh;
      width: 800px;

   }
   .blog-tags-filter {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
   }

   .blog-tags-filter button {
      transition: 0.1s ease-in;
      border: 1px solid var(--light700);
      background: transparent;
      font-family: var(--serifType);
      color: var(--light700);
      border-radius: 3px;
      padding: 0.1rem 0.3rem;
      font-size: 1.1rem;
   }

   button.true {
      border-color: var(--light200);
      color: var(--light200);
   }

   .blog-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
   }
   .blog-tags span {
      border: 1px solid var(--light200);
      border-radius: 3px;
      padding: 0.1rem 0.3rem;
      font-size: 0.95rem;
   }
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
      padding-top: 2vh;
      padding-bottom: 10vh;
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
      width: 80vw;
   }

   .blog-head p {
      font-size: 1.15rem;
      max-width: 900px;
   }

   .blog-text {
      font-size: 1.75rem;
   }

   @media screen and (max-width: 950px) {

      .blog-main {
         padding: 0 8vw;
      }

      nav {
         margin: auto;
      }
      
      .blog-head {
         padding-top: 10vh;
      }
      
      h2 {
         padding-left: 0rem;
         /* font-size: 5rem; */
      }

      .blog-body {
         width: 100%;
      }

      .blog-post {
         padding-top: 7vh;
      }

      .blog-date {
         float: none;
         padding-top: 0.5rem;
      }
   }
</style>