<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// ScrollTrigger.config({
//    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
// })

export default {
   mounted() {
      this.fade()
   },

   methods: {
      fade() {
         this.x = gsap.to('.background', {
            scrollTrigger: {
               trigger: '.background',
               start: '15%',
               end: '80%',
               scrub: true,
            },
            opacity: 0.75,
         })
      }
   }
}
</script>

<template>
   <div class="background" ></div>
</template>

<style scoped>
   .background {
      position: absolute;
      background: var(--dark000);
      opacity: 0;
      top: 0;
      width: inherit;
      height: inherit;
   }
</style>