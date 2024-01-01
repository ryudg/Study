# 7. 선택이 아닌 필수, 타입스크립트

최근 자바스크립트 프로젝트는 대부분 타입스크립트로 작성되고 있다. 또한 Deno, Bun 등 Node.js의 대항마인 런타임들도 타입스크립트를 기본으로 지원한다.
현업에서도 대다수의 프로젝트가 타입스크립트 기반으로 개발되고 있으며, 이는 자바스크립트보다 타입스크립트로 작성되는 코드가 유리하다는 것을 의미한다.

동적 언어인 자바스크립트에 런타임에만 타입을 체크할 수 있는 한계를 극복해 코드를 안전하게 작성할 수 있으며 잠재적인 버그도 줄일 수 있다.
또한 타입스크립트는 자바스크립트의 상위 집합이므로 자바스크립트의 모든 기능을 그대로 사용할 수 있으므로 타입스크립트는 선택이 아닌 필수다.

## 7.1 타입스크립트란?

타입스크립트 홈페이지에서 타입스크립트를 "TypeScript is JavaScript with syntax for types."라고 정의한다. 즉, 기존 자바스크립트 문법에 가미한 것이 바로 타입스크립트다.

타입스크립트는 자바스크립트의 한계를 벗어나 타입 체크를 정적으로 런타임이 아닌 빌드(트랜스파일) 타임에 수행할 수 있게 도와준다.
또한 타입스크립트는 자바스크립트의 슈퍼셋으로 함수의 반환 타입, 배열, enum 등 기존에 사용하기 어려웠던 타입 관련 작업들을 손쉽게 처리할 수 있게 도와준다.

하지만 타입스크립트는 자바스크립트의 슈퍼셋일 뿐, 자바스크립트에서 불가능한 일은 타입스크립트에서도 불가능하다. 타입스크립트로 작성된 파일(`.ts`, `.tsx`)은 결국 자바스크립트로 변환되어 Node.js나 브라우저 같은 자바스크립트 런타임 환경에서 실행되는 것이 목표이기 때문이다.

타입스크립트 이전의 리액트 코드는 Flow라고 하는 정적 타입 체크 라이브러라를 사용해 타입 체크를 수행했다. 하지만 최근에 Flow는 타입스크립트에 비해 사용률이 낮고, 타입스크립트에 비해 타입 체크가 덜 엄격하다. 또한 타입스크립트는 자바스크립트의 슈퍼셋이므로 자바스크립트의 모든 기능을 그대로 사용할 수 있지만, Flow는 자바스크립트의 일부 기능만 지원한다.

## 7.2 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법

타입스크립트는 얼마나 타입을 엄격하게, 적극적으로 활용하는가에 따라 효용성에 큰 차이를 보인다.

### 7.2.1 `any` 대신 `unknown`을 사용하자

`any` 타입은 불가피할 때만 사용해야 하는 타입이다. `any`를 사용한다는 것은 타입스크립트가 제공하는 정적 타이핑의 장점을 모두 포기하는 것과 다름없다.

```ts
function doSomething(callback: any) {
  callback();
}

doSomething(1); // 타입스크립트에서 에러가 발생하지 않지만 런타임에서는 에러가 발생한다.
```

`doSomething`은 `callback`을 인수로 받는이 해당 타입이 `any`로 되어있어 함수가 아닌 값이 들어가도 에러가 발생하지 않는다.

대신 불가피하게 아직 타입을 단정할 수 없는 경우에는 `unknown`을 사용하는 것이 좋다. `unknown`은 `any`와 마찬가지로 모든 타입을 허용하지만, 이 값을 바로 사용하는 것은 불가능하다.

```ts
function doSomething(callback: unknown) {
  callback(); // 'callback' is of type 'unknown'
}
```

`unknown` 타입의 값을 사용하려면 type narrowing을 수행해 원래 의도했던 대로 타입을 좁혀야 한다.

```ts
function doSomething(callback: unknown) {
  if (typeof callback === "function") {
    callback();
  }

  throw new Error("콜백 함수가 필요합니다.");
}
```

top type인 `unknonw`과 반대되는 bottom type인 `never`는 어떠한 타입도 들어올 수 없음을 의미한다.

```ts
type what1 = string & number; // never
type what2 = ("hello" | "hi") & "react"; // never
```

