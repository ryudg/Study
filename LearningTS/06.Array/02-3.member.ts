// 6.Array/02-3.member.ts

function withElements(element: string[]) {
  console.log(element[9001].length);
}

withElements(["a", "b", "c"]);
