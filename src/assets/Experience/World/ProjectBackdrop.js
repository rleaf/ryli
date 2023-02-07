import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'

import vertex from '../shaders/base/backdrop/vertex.glsl'
import fragment from '../shaders/base/backdrop/fragment.glsl'

import fullvertex from '../shaders/base/fullBackdrop/vertex.glsl'
import fullfragment from '../shaders/base/fullBackdrop/fragment.glsl'

export default class ProjectBackDrop {
   constructor() {

      this.experience = new Experience()
      this.camera = this.experience.camera.instance
      this.scene = this.experience.scene
      
      this.setGeometry()
      this.update()
   }

   setGeometry() {
      this.geometry = new THREE.PlaneGeometry(3, 2, 32, 32)
      this.fullGeometry = new THREE.PlaneGeometry(2, 2, 32, 32)
   }

   setBackdrop(assets) {
      this.texture = new THREE.TextureLoader().load(assets.texture)
      this.backdropColor = new THREE.Color(assets.fore)
      this.backdropColor2 = new THREE.Color(assets.back)

      this.setMaterial()
      this.setMesh()
   }

   setMaterial() {
      this.material = new THREE.ShaderMaterial({
         depthTest: false,
         transparent: true,
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uBackdrop: { value: this.texture },
            uOpacity: { value: 1.0 }
         }
      })

      this.fullMaterial = new THREE.ShaderMaterial({
         transparent: true,
         vertexShader: fullvertex,
         fragmentShader: fullfragment,
         uniforms: {
            uColor: { value: this.backdropColor }
         }
      })

      this.fullMaterial2 = new THREE.ShaderMaterial({
         transparent: true,
         vertexShader: fullvertex,
         fragmentShader: fullfragment,
         uniforms: {
            uColor: { value: this.backdropColor2 }
         }
      })
   }

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.renderOrder = 1

      this.fullMesh = new THREE.Mesh(this.fullGeometry, this.fullMaterial)
      this.fullMesh.position.y = -2
      this.fullMesh.renderOrder = 2

      this.fullMesh2 = new THREE.Mesh(this.fullGeometry, this.fullMaterial2)
      this.fullMesh2.position.y = -2
      this.fullMesh2.renderOrder = 0
   }

   backdropTransition() {
      const tl = gsap.timeline({
         defaults: {
            duration: 1,
            ease: 'power2.inOut',
         }
      })
      this.fullMesh.position.y = -2
      this.fullMesh2.position.y = -2

      // this.mesh.position.y = 0
      // this.mesh.rotation.x = 0
      
      this.scene.add(this.fullMesh)
      this.scene.add(this.fullMesh2)

      tl.to(this.fullMesh.position, {
         delay: 0.25,
         y: 0,
         onComplete: () => {
            this.scene.add(this.mesh)
         }
      })
      .to(this.fullMesh2.position, {
         y: 0,
      }, '<')
      .to(this.fullMesh.position, {
         y: 2,
         delay: 0.45,
         onComplete: () => {
            this.scene.remove(this.fullMesh)
         }
      })
   }
   
   removeBackdrop() {
      const tl = gsap.timeline({
         defaults: {
            duration: 0.5,
            ease: 'power2.inOut'
         }
      })
      
      tl.to(this.material.uniforms.uOpacity, {
         value: 0
      })
      .to(this.mesh.rotation, {
         x: Math.PI / 2,
      }, '<')
      .to(this.mesh.position, {
         y: -2,
         onComplete: () => {
            this.scene.remove(this.mesh)
         }
      }, '<')
      .to(this.fullMesh2.position, {
         y: -2,
      }, '<')
   }

   update() {

   }
}