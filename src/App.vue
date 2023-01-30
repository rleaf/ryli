<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<script>
// import { RouterLink, RouterView } from 'vue-router'
import Experience from './components/Experience.vue'

export default {
	components: {
		Experience
	},
	data() {
		return {
		}
	}
}
</script>

<template>
	<Experience />
	<nav>
		<RouterLink to="/"><img src="./assets/logo.svg" width="50" alt=""></RouterLink>
		<RouterLink to="/about">About</RouterLink>
		<RouterLink to="/projects">Projects</RouterLink>
		<RouterLink to="/blog">Blog</RouterLink>
		<RouterLink to="/food">Food</RouterLink>
		<div class="rhs-nav">
			<a href="https://github.com/rleaf" target="_blank">Github</a>
			<a href="https://github.com/rleaf" target="_blank">YouTube</a>
		</div>
	</nav>

	<RouterView />
</template>

<style scoped>

	nav {
		padding: 0 4rem;
		padding-top: 3rem;
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	nav a {
		font-family: var(--sansType);
		font-size: 0.9rem;
		text-decoration: none;
		color: white;
	}
	.rhs-nav{
		margin-left: auto;
	}

	.rhs-nav a:first-child {
		padding-right: 2rem;
	}
</style>
