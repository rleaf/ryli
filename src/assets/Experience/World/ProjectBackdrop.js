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
            uOpacity: { value: 1.0 }
         }
      })
   }

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
   }

   addBackdrop() {
      this.scene.add(this.mesh)
   }
   
   removeBackdrop() {
      this.scene.remove(this.mesh, this.mesh2)
   }

   update() {

   }
}