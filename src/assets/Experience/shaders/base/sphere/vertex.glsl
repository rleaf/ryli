#include ../../partials/perlin4d.glsl

uniform float uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vPosition;
varying vec3 vNormal;
varying float vPerlinStrength;

uniform float uDistortionFrequency;
uniform float uDistortionStrength;
uniform float uDisplacementFrequency;
uniform float uDisplacementStrength;

void main() {

    vec3 displacementPosition = position * uDisplacementFrequency;
    
    displacementPosition += perlin4d(vec4(displacementPosition * uDistortionFrequency, uTime * 0.003)) * uDistortionStrength;

    float perlinStrength = perlin4d(vec4(displacementPosition * uDistortionFrequency, uTime * 0.003)) * uDisplacementStrength;

    vec3 newPosition = position;
    newPosition += normal * perlinStrength;

    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    // modelPosition.y += 2.0;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vUv = uv;
    vNormal = normal;
    vPerlinStrength = perlinStrength;
    
    gl_Position = projectedPosition;
    // gl_Position = vec4(position, 1.0) * modelMatrix * viewMatrix * projectionMatrix;
}