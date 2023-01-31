import * as THREE from 'three'
import Experience from "./Experience";
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

export default class CSSRenderer {
   constructor() {
      
      this.experience = new Experience()
      this.canvas = this.experience.canvas
      this.sizes = this.experience.sizes
      // this.scene = this.experience.scene
      this.scene = this.experience.cssScene
      this.camera = this.experience.camera
      // this.camera2.instance.multiplyScalar(10)
      // this.setInstance()
   }

   setInstance(div) {
      // this.instance = new CSS2DRenderer({
      //    // canvas: div,
      //    antialias: true
      // })
      this.instance = new CSS3DRenderer()
      
      this.instance.setSize(this.sizes.width, this.sizes.height)
      console.log(this.sizes.height, this.sizes.width)
      this.instance.domElement.style.position = 'absolute'
      this.instance.domElement.style.top = '0'
      div.appendChild(this.instance.domElement)
      console.log(this.instance.getSize())
   }
   
   resize() {
      this.instance.setSize(this.sizes.width, this.sizes.height)
      this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
   }

   update() {
      this.instance.render(this.scene, this.camera.instance)
   }
}