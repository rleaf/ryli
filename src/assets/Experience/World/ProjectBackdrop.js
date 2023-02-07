import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'
import cat from '../../textures/cat.png'

import vertex from '../shaders/base/backdrop/vertex.glsl'
import fragment from '../shaders/base/backdrop/fragment.glsl'

export default class ProjectBackDrop {
   constructor() {

      this.experience = new Experience()
      this.camera = this.experience.camera.instance
      this.scene = this.experience.scene
      
      this.setGeometry()
      this.setMaterial()
      this.setMesh()
      this.update()
   }

   setGeometry() {
      this.geometry = new THREE.PlaneGeometry(3, 2, 32, 32)
   }

   setMaterial() {
      this.material = new THREE.ShaderMaterial({
         transparent: true,
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uBackdrop: { value: new THREE.TextureLoader().load(cat)},
            uOpacity: { value: 0.0 }
         }
      })
   }

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
   }

   addBackdrop() {
      this.scene.add(this.mesh)
      gsap.to(this.material.uniforms.uOpacity, {
         delay: 1,
         value: 1.0,
         duration: 0.5,
         ease: 'power2.inOut'
      })
      
   }
   
   removeBackdrop() {
      gsap.to(this.material.uniforms.uOpacity, {
         value: 0.0,
         duration: 0.75,
         ease: 'power2.inOut',
         onComplete: () => {
            this.scene.remove(this.mesh)
         }
      })

   }

   update() {

   }
}