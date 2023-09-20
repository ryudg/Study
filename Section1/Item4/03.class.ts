class C {
  foo: string;

  constructor(foo: string) {
    this.foo = foo + ", d 변수의 값에는 추가가 되지 않습니다.";
  }
}

const c = new C("constructor argument");
const d: C = { foo: "object literal" };

console.log(c, d);
