// Secion2/Item7/07-1.typeof.ts

interface Point {
  x: number;
  y: number;
}

type PointKeys = keyof Point; // 타입은 "x" | "y"

function sortBy<K extends keyof T, T>(vals: T[], key: K) {
  // ...
}

const pts: Point[] = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
sortBy(pts, "x"); // 정상, "x"는 "x"|"y"를 상속. 즉, keyof T
sortBy(pts, "y"); // 정상, "y"는 "x"|"y"를 상속.
sortBy(pts, Math.random() < 0.5 ? "x" : "y"); // 정상, "x"|"y"는 "x"|"y"를 상속.
sortBy(pts, "z");
//          ^^^ Argument of type '"z"' is not assignable to parameter of type 'keyof Point'.
