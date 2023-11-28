// 5.Function/14-3.signature.ts

class Cat {
  constructor(public name: string) {} // 생성자 함수
}

interface ICatConstructor {
  new (name: string): Cat; // 구성 시그니처
}

// 클래스를 인수로 받고 대신 초기화 해주는 함수
function makeKitten(c: ICatConstructor, n: string) {
  return new c(n); // ok
}

const kitten = makeKitten(Cat, "Lucy");
console.log(kitten.name); // Lucy
