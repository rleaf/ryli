<script>
import Experience from '../../assets/Experience/Experience'
import BackdropFade from '../../components/BackdropFade.vue'
import ToTop from '../../components/ToTop.vue'
import sources from '../../assets/Experience/sources'
import util from './util/util.js'

export default {
   components: {
      BackdropFade,
      ToTop
   },

   data() {
      return {
         experience: new Experience(),
         source: sources.aramstats,
         assets: {
            textureName: 'aramstats',
            fore: 0x0f141f,
            back: 0x1f2a42,
         }
      }
   },

   created() {
      this.sphere = this.experience.world.sphere
      this.backdrop = this.experience.world.backdrop
      this.plane = this.experience.world.plane
   },

   mounted() {
      this.sphere.sphereSpin()
      this.backdrop.setBackdrop(this.assets)
      this.backdrop.backdropTransition()

      util.contentObserver()
      util.titleTween()
   },

   beforeUnmount() {
      this.sphere.sphereFadeIn()
      this.backdrop.removeBackdrop()
   },

}
</script>

<template>
   <div class="project-main">
      <div class="project-landing">
         <h1>{{ source.title }}</h1>
         <BackdropFade />
      </div>
      <div class="study-main">
         <div class="sidebar">
            <h3 class="sidebar-title">{{ source.title }}</h3>
            <div class="meta">
               <div>
                  <div class="meta-header">timeline</div>
                  <span v-for="(el, i) in source.timeline" :key="i">
                     {{ el }} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">genre</div>
                  {{ source.genre }}
               </div>
               <div>
                  <div class="meta-header">technology</div>
                  <span v-for="(el, i) in source.tech" :key="i">
                     {{ el }} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">Links</div>
                  <a href="https://github.com/rleaf/aramstats" target="_blank">Repository</a>
                  <br>
                  <a href="http://aramstats.lol/" target="_blank">Website</a>
               </div>
            </div>
            <ToTop />
            <nav>
               <ul>
                  <li><a href="#about">About The Project</a></li>
                  <li><a href="#creativeprocess">Creative Process</a></li>
                  <li><a href="#conclusion">Conclusion</a></li>
               </ul>
            </nav>
         </div>

         <div class="study">
            <section id="about">
               <h2>About The Project</h2>
               <p>
               </p>
            </section>

            <section id="creativeprocess">
               <h2>Creative Process</h2>
               <p>
               </p>
            </section>

            <section id="conclusion">
               <h2>Conclusion</h2>
               <p>
               </p>
            </section>
         </div>
      </div>
</div></template>

<style scoped>
@import url(./util/projectsStyles.css);

</style>