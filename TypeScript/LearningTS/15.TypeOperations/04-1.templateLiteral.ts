// 14.TypeOperations/04-1.templateLiteral.ts

type Greeting = `Hello${string}`;

let matches: Greeting = "Hello World";

let outOfOreder: Greeting = "World! Hello!";
//  ^^^^^^^^^^^ Type '"World! Hello!"' is not assignable to type '`Hello${string}`'.

let missingAltogehther: Greeting = "Hi";
//  ^^^^^^^^^^^^^^^^^^ Type '"Hi"' is not assignable to type '`Hello${string}`'.
