# 1. 타입의 종류

“**Type**”은 자바스크립트에서 다루는 값의 **형태**에 대한 설명이다.
여기서 “**형태**”란 값에 존재하는 속성과 메서드 그리고 내장되어 있는 `typeof` 연산자가 설명하는 것을 의미한다.

예를들어 아래와 같이 초깃값이 “Kim”인 변수를 생성하는 경우 TypeScript는 `singer` 변수가 문자열 타입임을 유추할 수 있다.

```tsx
let singer = "Kim";
// let singer: string
```

TypeScript의 가장 기본적인 type은 JavaScript의 7가지 기본 원시 타입primitive type과 동일하다.

1. `null`
2. `undefined`
3. `boolean`
4. `string`
5. `number`
6. `bigint`
7. `symbol`

```tsx
const str: string = "hello";
const num: number = 123;
const bool: boolean = true;
const n: null = null;
const u: undefined = undefined;
const sym: symbol = Symbol("sym");
const obj: object = { hello: "world" };
const big: bigint = 1000000n;
//                  ^^^^^^^^ BigInt literals are not available when targeting lower than ES2020.
```

TypeScript는 계산된 초깃값을 갖는 변수 타입을 유추할 수 있을 만큼 똑똑하다. 아래 예제에서 TypeScript는 삼항 연산자의 결과가 항상 문자열이라는 것을 알고 있으므로 `bestSong` 변수는 `string` type이다.

```tsx
let bestSong = Math.random() > 0.5 ? "폰서트" : "부동의 첫사랑";
// let bestSong: string
```

함수에서는 아래 코드와 같이 표기한다.
매개변수의 타입은 매개변수 바로 뒤에 표기하고, 반환값의 타입은 함수의 매개변수 소괄호 뒤에 표기한다.

```tsx
function plus(x: number, y: number): number {
  return x + y;
}

const minus = (x: number, y: number): number => x - y;
```

> 💡 JavaScript에서 객체와 원시 타입 간의 차이점을 생각해보자
> `Boolean`과 `Number`와 같은 객체는 각 원시값을 감싸는 객체이다.
> TypeScript에서는 일반적으로 `boolean`과 `number`처럼 소문자로 참조하는 것이 올바르다.

## 1.1 Type System

타입 시스템Type System은 프로그래밍 언어가 프로그램에서 가질 수 있는 type을 이해하는 방법에 대한 규칙 집합.

기본적으로 TypeScript의 타입 시스템은 아래와 같이 동작한다.

1. 코드를 읽고 존재하는 모든 타입과 값을 이해한다.
2. 각 값이 초기 선언에서 가질 수 있는 타입을 확인한다.
3. 각 값이 추후 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인한다.
4. 값의 사용법이 타입과 일치하지 않으면 사용자에게 오류를 표시한다.

타입 추론 과정을 살펴보자.
아래는 TypeScript가 **멤버** 속성을 함수로 잘못 호출해 타입 오류가 발생하는 코드다.

```tsx
let firstName = "Kim";
firstName.length();
//        ^^^^^^ This expression is not callable.
//               Type 'Number' has no call signatures.
```

TypeScript의 아래와 같은 순서로 오류를 표시한다.

1. 코드를 읽고 `firstName`이라는 변수를 이해한다.
2. 초깃값이 `“Kim”`이므로 `firstName`이 `string` type이라고 결론짓는다.
3. `firstName`의 `.length` 멤버를 함수처럼 호출하는 코드를 확인한다.
4. `string`의 `.length` 멤버는 함수가 아닌 숫자라는 오류를 표시한다.
   **즉, 함수처럼 호출할 수 없다.**

> **멤버member**란 객체 지향 프로그래밍(OOP)에서 하나의 클래스를 구성하는 개별적인 구성 요소
> 즉, 객체 안에 포함된 변수를 멤버 변수 혹은 멤버 프로퍼티(속성)이라 하고, 기능은 멤버 메서드라고 한다.

## 1.2 오류 종류

TypeScript를 작성하는 동안 가장 많이 접하는 오류는 아래의 두 가지 이다.

1. **Syntax Error구문 오류**: TypeScript가 JavaScript로 변환되는 것을 차단한 경우

   - 구문 오류는 TypeScript가 코드로 이해할 수 없는 잘못된 구문을 감지할 때 발생한다. 이는 TypeScript가 TypeScript 파일에서 JavaScript 파일을 올바르게 생성할 수 없도록 차단한다.
     물론 TypeScript 코드를 JavaScript로 변환하는 데 사용하는 도구와 설정에 따라 JavaScript 코드를 얻을 수도 있다(tsc 기본 설정에서는 가능). 하지만 결과가 예상과 다를 수 있다.
     > 💡 TypeScript는 구문 오류와 상관 없이 JavaScript 코드를 출력하기 위해 최선을 다하지만, 원하는 결과를 기대를 보장하지 않는다.
     > 따라서 출력된 JavaScript를 실행하기 전 구문 오류를 수정하자

