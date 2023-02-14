<script>
import Experience from '../assets/Experience/Experience'

export default {
   data() {
      return {
         experience: null,
      }
   },

   mounted() {
      this.experience = new Experience(document.querySelector('canvas.webgl'))
   }
}
</script>

<template>
   <div class="text-wrapper"></div>
   <canvas class="webgl"></canvas>
</template>

<style scoped>
   .text {
      font-size: 5rem;
   }
   .webgl {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -50;
   }
</style>