// 5.Function/13-1.Funtion.ts

function add(x: number, y: number): number {
  return x + y;
}

function doSomething(func: Function) {
  return func(1, 2);
  // return func(1, 2, 3); // 예상치 못한 에러이지만 컴파일 에러가 발생하지 않는다. 왜냐하면 Function 타입은 인자의 갯수와 상관없이 동작하기 때문이다.
}

console.log(doSomething(add));

type BinaryFunc = (x: number, y: number) => number;

function doSomethingError(func: BinaryFunc) {
  // return func(1, 2);
  return func(1, 2, 3);
  //                ^ Expected 2 arguments, but got 3.
}

console.log(doSomethingError(add));
