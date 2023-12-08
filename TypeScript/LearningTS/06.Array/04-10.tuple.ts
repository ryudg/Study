// 6.Array/04-10.tuple.ts

const pairMutable: [number, string] = [1157, "Tomoe"];
pairMutable[0] = 1247;

const pairAlsoMutable: [number, string] = [1157, "Tomoe"] as const;
//    ^^^^^^^^^^^^^^^ The type 'readonly [1157, "Tomoe"]' is 'readonly' and cannot be assigned to the mutable type '[number, string]'.

const pairConst = [1157, "Tomoe"] as const;
pairConst[0] = 1247;
//        ^ Cannot assign to '0' because it is a read-only property.
