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
      Flicking
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
                  <a href="https://github.com/rleaf/aramstats" target="_blank">GitHub Repository</a>
                  <br>
                  <a href="https://www.figma.com/file/pKzDOt9SRG9xx6W74YmBMD/aramstats?node-id=0%3A1&t=uAMzCzuDjY9yoY3A-1/" target="_blank">Figma</a>
                  <br>
                  <a href="http://aramstats.lol/" target="_blank">Website</a>
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
                  </ul>
               </ul>
            </nav>
         </div>

         <div class="study">
            <section id="introduction">
               <h2>Introduction</h2>
               <p>
                  This project came to be because I wanted to learn more about backend technologies. There can be a lot of different moving parts in building a website and, in the case for
                  Aramstats, familiarizing myself further with third party APIs, databases, and backend frameworks was the primary motivation. Typically my project writeups
                  are designed to be "presentation oriented", with the intentions of showcasing my work. This writeup will be a little different because
                  a lot of what this project is about is what I've learned coding-wise.
                  I do discuss 
                  some of the other moving parts such as UI & UX in the <a href="#design">Design</a> section.
               </p>
               <p>
                  <i>All Random All Mid</i>, or ARAM, is a popular gamemode in <a href="https://www.leagueoflegends.com/en-us/" target="_blank">League of Legends</a>. At a top level, ARAM consists of 10 players in a
                  5v5 format. Each player is randomly selected a champion to play as where each champion has unique abilities and interactions. Winning is secured by destroying the base of the opposing team. Five members
                  on a team have to work together with their selected champion to outperform and defeat the opposing team. Similarly to chess, on how you could evaluate a players performance based off how many pieces they
                  capture, you can evaluate a players performance in a game of ARAM based off various statistics. The goal of Aramstats
                  is to parse all available ARAM games in the Riot API of a player and return insightful statistics.
               </p>
            </section>
            
            <section id="design">
               <h2>Design</h2>
               <p>
                  Probably similar to many other web developers and their own process, my project did not initially start in the UX / UI pipeline with
                  prototypes, wireframes, and mockups. Instead I jumped straight into coding the front and back-end before finally thinking
                  <i>"Hm. Maybe I should have done some prototypes"</i>. I don't regret the process however because I wanted to get to creating the back-end API as soon as possible,
                  but, in retrospect, I would have saved a couple of hours of frustration and thinking if I worked more with design tools such as Figma or Illustrator instead of doing everything
                  immediately in HTML and CSS.
               </p>
               <p>
                  The design assets in this section, specifically <a href="#earlyideation">Early Ideation</a>, are examples of me taking a step back to ensure a palettable
                  user interface. Clicking through the Figma file, available on the left, is encouraged.
               </p>
               <section id="earlyideation">
                  <h3>Early Ideation</h3>
                  <p>
                     Fundamentally, the site layout is very simple and only constituted two main pages: a landing page and a profile (or "Main" as referenced below in the picture) page.
                     The landing page, as show below on the first slide, composed of a couple elements with the most important being the search bar to lookup a players profile.
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
                           Figma link to the left.
                        </li>
                        <li>
                           The <span style="background-color: #aafdfc;">player-based information</span>, mentioned above, was further organized into panels that a user could click 
                           through to access specific information. The "Overview" panel displays the aforementioned holistic information about a Summoner while
                           the "Compare" panel displays tiles that provided further insight and data visualization for Champion specific performances.
                        </li>
                        <li>
                           Each <span style="background-color: #f3d09f;">champion row</span> is composed of the average stats a player has for that champion. In it, a player can see
                           the average amount of damage they've done, win/loss ratio, and more.
                        </li>
                        <li>
                           Clicking on a specific <span style="background-color: #f3d09f;">champion row</span> in "champion-based information" expanded a total match history of that particular champion.
                           This is shown either in the Figma file or on the third slide below. Each match row listed the stats a player had from a particular game, the items purchased,
                           and the date that game was played.
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
                     An enlarged user flow is available in the Figma file to look at. In it you can visually follow
                     and track the interactions available on the website.
                  </p>
                  <img class="max-image" src="../../assets/projects/aramstats/final3.webp">
               </section>
               
               <section id="finaldesign">
                  <h3>Final Design</h3>
                  <p>
                     A link to the website is available to the left to click through. Visually, the final design of the site is similar to the early concept, but a lot of more
                     information is presented to the user.
                  </p>
                  <video autoplay loop muted src="../../assets/projects/aramstats/final0.webm" alt="" class="max-image"></video>
                  
                  <img class="image" src="../../assets/projects/aramstats/final1.webp">
                  <p>
                     More information, such as kill participation, damage share,
                     and per-minute stats were added. The excess information required a
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
                  Aramstats is built atop a MEVN (MongoDB, Express.js, Vue.js, Node.js) stack. The site is hosted on an AWS t2 micro instance. A GitHub repository is
                  available to look through in a link to the left. Writing-wise, this section serves mainly as a critique into the decision making in coding Aramstats.
               </p>

               <section id="frontend">
                  <h3>The Front End</h3>
                  <p>
                     I think Aramstats is the first time I've used Vite.js (Vue 3). Still using Vue's Options API over the newer Composition API, developing the front-end
                     is a lot of fun. I did get stuck however when trying to decide how the front-end would handle a response from the back-end. At first, I intended to have three
                     different routes the website would navigate to depending on the response from the back-end: a successful response that would take you to a profile, a 
                     loading response to show to the user while a profile is being parsed, and a "Does Not Exist" response for when a user has entered an invalid name. Instead
                     I decided it would be easier and cleaner to conditionally render each one of these routes as components on the same page.
                  </p>
                  <p>
                     ##########################
                     Another library I wanted to learn was D3.js, which is used to produce different data visualizations. Currently the site uses a bar chart and a histogram
                  </p>
               </section>
            </section>
         </div>
      </div>
   </div>
</template>

<style scoped>
   @import url(./util/projectsStyles.css);

</style>