# 1. 자바스크립트의 동등 비교

리액트 함수형 컴포넌트와 훅을 반복적으로 사용하다 보면 의존성 배열(dependency array)에 대해 고민해 본 적이 있을 것이다.
보통은 `eslint-react-config`에 선언 되어 있는 `react-hooks/exhaustive-deps`의 도움을 받아 해당 배열을 채우곤 하는데, 실제로 이것이 어떤 식으로 작동하는 지, 또한 왜 이러한 변수들을 넣어야 하는지 이해하지 못하는 경우가 많다.

또 렌더링 관점에서도 살펴볼 만한 이유가 있다.
리액트 컴포넌트의 렌더링이 일어나는 이유 중 하나가 바로 `props`의 동등 비교에 따른 결과다. 그리고 이 `props`의 동등 비교는 객체의 얕은 비교를 기반으로 이뤄지는데, 이 얕은 비교가 리액트에서 어떻게 작동하는지 이해하지 못한다면 렌더링 최적화에 어려움을 겪을 수 있다.

리액트의 가상 DOM과 실제 DOM의 비교, 리액트 컴포넌트가 렌더링할지를 판단하는 방법, 변수나 함수의 메모이제이션 등 모든 작업은 자바스크립트의 동등 비교를 기반으로 한다.

## 1.1 자바스크립트의 데이터 타입

자바스크립트의 모든 값은 데이터 타입을 갖고 있으며, 이 데이터 타입은 크게 원시 타입과 객체 타입으로 나뉜다.

- 원시 타입(primitive type)
  - `number`
  - `string`
  - `boolean`
  - `null`
  - `undefined`
  - `symbol`
- 객체 타입(object/reference type)
  - `object`

### 1.1.1 원시 타입

객체가 아닌 모든 타입. 객체가 아니므로 메서드를 갖지 않으며, 총 7개의 원시 타입이 있다.

**`undefined`**
`undefined`는 선언한 후 값을 할당하지 않은 변수 또는 값이 주어지지 않은 인수에 자동으로 할당 되는 값.

https://github.com/ryudg/Study/blob/665413d9303a4c85f209f03b7d93161bb243c9a1/React/DeepDive/1%EC%9E%A5/1%EC%9E%A5-1.%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98_%EB%8F%99%EB%93%B1_%EB%B9%84%EA%B5%90/01-1.undefined.js#L1-L9

`undefined`는 오직 `undefined`만을 값으로 갖는다.
다음에 설명할 `null` 또한 오직 `null`만을 값으로 갖는다. 그 밖의 타입은 가질 수 있는 값이 두 개 이상이다.

**`null`**
`null`은 값이 없거나 비어 있음을 의미하는 원시 타입이다.

https://github.com/ryudg/Study/blob/665413d9303a4c85f209f03b7d93161bb243c9a1/React/DeepDive/1%EC%9E%A5/1%EC%9E%A5-1.%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98_%EB%8F%99%EB%93%B1_%EB%B9%84%EA%B5%90/01-2.null.js#L1

`null`은 `typeof` 연산자로 타입을 확인하면 `object`로 나온다. 이는 자바스크립트의 오래된 버그로, `null`이 객체가 아님에도 객체로 인식되는 것이다.
이후 `typeof null`을 `null`이라고 표현하고자 하는 시도가 있었으나 이전 코드에서 작동할 수 없는 호환성이 깨지는 변경 사항(breaking change)이므로 이전 버그를 그대로 유지하기로 결정되었다.

**`Boolean`**
참`true` 또는 거짓`false`의 값을 갖는 원시 타입이다. 주로 조건문에서 많이 사용되는 데이터 타입이다.

`true`, `false` 같은 `boolean` 형의 값 외에도 조건문에서 마치 `boolean`처럼 동작하는 `truthy`, `falsy` 값이 존재한다.

- `falsy` 값: 조건문 내부에서 `false`처럼 동작하는 값

| 값                   | 타입        | 설명                                                        |
| -------------------- | ----------- | ----------------------------------------------------------- |
| `false`              | `boolean`   | 대표적인 `falsy`한 값이다.                                  |
| `0`,`-0`,`0n`,`0x0n` | `number`    | 0은 부호나 소수점 유무에 상관없이 `falsy`한 값이다.         |
| `NaN`                | `number`    | `Number`가 아니라는 것을 의미한는 `NaN`은 `falsy`한 값이다. |
| `''`,`""`,` `` `     | `string`    | 공백이 없는 빈 문자열은 `falsy`한 값이다.                   |
| `null`               | `null`      | `null`은 `falsy`한 값이다.                                  |
| `undefined`          | `undefined` | `undefined`는 `falsy`한 값이다.                             |

