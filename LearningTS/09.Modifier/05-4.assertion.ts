// 9.Modifier/05-4.assertion.ts

// 타입은 Date | undefined
let maybeDate = Math.random() > 0.5 ? undefined : new Date();

maybeDate as Date; // 타입은 Date

maybeDate!; // 타입은 Date
