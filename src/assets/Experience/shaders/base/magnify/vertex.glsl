// #pragma perlin3d = require('../../partials/perlin3d.glsl')
#include ../../partials/perlin3d.glsl
// #include ../../partials/perlin4d.glsl
// #include ../../partials/simplex2d.glsl
// #include ../../partials/simplex3d.glsl

float PI = 3.141592653589793238;

varying vec2 vUv;
varying float vNoise;
varying vec3 vPosition;
varying float vPerlin;

uniform float uPerlinWeight;
uniform float uTime;

void main() {

   float dist = distance(uv, vec2(0.5));

   vNoise = dist;
   vPosition = position;
   vUv = uv;

   // float perlinStrength = snoise(vec2(position.xz) + uTime * 0.001) * 0.3;
   // float perlinStrength = perlin4d(vec4(position, uTime * 0.001)) * 0.3;
   float perlinStrength = perlin3d(vec3(position.xz, uTime * 0.001)) * uPerlinWeight;
   // float perlinStrength = perlin3d(vec3(position) + uTime * 0.001) * 0.3;
   // vPerlin = perlinStrength;

   vec3 newPosition = position;
   newPosition += perlinStrength * normal;

   // newPosition.y += sin(newPosition.x + 1.65) * 0.25;
   // newPosition.z += sin(newPosition.x * 2.5 + uTime * 0.005) * 0.1;
   // newPosition.y += sin(newPosition.z * 2.5 + uTime * 0.005) * 0.1;

   vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
   vec4 viewPosition = viewMatrix * modelPosition;
   
   gl_Position = projectionMatrix * viewPosition;
   // gl_Position = projectionMatrix * vec4(position, 1.0);
}