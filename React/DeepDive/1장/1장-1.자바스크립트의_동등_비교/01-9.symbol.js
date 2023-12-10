// 심벌은 유일한 값이므로 Symbol()을 호출할 때마다 새로운 값을 생성한다.
// 즉, 함수 내부에 넘겨주는 값을 Symbol 생성에 영향을 주지 않는다.
const symbol1 = Symbol("foo");
const symbol2 = Symbol("foo");

symbol1 === symbol2; // false

// 동일한 값을 사용하기 위해서는 Symbol.for()를 사용한다.
const symbol3 = Symbol.for("foo");
const symbol4 = Symbol.for("foo");

symbol3 === symbol4; // true
