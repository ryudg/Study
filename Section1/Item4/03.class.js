var C = /** @class */ (function () {
    function C(foo) {
        this.foo = foo + ", d 변수의 값에는 추가가 되지 않습니다.";
    }
    return C;
}());
var c = new C("constructor argument");
var d = { foo: "object literal" };
console.log(c, d);
