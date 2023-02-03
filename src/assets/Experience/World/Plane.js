import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'
import vertex from '../shaders/base/magnify/vertex.glsl'
import fragment from '../shaders/base/magnify/fragment.glsl'

export default class Plane {
   constructor() {

      this.experience = new Experience()
      this.sizes = this.experience.sizes
      this.assets = this.experience.resources.textures
      this.debug = this.experience.debug
      this.mouse = this.experience.mouse.pointer
      this.scene = this.experience.scene
      this.space = 1.8
      this.trackIdx = 0
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
      this.upperBound = -this.space * (this.group.children.length - 1)

      for (let i = 0; i < this.group.children.length; i++) {
         this.track.push(this.upperBound + (this.space * i))
      }

      this.update()
   }

   initProjectView() {
      this.group.position.set(0.55, (-this.group.children.length + 1) * this.space, 1.25)
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
         this.mesh.position.y = i * this.space
         this.group.add(this.mesh)
      }

      this.group.position.set(0.55, (-this.group.children.length + 1) * this.space,1.25)

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
      function onMouseEvent(that) {
         that.raycaster.setFromCamera(that.mouse, that.experience.camera.instance)
         that.intersects = that.raycaster.intersectObjects(that.group.children)   
         
         if (that.intersects.length > 0) {
            for(const intersect of that.intersects) {
               // intersect.object.material.uniforms.uPerlinWeight.value = 0.4;
               intersect.object.material.uniforms.uMouse.value = that.intersects[0].point
               intersect.object.material.uniforms.uMouse.value.x -= .25
               intersect.object.material.uniforms.uMouse.value.z -= 2.
            }
         }
      }

      window.addEventListener('mousemove', () => onMouseEvent(this))
   }

   update() {
      for(const mesh of this.group.children) {
         mesh.material.uniforms.uTime.value = this.time.elapsed * 0.2
         mesh.position.y += Math.sin(this.time.elapsed * 0.001) * 0.0002
      }
      // console.log(this.group.position.y, this.trackIdx, this.upperBound)
   }
}