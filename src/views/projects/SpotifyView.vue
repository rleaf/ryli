<script>
import Experience from '../../assets/Experience/Experience'
import BackdropFade from '../../components/BackdropFade.vue'
import spotifyTexture from '../../assets/textures/spotify_background.webp'
import sources from '../../assets/Experience/sources'
import util from './util/projects.js'

export default {
   components: {
      BackdropFade
   },

   data() {
      return {
         experience: new Experience(),
         sources: sources,
         assets: {
            texture: spotifyTexture,
            fore: 0x168d40,
            back: 0x1DB954,
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
         <h1>Spotify</h1>
         <BackdropFade />
      </div>
      <div class="study-main">
         <div class="contents">
            <div class="meta">
               <div>
                  <div class="meta-header">timeline</div>
                  {{ sources.spotify.timeline }}
               </div>
               <div>
                  <div class="meta-header">genre</div>
                  {{ sources.spotify.genre }}
               </div>
               <div>
                  <div class="meta-header">technology</div>
                  <span v-for="(el, i) in sources.spotify.tech" :key="i">
                     {{el}}
                  </span>
               </div>
               <div>
                  <div class="meta-header">Links</div>
                  2 months
               </div>
            </div>
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#">Problem</a></li>
                  <li><a href="#">Goals</a></li>
                  <li><a href="#">Research</a></li>
                  <li><a href="#">Early Ideation</a></li>
                  <ul>
                     <li><a href="#">Navigation</a></li>
                     <li><a href="#">Store</a></li>
                     <li><a href="#">Library</a></li>
                  </ul>
                  <li><a href="#">Final Designs</a></li>
                  <ul>
                     <li><a href="#">An Overview</a></li>
                     <li><a href="#">A Closer Look</a></li>
                  </ul>
                  <li><a href="#">Conclusion</a></li>
               </ul>
            </nav>
         </div>

         <div class="study">
            <section id="introduction">
               <h2>Introduction</h2>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            </section>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore delectus, labore provident ea doloribus, odit quod consequuntur sequi mollitia pariatur nam. Odit tempora, corrupti quod delectus exercitationem eos eum eaque.
         </div>
      </div>
      <!-- <div class="project-study">
      </div> -->
   </div>
</template>

<style scoped>
   @import url(./util/projectsStyles.css);

</style>