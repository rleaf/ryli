<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'

export default {
   data() {
      return {

      }
   },

   mounted() {
      this.experience = new Experience()
      this.experience.camera.wobble = false
      this.experience.world.sphere.projectsView()
      this.experience.world.plane.initProjectView()
      this.experience.world.plane.setScrollEvent()
      
   },
   
   unmounted() {
      this.experience.camera.wobble = true
      this.experience.world.plane.destroyProjectView()
   }
}
</script>

<template>
   <div class="projects-main">

      <div>
         <div class="projects-head">
            <div class="fore">
               <h1>Projects</h1>
            </div>
            <h1 class="back">Projects</h1>
         </div>
      </div>
   </div>
</template>

<style scoped>
   .projects-head {
      position: absolute;
      width: calc(100% - 15vw);
      top: 20vh;
      left: 8%;
   }
</style>