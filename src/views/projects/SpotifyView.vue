<script>
import Experience from '../../assets/Experience/Experience'
import BackdropFade from '../../components/BackdropFade.vue'
import ToTop from '../../components/ToTop.vue'
import sources from '../../assets/Experience/sources'
import util from './util/util.js'
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";

export default {
   components: {
      BackdropFade,
      ToTop,
      Flicking,
   },

   data() {
      return {
         experience: new Experience(),
         source: sources.spotify,
         assets: {
            textureName: 'spotify',
            fore: 0x0f141f,
            back: 0x1f2a42,
         },
         arr0: [new Arrow()],
         arr1: [new Arrow()],
         arr2: [new Arrow()],
         arr3: [new Arrow()],
         arr4: [new Arrow()],
         vidBool: false
      }
   },

   created() {
      this.sphere = this.experience.world.sphere
      this.backdrop = this.experience.world.backdrop
      this.plane = this.experience.world.plane
   },

   mounted() {
      this.sphere.sphereSpin()

      const video = document.querySelector('.project-landing video')

      this.backdrop.setBackdrop(this.assets, video)
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
         <!-- <video class="vid" src="../../assets/projects/threeTextures/ye.mp4" autoplay loop muted
            style="display: none;"></video> -->
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
                  <span v-for="(el, i) in source.genre" :key="i">
                     {{ el }} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">technology</div>
                  <span v-for="(el, i) in source.tech" :key="i">
                     {{ el }} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">Links</div>
                  <a href="http://aramstats.lol/" target="_blank">Website</a>
                  <br>
                  <a href="https://github.com/rleaf/aramstats" target="_blank">GitHub Repo</a>
                  <br>
                  <a href="https://www.figma.com/file/pKzDOt9SRG9xx6W74YmBMD/aramstats?node-id=0%3A1&t=uAMzCzuDjY9yoY3A-1/"
                     target="_blank">Figma</a>
               </div>
            </div>
            <ToTop />
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <ul>
                     <li><a href="#biases">Biases</a></li>
                  </ul>
                  <li><a href="#currentlayout">Current Layout</a></li>
                  <li><a href="#sidebar">Sidebar</a></li>
                  <ul>
                     <li><a href="#library">Your Library</a></li>
                  </ul>
               </ul>
            </nav>
         </div>

      <div class="study">
         <section id="introduction">
            <h2>Introduction</h2>
            <p>
               The purpose of this read is to discuss the UX/UI of the Spotify desktop app and possible room for any improvement. Since the latest UI update,
               version 1.2.11.916.geb595a67 for Windows, users on both Reddit and the Spotify Community forums have expressed frustrations stating the new UX to be
               <a href="https://www.reddit.com/r/truespotify/comments/13dus6k/this_new_ui_is_terrible_why_am_i_not_allowed_to/jjmc560/" target="_blank">obfuscating</a>
               and elements in the new UI to be unpleasant to interact with
               (<a href="https://community.spotify.com/t5/App-Features/Revert-the-terrible-new-user-interface-on-Desktops-ASAP/td-p/5572175" target="_blank">1</a>,
               <a href="https://www.reddit.com/r/spotify/comments/138f5gk/psa_how_to_get_spotify_desktop_back_to_the_old/jj7vqao/" target="_blank">2</a>).
               The mentioned Reddit discussions are in the <a href="https://reddit.com/r/spotify" target="_blank">r/spotify</a> and
               <a href="https://www.reddit.com/r/truespotify/" target="_blank">r/truespotify</a> subreddits. In r/truespotify, four out of the top ten posts in
               the past year negatively discuss the recent UI overhaul. In r/spotify,
               the thirteenth top post in the past year which has also been stickied, is a psa that discusses
               <a href="https://www.reddit.com/r/spotify/comments/138f5gk/psa_how_to_get_spotify_desktop_back_to_the_old/" target="_blank">how to get the old layout back</a>.
            </p>
            <p>
               This read is organized by discussion on elements I find to have close association with each other. Prerequisite information is interspersed throughout
               to improve clarity. As such, there are 5 sections: the bias, introduction to the current UI, the sidebar tiles, the main tile, the negative space elements, and overall cohesion.
            </p>

            <section id="biases">
               <h3>Biases</h3>
               <p>
                  Before digging into UX/UI, I want to address two biases. One is that online discussion, certainly Reddit, is prone to bandwagoning. I believe this system not only promotes
                  messages that others may find agreeable, but also demotes messages that others may find disagreeable. This means that there could be comments in favor of the new Spotify UI,
                  however they are drowned out by the ubiquity of more upvoted comments against the new UI. The second bias is that I, Ryan Lin, have been using Spotify since August 7th, 2015.
                  I’ve never had significant issue with the UX, but have certainly developed opinions over the years on things I’d like to see introduced. I feel addressing these biases
                  now will help to critique the Spotify UX more impartially. 
               </p>
            </section>
         </section>

         <section id="currentlayout">
            <h2>Current Layout</h2>
            <p>
               The current Spotify UI organizes information with tiles. There are three tiles: a <span style="background-color: #fff79990;">navigation tile</span> situated at
               the top-left, a <span style="background-color: #f5989d90;">library tile</span> situated to the
               left under the <span style="background-color: #fff79990;">navigation</span>, and a <span style="background-color: #82ca9c90;">main window tile</span> which matches the combined height of both the other two tiles and takes up the remaining rightwards real-estate. 
               Outside of those three tiles occupying the negative space you’ll find the <span style="background-color: #6dcff690;">controls</span> 
               for the current song anchored to the bottom with the classic Play/Pause, Next,
               Previous, Loop, etc…, buttons along with the <span style="background-color: #6dcff690;">Windows title bar</span> anchored to the top where application routes such as “File”, “Edit”, “View”, “Playback”, and “Help” are
               stored within a meatball menu.
            </p>
            <Flicking class="carousel" :options="{ circular: true }" :plugins="arr0">
               <div class="panel">
                  <img class="carousel-image" src="../../assets/projects/spotify/1.webp">
                  <span style="font-weight: bold; font-size: 0.9rem;">(1/2) Landing</span>
                  <p>
                     Spotify UI for version 1.2.11.916.geb595a67 on Windows 10
                  </p>
               </div>
               <div class="panel">
                  <img class="carousel-image" src="../../assets/projects/spotify/21.webp">
                  <span style="font-weight: bold; font-size: 0.9rem;">(2/2) Segregating the layout</span>
                  <p>
                     I reference the tiles <span style="background-color: #fff79990;">with</span> <span style="background-color: #f5989d90;">various</span> <span style="background-color: #82ca9c90;">colors</span> in the <span style="background-color: #6dcff690;">beginning</span>,
                     but will stop later on for readability.
                  </p>
               </div>
               <template #viewport>
                  <span class="flicking-arrow-prev"></span>
                  <span class="flicking-arrow-next"></span>
               </template>
            </Flicking>
         </section>

         <section id="sidebar">
            <h2>Sidebar</h2>
            <p>
               The sidebar is both the <span style="background-color: #fff79990;">navigation tile</span> and the <span style="background-color: #f5989d90;">library tile</span>.
               Functionally each one behaves differently where the navigation tile allows a user to traverse to
               their “Home” or “Search” page, which upon clicking either button mutates the <span style="background-color: #82ca9c90;">main window tile</span>. The library tile allows a user to traverse through their library,
               which instead of initially mutating the main window tile, is immediately viewable inside the library tile. Clicking on any content in a user's library then pushes content to the
               main window tile.
            </p>

            <section id="library">
               <h3>Your Library</h3>
               <p>
                  The library tile handles the bulk of user interactions. It is the primary interface for how a user will access their Podcasts & Shows,
                  Audiobooks, Albums, and Playlists and, because of this, must be intuitive to the user. A lot of how to ameliorate intuition for UI is subjective -
                  what characteristics of UI I personally resonate with will be different from what you resonate with because we have different backgrounds and familiarity.
                  Despite that subjectivity, I do believe there are certain design patterns that can be interpreted empirically to aid intuition for the majority of users.
               </p>
               <p>
                  The following mockups adhere to the priorities shown below in the first slide and the previously mentioned design patterns to aid intuition for users.
                  In the base archetype for the mockups,
                  the <span style="background-color: #8781bd90">pill menu</span> and the <span style="background-color: #6dcff690">sort dropdown menu</span> are embedded inside the
                  <span style="background-color: #82ca9c90;">content window</span> and the <span style="background-color: #f6967990;">buttons</span> occupy the space where the dropdown menu was prior.
                  These changes offer more vertical space for the content window by removing the pill menu and evenly distribute content information to help organize a user’s library.
                  Instead of five elements clustered together at the top of the library tile, there are only three elements.
                  A lofi wireframe of these changes are shown below on the fifth slide.
               </p>
               <Flicking class="carousel" :options="{ circular: true }" :plugins="arr1">
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/4x.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(1/5) Landing</span>
                     <p>
                        A hierarchy establishing levels of importance of certain actions over others. Viewing the content, a user's library, takes precedence followed by
                        filtering, ordering, or searching a library. On the bottom are utility features such as creating playlists or folders and expanding the library.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/4.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(2/5) Landing</span>
                     <p>
                        The general appearance of a user's library.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/41.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(3/5) Segregating the layout</span>
                     <p>
                        Breaking down the elements of the library tile.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/42.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(4/5) Segregating the layout</span>
                     <p>
                        A user's library represented as a lofi wireframe.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/43.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(5/5) Segregating the layout</span>
                     <p>
                        Lofi wireframe of the various changes mentioned above.
                     </p>
                  </div>
                  <template #viewport>
                     <span class="flicking-arrow-prev"></span>
                     <span class="flicking-arrow-next"></span>
                  </template>
               </Flicking>
            </section>
         </section>

      </div>
   </div>
</div></template>

<style scoped>@import url(./util/projectsStyles.css);

.side-media {
   max-width: 70%;
}

.side-text {
   max-width: 20%;
}

@media screen and (max-width: 1200px) {
   .side-media {
      max-width: 90%;
   }

   .side-text {
      max-width: 100%;
   }
}</style>