1. 첫 번째 타입 `what1`은 `string`과 `number`의 교집합이므로 어떠한 값도 할당할 수 없다. 따라서 `what1`은 `never` 타입이 된다.
2. 두 번째 타입 `what2`도 마찬가지로, `string` 타입의 `"hello"` 또는 `"hi"`와 `"react"`의 교집합이므로 어떠한 값도 할당할 수 없다. 따라서 `what2`도 `never` 타입이 된다.

실제 리약트의 클래스형 컴포넌트를 선언할 때 `props`는 없지만 `state`가 존재하는 상황에서 빈 `props`, 정확히는 어떠한 `props`도 받아들이지 않는다는 뜻으로 사용 가능하다.

<details>

<summary>예시</summary>

```tsx
type Props = Record<string, never>; // string은 키지만, 값은 never이므로 어떠한 값도 할당할 수 없다.ㄴ
type State = {
  counter: 0;
};

class MyComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return <>...</>;
  }
}

export default function App() {
  return (
    <>
      {/* OK */}
      <MyComponent />
      {/* Type 'string' is not assignable to type 'never' */}
      <MyComponent name="mike" />
    </>
  );
}
```

위의 `MyComponent`는 어떠한 `props`도 받을 수 없는 대신, `state`가 존재한다.

`React.Component`의 제네릭은 `Props`와 `State`를 순서대로 작성해야 하는데, `Props`의 경우 `Record<string, never>`로 작성해 어떠한 `props`도 받지 않는다는 것을 명시했다.

</details>

### 7.2.2 타입 가드를 적극 활용하자

타입을 사용하는 쪽에서는 최대한 타입을 좁히는 것이 좋다. 이러한 타입을 좁히는 데 도움을 주는 것이 타입 가드다.

조건문과 타입 가드를 사용하면 효과적으로 타입을 좁힐 수 있어 조금 더 명확한 변수나 함수를 사용할 수 있다.

#### 7.2.2.1 `instanceof`와 `typeof`

`instanceof`는 지정한 인스턴스가 특정 클래스의 인스턴스인지 확인할 수 있는 연산자다.

<details>

<summary>예시</summary>

```ts
class UnAuthorizedError extends Error {
  constructor() {
    super();
  }

  get message() {
    return "Unauthorized Error";
  }
}

class UnExpectedError extends Error {
  constructor() {
    super();
  }

  get message() {
    return "Unexpected Error";
  }
}

async function fetchUsers() {
  try {
    const res = await fetch("/users");
    const data = await res.json();
    return data;
  } catch (error) {
    // error는 unknown 타입이므로 타입 가드를 통해 타입을 좁혀줘야 한다.

    // instanceof를 사용해 UnAuthorizedError 타입인지 확인한다.
    if (error instanceof UnAuthorizedError) {
      // ...
    }

    // instanceof를 사용해 UnExpectedError 타입인지 확인한다.
    if (error instanceof UnExpectedError) {
      // ...
    }

    throw error;
  }
}
```

`unknown`으로 내려오는 에러에 대해 타입 가드를 통해 타입을 좁힘으로써 각 에러에 따라 원하는 처리 내용을 추가할 수 있다.

</details>

`typeof`는 특정 요소에 대해 자료형을 확인하는 연산자다.

<details>

<summary>예시</summary>

```ts
function logging(value: string | undefined) {
  if (typeof value === "string") {
    console.log(value);
  }

  if (typeof value === "undefined") {
    return;
  }
}
```

`typeof`를 사용해 `value`의 타입을 확인하고, `string`이라면 `console.log`를 호출하며, `undefined`라면 `return`한다.

</details>

#### 7.2.2.2 `in`

`in`은 `property in object`로 사용되며, 어떤 객체에 키가 존재하는지 확인하는 용도로 사용된다.

<details>

<summary>예시</summary>

```ts
interface Student {
  age: number;
  score: number;
}

interface Teacher {
  name: string;
}

function doSchool(person: Student | Teacher) {
  if ("age" in person) {
    // person은 Student 타입이므로 age가 존재한다.
    console.log(person.age);
    console.log(person.score);
  }

  if ("name" in person) {
    // person은 Teacher 타입이므로 name이 존재한다.
    console.log(person.name);
  }
}
```

