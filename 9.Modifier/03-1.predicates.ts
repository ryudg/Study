// 9.Modifier/03-1.predicates.ts

function isNumberOrString(value: string) {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    //                   ^^^^^ Argument of type 'string | number | null | undefined' is not assignable to parameter of type 'string'.
    //                         Type 'undefined' is not assignable to type 'string'.
    value.toString();
    //^^^^^ 'value' is possibly 'null' or 'undefined'.
  } else {
    console.log("Value does not exist:", value);
  }
}
