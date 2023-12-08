// 9.Modifier/03-2.predicates.ts

function isNumberOrString(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    value.toString(); // value의 타입은 number | string
  } else {
    console.log("Value does not exist:", value); // value의 타입은 null | undefined
  }
}
