/* ----------------------------------------------------------------------- */
var singer = "10cm";
// singer는 string 타입이라고 추론된다.
// 하지만 singer를 let이 아닌 const로 선언하면, singer는 "Kim"이라는 값을 가지는 변수가 된다.
/* ----------------------------------------------------------------------- */
var bestSong = Math.random() > 0.5 ? "폰서트" : "부동의 첫사랑";
/* ----------------------------------------------------------------------- */
var firstName1 = 'Kim';
firstName1.length();
//        ^^^^^^ This expression is not callable.
//               Type 'Number' has no call signatures.
/* ----------------------------------------------------------------------- */
var let, wat;
//      ^^^ ',' expected.
/* ----------------------------------------------------------------------- */
console.blub();
//      ^^^^ Property 'blub' does not exist on type 'Console'.
/* ----------------------------------------------------------------------- */
var firstName = 'Kim';
firstName = "Lee";
/* ----------------------------------------------------------------------- */
var lastName = "Cheolsoo";
lastName = true;
// ^^^^^^^^ Type 'boolean' is not assignable to type 'string'.
/* ----------------------------------------------------------------------- */
var user1; // type: any
user1 = "Lee"; // type: string
user1.toUpperCase();
user1 = 123.456; // type: number
user1.toPrecision(1); // toPrecision()은 number 타입의 메소드이며, 소수점 이하의 자릿수를 지정한 만큼 표시한다.
user1.toUpperCase();
//   ^^^^^^^^^^^ Property 'toUpperCase' does not exist on type 'number'.
/* ----------------------------------------------------------------------- */
var user;
user = "Lee";
