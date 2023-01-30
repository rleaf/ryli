varying vec2 vUv;
varying vec3 vNormal;
varying float vPerlinStrength;

void main() {

    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    gl_FragColor = vec4(vec3(vPerlinStrength) + .1, 1.0);
}