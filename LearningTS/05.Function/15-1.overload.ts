// 5.Function/15-1.overload.ts

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ No overload matches this call.
//                                        Overload 1 of 2, '(s: string): number', gave the following error.
//                                          Argument of type 'number[] | "hello"' is not assignable to parameter of type 'string'.
//                                            Type 'number[]' is not assignable to type 'string'.
//                                        Overload 2 of 2, '(arr: any[]): number', gave the following error.
//                                          Argument of type 'number[] | "hello"' is not assignable to parameter of type 'any[]'.
//                                            Type 'string' is not assignable to type 'any[]'.
