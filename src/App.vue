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
			toPath: null,
			fromPath: null
		}
	},

	watch: {
		$route(to, from) {
			this.toPath = to.fullPath.split('/')
			this.fromPath = from.fullPath.split('/')

			if (from.name) {
				if (this.toPath[1] == 'projects' && this.fromPath[1] == 'projects') {
					this.projectViewSphere()
				}
			}
		}
	},

	mounted() {
		this.experience = new Experience()
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

	computed: {
		routeTransition() {
			if (this.fromPath) {
				if (this.toPath[1] == 'projects' && this.fromPath[1] == 'projects') return 'toad'
			}
		}
	}

}
</script>

<template>
	<ExperienceVue />
	<Nav />
	<RouterView v-slot="{ Component}">
		<Transition :name="routeTransition">
			<div :key="this.$route.name">
				<component :is="Component" />
			</div>
		</Transition>
	</RouterView>
</template>

<style scoped>
	.toad-enter-active, .toad-leave-active {
		transition: 0.75s ease-in-out;
	}

	.toad-enter-active {
		transition-delay: 0.5s;
	}

	.toad-enter-from, .toad-leave-to {
		transform: translateY(100%);	
		/* opacity: 0;	 */
	}
</style>
