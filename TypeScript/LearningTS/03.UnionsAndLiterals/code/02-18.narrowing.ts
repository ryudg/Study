interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

/*
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  //                     Property 'radius' does not exist on type 'Shape'.
  //                     Property 'radius' does not exist on type 'Square'.
}
*/

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}
