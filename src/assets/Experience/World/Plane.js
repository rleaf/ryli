import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'
import vertex from '../shaders/base/magnify/vertex.glsl'
import fragment from '../shaders/base/magnify/fragment.glsl'

export default class Plane {
   constructor() {

      this.experience = new Experience()
      this.camera = this.experience.camera.instance
      this.sizes = this.experience.sizes
      this.assets = this.experience.resources.textures
      this.debug = this.experience.debug
      this.mouse = this.experience.mouse.pointer
      this.scene = this.experience.scene
      this.space = 1.8
      this.track = []
      this.time = this.experience.time
      this.group = new THREE.Group()
      this.raycaster = new THREE.Raycaster()

      if (this.debug) {
         this.debugFolder = this.debug.addFolder({
            title: 'Plane',
            expanded: true
         })
      }

      this.setGeometry()
      this.batchSetMesh()
      this.setMouseEvent()

      for (let i = 0; i < this.group.children.length; i++) {
         this.track.push(this.space * i)
      }

      this.upperBound = this.track[this.track.length - 1]

      this.update()
   }

   initProjectView() {
      this.group.position.set(0.55, 0, 1.25)
      this.scene.add(this.group)

      gsap.from(this.group.position, {
         duration: 2,
         y: -this.group.children.length * this.space,
         ease: 'power4.inOut'
      })
   }

   destroyProjectView() {
      gsap.to(this.group.position, {
         duration: 1.5,
         y: this.group.children.length * this.space,
         ease: 'power4.inOut',
         onComplete: () => {
            this.scene.remove(this.group)
            
            for (const mesh of this.group.children) {
               mesh.geometry.dispose()
               mesh.material.dispose()
            }
         }
      })
   }

   projectFocusView() {
      // model matrix
      this.mat = this.mesh.matrixWorld * this.camera.matrixWorldInverse * this.camera.projectionMatrix

      console.log(this.mesh.matrixWorld)
      console.log(this.material.uniforms.modelMatrix.value)

      // view matrix
      console.log(this.camera.matrixWorldInverse)

      // projection matrix
      console.log(this.camera.projectionMatrix)
   }

   batchSetMesh() {
      for (const [i, asset] of this.assets.entries()) {
         this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
               uCover: { value: asset.texture },
               uMouse: { value: new THREE.Vector3()},
               uFrequency: { value: 10 },
               uPerlinWeight: { value: 0.0 },
               uTime: { value: 0.0 },
               uSize: { value: 0.9 },
               uStrength: { value: 0.05 },
            }
         })

         this.mesh = new THREE.Mesh(this.geometry, this.material)

         this.mesh.name = asset.route
         this.mesh.position.y = i * -this.space
         this.group.add(this.mesh)  
      }

      if (this.debug) {
         this.debugFolder.addInput(
            this.material.uniforms.uStrength,
            'value',
            { label: 'uStrength', min: 0, max: 1.5, step: 0.001 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uSize,
            'value',
            { label: 'uSize', min: 0, max: 1.5, step: 0.01 }
         )
      }
   }

   setGeometry() {
      this.geometry = new THREE.PlaneGeometry(1.65, 1.1, 32, 32)
      this.geometry.rotateY(-Math.PI * 0.1)
   }

   setMouseEvent() {
      window.addEventListener('mousemove', () => {
         this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance)
         this.intersects = this.raycaster.intersectObjects(this.group.children)   
         
         if (this.intersects.length > 0) {
            this.intersectName = this.intersects[0].object.name
            for(const intersect of this.intersects) {
               intersect.object.material.uniforms.uMouse.value = this.intersects[0].point
               intersect.object.material.uniforms.uMouse.value.x -= .25
               intersect.object.material.uniforms.uMouse.value.z -= 2.
            }
         } else {
            this.intersectName = null
         }
      })
   }

   update() {
      for(const mesh of this.group.children) {
         mesh.material.uniforms.uTime.value = this.time.elapsed * 0.2
         mesh.position.y += Math.sin(this.time.elapsed * 0.001) * 0.0002
      }
   }
}