`in`을 사용해 `person`이 `Student` 타입인지 `Teacher` 타입인지 확인하고, 각 타입에 맞는 처리를 수행한다.

</details>

#### 7.2.2.3 제네릭

제네릭(generic)은 함수나 클래스 내부에서 단일 타입이 아닌 다양한 타입에 대응할 수 있도록 도와주는 문법이다.
제네릭을 사용하면 타입만 다른 비슷한 작업을 하는 컴포넌트를 단일 제네릭 컴포넌트로 선언해 간결하게 작성할 수 있다.

<details>

<summary>예시</summary>
예를 들어, 하나의 타입으로 이뤄진 배열의 첫 번째와 마지막 요소를 반환하는 함수를 만든다고 가정하면, 다양한 타입에 대응해야 하기 때문에 `unknown`, `any` 타입을 사용해야 한다.

```ts
function getFirstAndLast(list: unknown[]) {
  return [list[0], list[list.length - 1]];
}

const [first, last] = getFirstAndLast([1, 2, 3, 4, 5]);

// first: unknown
// last: unknown
```

위의 코드는 `unknown` 타입을 사용해 다양한 타입에 대응할 수 있지만, 결과값이 `unknown`이 나오기 때문에 타입을 좁혀야 한다.

```ts
function getFirstAndLast<T>(list: T[]): [T, T] {
  return [list[0], list[list.length - 1]];
}

const [first, last] = getFirstAndLast([1, 2, 3, 4, 5]);

// first: number
// last: number

const [first, last] = getFirstAndLast(["a", "b", "c"]);

// first: string
// last: string
```

`T`라는 제네릭을 선언해, 이를 각각 배열의 요소와 반환 값의 요소로 사용한다.

</details>

리액트에서 제네릭을 사용할 수 있는 코드로 `useState`를 예시로 들 수 있다.

```tsx
function Component() {
  // state: string
  const [value, setValue] = useState<string>("");
  // ...
}
```

`useState`에 제네릭으로 타입을 선언하면 `state` 사용과 기본값 선언을 명확하게 할 수 있다.
흔히 `useState()` 같은 형식으로 기본값을 넘기지 않고 사용하는 경우가 많은데, 이 경우 값을 `undefined`로 추론해 버리는 문제가 발생한다.

제레닉을 하나 이상 사용할 수도 있는데, 이 경우 `T`, `U`와 같은 알파벳으로 표현하지만 가급적 적절한 네이밍을 해 가독성을 높이는 것이 좋다.

<details>

<summary>예시</summary>

```tsx
function multiplGeneric<First, Last>(a1: First, a2: Last): [First, Last] {
  return [a1, a2];
}

const [a, b] = multiplGeneric<number, string>(1, "a");
// a: number
// b: string
```

</details>

#### 7.2.2.4 인덱스 시그니처

인덱스 시그니처란 객체의 키를 정의하는 방식을 의미한다.

<details>

<summary>예시</summary>

```ts
type Person = {
  [key: string]: string;
};

const person: Person = {
  name: "mike",
  age: "23",
};

person["name"]; // OK
person["age"]; // OK

person["greet"]; // undefined
```

`[key: string]`이 인덱스 시그니처이며, `key`는 키의 이름을 의미하고 `string`은 키의 값의 타입을 의미한다.

</details>

인덱스 시그니처를 사용하면 키에 원하는 타입을 부여할 수 있고, 동적인 객체를 정의할 때 유용하지만 키의 범위가 너무 넓어지면 타입의 안정성을 잃을 수 있다.
따라서 객체의 키는 동적으로 선언되는 경우를 지양하고, 객체의 타입도 필요에 따라 좁혀야 한다.

객체의 키를 좁히는 방법은 두 가지 이다.

1.  <details>
    <summary><code>Record&lt;Key, Value&gt;</code>를 사용</summary>

    ```ts
    // record를 사용
    type Person = Record<"name" | "age", string>;
    const person: Person = {
      name: "mike",
      age: "23",
    };
    ```

    `Record<Key, Value>`를 사용하면 객체의 타입에 각각 원하는 키와 값을 넣을 수 있다.
    </details>

2.  <details>

    <summary>타입을 사용한 인덱스 시그니처</summary>
      
      ```ts
      // 타입을 사용한 인덱스 시그니처
      type Person = {
        [key in 'name' | 'age']: string;
      };
      const person: Person = {
      name: 'mike',
      age: '23',
      };
      ```

    인덱스 시그니처에 타입을 사용함으로써 객체를 원하는 형태로 최대한 좁힐 수 있다.
      </details>

