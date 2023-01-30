#include ../partials/perlin4d.glsl

uniform float uFrequency;
uniform float uTime;
uniform float uTest;

varying vec2 vUv;
varying float vPosition;

void main() {
    // vec3 newPosition = position;
    // float perlinStrength = perlin4d(vec4(position, 0.0));
    // newPosition += normal * perlinStrength;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vUv = uv;
    
    gl_Position = projectedPosition;
}