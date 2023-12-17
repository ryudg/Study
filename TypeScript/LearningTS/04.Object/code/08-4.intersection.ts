// 4.Object/08-4.intersection.ts

type NotPossible = number & string; // 타입은 never

let notNumber: NotPossible = 0;
//  ^^^^^^^^^ Type 'number' is not assignable to type 'never'.

let notString: never = "";
//  ^^^^^^^^^ Type 'string' is not assignable to type 'never'.
