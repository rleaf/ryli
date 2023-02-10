<script>
import { gsap } from "gsap";

export default {
   mounted() {
      window.addEventListener('wheel', this.toTop)
   },
   unmounted() {
      window.removeEventListener('wheel', this.toTop)
   },

   methods: {
      toTop() {
         if (window.scrollY > window.innerHeight) {
            gsap.to('.to-top', { duration: .25, display: 'block', opacity: 1, bottom: 20 })
         } else {
            gsap.to('.to-top', { duration: .25, display: 'none', opacity: 0, bottom: 0 })
         }
      },

      scrollToTop() {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });

         document.querySelector('.to-top').style.opacity = 0
      }
   }
}

</script>

<template>
   <button class="to-top" @click="scrollToTop()">Go Back Top</button>
</template>

<style scoped>

button {
   /* display: none; */
   position: fixed;
   margin-left: 5rem;
   font-family: var(--sansType);
   z-index: 25;
   border: 1px solid var(--light500);
   border-radius: 2px;
   outline: none;
   background-color: var(--light100);
   color: var(--dark000);
   cursor: pointer;
   padding: 0.3rem 0.6rem;
   font-size: 0.8rem;
}

button:hover {
   transition: 0.25s;
   background-color: var(--light200);
}

/* .daymodeButton {
   color: black !important;
   background-color: #e0e0e0;
   box-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
} */
</style>