객체에 인덱스 시그니처를 사용했을 때 아래와 같은 이슈를 마주칠 수 있다.

```ts
Object.keys(person).map((key) => {
  // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Person'.
  // No index signature with a parameter of type 'string' was found on type 'Person'.

  const value = person[key];
  return value;
});
```

분명 `person` 객체의 `key`를 `Object.keys`를 통해 가져왔는데, `key`를 `person`의 키로 사용할 수 없다는 에러가 발생한다.

이는,

```ts
const result = Object.keys(person); // string[]
```

`Object.keys`가 `string[]`을 반환하는데, 이 `string`은 `person`의 인덱스 키로 사용할 수 없기 때문이다.

이를 해결하기 위한 방법으로는

1. `Object.keys(persopn)`을 `as`로 타입 단언 하기

   <details>

    <summary>예시</summary>

   ```ts
   (Object.keys(person) as Array<keyof Person>).map((key) => {
     const value = person[key];
     return value;
   });
   ```

   `Object.keys`에 대한 반환 탕비을 `string[]` 대신 단언한 타입으로 강제하는 방법이다.
    </details>

2. 타입 가드 함수를 만들기

   <details>

    <summary>예시</summary>

   ```ts
   function keysOf<T extends Object>(obj: T): Array<keyof T> {
     return Array.from(Object.keys(obj)) as Array<keyof T>;
   }

   keyOf(person).map((key) => {
     const value = person[key];
     return value;
   });
   ```

   `keysOf`라는 `Object.keys`를 대신할 함수를 만들어, 객체의 키를 가져옴가 동시에 가져온 배열에 대해서도 타인 단언으로 처리해하는 방법이다.
    </details>

3. 가져온 `key`를 단언하는 방법

   <details>

    <summary>예시</summary>

   ```ts
   Object.keys(person).map((key) => {
     const value = person[key as keyof Person];
     return value;
   });
   ```

   `key`를 `keyof Person`으로 단언하는 방법이다.
    </details>

> `Object.keys`는 `string[]`으로 강제되어 있는데, 이는 자바스크립트의 특징과 이를 구현하기 위한 타입스크립트의 구조적 타이핑의 특징 때문이다.
> 자바스크립트는 다른 언어에 비해 객체가 열려 있는 구조로 만들어져 있어 덕 타이핑으로 객체를 비교해야한다.
> 덕 타이핑이란, 객체의 타입이 클래스 상속, 인터페이스 구현 등으로 결정되는 것이 아니고 어떤 객체가 필요한 변수와 메서드만 지니고 있다면 해당 타입에 속하도록 인정해 주는 것을 의미한다.

타입스크립트의 핵심 원칙은 타입 체크를 할 때 값이 가진 형태에 집중한다는 것이다.

<details>

<summary>덕 타이핑과 <code>Object.keys</code>의 관계</summary>

```ts
type Cat = { name: string };
type Bella = Cat & { age: number };

function meow(cat: Cat) {
  console.log(`${cat.name} is meowing`);
}

const bella: Bella = {
  name: "bella",
  age: 1,
};

meow(bella); // Cat에 필요한 속성은 다 가지고 있기 때문에 Cat처럼 name을 가지고 있으므로 정상적으로 동작한다.
```

이처럼 자바스크립트는 객체의 타입에 구애받지 않고 객체의 타입에 열려 있으므로 타입스크립트도 이러한 자바스크립트의 특징을 맞춰야 한다.

즉, 타입스크립트는 모든 키가 들어올 수 있는 가능성이 열려 있는 객체의 키에 포괄적으로 대응하기 위해 `string[]`으로 타입을 제공한다.

</details>

## 7.3 타입스크립트 전환 가이드

한 번에 타입스크립트로 전환할 수 없는 규모가 큰 프로젝트라면 점진적으로 전환하는 것을 고려해볼 수 있다.

### 7.3.1 `tsconfig.json` 파일 작성

타입스크립트로 전환하기 위해 가장 먼저 해야하는 것은 타입스크립트를 작성할 수 있는 환경을 만드는 것이다.
최상위 디렉터리의 `tsconfig.json`을 생성해 아래와 같이 작성한다.

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

