// 3.UnionsAndLiterals/2.8 narrowing.ts

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s, "T1");
    }
  } else if (typeof strs === "string") {
    console.log(strs, "F1");
  }
}

function printAll2(strs: string | string[] | null) {
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s, "T2");
      }
    } else if (typeof strs === "string") {
      console.log(strs, "F2");
    }
  }
}

printAll("");
printAll2("");
