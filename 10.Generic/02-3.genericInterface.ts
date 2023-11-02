// 10.Generic/02-3.genericInterface.ts

interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

// 유추된 value 타입의 인수는 Date
let lastDate = getLast({
  value: new Date("2023-10-20"),
});

// 유추된 value 타입의 인수는 string
let lastFruit = getLast({
  next: {
    value: "banana",
  },
  value: "apple",
});

let lastMismatch = getLast({
  next: {
    value: 123,
  },
  value: false,
  //^^^^^ Type 'boolean' is not assignable to type 'number'.
});
