<script>
import Experience from '../assets/Experience/Experience'
export default {
   data() {
      return {

      }
   },

   mounted() {
      this.experience = new Experience()
      this.experience.world.sphere.tweenLanding()
   }
}
</script>

<template>
   
   <div class="landing-head">
      <div class="fore">
         <h1>Ryan Lin</h1>
         <h2>Design & Development.</h2>
      </div>
      <h1 class="back">Ryan Lin</h1>
   </div>
</template>

<style scoped>
   .landing-head {
      position: absolute;
      width: calc(100% - 15vw);
      top: calc(50% - 20vmin / 2);
      left: 15vw;
   }
   
</style>