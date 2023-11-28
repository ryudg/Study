// 6.Array/04-8.tuple.ts

function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length];
}

const [firstChar, size] = firstCharAndSizeExplicit("Cathay Williams");
