// Section2/Item7/08-1.array.ts

const list = [1, 2]; // 타입은 number[]
const tuple: [number, number] = list;
//    ^^^^^ Type 'number[]' is not assignable to type '[number, number]'.
//          Target requires 2 element(s) but source may have fewer.

const tuple2: [number, number] = [1, 2];
const list2: number[] = tuple;
