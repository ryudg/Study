const a = null + 7;
// ^^^^ 여기서는 'null' 값을 사용할 수 없습니다.
const b = [] + 12;
// ^^^^^^^ '+' 연산자를 'never[]' 및 'number' 형식에 적용할 수 없습니다.

alert("Hello", "TypeScript"); // "Hello" 경로를 표시한다.
// ^^^^^^^^^^^^^ 0-1개의 인수가 필요한데 2개를 가져왔습니다.
