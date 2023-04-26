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

// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)
// ScrollTrigger.config({
//    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
// })

export default {
   components: {
      BackdropFade,
      ToTop,
      Flicking
   },

   data() {
      return {
         experience: new Experience(),
         source: sources.steam,
         assets: {
            textureName: 'steam',
            fore: 0x0a0c0f,
            back: 0x171a21,
         },
         arr0: [new Arrow()],
         arr1: [new Arrow()],
         arr2: [new Arrow()],
         arr3: [new Arrow()],
         arr4: [new Arrow()]
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
                     {{ el }} <br>
                  </span>
               </div>
               <div>
                  <div class="meta-header">Links</div>
                  <a href="https://www.figma.com/file/IhXLtsI57GP0gw1iMC4snL/Steam?node-id=0%3A1&t=Oen9lS4G9X8Klnyi-1" target="_blank">Figma Project</a>
                  <br>
                  <a href="https://www.figma.com/proto/IhXLtsI57GP0gw1iMC4snL/Steam?page-id=0%3A1&node-id=11%3A5&viewport=2309%2C-2416%2C1.28&scaling=min-zoom&starting-point-node-id=11%3A5&show-proto-sidebar=1" target="_blank">Prototype</a>
                  <br>
                  <a href="https://www.figma.com/file/V7X0RJJZQ2zZwF4b4QCPB2/Steam?node-id=0%3A1&t=XgTeE8vkVg5GRuX7-1" target="_blank">FigJam</a>
               </div>
            </div>
            <ToTop />
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#problem">Problem</a></li>
                  <li><a href="#goals">Goals</a></li>
                  <li><a href="#research">Research</a></li>
                  <li><a href="#earlyideation">Early Ideation</a></li>
                  <ul>
                     <li><a href="#navigation">Navigation</a></li>
                     <li><a href="#store">Store</a></li>
                     <li><a href="#library">Library</a></li>
                  </ul>
                  <li><a href="#finaldesigns">Final Designs</a></li>
                  <ul>
                     <li><a href="#anoverview">An Overview</a></li>
                     <li><a href="#acloserlook">A Closer Look</a></li>
                  </ul>
                  <li><a href="#conclusion">Conclusion</a></li>
               </ul>
            </nav>
         </div>
      
         <div class="study">

            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  Steam is a video game distribution service and storefront developed by <a href="https://www.valvesoftware.com/en/" target="_blank">Valve</a> that, in 2021, has been used by over
                  an estimated <a href="https://store.steampowered.com/news/group/4145017/view/3133946090937137590" target="_blank">132 million people</a>. Embedded with an abundance of features
                  such as social networking, game streaming, digital rights management, an API for game developers, and much more, Steam is viewed by many as the default platform for gaming on PC.
               </p>
            </section>

            <section id="problem">
               <h2>Problem</h2>
               <p>
                  Steam is notoriously dense with information. Although this can be a great, when paired with a cluttered UI the usability quickly deteriorates detrimenting UX. With the amount
                  of features provided on Steam, basic navigation through the desktop application can be confusing at times and this is particularly evident within the Steam store.
                  Because the Steam store also acts as a stand-alone web app, information presented to users who use the desktop application can be redundant at times. Below highlights an example with the "Discovery Queue"
                  and how it is accessable through three different routes on the same page. Another issue is that there are three panels for navigation.
               </p>
               <img class="image" src="../../assets/projects/steam/steampic.webp" alt="">
               <p>
                  
               </p>
            </section>

            <section id="goals">
               <h2>Goals</h2>
               <p>
                  Fundamentally, the Steam desktop application should feel like a desktop application and have its own autonomy. This can be accomplished by reducing reliance of the web app's navigation and providing
                  features local to the desktop variation. The goals can be broadly summed up in three main points:
                  <ul>
                     <li>Reduce overall clutter such as issues with redundancy</li>
                     <li>Promote cohesion between desktop application and Steam store by homogenizing navigation</li>
                     <li>Improve organization and navigation throughout the desktop application</li>
                  </ul>
               </p>
            </section>

            <section id="research">
               <h2>Research</h2>
               <p>
                  Looking at Steam's popular competitors, I focused on the Epic Games Launcher and GOG because they also have web stores accessible through
                  the internet and desktop counterparts that act as a housing for the web store. Below are a handful of design observations I found.
                  <ul>
                     <li>
                        Both desktop navigation systems for the Epic Games Launcher and GOG use column over horizontal navigation. This helps differentiate the two primary means of navigation
                        when looking at the web store from the desktop application. Below, I use <span style="background-color: #79ef708e;">green</span> to
                        indicate the desktop application's navigation, and <span style="background-color: #1df0e975;">cyan</span> to indicate the web store's navigation.
                     </li>
                     <Flicking class="carousel" :options="{ circular: true }" :plugins="arr0">
                        <div class="panel">
                           <img class="carousel-image" src="../../assets/projects/steam/epicNav.webp" alt="">
                           <span style="font-weight: bold; font-size: 0.9rem;">Epic Games Launcher</span>
                        </div>
                        <div class="panel">
                           <img class="carousel-image" src="../../assets/projects/steam/gogNav.webp" alt="">
                           <span style="font-weight: bold; font-size: 0.9rem;">GOG</span>
                           <p>
                              GOG fully removes their web store navigation on their desktop application.
                              Instead, at the top, there is a smaller navigation
                              that pertains to what section you're currently in.
                           </p>
                        </div>
                        <div class="panel">
                           <img class="carousel-image" src="../../assets/projects/steam/steamNav.webp" alt="">
                           <span style="font-weight: bold; font-size: 0.9rem;">Steam</span>
                           <p>
                              Both navigations are layered on top of one another.
                           </p>
                        </div>
                        <template #viewport>
                           <span class="flicking-arrow-prev"></span>
                           <span class="flicking-arrow-next"></span>
                        </template>
                     </Flicking>
                     <li>
                        There are no immediately noticable issues, such as those with Steam's redundancy between its desktop navigation
                        and web store navigation, in both the Epic Games Launcher and GOG.
                     </li>
                     <li>
                        As mentioned previously, Steam is extraordinarily dense with information - much more so than both the Epic Games
                        Launcher and GOG. Because of this, the Epic Games Launcher and GOG
                        have simpler user flows. An example of this is with Steam's "Community" section. Although Epic Games and GOG both
                        have community forums online,
                        neither are accessible through their desktop counterparts.
                     </li>
                  </ul>
               </p>
            </section>

            <section id="earlyideation">
               <h2>Early Ideation</h2>
               <p>
                  Wireframing focused on navigation, the store, and the library.
                  <!-- These main topics focused primarily on the navigation, the store, and the library. -->
               </p>
               <img class="image" src="../../assets/projects/steam/early0.webp" alt="">
               <span style="font-size: 15px; font-style: italic; display: block; text-align: center;">*All illustrations here are available to see directly in the
                  <a class="metaLinks2" href="https://www.figma.com/file/V7X0RJJZQ2zZwF4b4QCPB2/Steam?node-id=0%3A1&t=XgTeE8vkVg5GRuX7-1" target="_blank">FigJam</a> file.
               </span>

               <section id="navigation">
                  <h3>Navigation</h3>
                  <p>
                     As a point of origin, Steam's current UI looks something like this:
                  </p>
                  <img class="image" src="../../assets/projects/steam/early1.webp" alt="">
                  <p>
                     I started by seeing what Steam would look like with a column navigation. An advantage of column navigation over the current "top bar" navigation is you can display more
                     information in nested components. The <span style="background-color: #b4f179;">free floating elements</span> are also moved over to the left hand side along with the new navigation.
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr1">
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/early2.webp" alt="">
                        <p>
                           The main sections: Store, Library, Community, and Profile are now moved from the top to where the
                           <span style="background-color: #f4bef0;">pink highlights are</span>.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/early3.webp" alt="">
                        <p>
                           Each section is <span style="background-color: #f4c997;">sub-navigable</span> allowing the user to access everything from one place.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
                  <p>
                     An initial challenge for the new navigation was deciding which direction to go to present the <span style="background-color: #ffee6d;">information</span> of
                     <span style="background-color: #f4c997;">sub-navigable sections</span>. With concept 1 shown below,
                     the area used for navigating wouldn't broach into the <span style="background-color: #a8f4ef;">main window</span>,
                     however could be difficult to use
                     because the information would be disconnected making it unintuitive.
                  </p>
                  <img class="image" src="../../assets/projects/steam/early4.webp" alt="">
                  <p>
                     As a comprimise I went with concept 2 however the panels will only be actionable on hovering. This way information from <span style="background-color: #f4c997;">sub-navigable sections</span> are
                     less concrete and don't detract from the <span style="background-color: #a8f4ef;">main window</span> as much.
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr2">
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/early5.webp" alt="">
                        <p>
                           How it would look when hovering over the <span style="background-color: #f4bef0;">Library</span>. The <span
                           style="background-color: #f4eb6e;">information</span> pertaining to that section would appear to the right.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/early6.webp" alt="">
                        <p>
                           Another benefit to this approach is that the hoverable tiles can be of any shape, allowing them to conform to any information they could show.
                           An example displayed above in <span style="background-color: #bdbdbd;">gray</span>.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
               </section>

               <section id="store">
                  <h2>Store</h2>
                  <p>
                     Early concepts for the store involved primarily cutting down on the total amount of design assets used. Because the Steam store has infinite scrolling, having idiosyncrasies between
                     different areas is visually refreshing, however if those idiosyncrasies exist in every section it can become challenging to conveniently digest the information presented.
                     Architecturally, there are minimal changes in early concepts for the store page below. What has changed is an increased repitition of the design pattern of the
                     <span style="background-color: #f4c997;">game carousels</span> presented below <span style="background-color: #b4f179;">Featured & Recommended</span>.
                  </p>
                  <img class="image" src="../../assets/projects/steam/early7.webp" alt="">
               </section>

               <section id="library">
                  <h2>Library</h2>
                  <p>
                     Majority of the focus for the Library during the concept phase was thinking of a way to bake it into the sidebar as discussed in the <a href="#navigation">navigation</a> section.
                     Having a column navigation allowed me to move the <span style="background-color: #f4c997;">What's New</span> section from the <span style="background-color: #b4f179;">main window</span>
                     of the Library to the sidebar. This allowed more breathing room to see the game tiles better.
                  </p>
                  <img class="image" src="../../assets/projects/steam/early8.webp" alt="">
               </section>
            </section>
            
            <section id="finaldesigns">
               <h2>Final Designs</h2>
               <p>
                  <i>Clicking through the <a href="https://www.figma.com/proto/IhXLtsI57GP0gw1iMC4snL/Steam?page-id=0%3A1&node-id=11%3A5&viewport=2309%2C-2416%2C1.28&scaling=min-zoom&starting-point-node-id=11%3A5&show-proto-sidebar=1" class="metaLinks2" target="_blank">Figma Prototype</a>
                  is encouraged to provide a more robust experience. The <a class="metaLinks2" href="https://www.figma.com/file/IhXLtsI57GP0gw1iMC4snL/Steam?node-id=0%3A1&t=Oen9lS4G9X8Klnyi-1" target="_blank">Figma File</a>
                  is also available to view.</i>
               </p>
               
               <section id="anoverview">
                  <h3>An Overview</h3>
                  <p>
                     The final designs can be categorized to five subjects:
                     <ul>
                        <li>navigation</li>
                        <li>the store</li>
                        <li>the library</li>
                        <li>friends</li>
                        <li>miscellaneous</li>
                     </ul>
                     This section, An Overview, will focus on the first four. The following section, <a href="#acloserlook">A Closer Look</a>,
                     will highlight the various general changes.
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr3">
                     <div class="panel">
                        <!-- <video class="finalCarouselImage" autoplay loop muted :src="storevid" alt=""></video> -->
                        <video class="carousel-image" autoplay loop muted src="../../assets/projects/steam/vid.webm" alt=""></video>
                        <p>
                           (1/5)
                           <br>
                           Video showcasing some of the interactions in the Store.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/final0.webp" alt="">
                        <p>
                           (2/5)
                           <br>
                           Landing page when you open the Steam client.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/store1.webp" alt="">
                        <p>
                           (3/5)
                           <br>
                           Your Store.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/store2.webp" alt="">
                        <p>
                           (4/5)
                           <br>
                           Categories.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/store3.webp" alt="">
                        <p>
                           (5/5)
                           <br>
                           Wishlist.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
                  <div class="side">
                     <div class="side-text">
                        <h4>A Cleaner & Simpler Navigation</h4>
                        <p>
                           The Store section in the new navigation unifies both the web store's and desktop's navigation presenting a
                           cleaner look. All relevant routing is accessable through
                           a tile system that appears on hover.
                        </p>
                     </div>
                     <video autoplay loop muted src="../../assets/projects/steam/storevid.webm" alt="" class="side-media"></video>
                  </div>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr4">
                     <div class="panel">
                        <!-- <video class="finalCarouselImage" autoplay loop muted :src="storevid" alt=""></video> -->
                        <video class="carousel-image" autoplay loop muted src="../../assets/projects/steam/libraryvid0.webm" alt=""></video>
                        <p>
                           (1/5)
                           <br>
                           Video showcasing some of the interactions in the Library.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/library0.webp" alt="">
                        <p>
                           (2/5)
                           <br>
                           Home page of the Library. Visually, it is very similar to the current Steam UI however hovering over any game tile, as
                           shown in the first slide, presents three buttons:
                           "Play", "Store Page", and "Library Page".
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/library1.webp" alt="">
                        <p>
                           (3/5)
                           <br>
                           The What's New section is moved to the sidebar.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/steam/library2.webp" alt="">
                        <p>
                           (4/5)
                           <br>
                           The "Downloads" section is also moved to the sidebar and is housed in a wider tile because of the amount of information it contains.
                        </p>
                     </div>
                     <div class="panel">
                        <video class="carousel-image" autoplay loop muted src="../../assets/projects/steam/librarygame.webm" alt=""></video>
                        <p>
                           (5/5)
                           <br>
                           The structure of the library page for a game is a little more clear. Sections are easily discernable and the navigation is further segregated from the content below.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
                  <div class="side">
                     <div class="side-text">
                        <h4>Improved Library Accessibility</h4>
                        <p>
                           A major goal for the Library page was to have it such that users could access their library from any page on
                           the Steam app. As shown to the right, you can browse
                           the Steam store and simultaneously check the games you own.
                        </p>
                     </div>
                     <img src="../../assets/projects/steam/library5.webp" alt="" class="side-media">
                  </div>
                  <div class="side">
                     <div class="side-text">
                        <h4>Chatting With Others</h4>
                        <p>
                           Socializing with friends is an important feature in Steam. Because of this, the friends list is accessible
                           through either sub-navigation of your profile or by simply clicking the icon
                           in the top right.
                        </p>
                     </div>
                     <video autoplay loop muted src="../../assets/projects/steam/friends.webm" alt="" class="side-media"></video>
                  </div>
               </section>
   
               <section id="acloserlook">
                  <h3>A Closer Look</h3>
                  <div class="side">
                     <img src="../../assets/projects/steam/status.webp" alt="" class="side-media">
                     <div class="side-text">
                        <h4>Changing Your Status</h4>
                        <p>
                           Letting your friends know whether you're online, away, or unavailable is visually easier. Simply click on your
                           profile in the top right to change status.
                        </p>
                     </div>
                  </div>
                  <div class="side">
                     <div class="side-text">
                        <h4>Keep an Eye on Downloads</h4>
                        <p>
                           Actively view current downloads by clicking on the downloads progress bar in the bottom left. Convenient for
                           the impatient (me), people
                           can drag Steam to another screen and still monitor downloads in peripheral.
                        </p>
                     </div>
                     <video autoplay loop muted src="../../assets/projects/steam/downloads.webm" alt="" class="side-media"></video>
                  </div>
                  <div class="side">
                     <div class="side-text" style="max-width: 50%;">
                        <h4>Dynamic Search</h4>
                        <p>
                           Instead of numerous search bars between main sections, there is only one and it is dynamic to the section you
                           are in.
                        </p>
                     </div>
                     <video autoplay loop muted src="../../assets/projects/steam/searchbar.webm" alt="" class="side-media"></video>
                  </div>
               </section>
            </section>


            <section id="conclusion">
               <h2>Conclusion</h2>
               <p>
                  I said it initially in the <a href="#problem">Problem</a> section, but Steam truly is dense with information and at
                  every step until the final designs I was constantly
                  reminded of that. The ubiquity of different assets and unique pages forced me to constantly ask myself the question
                  <i>"how much is too much?"</i>. I wanted to work with
                  enough pages to provide a holistic feel towards the redesign, but not so much such that I'd lose my mind.
               </p>
               <p>
                  A large consideration was acknowledging that the developmental side of the current Steam is excellent. Having a web
                  app, <a href="https://store.steampowered.com/">store.steampowered.com</a>,
                  be fully autonomous and then a desktop app that acts as a wrapper is great because that allows developers to direct
                  their efforts on a single version of the store. Despite this great benefit, I
                  believe providing a "properly robust" desktop app for users is even more awesome. To compensate both demographics,
                  the developers and users, I tried to not mutate the core structure
                  of the Steam store. Because of this, the only structural changes are the removal of the web store's top navigation
                  and sidebar.
               </p>
               <p>
                  Overall working on this project was a lot of fun and, as expected, I learned a lot. Frustrations were fortunately
                  minimal, but every once in a while there was the
                  design lull - a period where I'd look at a single asset for hours thinking <i>"this doesn't look right"</i>. I'm
                  especially proud of most of the accessibility changes:
                  being able to view your library while browsing the shop, a gauge cluster for your current download, and simplifying
                  the user flow for navigating to a game's store page in your library.
               </p>
            </section>
         </div>
      </div>
   </div>
</template>

<style scoped>
   @import url(./util/projectsStyles.css);

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
   }
</style>