<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<script>
// import { RouterLink, RouterView } from 'vue-router'
import Experience from './components/Experience.vue'
import Nav from './components/Nav.vue'

export default {
	components: {
		Experience,
		Nav
	},
	data() {
		return {
		}
	},
}
</script>

<template>
	<Experience />
	<Nav />

	<RouterView />
	<!-- <Transition name="fade">
	</Transition> -->
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 2.0s ease-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
