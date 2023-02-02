import * as THREE from 'three'
import gsap from 'gsap'
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
      this.geometry = new THREE.SphereGeometry(2, 256, 256)
   }
   
   setMaterial() {
      
      this.uColor1 = {}
      this.uColor2 = {}

      this.uColor1.value = '#1300cc'
      this.uColor1.instance = new THREE.Color( this.uColor1.value )
      
      this.uColor2.value = '#e1b3e2'
      this.uColor2.instance = new THREE.Color( this.uColor2.value )

      this.material = new THREE.ShaderMaterial({
         vertexShader: vertexShader,
         fragmentShader: fragmentShader,
         uniforms: {
            uColor1: { value: this.uColor1.instance },
            uColor2: { value: this.uColor2.instance },
            uFrequency: { value: 10 },
            uTime: { value: 0.0 },
            uDistortionFrequency: { value: 1.3 },
            uDistortionStrength: { value: 1.3 },
            uDisplacementFrequency: { value: 0.65 },
            uDisplacementStrength: { value: 0.25 },
         },
      })

      if (this.debug) {
         this.debugFolder.addInput(
            this.uColor1, 'value', 
            {label: 'valley'}
         )
         .on('change', () => {
            this.uColor1.instance.set(this.uColor1.value)
         })

         this.debugFolder.addInput(
            this.uColor2, 'value', 
            {label: 'peak'}
         )
         .on('change', () => {
            this.uColor2.instance.set(this.uColor2.value)
         })
         // this.debugFolder.addInput(
         //    this.material.uniforms.uDistortionFrequency,
         //    'value',
         //    { label: 'uDistortionFrequency', min: 0, max: 10, step: 0.01 }
         // )
         // this.debugFolder.addInput(
         //    this.material.uniforms.uDistortionStrength,
         //    'value',
         //    { label: 'uDistortionStrength', min: 0, max: 10, step: 0.01 }
         // )
         // this.debugFolder.addInput(
         //    this.material.uniforms.uDisplacementFrequency,
         //    'value',
         //    { label: 'uDisplacementFrequency', min: 0, max: 10, step: 0.01 }
         // )
         // this.debugFolder.addInput(
         //    this.material.uniforms.uDisplacementStrength,
         //    'value',
         //    { label: 'uDisplacementStrength', min: 0, max: 10, step: 0.01 }
         // )
      }
   }
   
   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.position.set(1.25, 0, 0)
      this.scene.add(this.mesh)
   }

   tweenLanding() {
      gsap.to(this.mesh.position, {
         x: 1.25,
         y: 0,
         z: 0,
         ease: 'power2.inOut',
         duration: 2
      })

      gsap.to(this.mesh.rotation, {
         y: 0,
         z: 0,
         duration: 1.5,
         ease: 'power2.inOut'
      })
   }

   tweenAbout() {
      const tl = gsap.timeline()

      tl.to(this.mesh.position, {
         duration: 2,
            x: -3,
            y: 2,
            z: -10,
            ease: 'power2.inOut',
      }).to(this.mesh.rotation, {
         y: 1.8,
         z: 1.8,
         duration: 2,
         ease: 'power2.inOut'
      }, '<')
      // .to(this.uColor1, {
      //    value: '#cc0052',
      //    onComplete: () => {
      //       this.uColor1.instance.set(this.uColor1.value)
      //    }
      // }, '<').to(this.uColor2, {
      //    value: '#dbd618',
      //    onComplete: () => {
      //       this.uColor2.instance.set(this.uColor2.value)
      //    }
      // }, '<')
   }

   update() {
      this.material.uniforms.uTime.value = this.time.elapsed * 0.05
   }
}