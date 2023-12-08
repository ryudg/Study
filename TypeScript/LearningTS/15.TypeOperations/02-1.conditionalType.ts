// 14.TypeOperations/02-1.conditionalType.ts

type CheckStringAgatinstNumber<T> = T extends number ? true : false;
