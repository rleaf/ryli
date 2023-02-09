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
      this.assets = this.experience.resources.textures
      this.scene = this.experience.scene

      this.setGeometry()
      this.update()
   }

   setGeometry() {
      this.geometry = new THREE.PlaneGeometry(3, 2, 1, 1)
      this.fullGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
   }

   setBackdrop(assets) {
      const asset = this.assets.find(el => el.route == assets.textureName)

      this.texture = asset.texture
      this.foreColor = new THREE.Color(assets.fore)
      this.backColor = new THREE.Color(assets.back)

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

      this.foreMaterial = new THREE.ShaderMaterial({
         transparent: true,
         vertexShader: fullvertex,
         fragmentShader: fullfragment,
         uniforms: {
            uColor: { value: this.foreColor }
         }
      })

      this.backMaterial = new THREE.ShaderMaterial({
         transparent: true,
         vertexShader: fullvertex,
         fragmentShader: fullfragment,
         uniforms: {
            uColor: { value: this.backColor }
         }
      })
   }

   setMesh() {
      this.image = new THREE.Mesh(this.geometry, this.material)
      this.image.renderOrder = 1

      this.foreMesh = new THREE.Mesh(this.fullGeometry, this.foreMaterial)
      this.foreMesh.position.y = -2
      this.foreMesh.renderOrder = 2

      this.backMesh = new THREE.Mesh(this.fullGeometry, this.backMaterial)
      this.backMesh.position.y = -2
      this.backMesh.renderOrder = 0
   }

   backdropTransition() {
      this.foreMesh.position.y = -2
      this.backMesh.position.y = -2

      this.scene.add(this.foreMesh)
      this.scene.add(this.backMesh)
      
      const tl = gsap.timeline({
         defaults: {
            duration: 1,
            ease: 'power2.inOut',
         }
      })

      tl.to(this.foreMesh.position, {
         delay: 0.25,
         y: 0,
         onComplete: () => this.scene.add(this.image)
      })
      .to(this.backMesh.position, {
         y: 0,
      }, '<')
      .to(this.foreMesh.position, {
         y: 2,
         delay: 0.45,
      })
   }
   
   removeBackdrop() {
      const tl = gsap.timeline({
         defaults: {
            duration: 0.5,
            ease: 'power2.inOut'
         }
      })
      
      tl.to(this.foreMesh.position, {
         y: 0
      })
      .to(this.foreMesh.position, {
         y: -2,
         onComplete: () => this.scene.remove(this.foreMesh)
      })
      .to(this.image.position, {
         y: -4,
         onComplete: () => this.scene.remove(this.image)
      }, '<')
      .to(this.backMesh.position, {
         y: -2,
         onComplete: () => this.scene.remove(this.backMesh)
      }, '<')
   }

   update() {

   }
}