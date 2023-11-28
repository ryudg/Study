// Section2/Item7/03-2.assignable.ts

type AB = "A" | "B";
type AB12 = "A" | "B" | 12;

// 정상, {"A", "B"}는 {"A", "B"}의 부분집합
const ab: AB = Math.random() < 0.5 ? "A" : "B";

// 정상, {"A", "B"}는 {"A", "B", 12}의 부분집합
const ab12: AB12 = ab;

declare let twelve: AB12;
const back: AB = twelve;
//    ^^^^ Type 'AB12' is not assignable to type 'AB'.
//         Type '12' is not assignable to type 'AB'.
