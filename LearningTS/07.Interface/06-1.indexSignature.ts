// 7.Interface/06-1.indexSignature.ts

interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0;
counts.banana = 0;

counts.cherry = false;
// ^^^^^^^^^^^^^ Type 'boolean' is not assignable to type 'number'.
