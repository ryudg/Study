# 6. 리액트에서 자주 사용하는 자바스크립트 문법

일반적인 자바스크립트나 Node.js 기반의 코드와 리액트 코드를 비교하면 리액트 코드가 상대적으로 독특하다. 이는 JSX 구문 내무에서 객체를 조작하거나 객체의 얕은 동등 비교 문제를 피하기 위함이다.

또한 자바스크립트는 매년 새로운 버전과 함께 새로운 기능이 등장한다. 작성하려는 자바스크립트 코드가 이러한 표준, ECMAScript의 어느 버전에서 만들어졌는지도 파악을 해야한다.
왜냐면 모든 브라우저와 자바스크립트 런타임이 항상 최신 버전의 자바스크립트를 지원하지 않기 때문이다. 그리고 웹 페이지에 접근하는 사용자의 브라우저와 버전은 개발자와 다르게 항상 최신 버전이 아니고 다양하기 때문에 이를 고려해야 한다.

이러한 사용자의 다양한 브라우저 환경, 최신 문법을 작성하고 싶은 개발자의 요구를 해결하기 위해 탄생한 것이 바벨이다. 바벨은 자바스크립트의 다양한 브라우저에서도 일관적으로 지원할 수 있도록 코드를 트랜스파일한다.

## 6.1 구조 분해 할당

구조 분해 할당(Destructuring assignment)은 배열이나 객체의 값을 분해해 개별 변수에 즉시 할당 하는 것을 의미한다. 주로 어떠한 객체나 배열에서 선언문 없이 즉시 분해해 변수를 선언하고 할당하고 싶을 때 사용한다.

> 배열의 구조 분해 할당은 ES2015에서 도입 되었고, 객체의 구조 분해 할당은 ES2018에서 도입되었다.

### 6.1.1 배열의 구조 분해 할당

<details>
<summary>배열의 구조 분해 할당 예시</summary>

```jsx
const array = [1, 2, 3, 4, 5];

// first = 1, second = 2, third = 3, rest = [4, 5]
const [first, second, third, ...rest] = array;
```

</details>

리액트의 `useState` 함수는 2개 짜리 배열을 반환하는 함수며, 첫 번째 값을 Value로, 두 번째 값을 Setter로 사용한다.
`useState`가 객체가 아닌 배열을 반환하는 이유는, 객체 구조 분해 할당에서는 사용하는 쪽에서 원하는 이름으로 변경하기 번거롭기 떄문이다. 따라서 자유롭게 이름을 선언할 수 있는 배열을 반환하는 것이라고 추측할 수 있다.

**`,` 를 사용한 배열의 구조 분해 할당**

배열의 구조 분해 할당은 `,` 위치에 따라 값이 결졍된다. 따라서 중간 인덱스에 대한 할당을 생략하고 싶다면 `,`를 사용하면 된다.

<details>
<summary><code>,</code>를 사용한 배열의 구조 분해 할당 예시</summary>

```jsx
const array = [1, 2, 3, 4, 5];

// first = 1, second = 2, third = 3, rest = [4, 5]
const [first, , , , ...fifth] = array; // 2, 3, 4는 아무 표현식이 없으므로 변수 할당이 생략된다.

console.log(first, fifth); // 1, 5
```

</details>

> 이러한 방법은 실수를 유발할 가능성이 높기 때문에 일반적으로 배열의 길이가 작을 때 주로 사용된다.

**기본값을 사용한 배열의 구조 분해 할당**

배열 분해 할당에는 기본값을 지정할 수 있다. 기본값은 할당하려는 인덱스의 값이 `undefined`일 때만 사용된다.

<details>

<summary>기본값을 사용한 배열의 구조 분해 할당 예시</summary>

```jsx
const array = [0, null, undefined, "", 5];
const [first = 9, second = 9, third = 9, fourth = 9, fifth = 9, sixth = 9] =
  array;

console.log(first, second, third, fourth, fifth, sixth); // 0, null, 9, "", 5, 9
```

`third`는 `undefined`이므로 기본값인 `9`가 할당며 `sixth`는 배열의 길이를 넘어서 구조 분해 할당되었으므로 `undefined`가 할당되어 기본값 `9`가 할당된다.

</details>

**전개 연산자를 사용한 배열의 구조 분해 할당**

특정 값 이후 다시 배열을 선언하고 싶을 경우 전개 연산자(spread operator)`...`를 사용하면 된다.

<details>

<summary>전개 연산자를 사용한 배열의 구조 분해 할당 예시</summary>

```jsx
const array = [1, 2, 3, 4, 5];

const [first, second, ...rest] = array;

console.log(first, second, rest); // 1, 2, [3, 4, 5]
```

</details>

**트랜스파일된 배열 구조 분해 할당**

<details>

<summary>트랜스파일된 배열 구조 분해 할당 예시</summary>

- 트랜스파일 전

```jsx
const array = [1, 2, 3, 4, 5];
const [first, second, third, ...arrayRest] = array;
```

- 트랜스파일 후

```jsx
var array = [1, 2, 3, 4, 5];
var first = array[0],
  second = array[1],
  third = array[2],
  arrayRest = array.slice(3);
```

### 6.1.2 객체의 구조 분해 할당
