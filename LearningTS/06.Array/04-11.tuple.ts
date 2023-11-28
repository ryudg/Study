// 6.Array/04-11.tuple.ts

function firstCharAndSize(input: string) {
  return [input[0], input.length] as const;
}

const [firstChar, size] = firstCharAndSize("Ching Shih");
