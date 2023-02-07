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
      this.backdrop = this.experience.world.backdrop
      this.plane = this.experience.world.plane
   },
   
   mounted() {
      // gsap.to('.background', {
      //    opacity: 1,
      //    duration: 1.5,
      //    ease: 'power2.inOut',
      //    onComplete: () => {
      //       this.backdrop.addBackdrop()
      //    }
      // })
      // Time the proc with tweenTransition() in App.vue
      // setTimeout(() => {
         this.backdrop.addBackdrop()
      // }, 750)
   },

   beforeUnmount() {
      this.setSphere()

      this.backdrop.removeBackdrop()
      // setTimeout(() => {
      // }, 750)
   },
   
   methods: {
      setSphere() {
         gsap.to(this.sphere.material.uniforms.uOpacity, {
            value: '1',
            duration: 1.25,
            ease: 'power2.inOut'
         })
      }
   },
}
</script>

<template>
   <Transition name="slide" appear>
      <div class="spotify-main">
         <div class="project-landing">
            <h1>Spotify</h1>
            <div class="background"></div>
         </div>
         <div class="project-main">
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
   </Transition>
</template>

<style scoped>

   h1 {
      color: var(--dark000);
      top: calc(50% - 20vmin / 2);
      text-align: center;
   }

   .fade-enter-active, .fade-leave-active {
		transition: 0.5s ease-in-out;
	}

	.fade-enter-from, .fade-leave-to {
		transform: translateX(-100%);	
	}
   .project-landing {
      height: 100vh;
      width: 100%;
   }

   .background {
      position: absolute;
      opacity: 0;
      top: 0;
      width: inherit;
      height: inherit;
      z-index: -75;
      /* background: green; */
      background: rgb(78, 148, 105);
   }
   .project-main {
      width: 100%;
      color: var(--dark000);
      background: var(--light000);
   }
</style>