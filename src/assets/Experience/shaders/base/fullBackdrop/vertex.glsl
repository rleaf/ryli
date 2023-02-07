
void main() {
   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   vec4 viewPosition = modelPosition;
   vec4 projectedPosition = viewPosition;
   gl_Position = projectedPosition;
   // gl_Position = vec4(position, 1.0);
}