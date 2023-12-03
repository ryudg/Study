// 14.TypeOperations/03-3.never.ts

type OnlyStringPropperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface AllEventData {
  participants: string[];
  location: string;
  name: string;
  year: number;
}

type OnltStringEventData = OnlyStringPropperties<AllEventData>; // "location" | "name"
