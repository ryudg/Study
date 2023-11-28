// 10.Generic/04-1.genericClassExtends.ts

class Quote<T> {
  lines: T;

  constructor(lines: T) {
    this.lines = lines;
  }
}

class SpokenQuote extends Quote<string[]> {
  speak() {
    console.log(this.lines.join("\n`"));
  }
}

const result1 = new Quote("ABC").lines; // 타입은 string
const result2 = new Quote([1, 2, 3]).lines; // 타입은 number[]

const result3 = new SpokenQuote(["1", "2", "3"]).lines; // 타입은 string[]
const result4 = new SpokenQuote([1, 2, 3]);
//                               ^^^^^^^ Type 'number' is not assignable to type 'string'.
