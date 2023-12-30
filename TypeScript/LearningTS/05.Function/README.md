# 1. 함수 매개변수

아래 `sing` 함수는 `song` 매개변수를 받아 콘솔에 출력한다.

```tsx
function sing(song) {
  console.log(`Singing: ${song}`);
}
```

`sing` 함수를 작성한 개발자가 `song` 매개변수를 제공하기 위해 의도한 값의 타입이 무엇인지 알 수 없다.

명시적 타입 정보가 선언되지 않으면 절대 타입을 알 수 없다. 타입스크립트가 이를 `any` 타입으로 간주하여 매개변수의 타입은 무엇이든 될 수 있기 때문이다.

변수와 마찬가지로 타입스크립트를 사용하면 타입 애너테이션으로 함수 매개변수의 타입을 선언할 수 있다.
아래 코드처럼 `: string`을 사용해 `song` 매개변수가 `string` 타입임을 타입스크립트에게 알린다.

```tsx
function sing(song**: string**) {
  console.log(`Singing: ${song}`);
}
```

이제 `song`이 어떤 타입인지 알 수 있다.
코드를 유용한 타입스크립트 구문으로 만들기 위해 함수 매개변수에 적절한 타입 애너테이션을 추가할 필요는 없다. 타입스크립트는 타입 오류로 오류를 계속 알리지만, 이미 시작된 자바스크립트는 계속 실행된다.

## 1.1 필수 매개변수

자바스크립트에서는 인수의 수와 상관없이 함수를 호출할 수 있다. 하지만 타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정한다. 함수가 잘못된 수의 인수로 호출되면, 타입스크립트는 타입 오류의 형태로 이의를 제기한다. 함수가 너무 적거나 많은 인수로 호출되면 타입스크립트는 이수의 개수를 계산한다.

`singTwo` 함수는 두 개의 매개변수가 필요하므로 하나 혹은 세 개의 인수를 전달하는 것은 모두 허용되지 않는다.

```tsx
function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

singTwo("Ball and Chain"); // 결과값: "Ball and Chain / undefined"
// ^^^^^^^^^^^^^^^^^^^^^^^^^  Expected 2 arguments, but got 1.ts(2554)

singTwo("I Will Survive", "Higher Love"); // 결과값: "I Will Survive / Higher Love"

singTwo("Go Your Own Way", "The Chain", "Dream"); // 결과값: "Go Your Own Way / The Chain"
//                                         ^^^^^^^ Expected 2 arguments, but got 3.
```

함수에 필수 매개변수required parameter를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화하는데 도움이 된다. 모든 인수값이 존재하는지 확인하지 못하면 이전 `singTwo` 함수가 `undefined`를 로그로 남기거나 인수를 무시하는 것과 같이 코드에 예기치 않은 동작이 발생한다.

## 1.2 선택적 매개변수

자바스크립트에서 함수 매개변수가 제공되지 않으면 함수 내부의 인숫값은 `undefined`으로 기본값이 설정된다.때로는 함수 매개변수를 제공할 필요가 없을 때도 있고, `undefined` 값을 위해 의도적으로 사용할 수도 있다.

타입스크립트가 이러한 선택적 매개변수에 인수를 제공하지 못하는 경우, 타입 오류를 보고하지 않았으면 할 수도 있다. 타입스크립트에서는 선택적 객체 타입 속성과 유사하게 타입 애너테이션의 `:` 앞에 `?`를 추가해 매개변수가 선택적이라고 표시한다.

함수 호출에 선택적 매개변수optional parameter를 제공할 필요는 없다. 선택적 매개변수에는 항상 `| undefined`가 유니언 타입으로 추가되어 있다.

아래 `announceSong` 함수에서 `singer` 매개변수는 선택 사항으로 표시된다. 타입은 `string | undefined`이며 함수 호출자가 `singer` 매개변수를 위한 인수를 제공할 필요가 없다.
만약 `singer`가 제공되면, `string` 값이거나 `undefined`일 수 있다.

```tsx
function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("Greensleeves");
announceSong("Greensleeves", undefined);
announceSong("Chandelier", "Sia");
```

이러한 선택적 매개변수는 항상 암묵적으로 `undefined`가 될 수 있다. 코드에서 `singer`는 `string | undefined` 타입으로 시작한 후 `if` 문에 따라 `string` 타입으로 좁혀진다.

선택적 매개변수는 `| undefined`를 포함하는 유니언 타입 매개변수와는 다르다. `?`으로 표시된 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 `undefined`일지라도 항상 제공되어야 한다.

