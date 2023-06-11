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
         arr5: [new Arrow()],
         arr6: [new Arrow()],
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
                  <a href="https://www.figma.com/file/EZx6ZGUI9Iu5BIe3l1QSSR/Spotify?type=design&node-id=1%3A3&t=FtafiWyuAYSGzaDJ-1" target="_blank">Figma</a>
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
                     <li><a href="#library">Library Tile</a></li>
                     <li><a href="#navigation">Navigation Tile</a></li>
                     <li><a href="#sidebartogether">Sidebar as a Whole</a></li>
                  </ul>
                  <li><a href="#mainwindow">Main Window Tile</a></li>
                  <li><a href="#albumart">Album Art</a></li>
                  <li><a href="#futureideas">Future Ideas</a></li>
                  <li><a href="#finaldesign">Final Design</a></li>
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
               left under the <span style="background-color: #fff79990;">navigation</span>, and a <span style="background-color: #82ca9c90;">main window tile</span> which matches the combined height of both the other two tiles and takes up the remaining rightwards real estate. 
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
                  I split the pain points into 15 groups. A group is multiple pain points mentioned together by one user or are 
                  similar to one another.
                  The colors for each pain point below correspond to the colors in the pie chart.
               </p>
               <p>
                  Of the 168 recorded pain points:
                  <ul>
                     <li><span style="background-color: #4385f580">~30%</span> state the new UI has become too "cluttered", "clunky", and feels overall "unfinished".</li>
                     <li><span style="background-color: #e9433580;">~24%</span>  are frustrations from sequestering a user's library to the sidebar. 
                        <br> 
                        <i>“...[the] library is what I care most about, yet it is confined to a small portion of the screen...”</i>
                        <br>
                        Although users can expand their library rightwards, they have stated it is not good enough.
                     </li>
                     <li><span style="background-color: #fcbd0380;">~14%</span> are about the inability to easily organize a user's library. Although custom ordering is available, the density of elements
                        such as the pill menu make it challenging. Other related frustrations were anchoring "Liked Songs" and "Your Episodes" to the top when filtering
                        by playlists and the inability to custom sort other media such as albums.</li>
                  </ul>
               </p>
               <img class="image" src="../../assets/projects/spotify/chart.webp" alt="">
               <p class="sub-text">
                  Pie chart visualizing ubiquity of pain points. Link in sidebar.
               </p>
               <p>
                  Of the ~300 comments, resolutions to improve UX involved changing to the compact library view, downgrading to a previous version, minimizing the social tab, and switching to alternative platforms
                  such as Apple Music or Tidal. There was a shared consensus from the users that desktop applications should not adhere to mobile UI standards and that, by homogenizing the two,
                  detriments desktop UX.
               </p>
               <p>
                  
               </p>
            </section>
         </section>

         <section id="sidebar">
            <h2>Sidebar</h2>
            <p>
               The sidebar is both the navigation tile and the library tile.
               Functionally the two tiles behave differently where the navigation tile allows a user to traverse to
               their Home or Search page displayed in the main window tile. The library tile allows a user to traverse through their library,
               which instead of initially mutating the main window tile is immediately viewable inside the library tile itself. Clicking on any content in a user's library then pushes content to the
               main window tile. Over 50% of the pain points are directed towards the sidebar and so it will be the first element I focus on.
            </p>

            <section id="library">
               <h3>Library Tile</h3>
               <p>
                  The library tile handles the bulk of user interactions. As shown by the distribution of pain points, it is the primary interface for how a user will access their Podcasts & Shows,
                  Audiobooks, Albums, and Playlists and, because of this, must be intuitive to the user. A lot of how to ameliorate intuition for UI is subjective -
                  what characteristics of UI I personally resonate with will be different from what you resonate with because we have different backgrounds and familiarity.
                  Despite that subjectivity I do believe there are certain design patterns that can aid intuition for the majority of users.
                  The goal of the mockups for the library tile in this section is to adhere to the priorities shown below in the first slide and resolve the affiliated pain points mentioned above.
               </p>
               <p>
                  The priorities comprise the major interactions with the library tile. Following general consensus from feedback on discussion about the new UI,
                  improving capability to view what is in a user's library such as playlists or albums ranks at the top. Following are the mutable actions a user has
                  on their library such as creating a playlist/folder, any means of filtering content, any means of sorting content, searching content, and pinning content. At the bottom,
                  is the ability to change the width of the library tile. This ranks last because, as you will see, I reintroduce the capability to view library contents on the main tile.
                  Note - you still can view library contents on the main tile via hotkeys such as alt+shift+4, however many users did not know this making it unintuitive.
               </p>
               <Flicking class="carousel" :options="{ circular: true }" :plugins="arr1">
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/4x.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(1/4) Sorting priorities</span>
                     <p>
                        A hierarchy establishing levels of importance of certain actions over others. Viewing the content, a user's library, takes precedence followed by
                        filtering, ordering, or searching a library. On the bottom are utility features expanding and shrinking the library tile.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/4.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(2/4) Current UI</span>
                     <p>
                        What my Spotify looks like.
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
                     <span style="font-weight: bold; font-size: 0.9rem;">(4/4) Lofi</span>
                     <p>
                        A user's library represented as a lofi wireframe. This wireframe will be used as a starting point to build the new mockups in this section.
                     </p>
                  </div>
                  <template #viewport>
                     <span class="flicking-arrow-prev"></span>
                     <span class="flicking-arrow-next"></span>
                  </template>
               </Flicking>
               <p>
                  The first goal is reducing the density and confusion at the top of the library tile by moving around some of the features. Using colors on third slide above,
                  the <span style="background-color: #8781bd90">pill menu</span>
                  specifically becomes challenging to interact with unless the library tile is wide enough.
                  Another issue users have expressed about the pill menu is the complex
                  taskflow when interacting with it to filter library content. There were many comments stating the inability
                  to <span style="background-color: #50BCCB90;">custom sort</span> playlists, where that option is only available if a user is
                  already <span style="background-color: #8781bd90">filtering</span> by playlists. This means that what you're able to sort by in the <span style="background-color: #50BCCB90;">dropdown menu</span> dynamically changes based on what you're filtering by in the pill menu. 
               </p>
               <p>
                  A possible resolution to many of these problems is to
                  move the functionality of the pill menu to be embedded inside the <span style="background-color: #82ca9c90;">content window</span>. This circumvents
                  taskflow issues, segregates the dynamic functionality between filtering and sorting, reduces complexity at the top of the library tile, organizes a user's library,
                  and provides more vertical space for a user to interact with their library.
                  Each section in the content window would be truncatable and have their own sorting dropdown menu for further sorting.
                  A downside to this resolution is that by interspersing the pill menu functionality inside the content window content is further spaced out.
                  The second change is to remove the <span style="background-color: #C9844B90">Expand</span> button and to group the <span style="background-color: #D57FD990;">Search</span>
                  with the <span style="background-color: #C9844B90">Create Playlist/Folder</span> button to be in the same row as the <span style="background-color: #C0B83290">title</span>.
                  Functionality for viewing a user's library in a larger window will be handled by the main window tile and is initially discussed in
                  <a href="#sidebartogether">Sidebar as a Whole</a>.
                  The wireframes below shows these changes.
               </p>
               <Flicking class="carousel" :options="{ circular: true }" :plugins="arr2">
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/45.png">
                     <span style="font-weight: bold; font-size: 0.9rem;">(1/2) Lofi wireframes</span>
                     <p>
                        Left-hand side: Starting point wireframe <br>
                        Right-hand side: Proposed wireframe
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/44.png">
                     <span style="font-weight: bold; font-size: 0.9rem;">(2/2) Hifi wireframes</span>
                     <p>
                        Left-hand side: What my Spotify looks like <br>
                        Right-hand side: Proposed wireframe
                     </p>
                  </div>
                  <template #viewport>
                     <span class="flicking-arrow-prev"></span>
                     <span class="flicking-arrow-next"></span>
                  </template>
               </Flicking>
               <p>
                  Because content is already organized by type, superfluous text in library contents such as (playlist, album, podcast, etc...), can be omitted to improve overall
                  clarity. An extra consideration is to allow users to set how many elements an item can have.
                  Below are three possible ways to display library content, each with a different amount of total elements. I'm introducing "Simplified View" because some users
                  don't need to see the creator as it can also be redundant. An example being my personal library tile - I don't need to see my name.
               </p>
               <img class="image" src="../../assets/projects/spotify/6.webp" alt="">
               <img class="max-image" src="../../assets/projects/spotify/61.png" alt="">
               <p class="sub-text" style="margin-bottom: 8rem;">
                  Wireframes of each representation. 
               </p>
               <p>
                  An alternative design is to remove the horizontal rows segregating each library section since the current Spotify branding has some sections that
                  use horizontal rows and some sections that do not. Although there are less elements on-screen, it may be difficult to immediately discern
                  sections from each other in the library without horizontal rows. The compact view has added vertical rows to provide structure.
               </p>
               <img class="max-image" src="../../assets/projects/spotify/7.png" alt="">
               <p class="sub-text">
                  Design variation removing horizontal rows.
               </p>
               <div class="side" style="justify-content: space-around;">
                  <div class="side-text">
                     <h4>Colored Folders</h4>
                     <p>
                        Colored folders can be used to help distinguish from each other. Users have mentioned how it can be difficult when they have many folders.
                     </p>
                  </div>
                  <img src="../../assets/projects/spotify/71.png" alt="" class="side-media">
               </div>
            </section>

            <section id="navigation">
               <h3>Navigation Tile</h3>
               <p>
                  Main navigation throughout Spotify, excluding the library, is done visually with the navigation tile; it is a very simple tile made up of two buttons
                  "Home" and "Search".
                  Clicking either button immediately
                  mutates the main window tile and highlights the button text in white. Hotkeys to aid navigation are available
                  where the mapping can be seen via <code class="code">ctrl + /</code>.
                  Although a significant portion of the criticism mentioned having difficulties "navigating", a lot of these comments seemed to be about
                  the library tile. I believe, because of the tile's simplicity, not much work is required and the intended goals have been accomplished without being
                  frustrating to use.
               </p>
               <p>
               </p>
            </section>

            <section id="sidebartogether">
               <h3>Sidebar as a Whole</h3>
               <p>
                  An overwhelming majority of the comments in the Spotify and Reddit discussions state frustrations when interacting with the sidebar. Although a lot of these
                  frustrations are directed specifically towards the library tile, I think they can be subsided by addressing the sidebar as a whole. Since
                  the latest update the sidebar has gained a lot of functionality where much of it, arguable all, is dedicated to improving UX for the library tile. An example is
                  shown below, where you can minimize/shrink and maximize/expand the entire sidebar. If a user wanted, they could have the sidebar constitute a majority of the app's
                  real estate. Although the expanded view may improve usability for the library tile, the navigation tile wastes a significant amount of space and the main window tile is
                  forced into a mobile-esque UI, which was a prominent pain point. Conversely, by minimizing the sidebar, pain points are still evident because UX for the library
                  tile deteriorates and the main window tile occupies majority of the screen, where users have stated the main window tile to be "useless".
               </p>
               <Flicking class="carousel" :options="{ circular: true }" :plugins="arr3">
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/8.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(1/2)</span>
                     <p>
                        Minimized sidebar.
                     </p>
                  </div>
                  <div class="panel">
                     <img class="image" src="../../assets/projects/spotify/81.webp">
                     <span style="font-weight: bold; font-size: 0.9rem;">(2/2)</span>
                     <p>
                        Maximized sidebar.
                     </p>
                  </div>
                  <template #viewport>
                     <span class="flicking-arrow-prev"></span>
                     <span class="flicking-arrow-next"></span>
                  </template>
               </Flicking>
               <p>
                  I believe it does not take much for the sidebar to have a successful UX because its list of priorities are very brief: to access content. This simplicity can
                  be reflected in the UI by having the main buttons in the sidebar "Home", "Search", and "Your Library" have similar taskflows. To accomplish this, all three buttons
                  will route to content to be displayed on the main window tile. Specifically, by changing the functionality of the "Your Library" button to follow in suit of
                  the other two, this precludes all of the previously mentioned pain points and offer strong possibilities for improving UX.
                  The sidebar will be able to focus on its own set of priorities and streamline UX by allowing the main window tile to
                  handle the expanded view of a user's library. Assets showing the two together will be in the <a href="#mainwindow">main window</a> section.
               </p>
               <img class="max-image" src="../../assets/projects/spotify/83.png" alt="">
            </section>
         </section>

         <section id="mainwindow">
            <h2>Main Window Tile</h2>
            <p>
               The main window tile occupies the largest amount of space and, just as the sidebar is responsible for accessing content, the main window
               is responsible for displaying content. More effectively utilizing these responsibilities by incorporating a robust library experience inside
               the main window tile can address roughly 50% of recorded pain points.
               To keep discussion in scope I will be focusing on the UX of viewing a user's library on the main window
               tile and not the UX of the alternate routes "Home" and "Search". 

               <!-- As mentioned above, removing the capability to expand the sidebar and instead using the main window tile to view library contents
               cuts down on many of the pain points. -->
            </p>
            <p>
               Currently if a user wants to view their library on the main window tile they have to use the hotkeys
               <code class="code">alt + shift + 1</code> through <code class="code">alt + shift + 4</code>. Using the colors on the slides below, each hotkey
               corresponds to a <span style="background-color: #268D3290;">section</span>
               where <span style="background-color: #A726A890;">content</span> is displayed using tiles
               as shown on the first slide. Instead of structuring the library in the main window to begin by displaying 
               <span style="background-color: #268D3290;">section content</span>,
               I'd like to incorporate a more holistic
               experience and embed all of the <span style="background-color: #30288F90;">library</span> where the layout can be seen on the second slide.
               This way when a user clicks on the "Your Library" button in the
               sidebar they are routed to a view in the main window with more autonomy similar to "Home" and "Search". A lofi wireframe of the new library is shown on the third slide.
            </p>
            <Flicking class="carousel" :options="{ circular: true }" :plugins="arr4">
               <div class="panel">
                  <img class="image" src="../../assets/projects/spotify/11.png">
                  <span style="font-weight: bold; font-size: 0.9rem;">(1/3)</span>
                  <p>
                     Home view.
                  </p>
               </div>
               <div class="panel">
                  <img class="image" src="../../assets/projects/spotify/12.png">
                  <span style="font-weight: bold; font-size: 0.9rem;">(2/3)</span>
                  <p>
                     Search view.
                  </p>
               </div>
               <div class="panel">
                  <img class="image" src="../../assets/projects/spotify/13.png">
                  <span style="font-weight: bold; font-size: 0.9rem;">(3/3)</span>
                  <p>
                     Search view.
                  </p>
               </div>
               <template #viewport>
                  <span class="flicking-arrow-prev"></span>
                  <span class="flicking-arrow-next"></span>
               </template>
            </Flicking>
            <p>
               Although having the entirety of a user's library available on one screen provides a more robust experience versus having to view sections individually,
               users with large libraries are inconvenienced because the amount of scrolling required to traverse to the bottom. This is easily fixed by allowing the pill menu to
               mutate the visibility of content shown in the second slide below. When clicking on a pill, instead of behaving as a subroute system to show specific content, they
               simply toggle content. This way users can exclude categories that they may not use while being able to view multiple shelves at once. Special tiles such as "Liked Songs" and "Your Episodes"
               have also been changed to reduce space but still visually standout by having a distinct gradient background.
            </p>
            <Flicking class="carousel" :options="{ circular: true }" :plugins="arr5">
               <div class="panel">
                  <video autoplay loop muted src="../../assets/projects/spotify/1.webm" alt="" class="carousel-image" />
                  <span style="font-weight: bold; font-size: 0.9rem;">(1/2) Prototype</span>
                  <p>
                     Showing how a user can scroll through their entire library.
                  </p>
               </div>
               <div class="panel">
                  <video autoplay loop muted src="../../assets/projects/spotify/2.webm" alt="" class="carousel-image" />
                  <span style="font-weight: bold; font-size: 0.9rem;">(2/2) Prototype</span>
                  <p>
                     Users are easily able to filter through content by interacting with the pill menu.
                  </p>
               </div>
               <template #viewport>
                  <span class="flicking-arrow-prev"></span>
                  <span class="flicking-arrow-next"></span>
               </template>
            </Flicking>
            <p>
               This new layout also simplifies the taskflow for viewing different content. Since all content is immediately available users can view a playlist or podcast in their first click
               instead of having to use the pill menu to traverse through different sections.
            </p>
            <img class="max-image" src="../../assets/projects/spotify/15.png" alt="">
            <p class="sub-text" style="margin-bottom: 4rem;">
               The "Library Information Structure 2.0" to be compared to the second slide on the previous carousel.
            </p>
         </section>
         
         <section id="albumart">
            <h2>Album Art</h2>
            <p>
               The music bar is anchored to the bottom of the app and houses the controls for listening to media. Despite remaining largely unchanged many users have addressed the new
               expanded album art to be a pain point because it is visually awkward with the sidebar and it occupies valuable space in the library tile shown below.
               Comments have stressed that they enjoy the experience of having the album art expanded however by reducing the space for the library tile it becomes difficult to
               interact with the library tile.
            </p>
            <video autoplay loop muted src="../../assets/projects/spotify/4.webm" alt="" class="max-image" />
            <p class="sub-text" style="margin-bottom: 5rem;">
               Current UI for expanded album art.
            </p>
            <p>
               The wireframe below shows the proposed change to help resolve this pain point. The current interaction is in <span style="background-color: #1F1BC860;">blue</span>
               and the proposed interaction is in <span style="background-color: #C22A2760;">red</span>. When clicking on the minimized album art, instead of intruding upwards
               into the library tile, the album art can appear on the right hand side in the main window tile with the same sliding transition. This change allows users to easily
               navigate through their library tile while when album art is expanded and also visually disconnects the album art from the sidebar so it will look less awkward and not
               "misaligned".
               The second slide shows this change.
            </p>
            <Flicking class="carousel" :options="{ circular: true }" :plugins="arr6">
               <div class="panel">
                     <img class="carousel-image" src="../../assets/projects/spotify/16.png" alt="">
                     <span style="font-weight: bold; font-size: 0.9rem;">(1/2)</span>
                     <p>
                        Wireframe
                     </p>
                  </div>
                  <div class="panel">
                     <video autoplay loop muted src="../../assets/projects/spotify/5.webm" alt="" class="carousel-image" />
                     <span style="font-weight: bold; font-size: 0.9rem;">(2/2)</span>
                     <p>
                        Simple Prototype using assets from the above sections
                     </p>
                  </div>
                  <template #viewport>
                     <span class="flicking-arrow-prev"></span>
                     <span class="flicking-arrow-next"></span>
                  </template>
               </Flicking>
         </section>
            
         <section id="futureideas">
            <h2>Future Ideas</h2>
            <p>
               This section walks off the beaten path and is more of an aside to discuss concepts that I personally think would strongly benefit the Spotify desktop UX.
               Because of this, assets shown in this section will not be in the <a href="#finaldesign">Final Design</a>.
            </p>
         </section>

         <section id="finaldesign">
            <h2>Final Design</h2>
            <p>
               The goals of this project were to:
               <ul>
                  <li>Find prominent pain points users were facing with the new desktop Spotify UI.</li>
                  <li>Propose changes and explain how they can resolve the pain points.</li>
                  <li>Create wireframes & prototypes to help visualize the proposals.</li>
               </ul>
            </p>
            <p>
               
            </p>
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