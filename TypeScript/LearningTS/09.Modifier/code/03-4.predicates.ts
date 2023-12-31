// 9.Modifier/03-4.predicates.ts

function isLongString(input: string | undefined): input is string {
  return !!input && input.length > 7;
}

function workWithText(text: string | undefined) {
  if (isLongString(text)) {
    console.log("Logn text:", text.length); // text의 타입은 string
  } else {
    console.log("Short text:", text?.length); // text의 타입은 undefined
    //                              ^^^^^^ Property 'length' does not exist on type 'never'.
  }
}
