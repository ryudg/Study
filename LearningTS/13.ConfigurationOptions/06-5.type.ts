// 13.ConfigurationOptions/06-5.type.ts

let strictValue: string;

strictValue = "Hello World"; // ok

strictValue = null;
//^^^^^^^^^ Type 'null' is not assignable to type 'string'.