2. **Type Error타입 오류**: 타입 검사기에 따라 일치하지 않는 것이 감지된 경우
   - 타입 오류는 TypeScript의 타입 검사기가 프로그램의 타입에서 오류를 감지했을 때 발생한다. 오류가 발생했다고 해서 TypeScript 구문이 JavaScript로 변환되는 것을 차단하지는 않는다. 하지만 코드가 실행되면서 무언가 충돌하거나 예기치 않게 동작할 수 있음을 나타낸다.
   - TypeScript는 타입 오류가 있음에도 JavaScript 코드를 출력할 수 있지만, 출력된 JavaScript 코드가 원하는대로 실행되지 않을 가능성이 있다는 신호를 타입 오류로 알려준다.
     JavaScript를 실행하기 전에 타입 오류를 확인하고 발견된 문제를 먼저 해결하자.

# 2. 할당 가능성

TypeScript는 변수의 초깃값을 읽고 해당 변수가 허용되는 타입을 결정한다.
나중에 해당 변수에 새로운 값이 할당되면, 새롭게 할당된 값의 타입이 변수의 타입과 동일한지 확인한다.

TypeScript 변수에 동일한 타입의 다른 값이 할당될 때는 문제가 없다.
예를 들어 변수가 처음에 `string` 값이면 나중에 다른 `string` 값을 할당하는 것은 문제가 없다.
하지만 TypeScript 변수에 다른 타입의 값이 할당되면 타입 오류가 발생한다.
예를 들어 처음에는 `string` 값으로 변수를 선언한 다음 나중에 `boolean` 값을 넣을 수 없다.

TypeScript에서 함수 호출이나 변수에 값을 제공할 수 있는지 여부를 확인하는 것을 “**할당 가능성 assignability”** 라고 한다. 즉, 전달된 값이 예상된 타입으로 할당 가능한지 여부를 확인한다.

## 2.1 할당 가능성 오류 이해하기

“Type … is not assignable to type … “ 형태의 오류는 TypeScript 코드를 작성할 때 가장 자주 만나는 일반적인 오류 중 하나다.
해당 오류 메세지에서 언급된 첫 번째 type은 코드에서 변수에 할당하려고 시도하는 값이다.
두 번째 type은 값(첫 번째 타입)이 할당되는 변수다.

```tsx
let lastName = "Cheolsoo";
lastName = true;
```

예를 들어 위 코드에서 `lastName = true;`를 작성할 때 `boolean` type인 `true` 값을 `string` type인 변수 `lastName`에 할당하려고 했다.

# 3. 타입 애너테이션Type Annotation

때로는 변수에 TypeScript가 읽어야 할 초깃값이 없는 경우도 있다. TypeScript는 나중에 사용할 변수의 초기 타입을 파악하려고 시도하지 않는다. 그리고 기본적으로 변수를 암묵적인 `any` type으로 간주한다. 즉, 변수는 어떤 type이든 가능하다.

초기 타입을 유추할 수 없는 변수는 **“진화하는 `any`”** 라고 부른다. 특정 type을 강제하는 대신 새로운 값이 할당될 때마다 변수 타입에 대한 이해를 발전시킨다.

아래의 코드를 보면 진화하는 `any` 변수인 `user`에 처음에는 문자열이 할당되는데, 이는 `toUpperCase()` 같은 `string` 메서드를 갖는 것을 의미하지만, 그 다음에 `number` 타입으로 진화되는 것을 확인할 수 있다.

```tsx
let user; // type: any
user = "Lee"; // type: string
user.toUpperCase();

user = 123.456; // type: number
user.toPrecision(1); // toPrecision()은 number 타입의 메소드이며, 소수점 이하의 자릿수를 지정한 만큼 표시한다.

user.toUpperCase();
//   ^^^^^^^^^^^ Property 'toUpperCase' does not exist on type 'number'.
```

TypeScript는 `number` type으로 진화한 변수가 `toUpperCase()` 메서드를 호출하는 것을 포착했다. 그러나 변수가 `string` type에서 `number` type으로 진화된 것이 처음부터 의도된 것인지에 대한 여부는 미리 알 수 없다.

일반적으로 `any` type을 사용해 `any` type으로 진화하는 것을 허용하게되면 TypeScript의 type 검사 목적을 부분적으로 쓸모 없게 만든다. TypeScript는 값이 어떤 type인지 알고 있을 때 가장 이상적으로 작동한다. `any` type을 가진 값에는 TypeScript의 타입 검사 기능을 잘 적용할 수 없다. 검사를 위해 알려진 type이 없기 때문이다.

