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
         source: sources.oscilla,
         assets: {
            textureName: 'oscilla',
            fore: 0x080d12,
            back: 0x0f1b24,
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
               <h3 class="sidebar-title" >{{ source.title }}</h3>
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
                     <a href="https://github.com/rleaf/Typefaces/tree/main/Oscilla" target="_blank">Download</a>
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
                     Oscilla is a display typeface motivated by desiging glyphs that "oscilla"te between thick strokes and thin serifs. In
                     total there are 62 glyphs. A free link to download is available
                     at the bottom.
                  </p>
                  <img src="../../assets/projects/oscilla/1.webp" class="image">
                  <img src="../../assets/projects/oscilla/3.webp" class="image">

                  <div class="side">
                     <img src="../../assets/projects/oscilla/2.webp" alt="" class="side-media">
                     <div class="side-text">
                        <h4>Descender Collision</h4>
                        <p>
                           Simple ligatures were added to prevent conflict between decenders.
                        </p>
                     </div>
                  </div>
               </section>

               <section id="creativeprocess">
                  <h2>Creative Process</h2>
                  <p>
                     The key to designing a typeface is recycling assets to maintain continuity. Shown below is the main
                     artboard that houses all of the unfinalized glyphs. Above and below any
                     glyph are either assets or different designs for that glyph.
                  </p>
                  <img src="../../assets/projects/oscilla/6.webp" class="image">
                  <img src="../../assets/projects/oscilla/5.webp" class="image">
                  <div class="side">
                     <div class="side-text">
                        <h4>Not too similar</h4>
                        <p>
                           Despite recycling, many glyphs have their own unique curves to accomodate for the transition between thick strokes and pointed serifs.
                        </p>
                     </div>
                     <img src="../../assets/projects/oscilla/8.webp" alt="" class="side-media">
                  </div>
               </section>
               
               <section id="conclusion">
                  <h2>Conclusion</h2>
                  <p>
                     Designing a typeface is always fun. Except for a handful of turbulent letters (looking at you M and it's Australian twin W), the process has been a
                     way to relax. Oscilla is free to download on my Github - link in the sidebar.
                  </p>
               </section>
            </div>
         </div>
      </div>
</template>

<style scoped>
@import url(./util/projectsStyles.css);

.side-media {
   max-width: 50%;
}

.side-text {
   max-width: 40%;
}

@media screen and (max-width: 1200px) {
   .side-media {
      max-width: 80%;
   }

   .side-text {
      max-width: 100%;
   }
}

</style>