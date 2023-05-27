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
                  <a href="https://docs.google.com/spreadsheets/d/1q4M7g4D-aJEBAxI9SHTROjkjTC3FK4_XNm9g2e7DTrA/edit?usp=sharing" target="_blank">Pain Points</a>
                  <br>
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
                  <ul>
                     <li><a href="#painpoints">Pain Points</a></li>
                  </ul>
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
                  Before digging into UX/UI, I want to address two biases. Because I'm using criticism and feedback from forum discussions on Reddit, it's
                  important to acknowledge a lot of posts, what users are reading, are prone to bandwagoning. This system not only promotes
                  messages that others may find agreeable, but also demotes messages that others may find disagreeable because everyone is able to moderate visibility of posts or comments
                  via upvotes/downvotes. This means that there could be comments in favor of the new Spotify UI,
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

            <section id="painpoints">
               <h3>Pain Points</h3>
               <p>
                  Looking through the Reddit and Spotify Community discussions, I sifted through over 300 comments for pain points users faced when interacting with the new UI.
                  Many of the comments were excluded from the data below for being vitriolic or ad hominem. Upon finishing, I totalled 168 unique instances where users
                  expressed frustrations related to UX/UI. Many of the comments had dozens of likes on the Spotify forums or hundreds of upvotes on their respective subreddits.
                  Below is an overall summary, however a more comprehensive list of these pain points is available
                  <a href="https://docs.google.com/spreadsheets/d/1q4M7g4D-aJEBAxI9SHTROjkjTC3FK4_XNm9g2e7DTrA/edit?usp=sharing" target="_blank">here</a> to look at and
                  also in the sidebar. 
               </p>
               <p>
                  There were 15 groups of recurring pain points in the 300 comments. A group is multiple pain points mentioned together by one user or pain points that are 
                  similar to one another.
                  The colors for each pain point below correspond to the colors in the pie chart.
                  <ul>
                     <li><span style="background-color: #4385f580">~30%</span> of recorded pain points state the new UI has become too "cluttered", "clunky", and feels overall "unfinished".</li>
                     <li><span style="background-color: #e9433580;">~24%</span> of recorded pain points are about sequestering a user's library to the sidebar. 
                        <br> 
                        <i>“...[the] library is what I care most about, yet it is confined to a small portion of the screen...”</i>
                        <br>
                        Although users can expand their library rightwards, they have stated it is not good enough.
                     </li>
                     <li><span style="background-color: #fcbd0380;">~14%</span> of recorded pain points are the inability to easily organize a user's library. Although custom ordering is available, the density of elements
                        such as the pill menu make it challenging. Other related frustrations were anchoring "Liked Songs" and "Your Episodes" to the top when filtering
                        by playlists and the inability to custom sort other media such as albums.</li>
                  </ul>
               </p>
               <img class="image" src="../../assets/projects/spotify/chart.webp" alt="">
               <p class="sub-text">
                  Pie chart visualizing ubiquity of pain points. Link in sidebar.
               </p>
               <p>
                  Of the ~300 comments, resolutions to improve UX involved changing to the compact library view, minimizing the social tab, and even switching to alternative platforms
                  such as Apple Music or Tidal. There was a shared consensus from the users that desktop applications should not adhere to mobile UI standards and that, by homogenizing the two,
                  detriments overall UX.
               </p>
               <p>
                  
               </p>
            </section>
         </section>

         <section id="sidebar">
            <h2>Sidebar</h2>
            <p>
               The sidebar is both the navigation tile and the library tile.
               Functionally each one behaves differently where the navigation tile allows a user to traverse to
               their Home or Search page displayed in the main window tile and the library tile allows a user to traverse through their library,
               which instead of initially mutating the main window tile is immediately viewable inside the library tile itself. Clicking on any content in a user's library then pushes content to the
               main window tile.
            </p>

            <section id="library">
               <h3>Your Library</h3>
               <p>
                  The library tile handles the bulk of user interactions. As shown by the distribution of pain points, it is the primary interface for how a user will access their Podcasts & Shows,
                  Audiobooks, Albums, and Playlists and, because of this, must be intuitive to the user. A lot of how to ameliorate intuition for UI is subjective -
                  what characteristics of UI I personally resonate with will be different from what you resonate with because we have different backgrounds and familiarity.
                  Despite that subjectivity, I do believe there are certain design patterns that can be interpreted empirically to aid intuition for the majority of users.
                  The goal of the mockups for the library tile in this section is to adhere to the priorities shown below in the first slide and resolve the affiliated pain points mentioned above.
               </p>
               <Flicking class="carousel" :options="{ circular: true }" :plugins="arr1">
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/4x.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(1/4) Landing</span>
                     <p>
                        A hierarchy establishing levels of importance of certain actions over others. Viewing the content, a user's library, takes precedence followed by
                        filtering, ordering, or searching a library. On the bottom are utility features such as creating playlists or folders and expanding the library.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/4.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(2/4) Landing</span>
                     <p>
                        The current appearance of a user's library.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/41.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(3/4) Segregating the layout</span>
                     <p>
                        Breaking down the elements of the library tile.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/42.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(4/4) Segregating the layout</span>
                     <p>
                        A user's library represented as a lofi wireframe. This wireframe will be used as a starting point to build the new mockups.
                     </p>
                  </div>
                  <template #viewport>
                     <span class="flicking-arrow-prev"></span>
                     <span class="flicking-arrow-next"></span>
                  </template>
               </Flicking>
               <p>
                  The first goal is reducing the density and confusion at the top of the library tile by moving around some of the features. The <span style="background-color: #8781bd90">pill menu</span>
                  (using colors on third slide above) specifically becomes difficult to interact with unless the library tile is wide enough. Another issue users have expressed is the complex
                  taskflow when interacting with the pill menu to filter their library. A popular example is the ability to custom sort playlists, where that option is only available if a user is
                  already filtering by playlists. Moving the functionality of the pill menu to be embedded inside the <span style="background-color: #82ca9c90;">content window</span> circumvents
                  these taskflow issues, reduces complexity at the top of the library tile, and provides more vertical space for a user to interact with their library.
                  <!-- Using the color scheme on the third slide, the various changes involve moving
                  the <span style="background-color: #8781bd90">pill menu</span> and the <span style="background-color: #6dcff690">sort dropdown menu</span> to be embedded inside the
                  <span style="background-color: #82ca9c90;">content window</span> and the <span style="background-color: #f6967990;">buttons</span> occupy the space where the dropdown menu was prior.
                  The goal of these changes is to offer more vertical space for the content window and evenly distribute content information to help organize a user’s library.
                  Instead of five elements clustered together at the top of the library tile, there are only three elements.
                  A lofi wireframe of these changes are shown below on the fifth slide. -->
               </p>
               <p>
                  The wireframe below on the second slide shows these changes. The library, by default, shows all content organized by type: Podcasts & Shows, Audiobooks, Albums, and Playlists.
                  Each section would be truncatable and have their own sorting dropdown menu for further sorting.
                  
                  <!-- Another level of hierarchy is introduced and now a user is freely able to filter their library
                  by Podcasts & Shows, Audiobooks, Albums, and Playlists.  -->
               </p>
               <Flicking class="carousel" :options="{ circular: true }" :plugins="arr2">
                     <div class="panel">
                        <img class="image" src="../../assets/projects/spotify/42.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(1/2)</span>
                        <p>
                           Starting point wireframe
                        </p>
                     </div>
                     <div class="panel">
                        <img class="image" src="../../assets/projects/spotify/5.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(2/2)</span>
                        <p>
                           Embedding pill menu functionality into the content window of the library tile.
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