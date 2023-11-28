// Section2/Item7/03-1.assignable.ts

type AB = "A" | "B";
type AB12 = "A" | "B" | 12;

const a: AB = "A"; // 정상, "A"는 {"A", "B"}의 원소

const c: AB = "C";
//    ^ Type '"C"' is not assignable to type 'AB'.
