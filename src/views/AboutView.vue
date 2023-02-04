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
		this.experience.world.sphere.aboutView()

		gsap.from('.about-text', {
			duration: 0.5,
			y: '150%',
			delay: 0.5,
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
				<!-- <div class="tech-container">
					<h2>Design</h2>
					<ul>
						<li>Typography</li>
						<li>Figma</li>
						<li>InVision</li>
						<li>UX/UI</li>
						<ul>
							<li>Research</li>
							<li>Wireframing</li>
							<li>Prototyping</li>
						</ul>
						<li>Adobe CC</li>
						<ul>
							<li>PhotoShop</li>
							<li>Illustrator</li>
							<li>After Efects</li>
							<li>InDesign</li>
						</ul>
					</ul>
				</div>
				<div class="tech-container">
					<h2>Development</h2>
					<ul>
						<li>HTML & CSS</li>
						<li>Mongo DB</li>
						<li>GLSL</li>
						<li>AWS</li>
						<li>Python</li>
						<ul>
							<li>PyTorch</li>
							<li>Pandas</li>
							<li>NumPy</li>
							<li>Matplotlib</li>
						</ul>
						<li>JavaScript</li>
						<ul>
							<li>Vue.js</li>
							<li>Express.js</li>
							<li>Node.js</li>
							<li>Three.js</li>
							<li>D3.js</li>
							<li>GSAP</li>
						</ul>
					</ul>
				</div> -->
			</div>
			<div class="about-book">
				<div class="text-mask">
					<p class="about-text">
						Hello. My name is Ryan Lin and I am currently based in the New York metropolitan area.
					</p>
				</div>
				<div class="text-mask">
					<p class="about-text">
						I have have worked on projects involved in UX/UI design & research, full stack development, graphic design & illustration,
						typography, creative web development, and machine learning. 
					</p>
				</div>
				<div class="text-mask">
					<p class="about-text">
						<!-- In the blog section, you'll find a lot of discussion affiliated to
						machine learning.
						Accompanied with those discussions, my <a href="#" target="_blank">GitHub</a> also has repositories showing
						various models I've made. All of what I talk about
						in my blogs and, in general, knowledge of machine learning is self taught. -->
					</p>
				</div>
				<div class="text-mask">
					<p class="about-text">
						In the remaining time when I'm on cooldown from learning any of the above I enjoy
						<a href='https://www.youtube.com/channel/UCe8X-Ib4hEc7keoBQ7cMdmA' target='_blank'><u><i>lifting</i></u></a>,
						<a href='https://www.instagram.com/rylikefood/' target='_blank'><u><i>cooking</i></u></a>, practicing guitar & uke, and playing video games.
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
		display: flex;
		padding-top: 20vh;
		padding-left: 5rem;
		width: 40%;
		gap: 10px;
	}

	.tech-container {
		width: 30%;
	}

	.tech-container ul {
		font-family: var(--serifType);
		/* text-decoration: none; */
		list-style-type: none;
	}
	.tech-container li {
		line-height: 1.5;
	}
	.about-text {
		font-size: 1.5rem;
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

	.about-main {
		padding-left: 8%
	}

	.about-head {
		position: absolute;
		width: calc(100% - 15vw);
		top: 20vh;
		left: 8%;
	}
</style>