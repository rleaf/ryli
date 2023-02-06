<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'

export default {
   data() {
      return {
         experience: new Experience(),
         assets: null,
         assetsReverse: null,
         group: null,
         space: null,
         upperBound: null,
         trackIdx: null,
         track: null,
         intersectName: null,
         scrollSign: 0,
      }
   },

   created() {
      this.assets = this.experience.world.plane.assets
      this.assetsReverse = this.experience.world.plane.assetsReverse
      this.group = this.experience.world.plane.group
      this.space = this.experience.world.plane.space
      this.upperBound = this.experience.world.plane.upperBound
      this.trackIdx = 0
      this.track = this.experience.world.plane.track
      this.scrollTimeline = gsap.timeline({
         defaults: {
            duration: 0.4,
            ease: 'power2.inOut'
         }
      })
   },

   watch: {
      trackIdx() {
         this.setSphereColor()
      }
   },

   methods: {
      setSphereColor(rotate = true) {
         const asset = this.assetsReverse[this.trackIdx]

         const tl = gsap.timeline({
            defaults: {
               duration: 1,
               ease: 'power2.out',
            }
         })

         tl.to(this.experience.world.sphere.material.uniforms.uValley.value, {
            r: asset.uValley.r,
            g: asset.uValley.g,
            b: asset.uValley.b,
         })
         .to(this.experience.world.sphere.material.uniforms.uPeak.value, {
            r: asset.uPeak.r,
            g: asset.uPeak.g,
            b: asset.uPeak.b,
         }, '<')
         .to(this.experience.world.sphere.material.uniforms.uDisplacementStrength, {
            value: 0.75
         }, '<')
         .to(this.experience.world.sphere.material.uniforms.uDisplacementStrength, {
            value: 0.25
         }, '<0.2')

         if (rotate) {
            if (this.scrollSign > 0) {
               tl.to(this.experience.world.sphere.mesh.rotation, {
                  z: '+=1.5'
               }, '<')
            } else {
               tl.to(this.experience.world.sphere.mesh.rotation, {
                  z: '-=1.5'
               }, '<')
            }
            
         }

      },
      setScrollEvent(e) {
         this.scrollSign = Math.sign(e.deltaY)
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
         }
      },

      intersectEvent() {
         this.intersectName = this.experience.world.plane.intersectName
         this.intersectName ? (document.body.style.cursor = 'pointer') : (document.body.style.cursor = 'default')
      },

      routeEvent() {
         if (this.intersectName) {
            this.$router.push({ name: this.intersectName.toLowerCase() })
         }
      }
   },

   mounted() {
      this.experience.camera.wobble = false
      this.experience.world.sphere.projectsView()
      this.experience.world.plane.initProjectView()
      this.setSphereColor(false)

      window.addEventListener('click', this.routeEvent)
      window.addEventListener('mousemove', this.intersectEvent)
      window.addEventListener('wheel', this.setScrollEvent)
      gsap.from('.projects-head h1', {
         duration: 1.0,
         opacity: 0,
         delay: 0.5,
         ease: 'power2.inOut'
      })
   },
   
   unmounted() {
      this.experience.camera.wobble = true
      this.experience.world.plane.destroyProjectView()
      window.removeEventListener('wheel', this.setScrollEvent)
      window.removeEventListener('click', this.routeEvent)
      window.removeEventListener('mousemove', this.intersectEvent)
   },

   computed: {
      slideFade() {
         if (this.scrollSign > 0) {
            return 'slide-down'
         } else {
            return 'slide-up'
         }
      }

   }
}
</script>

<template>
   <Transition :name="slideFade">
      <div class="projects-main" :key="this.trackIdx">
         <div>
            <div class="projects-head">
               <h1>{{ this.assetsReverse[this.trackIdx].name }}</h1>
            </div>
            
         </div>
         <div class="projects-synopsis">
            <div class="project-meta">
               <div class="meta">
                  <div class="meta-header">Timeline</div>
                  {{ this.assetsReverse[this.trackIdx].timeline }} <br>
                  {{ this.assetsReverse[this.trackIdx].timeline2 }}
               </div>
               <div class="meta">
                  <div class="meta-header">Genre</div>
                  {{ this.assetsReverse[this.trackIdx].genre }}
               </div>
               <div class="meta">
                  <div class="meta-header">Technology</div>
                  <span v-for="(el, i) in this.assetsReverse[this.trackIdx].tech"
                     :key="i">
                        {{ el }}<br>
                  </span>
               </div>
            </div>
            <div class="projects-body">
               {{ this.assetsReverse[this.trackIdx].body }}
            </div>
         </div>
      </div>
   </Transition>
</template>

<style scoped>
   h1 {
      color: var(--ligh200);
   }

   .slide-down-enter-active, .slide-down-leave-active {
      transition: 0.4s ease-in-out;
   }

   .slide-down-enter-from {
      opacity: 0;
      transform: translateY(8rem);
   }
   .slide-down-leave-to {
      opacity: 0;
      transform: translateY(-8rem);
   }

   .slide-up-enter-active, .slide-up-leave-active {
      transition: 0.4s ease-in-out;
   }

   .slide-up-enter-from {
      opacity: 0;
      transform: translateY(-8rem);
   }
   .slide-up-leave-to {
      opacity: 0;
      transform: translateY(8rem);
   }
   .meta-header {
      font-size: .9rem;
      color: var(--light000);
      padding-bottom: 0.5rem;
      font-weight: bold;
      text-transform: uppercase;
      font-style: normal;
   }

   .meta {
      word-break: break-word;
      width: 33%;
      font-size: .9rem;
      font-style: oblique;
   }

   .projects-body {
      font-size: 1.1rem;
      width: 80%;
      padding: 1rem 0;
   }
   .project-meta {
      width: 80%;
      font-family: var(--sansType);
      display: inline-flex;
      justify-content: center;
      border-top: 1px solid;
      border-bottom: 1px solid;
      padding: 0.5rem 0;
      margin-top: 1rem;

   }
   .projects-synopsis {
      position: absolute;
      display: flex;
      align-items: center;
      flex-direction: column;
      /* background: var(--dark0001); */
      margin-left: 8%;
      /* height: 35vh; */
      width: 28vw;
      top: calc(20vh + 25vmin);
   }

   .projects-head {
      position: absolute;
      width: calc(100% - 15vw);
      top: 20vh;
      left: 8%;
   }
</style>