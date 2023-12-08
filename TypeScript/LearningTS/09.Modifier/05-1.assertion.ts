// 9.Modifier/05-1.assertion.ts

const rawData = '["grace", "frankie"]';

const result1 = JSON.parse(rawData); // 타입은 any

const result2 = JSON.parse(rawData) as string[]; // 타입은 string[]

const result3 = JSON.parse(rawData) as [string, string]; // 타입은 [string, string]

const result4 = JSON.parse(rawData) as ["grace", "frankie"]; // 타입은 ["grace", "frankie"]
