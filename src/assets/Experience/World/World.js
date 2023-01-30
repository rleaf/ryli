import * as THREE from 'three'
import Experience from "../Experience"
import Environment from './Environment'
// import Plane from './Plane'
import Sphere from './Sphere'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.environment = new Environment()
      // this.plane = new Plane()
      this.sphere = new Sphere()

      // this.scene.background = new THREE.Color(0x252023)
      this.scene.background = new THREE.Color(0x0E0E0E)
   }

   update() {
      // this.plane.update()
      this.sphere.update()
   }
}