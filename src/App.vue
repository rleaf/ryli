<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<script>
// import { RouterLink, RouterView } from 'vue-router'
import gsap from 'gsap'
import ExperienceVue from './components/Experience.vue'
import Experience from './assets/Experience/Experience'
import Nav from './components/Nav.vue'

export default {
	components: {
		ExperienceVue,
		Nav
	},

	data() {
		return {
			transitioning: false
		}
	},

	watch: {
		$route(to, from) {
			this.toPath = to.fullPath.split('/')
			this.fromPath = from.fullPath.split('/')

			if (from.name) {
				if (this.toPath[1] == 'projects' && this.fromPath[1] == 'projects') {
					this.transitioning = true
					setTimeout(() => {
						this.transitioning = false
					}, 750)
					// this.tweenTransition()
					this.projectViewSphere()
				}
			}
		}
	},

	mounted() {
		this.experience = new Experience()
		console.log(this.$route)
		this.sphere = this.experience.world.sphere
	},

	methods: {
		projectViewSphere() {
			gsap.to(this.sphere.mesh.rotation, {
				z: -5,
				duration: 1.25,
				ease: 'power2.inOut'
			})
			gsap.to(this.sphere.material.uniforms.uOpacity, {
				value: 0,
				duration: 1.25,
				ease: 'power2.inOut',
			})
		},
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

	// computed: {
	// 	transitionName() {
	// 		if (this.toPath != this.fromPath) {
	// 			return 'slide'
	// 		}
	// 	}
	// }

}
</script>

<template>
	<ExperienceVue />
	<Nav />
	<!-- <div class="transition" v-show="transition" ref="transition"></div> -->
	<!-- <Transition name="slide">
		<div v-if="transitioning" class="testo"></div>
	</Transition> -->
	<RouterView />
	<!-- <RouterView v-slot="{ Component}">
		<Transition name="slide">
			<component :is="Component" />
		</Transition>
	</RouterView> -->
</template>

<style scoped>
	.slide-enter-active, .slide-leave-active {
		/* transition-delay: 0.5s; */
		transition: 0.75s ease-in-out;
	}

	.slide-enter-from, .slide-leave-to {
		transform: translateX(-100%);	
		/* opacity: 0;	 */
	}

   .testo {
      position: fixed;
		overflow: hidden;
      z-index: 1;
      height: 100vh;
      width: 100%;
      background: var(--dark000);
   }
</style>
