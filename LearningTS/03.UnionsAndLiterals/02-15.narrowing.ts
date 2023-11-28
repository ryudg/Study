function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);
  //          ^ let x: boolean

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
    //          ^ let x: string
  } else {
    x = 100;
    console.log(x);
    //          ^ let x: number
  }

  return x;
  //     ^ let x: string | number
}
