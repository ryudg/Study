// 9.Modifier/05-10.assertion.ts

const getName = () => "Maria Bamford"; // 타입은 () => string

const getNameConst = () => "Maria Bamford" as const; // 타입은 () => "Maria Bamford"