TypeScript는 초깃값을 할당하지 않고도 변수의 type을 선언할 수 있는 구문인 **“타입 애너테이션Type Annotation”** 을 제공한다. 타입 애너테이션은 변수 이름 뒤에 배치되며 콜론(`:`)과 타입 이름을 차례대로 작성한다.

이러한 타입 애너테이션은 TypeScript에만 존재하며 런타임 코드에 영향을 주지도 않고, 유효한 JavaScript 구문도 아니다. `tsc` 명령어를 실행해 TypeScript 소스 코드를 JavaScript로 컴파일 하면 해당 코드가 삭제된다.

변수에 타입 애너테이션으로 정의한 타입 외의 값을 할당하면 타입 오류가 발생한다.

## 3.1 불필요한 타입 애너테이션

타입 애너테이션은 TypeScript가 자체적으로 수집할 수 없는 정보를 TypeScript에 제공할 수 있다. 타입을 즉시 유추할 수 있는 변수에도 타입 애너테이션을 사용할 수 있다.
하지만 TypeScript가 아직 알지 못하는 것은 알려주지 못한다.

아래 코드는 `fristName`은 `string` type으로 선언되었지만, `number` 값인 `123`으로 초기화 되었다.

```tsx
let firstName: string = 123;
//  ^^^^^^^^^ Type 'number' is not assignable to type 'string'.
```

# 4. 타입 형태

TypeScript는 변수에 할당된 값이 원래 type과 일치하는지 확인하는 것 이상을 수행한다.
TypeScript는 객체에 어떤 멤버 속성이 존재하는지 알고 있다. 만약 코드에서 변수의 속성에 접근하려 하면 TypeScript는 접근하려는 속성이 해당 변수의 type에 존재하는지 확인한다.

`string` type의 `rapper` 변수를 선언한다고 가정하자. 나중에 `rapper` 변수를 사용할 때 TypeScript가 `string` type에서 사용 가능한 작업만을 허용한다.

```tsx
let rapper = "Eminem";
rapper.length;
```

TypeScript가 `string` type에서 작동하는지 알 수 없는 작없은 허용되지 않는다.

```tsx
let rapper = "Eminem";

rapper.push("!");
//     ^^^^ Property 'push' does not exist on type 'string'.
```

## 4.1 모듈

JavaScript는 비교적 최근까지 서로 다른 파일에 작성된 코드를 공유하는 방법과 관련된 사양을 제공하지 않았다. ECMAScript 2015에는 파일간 가져고오import 내보내는export 구문을 표준화 하기 위해 ECMAScript 모듈ECMAScript Modules(ESM)이 추가되었다.

아래의 모듈 파일은 `./values` 파일에서 `value`를 가져오고, 변수 `double`를 내보낸다.

```tsx
import { value } from "./value";

export const double = value * 2;
```

- **모듈**: `export`와 `import`가 있는 파일
- **스크립트**: 모듈이 아닌 모든 파일

TypeScript는 최신 모듈 파일을 기존 파일과 함께 실행할 수 있다. 모듈 파일에 선언된 모든 것은 해당 파일에서 명시한 `export` 문에서 내보내지 않는 한 모듈 파일에서만 사용할 수 있다.
한 모듈에서 다른 파일에 선언된 변수와 동일한 이름으로 선언된 변수는 다른 파일의 변수를 가져오지 않는 한 이름 충돌로 간주하지 않는다.

아래의 `a.ts`와 `b.ts` 파일은 모듈 스타일의 `export` 또는 `import` 문이 없기 때문에 일반 스크립트로 간주된다. 따라서 동일한 이름의 변수가 동일한 파일에 선언된 것처럼 서로 충돌한다.

```tsx
// a.ts
const shared = "Cher";
//    ^^^^^^ Error: Cannot redeclare block-scoped variable 'shared'.

// b.ts
const shared = "Cher";
//    ^^^^^^ Error: Cannot redeclare block-scoped variable 'shared'.
```

TypeScript 파일에 `Cannot redeclare...` 이라는 오류가 표시되면 파일에 아직 `export` 또는 `import` 문을 추가하지 않았기 때문일 수도 있다. ECMAScript 사양에 따라 `export` 또는 `improt` 문 없이 파일을 모듈로 만드러야 한다면 파일의 아무 곳에나 `export{};`를 추가해 강제로 모듈이 되도록 만든다.

```tsx
// a.ts, b.ts
const shared = "Cher";

export {};
```

> 💡 TypeScript는 CommonJS와 같은 이전 모듈을 사용해서 작성된 TypeScript 파일의 `import` `export` 형태는 인식하지 못한다. TypeScript는 일반적으로 CommonJS 스타일의 `require` 함수에서 반환된 값을 `any` 타입으로 인식한다.
