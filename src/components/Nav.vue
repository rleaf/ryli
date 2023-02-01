<script>
import gsap from 'gsap'

export default {
   data() {
      return {
         menu: false
      }
   },

   methods: {
      menuToggle() {
         this.menu = !this.menu

         let bread = document.querySelectorAll('.bread')

         if (this.menu) {
            bread[0].classList.add('top')
            bread[1].classList.add('middle')
            bread[2].classList.add('bottom')
         } else {
            bread[0].classList.remove('top')
            bread[1].classList.remove('middle') 
            bread[2].classList.remove('bottom') 
         }

         gsap.to('.test', {
            duration: 4,
            y: 100,
            // opacity: 0,
            ease: 'power4'
         })
      }, 

      tween() {
         gsap.from('.test', {
            duration: 1.5,
            y: 100,
            ease: 'power4',
            stagger: 0.1
         })
      }
   },

}
</script>

<template>
   <div class="nav-main">
      <div class="burger" @click="this.menuToggle()" style="cursor: pointer;">
         <span class="bread"></span>
         <span class="bread"></span>
         <span class="bread"></span>
      </div>
      <Transition name="slide">
         <div class="routes" v-if="this.menu">
            <nav>
               <ul>
                  <li class="test"><RouterLink to="/" @click="this.menuToggle()">Home</RouterLink></li>
                  <li><RouterLink to="/about" @click="this.menuToggle()">About</RouterLink></li>
                  <li><RouterLink to="/projects" @click="this.menuToggle()">Projects</RouterLink></li>
                  <li><RouterLink to="/blog" @click="this.menuToggle()">Blog</RouterLink></li>
                  <li><RouterLink to="/food" @click="this.menuToggle()">Food</RouterLink></li>
               </ul>
            </nav>
         </div>
      </Transition>
   </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
      transition: 0.5s ease;
   }

   .slide-enter-from, .slide-leave-to {
      transform: translateX(-100%); 
   }
   
   .test {
      opacity: 1;
   }
   .routes {
      width: 100vw;
      height: 100vh;
      overflow-y: scroll;
      background: var(--dark000);
   }

   .routes::-webkit-scrollbar {
      display: none;
   }

   .nav-main {
      position: absolute;
      z-index: 20;
   }
   nav {
      padding-left: 5rem;
      padding-top: 4rem;
   }

   nav ul {
      list-style-type: none;
   }

   nav a {
      position: relative;
      z-index: 1;
      line-height: 1.3;
      font-family: var(--displayTypeReg);
      font-size: 6rem;
      text-decoration: none;
      color: var(--light000);
      background-clip: text;
   }

   a:hover {
      color: var(--dark000);
      transition: 0.5s ease-out;
   }

   a::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      transform: scaleX(0);
      height: 100%;
      bottom: 0;
      left: 0;
      background-color: var(--light000);
      transform-origin: bottom right;
      transition: transform 0.5s ease-out;
   }

   a:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
   }

   .rhs-nav {
      margin-left: auto;
   }

   .rhs-nav a:first-child {
      padding-right: 3rem;
   }

   .burger {
      position: absolute;
      left: calc(calc(100vw - 40px) - 4rem);
      top: 3rem;
      z-index: 1;
   }

   .bread {
      left: 50% - 13px;
      background: var(--light000);
      display: block;
      width: 40px;
      height: 1px;
      margin-bottom: 5px;
      position: relative;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
         background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
         opacity 0.55s ease;
   }

   .burger span:first-child {
      transform-origin: top 20px;
   }

   .burger span:last-child {
      transform-origin: bottom 20px;
   }

   .top {
      transform: translateY(6px) rotate(45deg);
   }

   .middle {
      transform: scale(0.2);
      opacity: 0;
   }

   .bottom {
      transform: translateY(-6px) rotate(-45deg);
   }
</style>