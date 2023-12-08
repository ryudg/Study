// Section2/Item8/07-1.error.ts

interface Person {
  first: string;
  last: string;
}

/* 
function email(option: { person: Person; subject: string; body: string }) {
  // ...
}
*/

/* 
function email({ 
  person: Person, 
  //      ^^^^^^ 'Person' is declared but its value is never read.
  //              Binding element 'Person' implicitly has an 'any' type.
  subject: string, 
  //       ^^^^^^ 'string' is declared but its value is never read
  //               Duplicate identifier 'string'
  //               Binding element 'string' implicitly has an 'any' type.
  body: string 
  //    ^^^^^^ Duplicate identifier 'string'.
  //           Binding element 'string' implicitly has an 'any' type.
}) {
  // ...
}
*/

function email({
  person,
  subject,
  body,
}: {
  person: Person;
  subject: string;
  body: string;
}) {
  // ...
}
