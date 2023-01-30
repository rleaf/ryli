import * as THREE from 'three'
import Experience from '../Experience'
// import vertex from '../shaders/base/vertex.glsl'
// import fragment from '../shaders/base/fragment.glsl'
import vertex from '../shaders/base/magnify/vertex.glsl'
import fragment from '../shaders/base/magnify/fragment.glsl'
import cat from '../../cat.png'
import { DoubleSide } from 'three'

export default class Plane {
   constructor() {

      this.experience = new Experience()
      this.debug = this.experience.debug
      this.mouse = this.experience.mouse.pointer
      this.scene = this.experience.scene
      this.time = this.experience.time
      this.raycaster = new THREE.Raycaster()

      if (this.debug) {
         this.debugFolder = this.debug.addFolder({
            title: 'Plane',
            expanded: true
         })
      }

      this.setGeometry()
      this.setMaterial()
      this.setMesh()
      this.setMouseEvent()
      this.update()
   }

   setGeometry() {
      // this.geometry = new THREE.PlaneGeometry(3, 3, 256, 256)
      this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
      this.geometry.scale(8, 8, 8)
      // this.geometry.rotateX(-Math.PI * 0.5)
      this.geometry.rotateY(-Math.PI * 0.1)
      
   }

   setMaterial() {
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         transparent: true,
         side: DoubleSide,
         uniforms: {
            uCat: { value: new THREE.TextureLoader().load(cat) },
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
      // this.mesh.scale(3, 3, 3)
      // this.mesh.position.y = 0.5
      this.scene.add(this.mesh)
   }

   
   setMouseEvent() {
      function onMouseEvent(that) {
         that.raycaster.setFromCamera(that.mouse, that.experience.camera.instance)
         that.intersects = that.raycaster.intersectObject(that.mesh)   
   
         if (that.intersects.length > 0) {
            that.material.uniforms.uMouse.value = that.intersects[0].point
            // that.material.uniforms.uColor.value = new THREE.Color(0xff0000)
         }
      }

      window.addEventListener('mousemove', () => onMouseEvent(this), false)
   }

   update() {
      this.material.uniforms.uTime.value = this.time.elapsed * 0.2
   }
}