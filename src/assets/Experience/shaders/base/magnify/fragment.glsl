varying vec2 vUv;
varying vec3 vPosition;
varying float vNoise;
// varying float vPerlin;

uniform sampler2D uCover;
uniform vec3 uMouse;
// uniform float uMin1;
// uniform float uMax1;
// uniform float uMin2;
// uniform float uMax2;
uniform float uSize;
uniform float uStrength;

// Maps values from rangeA to rangeB
// e.g. scale of 1 - 100 to -1 - 8 (or whatever)
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

   // vec2 direction = normalize(vPosition.xy - uMouse.xy);

   float dist = distance(vPosition, uMouse);
   // float prox = 1.0 - map(dist, uMin1, uMax1, uMin2, uMax2);
   float prox = 1.0 - uSize * dist;
   // float prox = 1.0 - dist;
   prox = clamp(prox, 0.0, 1.0);
   // vec2 zoomedUV = mix(vUv, uMouse.xy + vec2(1.5), prox * uStrength);
   vec2 zoomedUV = mix(vUv, atan(uMouse.xy), prox * uStrength);

   // sampler2D test = vUv
	vec4 color = texture2D(uCover, zoomedUV);
   // vec4 color = texture2D(test, zoomedUV);
   gl_FragColor = color;
   // gl_FragColor = vec4(vec3(vPerlin), 1.0);
}