// 이 코드는 기본의 JavaScript 문법을 사용하여 작성되었다. 여기서 중요한 점은 기존의 JavaScript 코드를 그대로 사용할 수 있다는 것이다.
// 즉, 타입스크립트는 자바스크립트의 상위 집합이라고 할 수 있다.
// console.log('Hello TS')
/* ----------------------------------------------------------------------- */
// 타입스크립트로 작성된 이 코드에서 sum함수에 2개의 인자를 넘겨주지 않고 1개의 인자만 넘겨주었다.
// 따라서 터미널에서 tsc hello.ts 명령어를 실행하면 아래와 같은 에러가 발생한다.
// error TS2554: Expected 2 arguments, but got 1.
// 하지만 이 코드는 자바스크립트 파일로 정상적으로 컴파일된다.
// 이유는 위의 console.log()는 런타임에서 실행되는 코드이기 때문이다.
// 런타임에 실행되는 코드는 타입스크립트의 타입 검사를 받지 않기 때문에 컴파일 에러가 발생하지 않는다.
// 즉, 타입스크립트는 컴파일 시점에만 타입 검사를 하고 런타임에는 타입 검사를 하지 않는다.
// function sum(x, y) {
//   return x + y;
// }
// console.log(sum(1));
/* ----------------------------------------------------------------------- */
// function greet(person: string, date: Date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
// greet("Maddison", new Date());
// console.log(typeof Date()); // string
// console.log(typeof new Date()); // object
/* ----------------------------------------------------------------------- */
// const str = "hello";
/* ----------------------------------------------------------------------- */
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
var a = 1;
let b = 2;
const c = 3;
const sum = (x, y) => {
    return x + y;
};
