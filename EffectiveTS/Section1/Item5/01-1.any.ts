let age: number;

age = "12";
// ^^^ Type 'string' is not assignable to type 'number'.
age = "12" as any; // OK
