import Experience from "../Experience"
import Sphere from './Sphere'
import Plane from './Plane'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.sphere = new Sphere()
      this.plane = new Plane()

   }

   update() {
      this.sphere.update()
      this.plane.update()
   }
}