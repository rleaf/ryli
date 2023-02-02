uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;
varying vec3 vNormal;
varying float vPerlinStrength;

void main() {

    vec3 mixCol = mix(uColor1, uColor2, vPerlinStrength + 0.3);
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(vec3(vPerlinStrength) + .15, 1.0);
    gl_FragColor = vec4(mixCol, 1.0);
}