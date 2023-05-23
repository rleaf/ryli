<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'

export default {

   head: {
      meta: [
         {
            name: 'author',
            content: 'Ryan Lin'
         },
         {
            name: 'description',
            content: `Hello, my name is Ryan Lin and I do design and development. This site serves as a place where I can showcase projects I have worked on, discuss interesting topics, and stash recipes.`
         },
         {
            property: 'og:description',
            content: `Hello, my name is Ryan Lin and I do design and development. This site serves as a place where I can showcase projects I have worked on, discuss interesting topics, and stash recipes.`
         }
      ]
   },

   data() {
      return {

      }
   },

   mounted() {
      this.experience = new Experience()
      this.sphere = this.experience.world.sphere
      this.sphere.addScene()
      this.sphere.landingView()

      const ran = 80
      const tl = gsap.timeline({
         defaults: {
            duration: 3,
            delay: 0.5,
            ease: 'power3'
         }
      })
      
      tl.from('.l1 h1', {y: gsap.utils.random(-ran, ran)})
        .from('.l2 h1', {y: gsap.utils.random(-ran, ran)}, 0)
        .from('.l3 h1', {y: gsap.utils.random(-ran, ran)}, 0)
        .from('.l4 h1', {y: gsap.utils.random(-ran, ran)}, 0)
        .from('.l5 h1', {y: gsap.utils.random(-ran, ran)}, 0)
        .from('.l6 h1', {y: gsap.utils.random(-ran, ran)}, 0)
        .from('.l7 h1', {y: gsap.utils.random(-ran, ran)}, 0)

      gsap.from('.l h1', {
         duration: 3,
         delay: .7,
         opacity: 0,
         ease: 'power1'
      })
         
      gsap.from('.landing-head h2', {
         duration: 1,
         delay: 2,
         opacity: 0,
         ease: 'power2.inOut',
         x: '7%'
      })
   }
}
</script>

<template>
   
   <div class="landing-head">
      <!-- <div class="text-mask">
         <h1 class="fore">Ryan Lin</h1>
         <h1 class="back">Ryan Lin</h1>
      </div> -->
      <span class="l l1">
         <h1 class="fore">R</h1>
         <h1 class="back">R</h1>
      </span>
      <span class="l l2">
         <h1 class="fore">y</h1>
         <h1 class="back">y</h1>
      </span>
      <span class="l l3">
         <h1 class="fore">a</h1>
         <h1 class="back">a</h1>
      </span>
      <span class="l l4">
         <h1 class="fore">n</h1>
         <h1 class="back">n</h1>
      </span>

      <div class="last-name">
         <span class="l l5">
            <h1 class="fore">L</h1>
            <h1 class="back">L</h1>
         </span>
         <span class="l l6">
            <h1 class="fore">i</h1>
            <h1 class="back">i</h1>
         </span>
         <span class="l l7">
            <h1 class="fore">n</h1>
            <h1 class="back">n</h1>
         </span>
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
      overflow: hidden;
   }

   .l {
      display: inline-block;
   }

   .last-name {
      display: inline-block;
      margin-left: 30px;
   }
   
   @media screen and (max-width: 950px) {
      .landing-head {
         top: 20vh;
      }

      h1 {
         font-size: 6rem;
      }

      .last-name {
         margin-left: 0;
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