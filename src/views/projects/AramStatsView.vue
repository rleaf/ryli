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
                  {{ source.genre }}
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
                  <li><a href="#design">Design</a></li>
                  <ul>
                     <li><a href="#earlyideation">Early Ideation</a></li>
                     <li><a href="#userflow">User Flow</a></li>
                     <li><a href="#finaldesign">Final Design</a></li>
                  </ul>
                  <li><a href="#development">Development</a></li>
                  <ul>
                     <li><a href="#frontend">The Front End</a></li>
                     <li><a href="#backend">The Back End</a></li>
                  </ul>
                  <li><a href="#conclusion">Conclusion</a></li>
               </ul>
            </nav>
         </div>

         <div class="study">
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  This project came to be because I wanted to learn more about back-end technologies. There can be a lot of different moving parts in building a website and, in the case for
                  Aramstats, familiarizing myself further with third party APIs, databases, and back-end frameworks was the primary motivation. Typically my project writeups
                  are designed to be "presentation oriented" with the intentions of showcasing my work, however this writeup will be a little different because
                  a lot of what this project is about is what I've learned coding-wise.
                  I do discuss 
                  some of the other moving parts such as UI & UX in the <a href="#design">Design</a> section.
               </p>
               <p>
                  <i>All Random All Mid</i>, or ARAM, is a popular gamemode in <a href="https://www.leagueoflegends.com/en-us/" target="_blank">League of Legends</a>. At a top level, ARAM consists of 10 players in a
                  5v5 format. Each player is randomly selected a champion to play as where each champion has unique abilities and interactions. Winning is secured by destroying the base of the opposing team. Five members
                  on a team have to work together with their selected champion to outperform and defeat the opposing team. Similarly to chess, on how you could evaluate a player's performance based off how many pieces they
                  capture, you can evaluate a player's performance in a game of ARAM based off various statistics such as kills, deaths, assists, damage done etc... The goal of Aramstats
                  is to parse all available ARAM games in the Riot API of a player and return insightful statistics.
               </p>
            </section>
            
            <section id="design">
               <h2>Design</h2>
               <p>
                  Tragically similar to many other web developers and their own process, my project did not initially start in the UX / UI pipeline with
                  prototypes, wireframes, and mockups. Instead I jumped straight into coding the front and back-end before finally thinking
                  <i>"Hm! Maybe I should have done some prototypes!"</i> I don't regret the process because I wanted to get to creating the back-end API as soon as possible,
                  but, in retrospect, I would have saved a couple of hours of frustration and thinking if I worked more with design tools such as Figma or Illustrator in the beginning instead of doing everything
                  immediately in HTML and CSS.
               </p>
               <p>
                  The design assets in this section, specifically <a href="#earlyideation">Early Ideation</a>, are examples of me taking a step back to ensure a palettable
                  user interface. Clicking through the Figma file, available through the link on the left, is encouraged.
               </p>
               <section id="earlyideation">
                  <h3>Early Ideation</h3>
                  <p>
                     Fundamentally the site layout is very simple and only constituted two main pages: a landing page and a profile (or "Main" as referenced below in the picture) page.
                     The landing page, shown below on the first slide, is composed of a couple elements with the most important being the search bar to lookup a players profile.
                     Upon entering a valid username, the back-end would get to work with pulling the appropiate data from the third party API and then, once finished, would
                     send a response to render the information on the profile page.
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr0">
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/landingpage.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">Landing page</span>
                        <p>
                           On landing, there would be three main elements: <span style="background-color: #b4f881;">a navigation</span>,
                           <span style="background-color: #f4c4fb;">a title</span>, and a <span style="background-color: #f5ea35;">a search bar</span>. 
                        </p>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/mainpage.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">Profile page</span>
                        <p>
                           The main page that displays a players "Summoner" profile is broken into two main components: <span style="background-color: #aafdfc;">player-based information</span>,
                           and <span style="background-color: #f3d09f;">champion-based information</span>.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
                  <p>
                     Below is an early concept that eventually made its way to being shipped. Some of the major additions to get to this point were:
                     <ul>
                        <li>
                           The color palette was inspired from the "Howling Abyss", the location ARAM games are played. A moodboard is available in the
                           Figma link.
                        </li>
                        <li>
                           The <span style="background-color: #aafdfc;">player-based information</span>, mentioned above, was further organized into panels that a user could click 
                           through to access specific information. The "Overview" panel displays the aforementioned holistic information about a Summoner while
                           the "Compare" panel displays tiles that provided further insight and data visualization for champion specific performances.
                        </li>
                        <li>
                           Each <span style="background-color: #f3d09f;">champion row</span> is composed of the average stats a player has for that champion. In it, a player can see
                           the average amount of damage they've done, win/loss ratio, and more.
                        </li>
                        <li>
                           Clicking on a specific <span style="background-color: #f3d09f;">champion row</span> in "champion-based information" expanded a total match history of that particular champion,
                           shown in the third slide below. Each match row lists information such as the stats a player had from a particular game, the items purchased,
                           the date that game was played, and whether they won or loss that game.
                        </li>
                     </ul>
                     
                     
                  </p>
                  <Flicking class="carousel" :options="{ circular: true }" :plugins="arr1">
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/early0.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(1/3) Landing page</span>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/early1.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(2/3) Main page</span>
                     </div>
                     <div class="panel">
                        <img class="carousel-image" src="../../assets/projects/aramstats/early2.webp">
                        <span style="font-weight: bold; font-size: 0.9rem;">(3/3) Total Match History</span>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
               </section>

               <section id="userflow">
                  <h3>User Flow</h3>
                  <p>
                     An enlarged user flow is available in the Figma link to look at. In it you can visually follow
                     and track the interactions available on the website.
                  </p>
                  <img class="max-image" src="../../assets/projects/aramstats/final3.webp">
               </section>
               
               <section id="finaldesign">
                  <h3>Final Design</h3>
                  <p>
                     A link to the website is available to click through. Visually the final design of the site is similar to the early concept, but a lot of more
                     information is presented to the user and some rough edges from the previous iteration have being sanded down.
                  </p>
                  <video autoplay loop muted src="../../assets/projects/aramstats/final0.webm" alt="" class="max-image"></video>
                  
                  <img class="image" src="../../assets/projects/aramstats/final1.webp">
                  <p>
                     More information, such as kill participation, damage share,
                     and "per-minute" stats were added. The excess information required a
                     slight redesign of the information layout, which the process can be seen in the Figma project file.
                  </p>
                  <div class="side">
                     <div class="side-text">
                        <h4>Sorting</h4>
                        <p>
                           A more organized and visually cleaner sorting panel was introduced to accomodate the increased information.
                        </p>
                     </div>
                     <img class="side-media" src="../../assets/projects/aramstats/final2.webp">
                  </div>
               </section>
            </section>

            <section id="development">
               <h2>Development</h2>
               <p>
                  Aramstats is built atop a MEVN (MongoDB, Express.js, Vue.js, Node.js) stack and is hosted on an AWS t2 micro instance. A GitHub repository is
                  available to look through in a link to the left. Hosting is about $10/month for AWS and $2 for the first year on Namecheap.
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
                     D3.js was used to create the stacked bar plot and histogram and are <a href="https://github.com/rleaf/aramstats/blob/main/src/components/StackedBarplot.vue" target="_blank">here</a>
                     and <a href="https://github.com/rleaf/aramstats/blob/main/src/components/Histogram.vue" target="_blank">here</a> respectively on GitHub. The bar plot shows a player's preference towards the type of
                     champions they play and the histogram displays a distribution for stats such as "damage per minute" for any subset of champions they have played.
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
                           Entering any champion name on the left returns a: mythic winrate, keystone winrate, and currently a DPM histogram in the middle. On the right you can
                           enter any subset of champions and compare the data visually to the entry on the left. The purpose of this comparison was to allow a user to see how well
                           they perform on a particular champion of a class by comparing that champion to the entire class.
                        </p>
                     </div>
                     <template #viewport>
                        <span class="flicking-arrow-prev"></span>
                        <span class="flicking-arrow-next"></span>
                     </template>
                  </Flicking>
               </section>

               <section id="backend">
                  <h3>The Back End</h3>
                  <p>
                     Along with Express.js to create the back-end API, a forked version of the <a href="https://github.com/rleaf/twisted" target="_blank">Twisted</a> LoL wrapper was used to pull data from the
                     Riot API. As of time of writing the main branch doesn't support some of the endpoints I use, specifically <a href="https://developer.riotgames.com/apis#lol-challenges-v1" target="_blank">lol-challenges-v1</a>.
                     The flow of the back-end is illustrated in the <a href="#userflow">user flow</a>, however for more detail the back-end currently operates broadly as such:
                     <ul class="numbers-list">
                        <li>A get request is received from the front-end.</li>
                        <li>Check to see if the summoner exists in Riot API.</li>
                        <i style="line-height: 2rem;">If summoner exists:</i>
                        <li>Pull all ARAM match ids and create a new collection for that summoner in MongoDB.</li>
                        <li>Iterate and parse over each match of the match id list. All relevant data Aramstats uses are written to corresponding documents within the summoner collection.</li>
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
            </section>

            <section id="conclusion">
               <h2>Conclusion</h2>
               <p>
                  Aramstats is a continual work in progress. Like I stated in the <a href="#introduction">Introduction</a> this project was all about learning more about back-end development, so even on the
                  first iteration of this site when there was minimal functionality to the front-end, I was already happy with the result. The most challenging point in this project will probably always
                  be the very beginning, when I began downloading all of the node modules, setting up the boilerplate, and learning about the various libraries and middleware used. 
               </p>
            </section>
         </div>
      </div>
   </div>
</template>

<style scoped>
   @import url(./util/projectsStyles.css);

</style>