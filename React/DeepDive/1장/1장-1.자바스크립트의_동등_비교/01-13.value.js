// 아래 객체는 완벽하게 동일한 내용을 가지고 있다.
var hello = {
  greet: "hello, world",
};

var hi = {
  greet: "hello, world",
};

// 그러나 동등 비교를 하면 false가 나온다.
hello === hi; // false

// 원시값인 내부 속성값을 비교하면 동일하다.
hello.greet === hi.greet; // true
