<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'
import sources from '../assets/Experience/sources'

export default {
   data() {
      return {
         experience: new Experience(),
         sources: sources,
         projectIndex: 0,
         
      }
   },

   created() {
      this.assets = this.experience.world.plane.assets.reverse()
      this.group = this.experience.world.plane.group
      this.space = this.experience.world.plane.space
      this.upperBound = this.experience.world.plane.upperBound
      this.trackIdx = this.experience.world.plane.trackIdx
      this.track = this.experience.world.plane.track
      this.scrollTimeline = gsap.timeline({
         defaults: {
            duration: 0.4,
            ease: 'power2.inOut'
         }
      })
   },

   methods: {
      setScrollEvent(e) {
         if (!this.scrollTimeline.isActive()) {
            // Only allow "scrolling" when: upperBound < pos.y <= 0
            if (e.deltaY > 0 && this.group.position.y >= this.upperBound && this.group.position.y < 0) {
               this.trackIdx++
               this.scrollTimeline.to(this.group.position, {
                  y: this.track[this.trackIdx],
               })
            }
            if (e.deltaY < 0 && this.group.position.y > this.upperBound) {
               this.trackIdx--
               this.scrollTimeline.to(this.group.position, {
                  y: this.track[this.trackIdx],
               })
            }

            console.log(this.trackIdx, this.assets[this.trackIdx])
         }
      }
   },

   mounted() {
      this.experience.camera.wobble = false
      this.experience.world.sphere.projectsView()
      this.experience.world.plane.initProjectView()

      // window.setTimeout(() => {

      // },)
      window.addEventListener('wheel', this.setScrollEvent)
   },
   
   unmounted() {
      this.experience.camera.wobble = true
      this.experience.world.plane.destroyProjectView()
      window.removeEventListener('wheel', this.setScrollEvent)
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