함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다. 필수 매개변수 전에 선택적 매개변수를 위치시키면 아래와 같이 타입스크립트 구문 오류가 발생한다.

```tsx
function announceSongBy(song?: string, singer: string) {
  //                                   ^^^^^^ 'singer' is declared but its value is never read.
  //                                           A required parameter cannot follow an optional parameter.
  // ...
}
```

## 1.3 기본 매개변수

자바스크립트에서 선택적 매개변수를 선언할 때 `=`와 값이 포함된 기본값을 제공할 수 있다. 즉, 선택적 매개변수에는 기본적으로 값이 제공되기 때문에 해당 타입스크립트 타입에는 암묵적으로 함수 내부에 `| undefined` 유니언 타입이 추가된다. 타입스크립트는 함수의 매개변수에 대해 인수를 누락하거나 `undefined` 인수를 사용해서 호출하는 것을 여전히 허용한다.

타입스크립트의 타입 추론은 초기 변숫값과 마찬가지로 기본 함수 매개변수에 대해서도 유사하게 작동한다. 매개변수에 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기반으로 매개변수 타입을 유추한다.

아래 `rateSong` 함수에서 `rating`은 `number` 타입으로 유추되지만, 함수를 호출하는 코드에서는 선택적 `number | undefined`가 된다.

```tsx
function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph");
rateSong("Set Fire to the Rain", 5);
rateSong("Set Fire to the Rain", undefined);

rateSong("At Last!", "100");
//                   ^^^^^ Argument of type 'string' is not assignable to parameter of type 'number'.
```

## 1.4 나머지 매개변수

자바스크립트의 일부 함수는 임의의 수의 인수로 호출할 수 있도록 만들어진다. `...` 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 “나머지rest” 인수가 모두 단일 배열에 저장되어야 함을 나타낸다.

타입스크립트는 이러한 나머지 매개변수(rest parameter)의 타입을 일반 매개변수와 유사하게 선언할 수 있다. 단, 인수 배열을 나타내기 위해 끝에 `[]` 구문이 추가된다는 점만 다르다.

아래의 `singAllTheSongs`는 `songs` 나머지 매개변수에 대해 0개 이상의 `string` 타입 인수를 사용할 수 있다.

```tsx
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song} by ${singer}`);
  }
}

singAllTheSongs("Alicia Keys");
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");

