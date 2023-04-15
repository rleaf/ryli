<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'

export default {
   data() {
      return {

      }
   },

   mounted() {
      this.experience = new Experience()
      this.sphere = this.experience.world.sphere
      this.sphere.addScene()
      this.sphere.landingView()

      const tl = gsap.timeline({
         defaults: {
            duration: 2,
            delay: 0.2,
            ease: 'power2.inOut',
            y: '100%',
         }
      })

      tl.from('.fore', {})
         .from('.back', {}, 0)

      gsap.from('.landing-head h2', {
         duration: 1,
         delay: 1.5,
         opacity: 0,
         ease: 'power2.inOut',
         x: '5%'
      })
   }
}
</script>

<template>
   
   <div class="landing-head">
      <div class="text-mask">
         <h1 class="fore">Ryan Lin</h1>
         <h1 class="back">Ryan Lin</h1>
      </div>
      <h2>Design & Development</h2>
   </div>
</template>

<style scoped>

   .landing-head {
      position: absolute;
      /* width: calc(100% - 15vw); */
      top: calc(50% - 20vmin / 2);
      left: 15vw;
   }

   .fore, .back {
      /* top: -20vh; */
   }
   
   @media screen and (max-width: 950px) {
      .landing-head {
         top: 20vh;
      }

      h1 {
         font-size: 6rem;
      }

      .back {
         margin-top: -7.2rem;
         height: 8rem;
      }

      .text-mask {
         height: auto;
      }
   }
</style>