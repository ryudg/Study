// Section2/Item10/01-3.String.ts

function isGreeting(phrase: String) {
  return ["hello", "world"].includes(phrase);
  //                                 ^^^^^^ Argument of type 'String' is not assignable to parameter of type 'string'.
  //                                        'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.
}
