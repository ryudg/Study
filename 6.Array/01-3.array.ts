// 6.Array/01-3.array.ts

let createStrings: () => string[]; // 타입은 string 배열을 반환하는 함수
createStrings = function () {
  return ["a", "b", "c"];
};

let stringCreator: (() => string)[]; // 타입은 각각의 string을 반환하는 함수 배열
stringCreator = [
  function createA() {
    return "a";
  },
  function createB() {
    return "b";
  },
  function createC() {
    return "c";
  },
];