singAllTheSongs("Adele", 2000);
//                       ^^^^ Argument of type 'number' is not assignable to parameter of type 'string'.
// 만약 모든 타입의 나머지 인수를 허용하고 싶다면 any[]를 사용
```

# 2. 반환 타입

타입스크립트는 지각적perceptive이다. 함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있다. 아래 코드에서 `singSongs`는 타입스크립트에서 `number`를 반환하는 것으로 파악된다.

```tsx
// 타입 (songs: string[]): number
function singSongs(songs: string[]) {
  for (const song of songs) {
    console.log(song);
  }

  return songs.length;
}
```

함수에 다른 값을 가진 여러개의 반환문을 포함하고 있다면, 타입스크립트는 반환 타입return type을 가능한 모든 반환 타입의 조합으로 유추한다.

아래 코드에서 `getSongAt` 함수는 `string | undefined`를 반환하는 것으로 유추된다. 두 가지 가능한 반환값이 각각 `string | undefined`이기 때문이다.

```tsx
// 타입 (songs: string[], index: number): string | undefined
function getSongAt(songs: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}
```

## 2.1 명시적 반환 타입

변수와 마찬가지로 타입 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는 것이 좋다. 그러나 특히 함수에서 반환 타입을 명시적으로 선언하는 방식이 매우 유용할 때가 종종 있다.

- 가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제한다.
- 타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부한다.
- 수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있다.

함수 선언 반환 타입 애너테이션은 매개변수 목록이 끝나는 `)` 다음에 배치된다. 함수 선언의 경우에는 `{` 앞에 배치된다.

```tsx
function singSongsRecursive(songs: string[], count = 0)**: number** {
  return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
}
```

화살표 함수의 경우 `=>` 앞에 배치된다.

```tsx
const arrowSingSongsRecursive = (songs: string[], count = 0)**: number** =>
	songs.length ? arrowSingSongsRecursive(songs.slice(1), count + 1) : count;
```

함수의 반환문이 함수의 반환 타입으로 할당할 수 없는 값을 반환하는 경우 타입스크립트는 할당 가능성 오류를 표시한다.

# 3. 함수 타입

자바스크립트에서는 함수를 값으로 전달할 수 있다. 즉, 함수를 가지기 위한 매개변수 또는 변수의 타입을 선언하는 방법이 필요하다.

함수 타입function type 구문은 화살표 함수와 유사하지만 함수 본문 대신 타입이 있다.

아래 `nothingInGivesString` 변수 타입은 매개변수가 없고 `string` 타입을 반환하는 함수임을 설명한다.

```tsx
let nothingInGivesString: () => string;

nothingInGivesString = () => "Hello";
```

아래 `inputAndOutput` 변수 타입은 `string[]` 매개변수와 `count` 선택적 매개변수 및 `number` 값을 반환하는 함수임을 설명한다.

```tsx
let inputAndOutput: (song: string[], count?: number) => number;

inputAndOutput = (songs: string[], count: number = 1): number =>
  songs.length * count;
```

함수 타입은 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용된다.

## 3.1 함수 타입 괄호

함수 타입은 다른 타입이 사용되는 모든 곳에 배치할 수 있다. 여기에는 유니언 타입도 포함된다.

유니언 타입의 애너테이션에서 함수 반환 위치를 나타내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용한다.

```tsx
let returnsStringOrUndefined: () => string | undefined;
returnsStringOrUndefined = () => "hi";
returnsStringOrUndefined = () => undefined;
returnsStringOrUndefined = undefined;
//^^^^^^^^^^^^^^^^^^^^^^ Type 'undefined' is not assignable to type '() => string | undefined'.

let maybeReturnsString: (() => string) | undefined;
maybeReturnsString = () => "hi";
maybeReturnsString = undefined;

maybeReturnsString = () => undefined;
//                   ^^^^^^^^^^^^^^^ Type '() => undefined' is not assignable to type '() => string'.
//                                   Type 'undefined' is not assignable to type 'string'.
```

## 3.2 매개변수 타입 추론(익명 함수)

매개변수로 사용되는 인라인 함수inline function를 포함하여 작성한 모든 함수에 대해 매개변수를 선언하는 것은 번거롭다. 다행히도 타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있다.

아래 `singer` 변수는 `string` 타입의 매개변수를 갖는 함수로 알려져 있으므로 나중에 `singer`가 할당되는 함수 내의 `song` 매개변수는 `string`으로 예측된다.

```tsx
let singer: (song: string) => string;

singer = function (song) {
  // 매개변수 song의 타입은 string
  return `Singing: ${song.toUpperCase()}`;
};
```

함수를 매개변수로 갖는 함수에 인수로 전달된 함수는 해당 매개변수 타입도 잘 유추할 수 있다.

예를 들어 아래 `song`과 `index` 매개변수는 타입스크립트에 따라 각각 `string`과 `number`로 유추된다.

```tsx
const songs = ["Call Me", "Jolene", "The Chain"];

songs.forEach(function (song, index) {
  // 매개변수 song의 타입은 string
  // 매개변수 index의 타입은 number
  console.log(`${song} is at index ${index}`);
});
```

이 과정을 “문맥적 타입 부여”라고 불리는데, 함수가 실행되는 ”문맥”을 통하여 해당 함수가 가져야 하는 타입을 알 수 있기 때문이다. 추론 규칙과 비슷하게, 이 과정이 어떻게 일어나는지를 명시적으로 배울 필요는 없지만, 이것이 **실제로 일어나는 과정**이라는 것을 이해하면 타입 표기가 불필요한 경우를 구분하는 데에 도움이 된다.

## 3.3 함수 타입 별칭

아래 `StringToNumber` 타입은 `string` 타입을 받고 `number` 타입을 반환하는 함수의 별칭을 지정한다. 별칭은 이후 변수 타입을 설명하는데 사용한다.

```tsx
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;
stringToNumber = (input) => input.length;

stringToNumber = (input) => input.toUpperCase();
//                          ^^^^^^^^^^^^^^^^^^^ Type 'string' is not assignable to type 'number'.ts(2322)
```

비슷하게 함수 매개변수도 함수 타입을 참조하는 별칭을 입력할 수 있다. 아래 `usesNumberToString` 함수는 함수 타입 별칭인 `NumberToString`의 단일 매개변수를 갖는다.

```tsx
type NumberToString = (input: number) => string;

function usesNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`);
}

usesNumberToString((input) => `${input}! Hooray!`);

usesNumberToString((input) => input * 2);
//                            ^^^^^^^^^^ Type 'number' is not assignable to type 'string'.
```

타입 별칭은 특히 함수 타입에 유용하다. 타입 별칭을 이용하면 반복적으로 작성하는 매개변수와 반환 타입을 갖는 코드 공간을 많이 절약할 수 있다.

# 4. 그 외 반환 타입

## 4.1 `void` 반환 타입

일부 함수는 어떠한 값도 반환하지 않는다. 예를 들어 `return` 문이 없는 함수이거나 값을 반환하지 않는 `return` 문을 가진 함수일 경우다. 타입스크립트는 `void` 키워드를 사용해 반환 값이 없는 함수의 반환 타입을 확인할 수 있다.

반환 타입이 `void`인 함수는 값을 반환하지 않을 수 있다. 아래 `logSong` 함수는 `void`를 반환하도록 선언되었으므로 값 반환을 허용하지 않는다.

```tsx
function logSongs(song: string | undefined): void {
  if (!song) {
    return;
  }

  console.log(`${song}`);

  return true;
  //^^^^^^ Type 'boolean' is not assignable to type 'void'.
}
```

함수 타입 선언 시 `void` 반환 타입은 매우 유용하다. 함수 타입을 선언할 때 `void` 타입을 사용하면 함수에서 반환되는 모든 값은 무시된다.

자바스크립트 함수는 실제 값이 반환되지 않으면 기본으로 모두 `undefined`를 반환하지만 `void`는 `undefined`와 동일하지 않다. `void`는 함수의 반환 타입이 무시된다는 것을 의미하고 `undefined`는 반환되는 리터럴 값이다. `undefined`를 포함하는 대신 `void` 타입의 값을 할당하려고 하면 타입 오류가 발생한다.

```tsx
function returnsVoid() {
  return;
}

let lazyValue: string | undefined;

lazyValue = returnsVoid();
// ^^^^^^^^^ Type 'void' is not assignable to type 'string | undefined'.
```

`undefined`와 `void`를 구분해서 사용하면 매우 유용하다. 특히 `void`를 반환하도록 선언된 타입 위치에 전달된 함수가 반환된 모든 값을 무시하도록 설정할 때 유용하다.

예를 들어 배열의 내장 `forEach` 메서드는 `void`를 반환하는 콜백을 받는다. `forEach`에 제공되는 함수는 원하는 모든 값을 반환할 수 있다.

아래 `saveRecords` 함수의 `records.push(record)`는 `number`(배열의 `.push()`에서 반환된 값)를 반환하지만, 여전히 `newRecords.forEach`에 전달된 화살표 함수에 대해 반환값이 허용된다.

```tsx
const records: string[] = [];

function saveRecords(newRecords: string[]) {
  newRecords.forEach((record) => records.push(record));
}

saveRecords(["21", "Come On Over", "The Bodyguard"]);
```

`void` 타입은 자바스크립트가 아닌 함수의 반환 타입을 선언하는데 사용하는 타입스크립트 키워드이다.
`void` 타입은 함수의 반환값이 자체적으로 반환될 수 있는 값도 아니고, 사용하기 위한 것도 아니라 표시임을 기억하자.

## 4.2 `never` 반환 타입

일부 함수는 값을 반환하지 않을 뿐만 아니라 반환할 생각이 없을 수도 있다. `never` 반환 함수는 (의도적으로) 항상 오류를 발생시키거나 무한 루프를 실행하는 함수이다.

함수가 절대 반환하지 않도록 의도하려면 명시적 `: never` 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 코드가 실행되지 않음을 나타낸다.

아래 `fail` 함수는 오류만 발생시키므로 `param`의 타입을 `string`으로 좁혀서 타입스크립트의 제어 흐름 분석control flow analysic을 도와준다.

```tsx
function fail(messagae: string): never {
  throw new Error(`Invariant failure: ${messagae}`);
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be string, not ${typeof param}`);
  }

  param.toUpperCase();
}
```

> `never`는 `void`와 다르다. `void`는 아무것도 반환하지 않는 함수를 위한 것이고, `never`는 절대 반환하지 않는 함수를 위한 것이다.

## 4.3 object 타입

`object` 타입은 원시 값(`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`)이 아닌 모든 값을 지칭한다.

```tsx
let user = {
  name: "John Doe",
  age: 30,
};

