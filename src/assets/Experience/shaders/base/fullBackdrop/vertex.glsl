varying vec2 vUv;

void main() {
   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   vec4 viewPosition = modelPosition;
   vec4 projectedPosition = viewPosition;

   vUv = uv;

   gl_Position = projectedPosition;
}