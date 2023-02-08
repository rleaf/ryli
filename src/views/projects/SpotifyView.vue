<script>
import Experience from '../../assets/Experience/Experience'
import spotifyTexture from '../../assets/textures/spotify_background.webp'
import sources from '../../assets/Experience/sources'

export default {
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

      const observer = new IntersectionObserver(entries => {
         entries.forEach(entry => {
            const id = entry.target.getAttribute('id')
            if (entry.intersectionRatio > 0) {
               document.querySelector(`nav li a[href="#${id}"]`).classList.add('active')
            } else {
               document.querySelector(`nav li a[href="#${id}"]`).classList.remove('active')
            }
         })
      },
         {
            rootMargin: "-30% 0% -50% 0%"
         })

      document.querySelectorAll('section[id]').forEach((section) => {
         observer.observe(section)
      });
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
         <div class="background"></div>
      </div>
      <div class="project-study">
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
                  <ul class="casenav">
                     <li><a class="anav" href="#introduction">Introduction</a></li>
                     <li><a class="anav" href="#">Problem</a></li>
                     <li><a class="anav" href="#">Goals</a></li>
                     <li><a class="anav" href="#">Research</a></li>
                     <li><a class="anav" href="#">Early Ideation</a></li>
                     <ul>
                        <li><a class="anav" href="#">Navigation</a></li>
                        <li><a class="anav" href="#">Store</a></li>
                        <li><a class="anav" href="#">Library</a></li>
                     </ul>
                     <li><a class="anav" href="#">Final Designs</a></li>
                     <ul>
                        <li><a class="anav" href="#">An Overview</a></li>
                        <li><a class="anav" href="#">A Closer Look</a></li>
                     </ul>
                     <li><a class="anav" href="#">Conclusion</a></li>
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
      </div>
   </div>
</template>

<style scoped>
   @import url(./projectsStyles.css);

</style>