let number = 1;

function greet(person: object) {
  console.log("Hello there!");
}

greet(user);

greet(number);
//    ^^^^^^ Argument of type 'number' is not assignable to parameter of type 'object'.
```

## 4.4 unknown 타입

`unknown` 타입은 **모든 값**을 나타냅니다. `any` 타입과 유사하지만, `unknown` 타입에 어떤 것을 대입하는 것이 유효하지 않기때문에 보다 더 안전하다.

```tsx
function anyFunc(something: any) {
  something.toUpperCase();
}

function unknownFunc(something: unknown) {
  something.toUpperCase();
  //^^^^^^^^^ 'something' is of type 'unknown'.
}
```

`any` 형태의 값을 함수 본문에 사용하지 않고도, 아무 값이나 받는 함수를 표현할 수 있기 때문에, 함수 타입을 설명하는 데에 유용하게 쓰인다.

```tsx
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// 'obj'를 사용할 때 조심해야 한다.
const obj = safeParse(someRandomString);

console.log(obj.age);
//          ^^^ 'obj' is of type 'unknown'.

if (typeof obj === "object" && obj !== null && "age" in obj) {
  console.log(obj.age);
}
```

## 4.5 Function

어떤 종류의 함수든 `Function` 타입에 할당될 수 있다.
하지만 `Function` 타입은 매우 일반적이므로 특정 함수가 어떤 매개변수를 받아야 하고 어떤 값을 반환해야 하는지에 대한 세부 정보를 제공하지 않는다.

```tsx
function add(x: number, y: number): number {
  return x + y;
}

