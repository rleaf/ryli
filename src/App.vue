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
			fromPath: null,
			maskTransition: null
		}
	},

	watch: {
		$route(to, from) {
			this.toPath = to.fullPath.split('/')
			this.fromPath = from.fullPath.split('/')
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
	},

	computed: {
		routeTransition() {
			if (this.fromPath) {
				if (this.toPath[1] == 'projects' && this.fromPath[1] == 'projects') return 'toad'
			}
		},
	}

}
</script>

<template>
	<ExperienceVue />
	<Nav />
	<RouterView v-slot="{ Component }">
		<Transition :name="routeTransition">
			<div :key="this.$route.name">
				<component :is="Component" />
			</div>
		</Transition>
	</RouterView>
</template>

<style scoped>
	.toad-enter-active, .toad-leave-active {
		transition: 0.5s ease-in-out;
	}
	
	.toad-enter-active {
		transition-delay: 0.75s;
	}

	.toad-enter-from, .toad-leave-to {
		transform: translateY(100%);	
	}
</style>
