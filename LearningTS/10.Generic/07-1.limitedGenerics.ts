// 10.Generic/07-1.limitedGenerics.ts

interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}

logWithLength("No one figure out your worth but you."); // 타입은 string
logWithLength([1, 2, 3]); // 타입은 number[]
logWithLength({ length: 10 }); // 타입은 { length: number }

logWithLength(new Date());
//            ^^^^^^^^^^ Argument of type 'Date' is not assignable to parameter of type 'WithLength'.
//                       Property 'length' is missing in type 'Date' but required in type 'WithLength'.