function doSomething(func: Function) {
  return func(1, 2, 3); // 예상치 못한 에러이지만 컴파일 에러가 발생하지 않는다. 왜냐하면 Function 타입은 인자의 갯수와 상관없이 동작하기 때문이다.
}

console.log(doSomething(add));
```

이를 해결하기 위해서는 구체적인 함수 타입을 사용해야 한다.

```tsx
// 생략...

type BinaryFunc = (x: number, y: number) => number;

function doSomethingError(func: BinaryFunc) {
  return func(1, 2, 3);
  //                ^ Expected 2 arguments, but got 3.
}

console.log(doSomethingError(add));
```

# 5. 함수 오버로드

일부 자바스크립트 함수는 선택적 매개변수와 나머지 매개변수만으로 표현할 수 없는 매우 다른 매개변수들로 호출 될 수 있다. 이러한 함수는 **오버로드 시그니처overload signature**라고 불리는 타입스크립트 구문으로 설명할 수 있다.
즉, 하나의 최종 **구현 시그니쳐implementation signature**와 그 함수의 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 반환 타입을 여러번 선언한다.

오버로드된 함수 호출에 대해 구문 오류를 생성할지 여부를 결정할 때 타입스크립트는 함수의 오버로드 시그니처만 확인한다. 구현 시그니처는 함수의 내부 로직에서만 사용된다.

함수 본문을 작성하기 위해 사용된 시그니처는 외부에서 “보이지 않는다”.

> 구현의 시그니처는 외부에서 보이지 않습니다. 오버로드된 함수를 작성할 때, **두 개 이상**의 시그니처를 함수 구현 위에 작성해야 한다.

아래 `createDate` 함수는 1개의 `timestamp` 매개변수 또는 3개의 매개변수(`month`, `day`, `year`)를 사용해 호출한다. 허용된 수의 인수를 사용해 호출할 수 있지만 2개의 인수를 사용해 호출하면 2개의 인수를 허용하는 오버로드 시그니처가 없기 때문에 타입 오류가 발생한다.

아래 코드의 첫 번째 줄, 두 번째 줄은 오버로드 시그니처이고 세 번째 줄은 구현 시그니처 코드이다.

```tsx
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(
  mothnOrTimestamp: number,
  day?: number,
  year?: number
): Date {
  return day === undefined || year === undefined
    ? new Date(mothnOrTimestamp)
    : new Date(year, mothnOrTimestamp, day);
}

createDate(55456800);
createDate(10, 6, 2023);

createDate(10, 6);
//^^^^^^^^^^^^^^^ No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

타입스크립트를 컴파일해 자바스크립트로 출력하면 다른 타입 시스템 구문처럼 오버로드 시그니처도 지워진다.

**좋은 오버로드 작성법**

아래는 문자열 혹은 배열의 길이를 반환하는 함수다.

