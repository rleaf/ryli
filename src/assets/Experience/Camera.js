import * as THREE from 'three'
import Experience from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camera {
   constructor() {

      this.experience = new Experience()
      this.sizes = this.experience.sizes
      this.scene = this.experience.scene
      this.canvas = this.experience.canvas
      this.pointer = this.experience.mouse.pointer
      
      // this.pointer.x *= 0.005
      // this.pointer.y *= 0.005
      
      this.cursor = {
         x: 0,
         y: 0
      }

      this.setInstance()
      this.setControls()
      // this.setWobble()

   }

   setInstance() {
      this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
      this.instance.position.set(0, 0, 4)
      this.scene.add(this.instance)
   }

   setControls() {
      this.controls = new OrbitControls(this.instance, this.canvas)
      this.controls.enableDamping = true
      this.controls.enabled = true

   }

   setWobble() {
      window.addEventListener('mousemove', (e) => {
         this.cursor.x = e.clientX / this.sizes.width - 0.5
         this.cursor.y = e.clientY / this.sizes.height - 0.5
      })
   }

   resize() {
      this.instance.aspect = this.sizes.width / this.sizes.height
      this.instance.updateProjectionMatrix()
   }

   update() {
      this.controls.update()
      this.instance.rotation.x = -(this.pointer.y * 0.01)
      this.instance.rotation.y = (this.pointer.x * 0.01)
   }
}