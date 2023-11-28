function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a, b) {
  return a + b;
}

const three = add(1, 2); // type이 number
const twelve = add("1", "2"); // type이 string
const array = add([], []);