```tsx
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

이 함수를 문자열이나 배열을 통해서 호출할 수 있다. 하지만 하나의 오버로드를 통해 함수를 해석하기 때문에 문자열 또는 배열이 **될 수 있는 값**을 통해서 호출할 수 없다.

```tsx
// 생략...

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ No overload matches this call.
//                                        Overload 1 of 2, '(s: string): number', gave the following error.
//                                          Argument of type 'number[] | "hello"' is not assignable to parameter of type 'string'.
//                                            Type 'number[]' is not assignable to type 'string'.
//                                        Overload 2 of 2, '(arr: any[]): number', gave the following error.
//                                          Argument of type 'number[] | "hello"' is not assignable to parameter of type 'any[]'.
//                                            Type 'string' is not assignable to type 'any[]'.
```

두 오버로드 모두 같은 인수 개수와, 같은 반환 타입을 가지기 때문에, 오버로드 되지 않은 함수의 형태로 아래와 같이 작성할 수 있다.

```tsx
function len(x: any[] | string) {
  return x.length;
}
```

> **함수 오버로드는 복잡하고 설명하기 어려운 함수 타입에 사용하는 최후의 수단이다.
> 함수를 단순하게 유지하고 가능하면 함수 오버로드를 사용하지 않는 것이 좋다. 가능한 유니온 타입을 사용**

## 5.1 호출 시그니처 호환성

오버로드된 함수의 구현에서 사용되는 구현 시그니처는 매개변수 타입과 반환 타입에 사용하는 것과 동일하다. 따라서 함수의 오버로드 시그니처에 있는 반환 타입과 각 매개변수는 구현 시그니처에 있는 동일한 인덱스의 매개변수에 할당할 수 있어야 한다. 즉, 구현 시그니처는 모든 오버러도 시그니처와 호환되어야 한다.

아래 `format` 함수의 구현 시그니처는 첫 번째 매개변수를 `string`으로 선언한다. 처음 두 개의 오버로드 시그니처는 `string` 타입과 호환되지만, 세 번째 오버로드 시그니처의 `() => string`과는 호환되지 않는다.

```tsx
function format(data: string): string;
function format(data: string, needle: string, haystack: string): string;

function format(getData: () => string): string;
//       ^^^^^^ This overload signature is not compatible with its implementation signature.

function format(data: string, needle?: string, haystack?: string): string {
  return needle && haystack ? data.replace(needle, haystack) : data;
}
```

즉, 오버로드 선언은 첫 번째 매개변수가 `string` 또는 `() => string` 타입이어야 한다고 명시했지만, 구현 시그니처에서는 첫 번째 매개변수가 항상 `string` 타입으로 처리되고 있다.

이를 해결하기 위해서는 아래와 같이 첫 번째 매개변수가 함수인 경우도 처리할 수 있도록 해야한다.

```tsx

// 생략...

function format(**data: string | (() => string)**, needle?: string, haystack?: string): string {
  if (typeof data === 'string') {
    return needle && haystack ? data.replace(needle, haystack) : data;
  } else {
    return needle && haystack ? data().replace(needle, haystack) : data();
  }
}
```

## 5.2 구성 시그니처

위의 호출 시그니처는 함수 타입 구조를 정의하는 것이라면 구성 시그니처는 `new 클래스명()` 생성자 함수 타입 구조를 정의 하는 것이다. 즉, 호출 시그니처 앞에 `new` 키워드를 붙임으로써 구성 시그니처를 정의할 수 있다.

```tsx
class Cat {
  constructor(public name: string) {} // 생성자 함수
}

interface ICatConstructor {
  new (name: string): Cat; // 구성 시그니처
}

// 클래스를 인수로 받고 대신 초기화 해주는 함수
function makeKitten(c: ICatConstructor, n: string) {
  return new c(n); // ok
}

const kitten = makeKitten(Cat, "Lucy");
console.log(kitten.name); // Lucy
```

# 6. this

타입스크립트는 함수 안에서의 `this`가 무엇이 되어야 할지, 아래처럼 코드 흐름 분석을 통해서 추론한다.

```tsx
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```

타입스크립트는 `user.becomeAdmin`이 외부 객체 `user`에 상응하는 `this`를 가지고 있다고 이해한다.

일반적으로 다른 객체가 함수를 호출할 때 제어하는 콜백 스타일 API에서 흔히 사용된다.

```tsx
interface User {
  id: number;
  admin: boolean;
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

declare const getDB: () => DB;

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

이때 화살표 함수를 사용하면 에러가 발생한다는 점을 기억하자

```tsx
const admins = db.filterUsers((this: User) => {
  //                           ^^^^^^^^^^ An arrow function cannot have a 'this' parameter.
  return this.admin;
});
```
