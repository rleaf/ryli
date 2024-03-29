import * as THREE from 'three'
import gsap from 'gsap'
import Experience from "../Experience"
import vertexShader from '../shaders/base/sphere/vertex.glsl'
import fragmentShader from '../shaders/base/sphere/fragment.glsl'

export default class Box {
   constructor() {

      this.experience = new Experience()
      this.assets = this.experience.resources.textures
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

   setSphere() {
      this.setGeometry()
      this.setMaterial()
      this.setMesh()
   }

   destroySphere() {
      this.scene.remove(this.mesh)
      this.mesh.geometry.dispose()
      this.mesh.material.dispose()
   }

   setGeometry() {
      this.geometry = new THREE.SphereGeometry(2, 256, 256)
   }
   
   setMaterial() {
      
      this.uValley = {}
      this.uPeak = {}

      this.uValley.value = 'rgb(0, 0, 0)'
      this.uValley.instance = new THREE.Color( this.uValley.value )
      
      this.uPeak.value = 'rgb(128, 128, 128)'
      this.uPeak.instance = new THREE.Color( this.uPeak.value )

      this.material = new THREE.ShaderMaterial({
         transparent: true,
         vertexShader: vertexShader,
         fragmentShader: fragmentShader,
         uniforms: {
            uValley: { value: this.uValley.instance },
            uPeak: { value: this.uPeak.instance },
            uStrength: { value: 0.15 },
            uFrequency: { value: 10 },
            uTime: { value: 0.0 },
            uOpacity: { value: 1.0 },
            uDistortionFrequency: { value: 1.3 },
            uDistortionStrength: { value: 2.0 },
            uDisplacementFrequency: { value: 0.25 },
            uDisplacementStrength: { value: 0.65 },
         },
      })

      if (this.debug) {
         this.debugFolder.addInput(
            this.uValley, 'value', 
            {label: 'valley'}
         )
         .on('change', () => {
            this.uValley.instance.set(this.uValley.value)
         })

         this.debugFolder.addInput(
            this.uPeak, 'value', 
            {label: 'peak'}
         )
         .on('change', () => {
            this.uPeak.instance.set(this.uPeak.value)
         })
         this.debugFolder.addInput(
            this.material.uniforms.uStrength,
            'value',
            { label: 'uStrength', min: 0, max: 1, step: 0.01 }
         )
      }
   }
   
   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.position.set(1.25, 0, 0)
   }
   
   addScene() {
      this.scene.add(this.mesh)
   }

   landingView() {
      const tl = gsap.timeline({
         defaults: {
            duration: 1.5,
            ease: 'power2.inOut'
         }
      })

      tl.to(this.mesh.position, {
         x: 1.25,
         y: 0,
         z: 0,
      })
      .to(this.mesh.rotation, {
         y: 0,
         z: 0,
      }, '<')
      .to(this.mesh.scale, {
         x: 1,
         y: 1,
         z: 1
      }, '<')
      .to(this.material.uniforms.uValley.value, {
         r: 0/255,
         g: 0/255,
         b: 0/255,
      }, '<')
      .to(this.material.uniforms.uPeak.value, {
         r: 200/255,
         g: 200/255,
         b: 200/255,
      }, '<')
      .to(this.material.uniforms.uStrength, {
         value: 0.15,
      }, '<')
   }

   aboutView() {
      const tl = gsap.timeline({
         defaults: {
            duration: 1.5,
            ease: 'power2.inOut'
         }
      })

      tl.to(this.mesh.position, {
         x: -2,
         y: -1.5,
         z: 0,
      })
      .to(this.mesh.rotation, {
         y: 1.8,
         z: 1.8,
      }, '<')
      .to(this.mesh.scale, {
         x: 1,
         y: 1,
         z: 1
      }, '<')
      .to(this.material.uniforms.uValley.value, {
         r: 153/255,
         g: 62/255,
         b: 0/255,
      }, '<')
      .to(this.material.uniforms.uPeak.value, {
         r: 255/255,
         g: 255/255,
         b: 255/255,
      }, '<')
      .to(this.material.uniforms.uStrength, {
         value: 0.15,
      }, '<')
   }

   projectsView() {
      const tl = gsap.timeline({
         defaults: {
            duration: 1.5,
            ease: 'power2.inOut'
         }
      })

      tl.to(this.mesh.position, {
         x: -7,
         y: 0,
         z: -10,
      })
      .to(this.mesh.scale, {
         x: 3,
         y: 3,
         z: 3
      }, '<')
      .to(this.mesh.rotation, {
         x: 2,
         y: 0,
         z: 2
      }, '<')
   }

   sphereSpin() {
      const tl = gsap.timeline({
         defaults: {
            duration: 1.25,
            ease: 'power2.inOut'
         }
      })

      tl.to(this.mesh.rotation, {
         y: 5,
      })
      .to(this.mesh.position, {
         x: -15,
      }, '<')
      .to(this.material.uniforms.uOpacity, {
         value: 0,
      }, '<')
   }

   sphereFadeIn() {
      gsap.to(this.material.uniforms.uOpacity, {
         value: '1',
         duration: 1.25,
         ease: 'power2.inOut'
      })
   }

   update() {
      this.material.uniforms.uTime.value = this.time.elapsed * 0.05
      // this.mesh.rotation.y = this.time.elapsed * 0.0001
   }
}