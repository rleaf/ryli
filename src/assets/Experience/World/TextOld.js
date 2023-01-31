import * as THREE from 'three'
import Experience from '../Experience'
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'

export default class Text {
   constructor() {

      this.experience = new Experience()
      this.scene = this.experience.cssScene
      this.scene.scale.set(0.01, 0.01, 0.01)
      this.time = this.experience.time

      this.setText()
      this.setObject()
      this.update()
   }

   // setText0(div) {
   //    this.text = div
   //    this.text.style = 'color: red;'
   // }

   setText() {
      this.text = document.createElement('div')
      this.text.className = 'text'
      this.text.style = `
         left: -1.45px;
         font-size: 36px;
         color: var(--light200);
      `
      this.text.textContent = 'Ryan Lin'
   }

   setObject() {
      this.textObject = new CSS3DObject(this.text)
      console.log(this.textObject)
      // this.textObject.position.set(0, 2, 0)
      // this.textObject.rotateY(-Math.PI * 0.5)
      this.scene.add(this.textObject)
   }

   update() {
      // this.textObject.y = this.time.elapsed * 0.05
   }
}