<script>
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
   data() {
      return {
         theme: false,
         typeBool: false,
         typeSize: 0,
      }
   },

   mounted() {
      this.tl = gsap.timeline({
         defaults: {
            scrollTrigger: {
               trigger: '.blog-landing',
               scrub: true,
               start: '80%',
               end: '100%'
            }
         }
      })

      this.tl.to('.util-wrapper', {
         opacity: 1
      })
      .to('.contents-head', {
         opacity: 1
      })

      this.body = document.querySelector('.blog-body')

      if (JSON.parse(localStorage.getItem('theme'))) {
         this.theme = true
         this.changeTheme(false)
      }

      if (JSON.parse(localStorage.getItem('type'))) {
         this.typeBool = true
         this.body.classList.toggle('blog-serif')
      }

      if (localStorage.getItem('size')) {
         this.typeSize = parseInt(localStorage.getItem('size'))
         this.changeSize(false)
      }
   },

   unmounted() {
      document.body.classList.remove('bg-day')
      const navBurger = document.querySelectorAll('.bread')
      navBurger.forEach((node) => {
         node.classList.remove('day')
      })
   },

   props: {
      blog: null
   },

   methods: {
      scrollToTop() {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         })
      },

      changeTheme(bool=true) {
         if (bool) this.theme = !this.theme

         // Grab everything in blog
         const body = document.querySelector('.blog-wrapper')
         body.classList.toggle('blog-day')

         document.body.classList.toggle('bg-day')

         // Nav
         const navBurger = document.querySelectorAll('.bread')
         navBurger.forEach((node) => {
            node.classList.toggle('day')
         })

         localStorage.setItem('theme', JSON.stringify(this.theme))
      },
      
      changeType() {
         this.body.classList.toggle('blog-serif')

         this.typeBool = !this.typeBool
         localStorage.setItem('type', JSON.stringify(this.typeBool))
      },
      
      changeSize(iter=true) {
         if (iter) this.typeSize === 3 ? (this.typeSize = 0) : (this.typeSize++)

         const sizeArray = ['1.25rem', '1.35rem', '1.45rem', '1.55rem']
         const codeArray = ['1rem', '1.3rem', '1.5rem']
         
         const size = document.querySelector('.blog-wrapper')
         size.style.setProperty('--blogType', `${sizeArray[this.typeSize]}`)
         size.style.setProperty('--codeType', `${codeArray[this.typeSize]}`)
         
         localStorage.setItem('size', this.typeSize)
      }
   },

   computed: {
      type() {
         return this.typeBool ? ('Sans Serif') : ('Serif')
      },

      size() {
         const table = ['+0rem', '+.1rem', '+.2rem', '+.3rem']
         return table[this.typeSize]
      }
   }
}

</script>

<template>
   <div class="contents-head">
      <h3>{{ this.blog.title }}</h3>
      <h4>{{ this.blog.date }}</h4>
   </div>
   <div class="util-wrapper">
      <button class="to-top" @click="scrollToTop()">Go Back Top</button>
      <div class="util">
         <button @click="changeTheme()" class="theme">
            <div class="theme-icon"></div>
         </button>
         <button @click="changeType" class="style">{{ type }}</button>
         <button @click="changeSize" class="size">{{ size }}</button>
      </div>
   </div>
</template>

<style scoped>
   /*********************************************************
   Variables are adopted from ./blogs/util/blogStyles.css
   *********************************************************/

   .contents-head {
      transition: color 0.5s;
      opacity: 0;
      color: var(--sidebarHeader);
   }

   h4 {
      font-family: var(--displayTypeReg);
      font-size: 1.1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--light500);
      margin-bottom: 0;
   }

   h3 {
      margin-bottom: 0;
   }

   .util {
      display: flex;
      gap: 8px;
      margin-top: 8px;
   }
   .util-wrapper {
      opacity: 0;
      border-bottom: 1px solid var(--light500);
      padding-bottom: 1rem;
      margin-top: 2vh;
      z-index: 10;
   }

   .util-wrapper button {
      transition: 0.5s;
      font-family: var(--sansType);
      border: 1px solid var(--light500);
      border-radius: 2px;
      outline: none;
      background-color: transparent;
      color: var(--sidebarButton);
      cursor: pointer;
      height: 30px;
      font-size: 0.8rem;
   }

   .break {
      width: 100%;
   }

   button.theme {
      padding: 0.3rem;
   }

   .theme-icon {
      background-color: var(--sidebarButton);
      width: 20px;
      height: 20px;
      mask-image: var(--themeSVG);
      mask-position: center;
      mask-size: 60%;
      mask-repeat: no-repeat;
      -webkit-mask-image: var(--themeSVG);
      -webkit-mask-position: center;
      -webkit-mask-size: 85%;
      -webkit-mask-repeat: no-repeat;
   }

   @media screen and (max-width: 950px) {
      .util-wrapper {
         position: fixed;
         bottom: 2vh;
         margin: 0;
         border: 0;
      }

      .util-wrapper button {
         background-color: var(--button);
      }
   }
</style>