- `outDir`: `.ts`, `.js`가 만들어진 결과를 넣어두는 폴더다. `tsc` 명령어를 사용해 결과를 생성할 때 이 폴더에 결과물이 생성된다.
- `allowJs`: `.js` 파일을 허용할 것인지에 대한 여부다. 자바스크립트에서 타입스크립트로 전환할 때는 `allowJs`를 `true`로 설정해 자바스크립트 파일을 허용해야 한다.
- `target`: 트랜스파일할 자바스크립트 버전을 결정한다.
- `include`: 트랜스파일할 자바스크립트와 타입스크립트 파일을 지정한다.

그 밖에도 `tsconfig.json`에는 다양한 옵션이 존재한다. 자세한 내용은 [타입스크립트 공식 문서](https://www.typescriptlang.org/tsconfig)를 참고하자.

### 7.3.2 `JSDoc`과 `@ts-check`를 활용해 점진적으로 전환하기

자바스크립트 파일을 타입스크립트로 전환하지 않더라도 타입을 체크하는 방법이 있다.

먼저 파일 최상단에 `//@ts-check`를 선언하고, `JSDoc`을 활용해 변수나 함수에 타입을 제공하면 타입스크립트 컴파일러가 자바스크립트 파일의 타입을 확인한다.

<details>

<summary>예시</summary>

```js
//@ts-check

/**
 * @type {string}
 */
const str = true;

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function sum(a, b) {
  return a + b;
}

/**
 * Funtion lacks ending return statement and return type does not include 'undefined'.
 * @return {JSX.Element}
 */
export function Component() {
  // Argument of type 'string' is not assignable to parameter of type 'number'.
  const result1 = sum("a", "b");
  // Argument of type 'string' is not assignable to parameter of type 'number'.
  const result2 = sum(1, str);

  if (result1 && result2) {
    return (
      <>
        {result1} {result2}
      </>
    );
  }
}
```

</details>

### 7.3.3 타입 기반 라이브러리 사용을 위해 `@types` 모듈 설치하기

자바스크립트 기반으로 작성된 라이브러리를 설치해 사용하고 있다면 타입스크립트에서 라이브러리를 정상적으로 사용하기 위해서는 `@types`라고 불리는 `DefinitelyTyped`를 설치해야 한다.
이는 타입스크립트로 작성되지 않은 코드에 대한 타입을 제공하는 라이브러리이다.

리액트를 사용하기 위해서도 해당 모듈을 설치해야한다. 리액트에 대한 타입은 `@types/react`와 `@types/react-dom` 등에 정의되어 있다.

모든 라이브러리가 `@types`를 필요로 하는 것은 아니다. Next.js와 같은 최근에 만들어진 라이브러리들은 이미 자체적으로 타입스크립트 지원 기능이 내장되어 있다.

만약 파일을 `.ts`로 전환하는데 `import`에 `Cannot finde module '...' or its corresponding type declarations.` 에러가 발생한다면 해당 라이브러리의 `@types` 모듈을 설치해야 한다.

### 7.3.4 파일 단위로 조금씩 전환하기

가장 먼저 전환해 볼 만한 파일은 상수나 유틸과 같이 별도의 의존성을 가지고 있지 않은 파일이다. 파일을 하나씩 타입스크립트로 전환하고, 상수의 경우에는 `string`, `number`와 같이 원시값 대신 가능한 한 타입을 좁혀서 사용하는 것이 좋다. 이렇게 타입을 좁히다 보면 이를 가져다 사용하는 쪽에서도 수정이 필요할 수도 있다.

## 7.4 요약

21년 깃허브 조사에 따르면 타입스크립트의 랭킹은 자바스크립트, 파이썬, 자바에 이어 4위다. 이 결과만 봐도 타입스크립트가 점차 자바스크립트 생태계에 차지하는 비중이 커짐을 알 수 있다.
따라서 타입스크립트를 적극적으로 도입해 코드의 안정성을 높이고, 잠재적인 버그를 줄이며, 코드의 가독성을 높이는 것이 좋다.

하지만 타입스크립트는 어디까지나 자바스크립트의 슈퍼셋 언어로 타입스크립트의 모든 것이 자바스크립트 기반이기 때문에 결과적으로 자바스크립트를 완벽히 이해해야 한다.
