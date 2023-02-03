import * as THREE from 'three'

export default class Resources {
   constructor(sources) {

      this.sources = sources
		this.loader = new THREE.TextureLoader()
		this.textures = []

		this.setTextures()
   }

   setTextures() {
		for (const source of this.sources) {
			this.textures.push(this.loader.load(source))
		}
   }
}