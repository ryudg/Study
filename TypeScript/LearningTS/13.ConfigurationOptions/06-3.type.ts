// 13.ConfigurationOptions/06-3.type.ts

function getLength(text: string, trim?: boolean) {
  return trim ? text.trim().length : text.length;
}

// 타입: (thisArg: Function, argArray?: any) => any
const result3_1 = getLength.apply;

// 타입: any
const result3_2 = getLength.bind(undefined, "abc123");

// 타입: any
const result3_3 = getLength.call(undefined, "abc123", true);
