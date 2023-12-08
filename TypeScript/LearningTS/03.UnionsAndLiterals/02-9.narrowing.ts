// 3.UnionsAndLiterals/2.9 narrowing.ts

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 'x'또는 'y'에서 '문자열' 메서드를 호출 할 수 있다.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}

function printAll2(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
