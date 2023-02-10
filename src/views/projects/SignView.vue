<script>
import Experience from '../../assets/Experience/Experience'
import BackdropFade from '../../components/BackdropFade.vue'
import ToTop from '../../components/ToTop.vue'
import sources from '../../assets/Experience/sources'
import util from './util/projects.js'

export default {
   components: {
      BackdropFade,
      ToTop
   },

   data() {
      return {
         experience: new Experience(),
         source: sources.sign,
         assets: {
            textureName: 'sign',
            fore: 0xc9c9c9,
            back: 0xe4e4e4,
         }
      }
   },

   methods: {
      imageZoom(event) {
         // https://stackoverflow.com/questions/53737648/how-get-clicked-item-in-vue
         event.target.classList.toggle('zoom')
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
         <div class="contents">
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
                  <div class="meta-header">links</div>
                  <a href="https://titles.cognella.com/advanced-public-speaking-9781793513274" target="_blank">Book</a>
               </div>
            </div>
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
                  I designed and illustrated 50 various hand gestures for <a href="https://titles.cognella.com/advanced-public-speaking-9781793513274" target="_blank"><i>"Advanced Public Speaking: Theory and Technique"</i></a>. The book involves
                  incorporating these gestures into public speaking to increase effective communication. Original inspiration
                  came from the American Sign Language, however many gestures have been redesigned to be more suitable
                  for a presentation environment.
               </p>
               <img src="../../assets/projects/sign/mock.jpg" class="image">
               <img src="../../assets/projects/sign/mock2.jpg" class="image">
               <p class="sub-text">
                  Mockups.
               </p>
            </section>
            
            <section id="creativeprocess">
               <div class="side"> 
                  <div class="side-text">
                     <h4>Problems & Resolutions</h4>
                     <p>
                        Before I could begin illustrating and designing the gestures, I needed to create them. The author marked the desired ASL signs to pull inspiration from, however also
                           emphasized that if the sign wasn't intuitive in a presentation environment, to consider variations.
                           <br>
                           <br>
                           An overlap I realized while creating the gestures
                           was that most people, when they present actually use the <i>same</i> hand movements - or at the very least similar variations. The goal was to evenly incorporate the
                           idiosyncratic movement that came with ASL while also maintaining the generality of "regular hand waving".
                           <br>
                           <br>
                           I decided to used my arms as a model for the gestures and first trace everything in Photoshop. This helped tremendously speed up drawing all 50 gestures. To account for any awkward drawings
                           that did not intuitively convey meaning or was too complex to be used in public speaking I frequently talked to other artists, designers, and the client.
                     </p>
                  </div>
                  <img src="../../assets/projects/sign/trace2.jpg" class="side-media">
               </div>
               <img src="../../assets/projects/sign/ps.jpg" class="image">
               <p class="sub-text">
                  The final draft of the 50 drawings prior to illustrating
               </p>
            </section>

            <section id="furtherimprovements">
               <h2>Further Improvements</h2>
               <p>
                  Below are 55 illustrations of the final gestures. Arrows and a grey-to-white color change were added to help communicate <i>"where to start"</i> and <i>"how to move"</i>. I did not
                  illustrate the finer characteristics of hands such as fingernails and knuckles to keep detail simple.
               </p>
               <img src="../../assets/projects/sign/illustrations1.jpg" class="image">
               <img src="../../assets/projects/sign/illustrations2.jpg" class="image">
            </section>

            <section id="conclusion">
               <h2>Conclusion</h2>
               <p>
                  I was initially apprehensive doing this project because I did not have a lot familiarity with drawing; I'd like to believe that most artists are in the <i>"same boat"</i> on the topic of
                  hands being one of the more difficult parts of a human body to draw. Before even thinking of using my own hands as a model, I started by searching <i>"*insert sign name here* ASL"</i> and tracing
                  out the images I found. 
                  <br><br>
                  This process of tracing images I found online became very quickly problematic because it wasn't reliable. Different hand shapes and perspectives removed all cohesion between my drawings.
                  After using my own hands as a model to create the gestures in a much more controlled environment, everything became more rhythmic.
               </p>
            </section>
         </div>
      </div>
      <ToTop />
   </div>
</template>

<style scoped>
@import url(./util/projectsStyles.css);

.side-media {
   max-width: 40%;
}

.side-text {
   max-width: 40%;
}
</style>