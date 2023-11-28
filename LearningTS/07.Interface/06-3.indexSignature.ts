// 7.Interface/06-3.indexSignature.ts

interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number;
}

const novels: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 1688,
};

const missingOroonoko: HistoricalNovels = {
  //  ^^^^^^^^^^^^^^^ Property 'Oroonoko' is missing in type '{ Outlander: number; }' but required in type 'HistoricalNovels'.
  Outlander: 1991,
};