- `truthy` 값: 조건문 내부에서 `true`처럼 동작하는 값. `falsy` 값 외의 모든 값은 `truthy`한 값이다.
  객체와 배열은 값이 존재하는지 여부에 상관없이 `truthy`한 값이다. 즉, `[]`, `{}`는 `truthy`한 값이다.

**`Number`**
정수와 실수를 구분해 저장하는 다른 언어와는 달리 자바스크립트는 모든 숫자를 하나의 타입에 저장했었다.
ECAMSCript 표준에 따르면 `-2^53 ~ 2^53` 범위의 숫자를 저장할 수 있다. 이후 `bigint`가 등장하기 전에 이 범위 이외의 값들은 다루기가 어려웠다.

```js
const a = 1;

const maxInterger = Math.pow(2, 53);
maxInterger - 1 === Number.MAX_SAFE_INTEGER; // true

const minInterger = -(Math.pow(2, 53) - 1);
minInterger === Number.MIN_SAFE_INTEGER; // true
```

또한 2진수, 8진수, 16진수 등의 별도 데이터 타입을 제공하지 않으므로 각 진수별로 값을 표현해도 모두 10진수로 해석되어 동일한 값으로 표시된다.

```js
const 이진수_2 = 0b10; // 2진수(binary) 2
이진수_2 == (2).toString(2); // true

const 팔진수_8 = 0o10; // 8진수(octal) 8
팔진수_8 == (8).toString(8); // true

const 십육진수_16 = 0x10; // 16진수(hexadecimal) 16
십육진수_16 == (16).toString(16); // true
```

**`BigInt`**
`number`가 다룰 수 있는 숫자 크기의 제한을 극복하기 위해 ES2020에서 새롭게 등장한 타입이며 최대 `2^53 - 1`을 저장할 수 있는 `number`의 한계를 넘어 더 큰 숫자를 저장할 수 있다.

```js
// 기존 number의 한계
9007199254740992 === 9007199254740993; // 마지막 숫자가 다르지만 true가 나온다. 즉, 더 이상 다룰 수 없는 크기의 숫자이기 때문이다.

const bigInt1 = 9007199254740995n;
const bigInt2 = BigInt("9007199254740995");
```

`BigInt`는 `number`와 다르게 `BigInt`끼리만 연산이 가능하다.

```js
const bigInt1 = 9007199254740995n;
const bigInt2 = BigInt("9007199254740995");

bigInt1 + bigInt2; // 18014398509481990n
bigInt1 + 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

**`String`**
`string`은 텍스트 타입의 데이터를 저장하기 위해 사용한다. `string`은 `''`, `""`, ` `` `로 표현할 수 있다.

백틱으로 표현하는 문자열은 작은따옴표, 큰따옴표와는 차이가 있다. 백틱을 사용해서 표현한 문자열을 템플릿 리터럴(template literal)이라고 부르며, 이 문자열은 여러 줄로 이뤄진 문자열을 표현할 수 있으며, 내부에 표현식을 넣을 수 있다.

```js
// '\n안녕하세요.\n'
const longText = `
  안녕하세요.
`;

// Uncaught SyntaxError: Invalid or unexpected token
const wornText = "
  안녕하세요.
";
```

자바스크립트 문자열의 특징 중 하나는 문자열이 원시 타입이며 변경 불가능한 값(immutable value)이라는 것이다. 즉, 한번 문자열이 생성되면 그 문자열을 변경할 수 없다는 것이다.

```js
const foo = "bar";

console.log(foo[0]); // 'b'

foo[0] = "c";

console.log(foo); // 'bar'
```

**`Symbol`**
`Symbol`은 ES2015(ES6)에서 새롭게 등장한 원시 타입으로, 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용한다.
심벌은 심벌 함수를 이용해서만 만들 수 있다. 즉, 심벌을 생성하려면 반드시 `Symbol()`을 사용해야 한다.

```js
// 심벌은 유일한 값이므로 Symbol()을 호출할 때마다 새로운 값을 생성한다.
// 즉, 함수 내부에 넘겨주는 값을 Symbol 생성에 영향을 주지 않는다.
const symbol1 = Symbol("foo");
const symbol2 = Symbol("foo");

symbol1 === symbol2; // false

// 동일한 값을 사용하기 위해서는 Symbol.for()를 사용한다.
const symbol3 = Symbol.for("foo");
const symbol4 = Symbol.for("foo");

symbol3 === symbol4; // true
```

### 1.1.2 객체 타입

객체 타입을 간단하게 정리하면 앞의 7가지 원시 타입 이외의 모든 것, 즉 자바스크립트를 이루고 있는 대부분의 타입이 객체 타입이다. 여기에는 배열, 함수, 정규식, 클래스 등이 포함된다.

객체 타입은(object type)은 참조를 전달하고 해서 참조 타입(reference type)이라고도 부른다.

## 1.2 값을 저장하는 방식의 차이
