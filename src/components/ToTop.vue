<script>
import { gsap } from "gsap";

export default {
   mounted() {
      window.addEventListener('scroll', this.toTop)
   },

   unmounted() {
      window.removeEventListener('scroll', this.toTop)
   },

   methods: {
      toTop() {
         if (window.scrollY > window.innerHeight) {
            gsap.to('.to-top', { duration: .25, display: 'flex', opacity: 1, bottom: 20 })
         } else {
            gsap.to('.to-top', { duration: .25, display: 'none', opacity: 0, bottom: 0 })
         }
      },

      scrollToTop() {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });

      }
   }
}

</script>

<template>
   <div class="util-wrapper">
      <button class="to-top" @click="scrollToTop()">Go Back Top</button>
   </div>
</template>

<style scoped>
   .to-top {
      display: flex;
      gap: .3rem;
      width: auto;
      flex-wrap: wrap;
      border: 1px solid var(--light500);
      padding: 5px;
      border-radius: 2px;
   }

   .util-wrapper {
      margin-top: 2vh;
      z-index: 10;
      height: 35px;
   }

   button {
      font-family: var(--sansType);
      border: 1px solid var(--light500);
      border-radius: 2px;
      outline: none;
      background-color: transparent;
      color: var(--dark000);
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
</style>