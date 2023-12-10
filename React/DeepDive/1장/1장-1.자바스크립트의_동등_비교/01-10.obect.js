typeof [] === "object"; // true
typeof {} === "object"; // true

function hello() {}
typeof hello === "function"; // true

const hello1 = function () {};
const hello2 = function () {};
// 객체인 함수의 내용이 육안으로는 같아 보여도 참조가 다르기 때문에 false가 나온다.
hello1 === hello2; // false
