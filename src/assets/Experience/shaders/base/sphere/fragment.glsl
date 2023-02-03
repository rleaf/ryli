uniform vec3 uValley;
uniform vec3 uPeak;
uniform float uStrength;

varying vec2 vUv;
varying vec3 vNormal;
varying float vPerlinStrength;

void main() {

    vec3 mixCol = mix(uValley, uPeak, vPerlinStrength + uStrength);
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(vec3(vPerlinStrength) + .15, 1.0);
    gl_FragColor = vec4(mixCol, 1.0);
}