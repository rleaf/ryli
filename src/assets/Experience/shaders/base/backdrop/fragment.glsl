uniform sampler2D uBackdrop;
uniform float uOpacity;
uniform vec3 uColor;

varying vec2 vUv;

void main() {

   vec4 color = texture2D(uBackdrop, vUv);
   
   gl_FragColor = color * uOpacity;
   // gl_FragColor = vec4(uColor, uOpacity);
}