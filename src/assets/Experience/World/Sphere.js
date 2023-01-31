import * as THREE from 'three'
import Experience from "../Experience"
import vertexShader from '../shaders/base/sphere/vertex.glsl'
import fragmentShader from '../shaders/base/sphere/fragment.glsl'

export default class Box {
   constructor() {

      this.experience = new Experience()
      this.debug = this.experience.debug
      this.scene = this.experience.scene
      this.time = this.experience.time

      if (this.debug) {
         this.debugFolder = this.debug.addFolder({
            title: 'Sphere',
            expanded: true
         })
      }

      this.setGeometry()
      this.setMaterial()
      this.setMesh()
      this.update()
   }

   setGeometry() {
      this.geometry = new THREE.SphereGeometry(2, 128, 128)
   }
   
   setMaterial() {
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertexShader,
         fragmentShader: fragmentShader,
         uniforms: {
            uFrequency: { value: 10 },
            uTime: { value: 0.0 },
            uDistortionFrequency: { value: 1.0 },
            uDistortionStrength: { value: 3.0 },
            uDisplacementFrequency: { value: 0.25 },
            uDisplacementStrength: { value: 0.25 },
         },
      })

      if (this.debug) {
         this.debugFolder.addInput(
            this.material.uniforms.uDistortionFrequency,
            'value',
            { label: 'uDistortionFrequency', min: 0, max: 10, step: 0.01 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uDistortionStrength,
            'value',
            { label: 'uDistortionStrength', min: 0, max: 10, step: 0.01 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uDisplacementFrequency,
            'value',
            { label: 'uDisplacementFrequency', min: 0, max: 10, step: 0.01 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uDisplacementStrength,
            'value',
            { label: 'uDisplacementStrength', min: 0, max: 10, step: 0.01 }
         )
      }
   }
   
   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.position.set(1.25, 0, 0)
      this.scene.add(this.mesh)
   }

   update() {
      this.material.uniforms.uTime.value = this.time.elapsed * 0.05
   }
}