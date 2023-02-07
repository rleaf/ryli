varying vec2 vUv;

void main() {
   vUv = uv;

   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectedPosition = projectionMatrix * viewPosition;
   gl_Position = vec4(projectedPosition);
   // gl_Position = vec4(position.xy, 0.0, 1.0);
}