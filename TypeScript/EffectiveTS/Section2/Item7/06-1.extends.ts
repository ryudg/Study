// Section2/Item7/06-1.extends.ts

function getKey<K extends string>(val: any, key: K) {
  // ...
}

getKey({}, "x"); // 정상, 'x'는 string을 상속
getKey({}, Math.random() < 0.5 ? "a" : "b"); // 정상, 'a'|'b'는 string을 상속
getKey({}, document.title); // 정상, string은 string을 상속
getKey({}, 123);
//         ^^^ Argument of type 'number' is not assignable to parameter of type 'string'.
