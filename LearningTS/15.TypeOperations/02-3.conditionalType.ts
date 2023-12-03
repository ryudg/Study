// 14.TypeOperations/02-3.conditionalType.ts

type CallableSetting<T> = T extends () => any ? T : () => T;

type GetNumbersSetting = CallableSetting<() => number[]>; // () => number[]

type StringSetting = CallableSetting<string>; // () => string
