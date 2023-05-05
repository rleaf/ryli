<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'

export default {
   data() {
      return {
         experience: new Experience(),
         assets: null,
         group: null,
         space: null,
         upperBound: null,
         trackIdx: null,
         track: null,
         intersectName: null,
         scrollSign: 0,
         touchStart: 0,
         touchEnd: 0,
      }
   },

   created() {
      this.assets = this.experience.world.plane.assets
      this.sphere = this.experience.world.sphere
      this.plane = this.experience.world.plane
      this.group = this.plane.group
      this.space = this.plane.space
      this.upperBound = this.plane.upperBound
      this.trackIdx = 0
      this.track = this.plane.track
      this.scrollTimeline = gsap.timeline({
         defaults: {
            duration: 0.4,
            ease: 'power2.inOut'
         }
      })
   },

   watch: {
      trackIdx() {
         this.setColors()
      },
   },

   methods: {
      setColors(rotate = true) {
         const asset = this.assets[this.trackIdx]
         // this.experience.world.bg()

         const tl = gsap.timeline({
            defaults: {
               duration: 1,
               ease: 'power2.out',
            }
         })

         tl.to(this.sphere.material.uniforms.uValley.value, {
            r: asset.uValley.r,
            g: asset.uValley.g,
            b: asset.uValley.b,
         })
         .to(this.sphere.material.uniforms.uPeak.value, {
            r: asset.uPeak.r,
            g: asset.uPeak.g,
            b: asset.uPeak.b,
         }, '<')
         .to(this.sphere.material.uniforms.uDisplacementStrength, {
            value: 0.75
         }, '<')
         .to(this.sphere.material.uniforms.uDisplacementStrength, {
            value: 0.25
         }, '<0.2')

         if (rotate) {
            if (this.scrollSign > 0) {
               tl.to(this.sphere.mesh.rotation, {
                  z: '+=1.5'
               }, '<')
            } else {
               tl.to(this.sphere.mesh.rotation, {
                  z: '-=1.5'
               }, '<')
            }
            
         }

      },

      mobileScroll(ev) {
         this.touchEnd = ev.changedTouches[0].clientY
         const e = {}
         this.touchEnd - this.touchStart > 0 ? (e.deltaY = -1) : (e.deltaY = 1)
         this.setScrollEvent(e)
      },

      setScrollEvent(e) {
         this.scrollSign = Math.sign(e.deltaY)

         if (!this.scrollTimeline.isActive()) {

            if (e.deltaY > 0) {
               if (this.group.position.y >= 0) {
                  this.group.position.y < this.upperBound ? (this.trackIdx++) : (this.trackIdx = 0)
                  this.scrollTimeline.to(this.group.position, {
                     y: this.track[this.trackIdx],
                  })
               }
            }
            if (e.deltaY < 0) {
               if (this.group.position.y <= this.upperBound) {
                  this.group.position.y > 0 ? (this.trackIdx--) : (this.trackIdx = this.track.length - 1)
                  this.scrollTimeline.to(this.group.position, {
                     y: this.track[this.trackIdx],
                  })
               }
            }
         }
      },

      intersectEvent() {
         this.intersectName = this.plane.intersectName
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
      this.sphere.addScene()
      this.sphere.projectsView()
      this.plane.initProjectView()
      this.setColors(false)

      window.addEventListener('click', this.routeEvent)
      window.addEventListener('mousemove', this.intersectEvent)

      setTimeout(() => {
         window.addEventListener('wheel', this.setScrollEvent)
      }, 1500)

      // mobile
      window.addEventListener('touchstart', (e) => {
         this.touchStart = e.changedTouches[0].clientY
      })
      window.addEventListener('touchend', this.mobileScroll)

      gsap.from('.projects-main', {
         duration: 1.0,
         opacity: 0,
         delay: 0.5,
         ease: 'power2.inOut'
      })
   },
   
   unmounted() {
      this.experience.camera.wobble = true
      this.plane.destroyProjectView()
      window.removeEventListener('wheel', this.setScrollEvent)
      window.removeEventListener('click', this.routeEvent)
      window.removeEventListener('mousemove', this.intersectEvent)
      document.body.style.cursor = 'default'

      // window.removeEventListener('touchstart')
      window.removeEventListener('touchend', this.mobileScroll)
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
               <h1>{{ this.assets[this.trackIdx].name }}</h1>
            </div>
            
         </div>
         <div class="projects-synopsis">
            <div class="project-meta">
               <div class="meta">
                  <div class="meta-header">Timeline</div>
                  <span v-for="(el, i) in this.assets[this.trackIdx].timeline" :key="i">
                     {{ el }}<br>
                  </span>
               </div>
               <div class="meta">
                  <div class="meta-header">Genre</div>
                  <span v-for="(el, i) in this.assets[this.trackIdx].genre"
                     :key="i">
                        {{ el }}<br>
                  </span>
                  <!-- {{ this.assets[this.trackIdx].genre }} -->
               </div>
               <div class="meta">
                  <div class="meta-header">Technology</div>
                  <span v-for="(el, i) in this.assets[this.trackIdx].tech"
                     :key="i">
                        {{ el }}<br>
                  </span>
               </div>
            </div>
            <p class="projects-body">
               {{ this.assets[this.trackIdx].body }}
            </p>
         </div>
      </div>
   </Transition>
</template>

<style scoped>
   h1 {
      color: var(--light200);
   }

   .slide-down-enter-active, .slide-down-leave-active {
      transition: 0.2s ease-in-out;
   }
   .slide-down-enter-active {
      transition-delay: 0.2s;
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
      transition: 0.2s ease-in-out;
   }

   .slide-up-enter-active {
      transition-delay: 0.2s;
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
      width: 33%;
      font-size: .9rem;
      font-style: oblique;
   }

   .projects-body {
      font-size: 1.1rem;
      font-family: var(--sansType);
      width: 80%;
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
      display: flex;
      flex-direction: column;
      width: 35vw;
   }

   .projects-head {
      width: 50vw;
      padding-bottom: 2rem;
   }

   .projects-main {
      display: flex;
      position: absolute;
      flex-direction: column;
      justify-content: center;
      padding-left: 8vw;
      height: calc(100vh - 8rem);
      overflow: hidden;
   }

   @media screen and (max-width: 1200px) {
      .projects-main {
         width: 100vw;
         align-items: center;
         padding-left: 0;;
      }

      .projects-meta {
         flex-wrap: wrap;
      }
      .projects-head {
         text-align: center;
         width: 100%;
         text-shadow: #0f0f0f 0 0 25px;
         /* padding-bottom: 5rem; */
      }

      .projects-head > h1 {
         font-size: 5rem;
         padding: 0 1rem;
         padding-top: 7rem;
      }
      .projects-synopsis {
         transition: 0.5s;
         align-items: center;
         width: 80vw;
         background: rgba(0, 0, 0, 0.5);
      }
   }

   @media screen and (max-width: 900px) {
      .projects-synopsis {
         width: 100vw;
      }
   }
</style>