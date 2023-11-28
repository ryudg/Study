interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  // 이 함수는 Shape 타입의 매개변수 shape를 받고 있습니다. 이 함수는 shape의 타입에 따라 다른 동작을 하고 있습니다.
  // 만약 height가 존재한다면 Rectangle 타입이고, height가 존재하지 않는다면 Square 타입입니다.
  // 따라서 if문을 통해 속성의 존재 여부를 확인하고 이를 통해 타입을 판단하고 넓이를 계산하고 있습니다.
  if ("height" in shape) {
    shape; // 타입이 Rectangle
    return shape.width * shape.height;
  } else {
    shape; // 타입이 Square
    return shape.width * shape.width;
  }
}
