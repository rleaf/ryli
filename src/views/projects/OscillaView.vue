<script>
import Experience from '../../assets/Experience/Experience'
import spotifyTexture from '../../assets/textures/oscilla_background.webp'

export default {
   data() {
      return {
         experience: new Experience(),
         assets: {
            texture: spotifyTexture,
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
            <h1>Oscilla</h1>
            <div class="background"></div>
         </div>
         <div class="project-study">
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
</template>

<style scoped>
@import url(./util/projectsStyles.css);
</style>