// 6.Array/04-7.tuple.ts

function firstCharAndSize(input: string) {
  return [input[0], input.length]; // 반환 타입은 (string | number)[]
}

const [firstChar, size] = firstCharAndSize("Gudit"); // firstChar, size 타입은 string | number
