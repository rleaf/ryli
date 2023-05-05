varying vec2 vUv;

uniform vec3 uColor;
uniform sampler2D uVideo;

void main() {
   // gl_FragColor = vec4(uColor, 1.0);
   vec4 color = texture2D(uVideo, vUv);
   gl_FragColor = color;
}