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
         source: sources.aramstats,
         assets: {
            textureName: 'aramstats',
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

      // setTimeout(() => {
      //    this.vidBool = true
      // }, 1250)

      util.contentObserver()
      util.titleTween()

   },

   methods: {
      cb() {
         this.vidBool = true
      }
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
         <video class="vid" src="../../assets/projects/threeTextures/ye.mp4" autoplay loop muted style="display: none;"></video>
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
                  <a href="https://www.figma.com/file/pKzDOt9SRG9xx6W74YmBMD/aramstats?node-id=0%3A1&t=uAMzCzuDjY9yoY3A-1/" target="_blank">Figma</a>
               </div>
            </div>
            <ToTop />
            <nav>
               <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <ul>
                     <li><a href="#what">What is it?</a></li>
                  </ul>
                  <li><a href="#design">Design</a></li>
                  <ul>
                     <li><a href="#inspiration">Inspiration</a></li>
                     <!-- <li><a href="#userflow">User Flow</a></li> -->
                     <li><a href="#earlyideation">Early Ideation</a></li>
                     <li><a href="#previousdesigns">Previous Designs</a></li>
                     <li><a href="#finaldesign">Final Design</a></li>
                  </ul>
                  <li><a href="#development">Development</a></li>
                  <ul>
                     <li><a href="#frontend">The Front End</a></li>
                     <li><a href="#backend">The Back End</a></li>
                     <li><a href="#future">Future</a></li>
                  </ul>
                  <li><a href="#conclusion">Conclusion</a></li>
               </ul>
            </nav>
         </div>

         <div class="study">
            <section id="introduction">
               <h2>Introduction</h2>
               <p></p>
               <p>
                  This study is structured into two main sections: a <a href="#design">Design</a> section and a <a href="development">Development</a> section.
               </p>
               <p>
                  The design section focuses on answering big questions pertaining to UI/UX and walks through concept phases such as wireframing. I also spend some time explaining iterative changes made to the UI since the site
                  went public - how the site looked on release, versus now, as of time of writing and provide the reasons on why these changes were made.
               </p>
               <p>
                  The development section focuses on everything affiliated to the code and technology used to get the site up and running. Similarly to the design section, I will talk about choices made and their reasoning along with other
                  concepts such as future proofing.
               </p>

               <section id="what">
                  <h3>What is it?</h3>
                  <p>
                     Aramstats is a website that allows a player to parse all their available ARAM games in the Riot API and return insightful statistics.
                     <i>All Random All Mid</i>, or ARAM, is a popular gamemode in <a href="https://www.leagueoflegends.com/en-us/" target="_blank">League of Legends</a>. At a top level, ARAM consists of 10 players in a
                     5v5 format. Each player is randomly selected a champion to play where each champion has unique abilities and interactions. Winning is secured by destroying the base of the opposing team. Five members
                     on a team have to work together with their selected champion to outperform and defeat the opposing team. Similarly to how you could evaluate a player's performance in chess based off how many pieces they
                     capture or how many home runs a player hits in a game of baseball, you can evaluate a player's performance in a game of ARAM based off various statistics such as kills, deaths, assists, damage done, etc... 
                  </p>
                  <p>
                     <a href="http://aramstats.lol/na/night%20owl" target="_blank">Here</a> is an example of my Aramstats profile. Alternatively you can search for it
                     by clicking the website link to the left and searching "Night Owl" in North America.
                  </p>
               </section>
            </section>
            
            <section id="design">
               <h2>Design</h2>

               <section id="inspiration">
                  <h3>Inspiration</h3>
                  <p>
                     I used a moodboard to help establish a design environment. The "Howling Abyss", the location ARAM games are played, is a dilapidated bridge located inside a ravine surrounded by a wintery biome.
                     Colors to help promote the aesthetic were sampled from the moodboard. The moodboard is available to see at higher resolution in the Figma link to the left.
                  </p>
                  <img class="image" src="../../assets/projects/aramstats/moodboard.webp" alt="">
                  <p class="sub-text">
                     Moodboard of the Howling Abyss
                  </p>
                  <img class="image" src="../../assets/projects/aramstats/palette.webp" alt="">
                  <p class="sub-text">
                     Color palettes
                  </p>
               </section>

               <!-- <section id="userflow">
                  <h3>User Flow</h3>
                  <img class="max-image" src="../../assets/projects/aramstats/second3.webp">
                  <p class="sub-text">
                     A user flow was created for the first UI of Aramstats. It shows all navigation Enlarged user flow available to see in figma link.
                  </p>
               </section> -->

               <section id="earlyideation">
                  <h3>Early Ideation</h3>
                  <p>
                     The site layout is very simple and constitutes two main pages. First there is a landing page, shown below on the first slide, that
                     only has a couple of elements with the most important being the search bar to lookup a players profile.
                     Upon a successful response from the backend, the user would then be routed to the second main page, the profile page (called "User Ready Page" in image below).
                  </p>
                  <p>
                     Majority of UI/UX on this project was dedicated to the profile page. The layout is organized into two main columns shown below in <span style="background-color: #f4c6f3;">pink</span>
                     and <span style="background-color: #cbc0f6;">purple</span>. The reason for a side-by-side layout is to convenience interactions with elements when scrolling. There are over 160 champions
                     available to a player, so it's probable for a single profile to render a lot of <span style="background-color: #f3d09f;">champion elements</span> to the DOM.
                     A side-by-side layout would allow a user to scroll through their <span style="background-color: #f3d09f;">stats</span> for various champions and
                     have the information in the <span style="background-color: #f4c6f3;">left hand column</span> remain sticky so they're always visible to the user.
                     All <span style="background-color: #f3d09f;">champion elements</span> have a button that will conditionally render <span style="background-color: #f5ea35;">match information</span>.
                     Match information is visually indented to indicate that it is a subset of information.
                  </p>
                  <p>
                     Buttons were added to the top of the <span style="background-color: #cbc0f6;">main content element</span> to organize information to the user.
                     Other benefits the buttons provided were creating a more breathable UI so info wouldn't be too cramped and to allow for easy implementation of future panels. 
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr0">
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/new/landing_wf.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(1/2) Landing page</span>
                        <p>
                        On landing, there would be three main elements: <span style="background-color: #b4f881;">a navigation</span>,
                        <span style="background-color: #f4c4fb;">a title</span>, and a <span style="background-color: #f5ea35;">a search bar</span>. Upon entering a profile name and region, the user would hit
                        the "enter" key to request the relevant data from the backend API.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/new/user_ready_wf.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(2/2) Profile page</span>
                        <p>
                           On a successful response, the User Ready Page would render.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
               </section>


               <section id="previousdesigns">
                  <h3>Previous Designs</h3>
                  <p>
                     Below is the first concept that made its way to being shipped. At this point Aramstats was only 2 months old and the purpose was to, relatively quickly, provide a service that players
                     could use to search their profile. Although basic design choices are present such as buttons and a color palette, a heavy majority of the workload was focused on backend development.

                  </p>

                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr1">
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/early0.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(1/3) Landing page</span>
                        <p>
                           The evolution of the landing page has remained largely unchanged.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/early1.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(2/3) Profile page</span>
                        <p>
                           Instead of a side-by-side, the initial layout was top-down. Some elements were not fully implemented at this point such as the empty box below the "Overview" button.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/early2.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(3/3) Total Match History</span>
                        <p>
                           Champion elements were clickable to display match level data. Information was structured similarly to a spreadsheet.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>

                  <p>
                     The second design that made its way to being shipped sanded down on the rough edges of "incompleteness" present in the first UI. This second iteration displayed more information to a user while
                     dramatically improving how information looked by vertically structuring information and incorporating styles to visually discern detail from each other.
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr3">
                        <div class="panel">
                           <video autoplay loop muted controls src="../../assets/projects/aramstats/second0.webm" alt="" class="carousel-video"></video>
                           <span style="font-weight: bold; font-size: 0.9rem;">(1/2) Video of second UI</span>
                           <p>
                              Video showcasing the second UI. Aramstats was ~3 months old at this point and, in this build, there were no "empty" elements present in the first UI. Fullscreen recommended.
                           </p>
                        </div>
                        <div class="panel">
                           <img class="carousel-image" src="../../assets/projects/aramstats/second1.webp">
                           <span style="font-weight: bold; font-size: 0.9rem;">(2/2) Expanded Champion history</span>
                           <p>
                              "per minute" information was addded for every stat. All minor information and units were shaded to better contrast information.
                           </p>
                        </div>
                        <template #viewport>
                           <span class="flicking-arrow-prev"></span>
                           <span class="flicking-arrow-next"></span>
                        </template>
                     </Flicking>
                     <div class="side">
                        <div class="side-text">
                           <h4>Improved Sorting</h4>
                           <p>
                              Users could sort their champions played, ascending or descending, by any stat available.
                           </p>
                        </div>
                        <img class="side-media" src="../../assets/projects/aramstats/second2.webp">
                     </div>
                     <p>
                        Elements at the top of the page, above the champion information, are interactive and provided more insight for a user. General statistics such as overall winrate, multikill derivatives, and total
                        games played were immediately displayed to user on page load.
                     </p>
                     <Flicking class="carousel" :options="{ circular: true }" :plugins="arr2">
                        <div class="panel">
                           <video autoplay loop muted class="carousel-video"  src="../../assets/projects/aramstats/front-end0.webm" />
                           <span style="font-weight: bold; font-size: 0.9rem;">(1/2) Overview Panel Interactivity</span>
                           <p>
                              You can mouse-over the stacked bar plot to see a more descriptive breakdown of the subclasses and their popularity. A
                              <a href="https://github.com/rleaf/aramstats/blob/main/src/assets/aram_champ_classes.js" target="_blank">table</a> referencing
                              all champion sub-classes is available in the top right to see champion subclasses.
                           </p>
                        </div>
                        <div class="panel">
                           <video autoplay loop muted class="carousel-video" style="width: 100%;" src="../../assets/projects/aramstats/front-end1.webm" />
                           <span style="font-weight: bold; font-size: 0.9rem;">(2/2) Champion Panel Interactivity</span>
                           <p>
                              Entering any champion name on the left returns a: mythic winrate, keystone winrate, and a DPM histogram in the middle. On the right you can
                              enter any subset of champions and compare the data visually to the entry on the left.
                           </p>
                        </div>
                        <template #viewport>
                           <span class="flicking-arrow-prev"></span>
                           <span class="flicking-arrow-next"></span>
                        </template>
                     </Flicking>
               </section>
               
               
               <section id="finaldesign">
                  <h3>Final Design</h3>
                  <img class="max-image" src="../../assets/projects/aramstats/final_landing.webp" />
                  <p class="sub-text">
                     Landing page
                  </p>
                  <video autoplay loop muted controls class="carousel-video" src="../../assets/projects/aramstats/final6.webm" />
                  <p class="sub-text">Video showcasing the final design. Fullscreen recommended</p>

                  <div class="side">
                     <div class="side-text">
                        <h4>Expanded History</h4>
                        <p>
                           Clicking the button on the left of each champion tile expanded a player's history with that champion.
                        </p>
                     </div>
                     <img class="side-media" src="../../assets/projects/aramstats/final4.webp">
                  </div>

                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr4">
                     <div class="panel">
                        <img class="carousel-image"  src="../../assets/projects/aramstats/final2.webp" />
                        <span style="font-weight: bold; font-size: 0.9rem;">(1/3) Overview Panel Interactivity</span>
                        <p>
                           Mousing over the class distribution in the summoner panel provides a more detailed breakdown of champion preferences.
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image"  src="../../assets/projects/aramstats/final5.webp" />
                        <span style="font-weight: bold; font-size: 0.9rem;">(2/3) Champion Panel Interactivity</span>
                     </div>
                     <div class="panel">
                        <img class="carousel-image"  src="../../assets/projects/aramstats/final3.webp" />
                        <span style="font-weight: bold; font-size: 0.9rem;">(3/3) Challenge Tokens</span>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>

                  <!-- <p>
                     Some of the major design changes not discussed in <a href="#earlyideation">Early Ideation</a> were:
                  </p> -->

               </section>
            </section>

            <section id="development">
               <h2>Development</h2>
               <p>
                  Aramstats is built atop a MEVN (MongoDB, Express.js, Vue.js, Node.js) stack and is hosted on an AWS t2 micro instance. A GitHub repository is
                  available to look through in a link to the left. Hosting is about $10/month for the EC2 and elastic IP and about $2 for the first year on Namecheap.
               </p>

               <section id="frontend">
                  <h3>The Front End</h3>
                  <p>
                     Navigationally, the front-end of the website is quite simple and stays in line with the lofi wireframe in <a href="#design">Design</a>.
                     Additional components were needed to error handle 4xx and 5xx responses from the back-end, but majority of the work is in the 
                     <a href="https://github.com/rleaf/aramstats/blob/main/src/components/User/UserReady.vue" target="_blank">User Ready Page</a> and the components it uses.
                     When the back-end returns a successful response the User Ready Page is the main component that renders all the information and displays a profile overview providing
                     information such as Summoner information, champion stats, challenges, data visualizations, and more. A lot of the code is modularized into their own
                     components to keep a tidy environment.
                  </p>
                  <p>
                     The <a href="https://github.com/rleaf/aramstats/blob/main/src/views/UserView.vue" target="_blank">User View</a> is the component that controls what to render based off the response from the backend.
                     While no response is received, the <a href="https://github.com/rleaf/aramstats/blob/main/src/components/User/UserLoading.vue" target="_blank">User Loading</a> compoment is displayed to indicate to
                     the user that the site is operating on getting the requested info. The third possible route from this component is the
                     <a href="https://github.com/rleaf/aramstats/blob/main/src/components/User/UserError.vue" target="_blank">User Error</a> component, which handles 404, 403, a 504 responses from the backend.
                  </p>
                  <p>
                     D3.js was used to create the stacked bar plot and histogram and are <a href="https://github.com/rleaf/aramstats/blob/main/src/components/StackedBarplot.vue" target="_blank">here</a>
                     and <a href="https://github.com/rleaf/aramstats/blob/main/src/components/Histogram.vue" target="_blank">here</a> respectively on GitHub. The bar plot shows a player's preference towards the type of
                     champions they play and takes in, as an argument, an array of objects computed on its <a href="https://github.com/rleaf/aramstats/blob/main/src/components/Panels/SummonerPanel.vue" target="_blank">parent component</a>.
                     The histogram displays a distribution for stats such as "damage per minute" for any champion a user has played. The information it renders is mutable and changes for different champion searches.
                  </p>
               </section>

               <section id="backend">
                  <h3>The Back End</h3>
                  <p>
                     I used Express.js to create the <a href="https://github.com/rleaf/aramstats/tree/main/backend" target="_blank">backend</a> API such that the frontend, database, and the Riot API could communicate with each other.
                     A forked version of the <a href="https://github.com/rleaf/twisted" target="_blank">Twisted</a> API wrapper I worked on was used to pull data from the
                     Riot database. As of time of writing the main branch doesn't support some of the endpoints I use, specifically <a href="https://developer.riotgames.com/apis#lol-challenges-v1" target="_blank">lol-challenges-v1</a>.
                  </p>
                  <p>
                     The back-end operates broadly as such:
                     <ul class="numbers-list">
                        <li>A get request is received from the front-end.</li>
                        <li>Check to see if the summoner exists in Riot API.</li>
                        <i style="line-height: 2rem;">If summoner exists:</i>
                        <li>Pull all ARAM match ids and create a new collection for that summoner in MongoDB.</li>
                        <li>Iterate and parse over each match of the match id list. All relevant data Aramstats uses are written to corresponding documents within the summoner collection to MongoDB servers.</li>
                        <li>Compute the average stats from the previous step for each champion.</li>
                        <li>Pull challenge information from Riot API and write it to database.</li>
                        <li>Send response.</li>
                     </ul>
                  </p>
                  <p>
                     Updating a Summoner profile interacts with the database similarly. The main difference is that instead of going through an initial parse through the entire match list,
                     a "last match id" entry from the previous update is used as a beginning index to parse only the subsequent matches since the last update.
                  </p>
                  <p>
                     Deciding how to structure the data inside the database was the largest thought. There are currently N+1 documents in each Summoner collection where N is
                     the total champions played in a player's match history and the remaining +1 is a document to store Summoner information.
                     <a href="http://aramstats.lol/api/summoners/na/night%20owl" target="_blank">Here's</a> an example of what my Summoner collection looks like in the database.
                     You'll notice the first object in the array is the +1 extra document I was referring to and all remaining are objects are particular to a champion. Each champion document
                     contains the matches where the user has played that champion.
                  </p>
               </section>

               <section id="future">
                  <h3>Future</h3>
                  <p>
                     I've incorporated Google Analytics roughly 2 weeks ago on April 19, and the site has already reached over 100 unique visitors. These numbers are not that laudable, but what is worth
                     focusing on is that I will soon max out the available space on my current, free, MongoDB subscription. As of time of writing I'm at 455.6 of the available 512 MB.
                  </p>
                  <p>
                     As it stands, this is the current and largest problem I'm facing with Aramstats. Other platforms offer a similarly free base tier with limited resources up to a a 1024 MB, however this is
                     not a resolution, but a band-aid fix. I want to keep this site running, as it has been fun working on, however I'd like to minimize the cost where possible. I do have some ideas to combat
                     these issues and if I implement them, I'll be sure to talk about them here.
                  </p>
               </section>
            </section>

            <section id="conclusion">
               <h2>Conclusion</h2>
               <p>
                  Aramstats came as an excuse to delve into back-end technologies. There can be a lot of different moving parts in building a website and, in the case for
                  Aramstats, improving understanding with third party APIs, databases, and back-end frameworks was a primary motivation. While the site may undergo improvements every
                  now and then, it has been fully functional since its initial release and provided hundreds of users with insight to their playstyle.
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