<script>
import Experience from '../assets/Experience/Experience'
import gsap from 'gsap'

export default {
	data() {
		return {

		}
	},

	mounted() {
		this.experience = new Experience()
		this.sphere = this.experience.world.sphere
		this.sphere.addScene()
		this.sphere.aboutView()

		gsap.from('.about-text', {
			duration: 0.5,
			y: '150%',
			delay: 1,
			stagger: 0.1
		})

		gsap.from('.about-head h1', {
			duration: 1.0,
			opacity: 0,
			delay: 0.5,
			ease: 'power2.inOut'
		})
	}
}
</script>

<template>
	<div class="about-main">
		<div class="about-head">
			<!-- <div class="fore">
			</div> -->
			<h1 class="fore">About</h1>
			<h1 class="back">About</h1>
		</div>
		<div class="about-book">
			<div class="text-mask">
				<p class="about-text">
					Hello. My name is Ryan Lin and I am currently based in the New York metropolitan area.
				</p>
			</div>
			<div class="text-mask">
				<p class="about-text">
					I have worked on projects involved in UX/UI design & research, full stack development, graphic design, illustration,
					typography, creative web development, and machine learning. 
				</p>
			</div>
			<div class="text-mask">
				<p class="about-text">
					In the remaining time when I'm on cooldown from any of the above I enjoy
					<a href='https://www.youtube.com/channel/UCe8X-Ib4hEc7keoBQ7cMdmA' target='_blank'><u><i>lifting</i></u></a>,
					<a href='https://www.instagram.com/rylikefood/' target='_blank'><u><i>cooking</i></u></a>, practicing guitar & uke, and playing video games.
				</p>
			</div>
			<div class="text-mask">
				<p class="about-text">
					This site serves as a place where I can showcase projects I have worked on, discuss interesting topics, and stash recipes.
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>

	.about-text {
		font-size: 1.75rem;
	}

	.about-text a {
		color: var(--light000);
	}

	a:hover {
		transition: .75s; 
		background: var(--dark400);
	}
	.about-book {	
		width: 40%;
		padding-top: 15vh;
	}

	.about-main {
		display: flex;
		flex-direction: row;
	}

	.about-head {
		position: relative;
		width: 50vw;
		height: 200px;
		top: 20vh;
		left: 8%;
	}

	@media screen and (max-width: 1200px) {
		.about-text {
			font-size: 1.5rem;
		}
	}

	@media screen and (max-width: 1100px) {
		.about-main {
			flex-direction: column;
			align-content: center;
		}

		.about-book {
			width: 80%;
			padding-top: 20vh;
			padding-left: 10vw;
		}
	}

	@media screen and (max-width: 950px) {
		h1 {
			font-size: 6rem;
		}

		.back {
			margin-top: -7.2rem;
		}
	}
</style>