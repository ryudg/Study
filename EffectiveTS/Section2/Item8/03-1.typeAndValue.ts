// Section2/Item8/03-1.typeAndValue.ts

interface Person {
  first: string;
  last: string;
}

const p: Person = { first: "Jane", last: "Jacobs" };
//    -           --------------------------------- 값
//       ------                                     타입

// 일부 함수에서는 타입과 값이 반복적으로 번갈아 가며 나올 수도 있다.
function email(p: Person, subject: string, body: string): Response {
  //     ----- -         -------         ----                   값
  //             ------          ------       ------   -------- 타입
}
