import Experience from "../Experience"
import Sphere from './Sphere'
// import Text from './Text'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.sphere = new Sphere()
      // this.text = new Text()

      // this.scene.background = new THREE.Color(0x0E0E0E)
   }

   update() {
      this.sphere.update()
      // this.text.update()
   }
}