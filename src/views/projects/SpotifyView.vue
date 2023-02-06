<script>
import Experience from '../../assets/Experience/Experience'
import gsap from 'gsap'

export default {
   data() {
      return {
         experience: new Experience(),
      }
   },

   
   created() {
      this.sphere = this.experience.world.sphere
      this.plane = this.experience.world.plane
   },
   
   mounted() {
      // this.sphere.projectFocusView()
      this.plane.projectFocusView()
   },

   beforeUnmount() {
      gsap.to(this.sphere.material.uniforms.uOpacity, {
         value: '1',
         duration: 0.75
      })
   },
   
   methods: {
      setSphere() {

      }
   },
}
</script>

<template>
   <div class="spotify-main">
      Spotify page
   </div>
</template>

<style scoped>

</style>