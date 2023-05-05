import * as THREE from 'three'
import Experience from "../Experience"
import Sphere from './Sphere'
import Plane from './Plane'
import Backdrop from './ProjectBackdrop'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.sphere = new Sphere()
      this.plane = new Plane()
      this.backdrop = new Backdrop()

      // this.scene.background = new THREE.Color(0xffff00)
   }

   bg(value) {
      
      this.scene.background = new THREE.Color(0x000000)
      console.log()
   }

   update() {
      this.sphere.update()
      this.plane.update()
      this.backdrop.update()
   }
}