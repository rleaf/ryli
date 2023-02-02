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
		this.experience.world.sphere.tweenAbout()

		gsap.from('.about-text', {
			duration: 0.5,
			y: '150%',
			delay: 0.5,
			stagger: 0.2
		})
	}
}
</script>

<template>
	<div class="about-main">

		<div>
			<div class="about-head">
				<div class="fore">
					<h1>About</h1>
				</div>
				<h1 class="back">About</h1>
			</div>

		</div>
		<div class="about-words">
			<div class="about-tech">
				asdfadsflkjad;sflkajsd;flkjasd;
			</div>
			<div class="about-book">
				<div class="text-mask">
					<p class="about-text">
						Hello. Here you'll find more about who I am and the things I enjoy doing.
						Most of my time is divided between some derivative of design, frequently UI/UX, machine learning projects, and web
						development.
					</p>
				</div>
				<div class="text-mask">
					<p class="about-text">
						The design section serves as a portfolio and showcases some of my
						previous projects.
						A lot of the technology I've used in design is abbreviated in "Technical Skills" below, however each portfolio piece
						provides a brief synopsis
						of the goals and challenges faced for that project.
					</p>
				</div>
				<div class="text-mask">
					<p class="about-text">
						In the blog section, you'll find a lot of discussion affiliated to
						machine learning.
						Accompanied with those discussions, my <a href="#" target="_blank">GitHub</a> also has repositories showing
						various models I've made. All of what I talk about
						in my blogs and, in general, knowledge of machine learning is self taught.
					</p>
				</div>
				<div class="text-mask">
					<p class="about-text">
						In the remaining time when I'm not designing something or wrapping my head around some model, I enjoy
						<a href='#' target='_blank'><u><i>power/olympic lifting</i></u></a>,
						<a href='#' target='_blank'><u><i>eating/cooking</i></u></a>, practicing guitar & ukulele,
						playing games, and reading about full stack development (particularly MEVN).
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.about-words {
		display: flex;
		padding-top: 25vh;
	}
	.about-tech {
		padding-top: 20vh;
		padding-left: 8%;
		width: 43%;
	}
	.about-text {
		overflow: hidden;
	}

	.about-text a {
		color: var(--light000);
	}

	.about-book {	
		/* margin-left: auto; */
		/* padding-top: 25vh;
		padding-right: 7vw; */
		width: 40%;
	}

	.about-head {
		position: absolute;
		width: calc(100% - 15vw);
		top: 20vh;
		left: 8%;
	}
</style>