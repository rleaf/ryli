<script>
import Experience from '../assets/Experience/Experience'

export default {
   data() {
      return {
         experience: null
      }
   },

   mounted() {
      this.experience = new Experience(document.querySelector('canvas.webgl'))
      // this.experience.cssRenderer.setInstance(document.querySelector('div.text-wrapper'))
      // this.experience.world.text.setText0(document.querySelector('div.text'))
   }
}
</script>

<template>
   <div class="text-wrapper"></div>
   <canvas class="webgl"></canvas>
</template>

<style scoped>
   .text {
      /* position: absolute; */
      font-size: 5rem;
   }
   .webgl {
      position: fixed;
      top: 0;
      left: 0;
      /* outline: none; */
      z-index: -50;
   }
</style>