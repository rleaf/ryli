import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'
// import vertex from '../shaders/base/vertex.glsl'
// import fragment from '../shaders/base/fragment.glsl'
import vertex from '../shaders/base/magnify/vertex.glsl'
import fragment from '../shaders/base/magnify/fragment.glsl'

export default class Plane {
   constructor() {

      this.experience = new Experience()
      this.sizes = this.experience.sizes
      this.textures = this.experience.resources.textures
      this.debug = this.experience.debug
      this.mouse = this.experience.mouse.pointer
      this.scene = this.experience.scene
      this.time = this.experience.time
      this.group = new THREE.Group()
      this.raycaster = new THREE.Raycaster()

      if (this.debug) {
         this.debugFolder = this.debug.addFolder({
            title: 'Plane',
            expanded: false
         })
      }

      this.setGeometry()
      this.batchSetMesh()
      this.setMouseEvent()
      this.update()
   }

   initProjectView() {
      this.group.position.set(0.25, (-this.group.children.length + 1) * 1.3,1.25)
      this.scene.add(this.group)

      gsap.from(this.group.position, {
         duration: 2,
         y: -8,
         ease: 'power4.inOut'
      })
   }

   destroyProjectView() {
      gsap.to(this.group.position, {
         y: this.group.children.length * 3,
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
      for (const [i, asset] of this.textures.entries()) {
         let material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
               uCover: { value: asset },
               uMouse: { value: new THREE.Vector3()},
               uColor: { value: new THREE.Color('orange') },
               uFrequency: { value: 10 },
               uTime: { value: 0.0 },
               uMin1: { value: 0.0 },
               uMax1: { value: 0.5 },
               uMin2: { value: 0.0 },
               uMax2: { value: 1.0 },
               uSize: { value: 0.5 },
               uStrength: { value: 0.05 },
            }
         })

         let mesh = new THREE.Mesh(this.geometry, material)

         mesh.position.y = i * 1.3
         
         this.group.add(mesh)
         this.group.position.set(0.25, (-this.group.children.length + 1) * 1.3,1.25)
      }
      
   }

   setGeometry() {
      this.geometry = new THREE.PlaneGeometry(1.5, 1, 32, 32)
      this.geometry.rotateY(-Math.PI * 0.1)
   }

   setMaterial() {
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         transparent: true,
         side: THREE.DoubleSide,
         uniforms: {
            uCover: { value: this.textures[0] },
            uMouse: { value: new THREE.Vector3()},
            uColor: { value: new THREE.Color('orange') },
            uFrequency: { value: 10 },
            uTime: { value: 0.0 },
            uMin1: { value: 0.0 },
            uMax1: { value: 0.5 },
            uMin2: { value: 0.0 },
            uMax2: { value: 1.0 },
            uSize: { value: 0.5 },
            uStrength: { value: 0.05 },
         }
      })

      if (this.debug) {
         this.debugFolder.addInput(
            this.material.uniforms.uMin1,
            'value',
            { label: 'uMin1', min: 0, max: 5, step: 0.01 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uMax1,
            'value',
            { label: 'uMax1', min: 0, max: 5, step: 0.01 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uMin2,
            'value',
            { label: 'uMin2', min: 0, max: 5, step: 0.01 }
         )
         this.debugFolder.addInput(
            this.material.uniforms.uMax2,
            'value',
            { label: 'uMax2', min: 0, max: 5, step: 0.01 }
         )
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

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
   }
   
   setMouseEvent() {
      function onMouseEvent(that) {
         that.raycaster.setFromCamera(that.mouse, that.experience.camera.instance)
         that.intersects = that.raycaster.intersectObjects([...that.group.children])   
   
         if (that.intersects.length > 0) {

            for(const intersect of that.intersects) {
               intersect.object.material.uniforms.uMouse.value = that.intersects[0].point
            }
         }
      }

      window.addEventListener('mousemove', () => onMouseEvent(this), false)
   }

   setScrollEvent() {
      // this.scrollY = 0

      // window.addEventListener('wheel', (e) => {
      //    this.scrollY += e.deltaY * 0.0001
      // })

      const tl = gsap.timeline({
         defaults: {
            ease: 'power1.inOut'
         }
      })

      window.addEventListener('wheel', (e) => {

         if (!tl.isActive()) {
            if (e.deltaY > 0) {
               tl.to(this.experience.world.plane.group.position, {
                  y: '+=1.3'
               })
            }
            if (e.deltaY < 0) {
               tl.to(this.experience.world.plane.group.position, {
                  y: '-=1.3',
                  yoyo: true
               })
            }
         }

      })
   }

   update() {
      // if (this.mesh) {
      //    this.material.uniforms.uTime.value = this.time.elapsed * 0.2
      // }
      for(const mesh of this.group.children) {
         mesh.material.uniforms.uTime.value = this.time.elapsed * 0.2
      }

      // this.group.position.y += this.scrollY
      // this.scrollY *= 0.92
      // console.log(this.scrollY)

      // this.group.position.y = Math.sin(this.time.elapsed * 0.001) * 0.05
   }
}