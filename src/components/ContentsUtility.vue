<script>
import { gsap } from "gsap";

export default {
   data() {
      return {
         theme: false,
         typeBool: false,
         typeSize: 0,
      }
   },

   mounted() {
      window.addEventListener('scroll', this.scroll)
      this.body = document.querySelector('.body')

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
      window.removeEventListener('scroll', this.scroll)
   },

   props: {
      blog: null
   },

   methods: {
      scroll() {

         this.tl = gsap.timeline({
            defaults: {
               duration: 0.25
            }
         })

         if (window.scrollY > window.innerHeight) {
            this.tl.to('.util-wrapper', {
               duration: .25,
               opacity: 1,
            })
            .to('.contents-head', {
               duration: .25,
               opacity: 1,
            }, '<')
         } else {
            this.tl.to('.util-wrapper', {
               duration: .25,
               opacity: 0,
            })
            .to('.contents-head', {
               duration: .25,
               opacity: 0,
            }, '<')
         }
      },

      scrollToTop() {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         })
      },

      changeTheme() {
         console.log(';theme')

         const themeButton = document.querySelector('.theme-icon')
         themeButton.classList.toggle('day-icon')

         const body = document.querySelector('body')
         body.classList.toggle('day')
      },
      
      changeType() {
         this.body.classList.toggle('blog-serif')

         this.typeBool = !this.typeBool
         localStorage.setItem('type', JSON.stringify(this.typeBool))
      },
      
      changeSize(iter=true) {
         if (iter) {
            this.typeSize === 2 ? (this.typeSize = 0) : (this.typeSize++)
         }

         let x = document.querySelectorAll('.body p')

         if (this.typeSize === 0) {
            x.forEach(el => el.classList.remove('font-size-165'))
         }

         if (this.typeSize === 1) {
            x.forEach(el => el.classList.add('font-size-145'))
         }

         if (this.typeSize === 2) {
            if (!iter) {
               x.forEach(el => el.classList.add('font-size-165'))
            }
            x.forEach(el => el.classList.replace('font-size-145', 'font-size-165'))
         }
         
         localStorage.setItem('size', this.typeSize)
      }
   },

   computed: {
      type() {
         return this.typeBool ? ('Sans Serif') : ('Serif')
      },

      size() {
         const table = ['+0rem', '+.2rem', '+.4rem']
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
   .contents-head {
      opacity: 0;
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
      border-bottom: 1px solid var(--light500);
      padding-bottom: 1rem;
      margin-top: 2vh;
      z-index: 10;
   }

   .util-wrapper button {
      font-family: var(--sansType);
      border: 1px solid var(--light500);
      border-radius: 2px;
      outline: none;
      background-color: transparent;
      color: var(--light200);
      cursor: pointer;
      height: 30px;
      font-size: 0.8rem;
   }

   .break {
      width: 100%;
   }

   button.theme {
      /* height: 20px; */
      padding: 0.3rem;
   }

   .theme-icon {
      background-color: var(--light000);
      width: 20px;
      height: 20px;
      mask-image: url('../assets/svg/moon.svg');
      mask-position: center;
      mask-size: 60%;
      mask-repeat: no-repeat;
      -webkit-mask-image: url('../assets/svg/moon.svg');
      -webkit-mask-position: center;
      -webkit-mask-size: 85%;
      -webkit-mask-repeat: no-repeat;
   }

   .day-icon {
      mask-image: url('../assets/svg/moon.svg');
      -webkit-mask-image: url('../assets/svg/sun.svg');
   }
</style>