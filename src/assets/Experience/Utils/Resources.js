import * as THREE from 'three'

export default class Resources {
   constructor(sources) {

      this.sources = sources
		this.loader = new THREE.TextureLoader()
		this.textures = []
		
		this.setTextures()
   }

   setTextures() {
		for (const [_, v] of Object.entries(this.sources)) {
			this.textures.push({
				name: v.title,
				timeline: v.timeline,
				timeline2: v.timeline2,
				genre: v.genre,
				tech: v.tech,
				body: v.body,
				texture: this.loader.load(v.cover),
				uValley: v.uValley,
				uPeak: v.uPeak
			})
		}
   }
}