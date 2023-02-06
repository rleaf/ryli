<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<script>
// import { RouterLink, RouterView } from 'vue-router'
import gsap from 'gsap'
import Experience from './components/Experience.vue'
import Nav from './components/Nav.vue'

export default {
	components: {
		Experience,
		Nav
	},
	data() {
		return {
			transition: false
		}
	},

	watch: {
		// $route(to, from) {
		// 	console.log(to)
		// 	console.log(from)
		// 	const path = to.fullPath.split('/')
		// 	if (from.name) {
		// 		if (path.length === 3 && path[1] == 'projects') {
		// 			this.tweenTransition()
		// 		}
		// 	}
		// }
	},

	methods: {
		tweenTransition() {
			const tl = gsap.timeline({
				defaults: {
					duration: 0.75,
					ease: 'power4.inOut'
				}
			})

			this.transition = true

			tl.fromTo('.transition', {
				delay: 1.5,
				x: '-100%'
			}, {
				x: '0'
			})
			.fromTo('.transition', {
				x: '0'
			}, {
				x: '-100%',
				onComplete: () => {
					this.transition = false
				}
			})
			tl.invalidate()
		}
	},

	computed: {
		projectTransition() {
			const toDepth = this.$route.path.split('/')
			const fromDepth = this.$route.path.split('/')
			console.log(toDepth, fromDepth)
		}
	},
}
</script>

<template>
	<Experience />
	<Nav />
	<div class="transition" v-show="transition" ref="transition"></div>
	<RouterView />
</template>

<style scoped>
   .transition {
      position: absolute;
      /* z-index: 1; */
      height: 100vh;
      width: 100vw;
      background: var(--dark000);
   }
</style>
