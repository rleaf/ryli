import * as THREE from 'three'
import { MSDFTextGeometry } from "three-msdf-text-utils";
import Experience from '../Experience'
import vertexShader from '../shaders/font/vertex.glsl'
import fragmentShader from '../shaders/font/fragment.glsl'

import font from '../../font/Butler_Medium-msdf.json'
import fontAtlas from '../../font/ButlerMedium.png'

export default class Text {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.time = this.experience.time

      this.setGeometry()
      this.setMaterial()
      this.setMesh()
      this.update()
   }

   setGeometry() {
      this.geometry = new MSDFTextGeometry({
         text: "Ryan Lin",
         font: font,
      })
   }

   setMaterial() {
      this.material = new THREE.ShaderMaterial({
         side: THREE.DoubleSide,
         transparent: true,
         defines: {
            IS_SMALL: false,
         },
         extensions: {
            derivatives: true,
         },
         uniforms: {
            uOpacity: { value: 1 },
            uColor: { value: new THREE.Color('#ffffff') },
            uMap: { value:  new THREE.TextureLoader().load(fontAtlas) },
            // Rendering
            uThreshold: { value: 0.05 },
            uAlphaTest: { value: 0.01 },
            // Strokes
            uStrokeColor: { value: new THREE.Color('#ff0000') },
            uStrokeOutsetWidth: { value: 0.0 },
            uStrokeInsetWidth: { value: 0.3 },
         },
         vertexShader: vertexShader,
         fragmentShader: fragmentShader,
      })
   }
   
   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.scale.set(0.009, -0.009, 0.009)
      this.mesh.position.set(-1.64, -0.098, 0)

      this.scene.add(this.mesh)
   }

   update() {

   }
}