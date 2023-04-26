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
         source: sources.spotify,
         assets: {
            textureName: 'spotify',
            fore: 0x168d40,
            back: 0x1DB954,
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
                  <span v-for="(el, i) in source.genre" :key="i">
                     {{ el }} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">technology</div>
                  <span v-for="(el, i) in source.tech" :key="i">
                     {{el}} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">Links</div>
                  <a href="https://www.figma.com/file/8qIHquloDrsgra2YFiTX5O/Spotify?node-id=0%3A1" target="_blank">Figma Project</a> <br>
                  <a href="https://www.figma.com/proto/8qIHquloDrsgra2YFiTX5O/Spotify?node-id=1%3A7&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A7" target="_blank">Prototype</a>
               </div>
            </div>
            <ToTop />
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#overview">Overview</a></li>
                  <li><a href="#homepage">Home Page</a></li>
                  <li><a href="#searchpage">Search Page</a></li>
                  <li><a href="#yourexperience">Your Experience</a></li>
                  <li><a href="#history">History (Recently Played)</a></li>
                  <li><a href="#history2">History (Recent Actions)</a></li>
               </ul>
            </nav>
            
         </div>

         <div class="study">
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  The motivation behind this project was to improve user experience with the current Spotify design. As much of a fan
                  (since 2013) I am of Spotify,
                  there are a lot of issues when it comes to the desktop and web app. Presented below are design changes, along with the
                  reasons why, that incorporate functional
                  benefits to the user. The changes can be categorized to improve two concerns with the current UX: the "destructive"
                  nature of a user's experience and the organization
                  of information.
               </p>
               <p>
                  The "destructive" nature refers to the inability for a user to be able to look back on their musical journey or simply their past actions. The current Recently Played and Recent Searches
                  mechanisms serve as partial examples and are discussed further below. Organizational changes are simple improvements how information is displayed to the user. In this current iteration,
                  a lot of media produced by Spotify for a user seems "arbitrarily scattered", content can be difficult to find unless specifically searched out by the user. 
                  Both a Figma project and prototype are available to click through in the sidebar.
               </p>
            </section>

            <section id="overview">
               <h2>Overview</h2>
               <p>
                  In total there are about 10 changes (as of 9/9/22) that resulted in the assets below. Throughout this explanation I will discuss the changes by referring to the
                  numbers in the following visuals. Un-notated visuals are shown throughout the explanation and are available through Figma link just above.
               </p>
               <img src="../../assets/projects/spotify/1.webp" class="image">
            </section>

            <section id="homepage">
               <h2>Home Page</h2>
               <img src="../../assets/projects/spotify/111.webp" class="image">
               <p class="sub-text">
                  Home page. Discussing changes #1-5.
               </p>
               <div class="side">
                  <img src="../../assets/projects/spotify/21.webp" class="side-media">
                  <div class="side-text">
                     <h4>Making Home More Homey</h4>
                     <p>
                        [1]: The first change was to make the home page of Spotify feel like an actual home page. This is accomplished by making the welcome message Spotify currently
                        has more personable and enlarging your profile. Just beneath the name, the graphics present on mobile version of Spotify were brought over to ease cross platform experience
                        and add functionality.
                     </p>
                     <p>
                        [2]: Minor changes were done to the side bar to better organize information and reduce the total amount of floating elements. First, the navigation buttons, "back" and
                        "forward", along with the user profile were pulled inside the sidebar. Second, the graphic element next to a page is highlighted along with the text to better
                        indicate to the user what page they are immediately in. Third, a new page named Your Experience is added which will be discussed in [7]. Fourth,
                        "Liked Songs" and "Your Episodes" have been removed from the sidebar. Even though they provided immediate access, they are awkwardly placed as they've no relationship
                        with their surrounding elements. Fifth, the "Create Playlist" option has been changed to a simple "+" sign and is moved to be below the row. 
                     </p>
                  </div>
               </div>
               <div class="side">
                  <div class="side-text">
                     <p>
                        [3]: To compensate for the negative space from introducing [1], some eye candy is added to the right hand side of the home page.
                     </p>
                     <p>
                        [4]: A Pinned section is added just below the Recently Played tiles and is customizable  by the user [4.1]. A user can pin anything in their library and have it on display
                        in ther home page. Clicking on "Customize" [4.1] inside the prototype will open up a UI for customizing pins.
                     </p>
                     <p>
                        [5]: Allow for sections of tiles to be truncated. A lot of what Spotify offers is nested deep into the scroll wheel, so by allowing truncating
                        sections of tiles the user is offered more capability for discovery by reducing work. Clicking on the truncating arrow [4] inside the prototype will offer a visualization for this.
                     </p>
                  </div>
                  <img src="../../assets/projects/spotify/3.webp" class="side-media">
               </div>
            </section>

            <section id="searchpage">
               <h2>Search Page</h2>
               <p>
                  The Search Page [6] is the first change to make the Spotify experience for the user more non-destructive. In the current build of Spotify, Recent Searches only displays the artists, albums, and
                  podcasts that were immediately clicked on after searching a query. The change, visualized below, offers four times the information in a more succint manner. In the redesign below 
                  the user is shown the query that was inputted into the search, the time the search occured, a response (what the user clicked on, if they did), and the data type of that response
                  (song, artist, album, podcast). Everything is organized by time (your most recent search shows at the top) and each section is truncatable. Clicking on Recent Search's "See All"
                  in the prototype expands the search allowing users for a better viewing experience.
               </p>
               <img src="../../assets/projects/spotify/4.webp" class="image">
               <p class="sub-text">
                  Search Page. Discussing change #6.
               </p>
            </section>

            <section id="yourexperience">
               <h2>Your Experience Page</h2>
               <p>
                  The Your Experience Page [7] is a newly introduced page and is the second change to making Spotify more non-destructive while also improving organization.
                  The purpose of this page is to house a user's musical experience.
                  On this page a user can sort, by periods of time, their most listened to media and can get an accurate feel for their past preferences or trends.
                  Below that is an aggregation of all of Spotify's generated playlists curated for a user. The aforementioned "Liked Songs" and "Your Episodes" that were previously appended to the sidebar
                  have been moved here.
               </p>
               <img src="../../assets/projects/spotify/5.webp" class="image">
               <p class="sub-text">
                  Your Experience Page. Discussing change #7.
               </p>
            </section>

            <section id="history">
               <h2>History (Recently Played)</h2>
               <p>
                  The History Page [8-10] is segregated into two sub-sections: Recently Played and Recent Actions [8], and is accessed by clicking on the prior named Recently Played graphic located below the
                  welcome message on the Home Page [1]. The new Recently Played sub-section [9] adopts the corresponding archetype present on mobile devices and further improves cross platform experience
                  between desktop and mobile devices. Similar to the new Recent Searches [6], information is organized temporally and each section of time can be truncated. The visual nesting of the media
                  illustrates whether a user was listening to a playlist or whether a user was listening to just one song.
               </p>
               <img src="../../assets/projects/spotify/6.webp" class="image">
               <p class="sub-text">
                  Your Experience Page. Discussing change #8-9.
               </p>
            </section>

            <section id="history2">
               <h2>History (Recent Actions)</h2>
               <p>
                  Recent Actions [10] serves as a scribe and records all of a users actions that have resulted in creating, updating, or deleting information. It follows a similar layout to Recent Searches [6] and
                  its accompanied page Recently Played [9]. Currently, if a user accidentally unlikes a song causing it to be removed from their "Liked Songs" playlist, it can be very difficult or even impossible to re-like
                  that song because Spotify offers limited ways to fix this issue. Although illustrated with one example, this problem is ubiquitous and extends to any "folder" such as a playlist or saved episodes
                  from podcasts. Recent Actions trivialize these problems and enable users a means to reliably undo any accident. Hovering over the top most recent action, "You created playlist Melodica ✨", in the
                  prototype will make visible an "undo" graphic on the right hand side near the time.
               </p>
               <img src="../../assets/projects/spotify/7.webp" class="image">
               <p class="sub-text">
                  Your Experience Page. Discussing change #10.
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