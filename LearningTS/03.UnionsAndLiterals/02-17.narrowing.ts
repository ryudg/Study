interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

/* 
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  //               ^^^^^^^^^^^^ 'shape.radius' is possibly 'undefined'.
} 
*/

/* 
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
    //               ^^^^^^^^^^^^ 'shape.radius' is possibly 'undefined'.
  }
} 
*/

/* 
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
} 
*/
