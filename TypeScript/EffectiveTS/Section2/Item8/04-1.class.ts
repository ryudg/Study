// Section2/Item8/04-1.class.ts

class Cylinder {
  radius = 1;
  height = 1;
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape; // 정상, 타입은 Cylinder
    shape.radius; // 정상, 타입은 number
  }
}
