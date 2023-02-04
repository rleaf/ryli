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
      }
   },

   created() {
      this.assets = this.experience.world.plane.assets
      this.assetsReverse = this.experience.world.plane.assetsReverse
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

         }
      }
   },

   mounted() {
      console.log(this.assetsReverse[this.trackIdx])
      this.experience.camera.wobble = false
      this.experience.world.sphere.projectsView()
      this.experience.world.plane.initProjectView()

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
   },

   computed: {
      title() {
         if (this.$refs.title) {
            gsap.from('.projects-head h1', {
               duration: 0.5,
               opacity: 0,
               // x: '-=80%',
               ease: 'power2.inOut'
            })
         }

         return this.assetsReverse[this.trackIdx].name
      }
   }
}
</script>

<template>
   <div class="projects-main">

      <div>
         <div class="projects-head">
            <div class="fore">
               <h1 ref="title">{{ title }}</h1>
            </div>
            <h1 class="back">{{ this.assetsReverse[this.trackIdx].name }}</h1>
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
               {{ this.assetsReverse[this.trackIdx].tech }}
            </div>
         </div>
         <div class="projects-body">
            {{ this.assetsReverse[this.trackIdx].body }}
         </div>
      </div>

   </div>
</template>

<style scoped>
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
      background: var(--dark0001);
      margin-left: 8%;
      /* height: 35vh; */
      width: 28vw;
      bottom: calc(30vh - 10vmin);
   }

   .projects-head {
      position: absolute;
      width: calc(100% - 15vw);
      top: 20vh;
      left: 8%;
   }
</style>