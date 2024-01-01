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
<summary>예시</summary>

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
<summary>예시</summary>

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

<summary>예시</summary>

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

<summary>예시</summary>

```jsx
const array = [1, 2, 3, 4, 5];

const [first, second, ...rest] = array;

console.log(first, second, rest); // 1, 2, [3, 4, 5]
```

</details>

**트랜스파일된 배열 구조 분해 할당**

<details>

<summary>예시</summary>

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

</details>

### 6.1.2 객체의 구조 분해 할당

객체 구조 분해 할당은 객체에서 값을 꺼내온 뒤 할당하는 것을 의미한다. 배열 구조 분해 할당과 달리, 객체는 객체 내부 이름으로 꺼내온다.

<details>

<summary>예시</summary>

```jsx
const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const { a, b, c, ...objectRest } = object;

console.log(a, b, c, objectRest); // 1, 2, 3, { d: 4, e: 5 }
```

</details>

**새로운 이름으로 재할당**

객체 구조 분해 할당은 객체 내부의 키 이름과 다른 이름으로 할당할 수 있다.

<details>

<summary>예시</summary>

```jsx
const object = { a: 1, b: 2 };

const { a: newA, b: newB } = object;

console.log(newA, newB); // 1, 2
```

</details>

**기본값을 사용한 객체의 구조 분해 할당**

배열 구조 분해 할당과 마찬가지로 객체 구조 분해 할당에도 기본값을 지정할 수 있다.

<details>

<summary>예시</summary>

```jsx
const object = { a: 1, b: 2 };

const { a = 9, b = 9, c = 9 } = object;

console.log(a, b, c); // 1, 2, 9
```

</details>

> 이 방식은 리액트 컴포넌트에서 `props`를 전달받을 때 주로 사용된다.
>
> ```jsx
> function Component({ a, b }) {
>   retrun <span>{a}, {b}</span>;
> }
>
> Component({ a: "Some", b: "Thing" }); // <span>Some, Thing</span>
> ```

**계산된 속성 이름(computed property name)을 사용한 객체의 구조 분해 할당**

단순히 값을 꺼내오는 것뿐만 아니라 변수에 있는 값으로 꺼내오는 것도 가능하다.

<details>

<summary>예시</summary>

```jsx
const key = "a";
const object = { a: 1, b: 2 };

const { [key]: a } = object;

console.log(a); // 1
```

`key`라는 `"a"` 값은 `object`에서 `"a"`라는 값을 꺼내오기 위해 `[key]` 문법을 사용했다.
이러한 계산된 속성 이름을 사용하기 위해서는 반드시 이름을 선언하는 `: a`와 같은 변수 네이밍이 필요하다.
그렇지 않으면 에러가 발생한다. `const {[key]} = object; // Uncaught SyntaxError: Unexpected token '['`

</details>

**전개 연산자를 사용한 객체의 구조 분해 할당**

배열 구조 분해 할당과 마찬가지로 전개 연산자를 사용해 나머지 값을 모두 가져올 수 있다.

<details>

<summary>예시</summary>

```jsx
const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const { a, b, ...objectRest } = object;

console.log(a, b, objectRest); // 1, 2, { c: 3, d: 4, e: 5 }
```

</details>

**트랜스파일된 객체 구조 분해 할당**

<details>

<summary>예시</summary>

- 트랜스파일 전

```jsx
const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const { a, b, ...objectRest } = object;
```

- 트랜스파일 후

```jsx
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var object = { a: 1, b: 2, c: 3, d: 4, e: 5 };

var a = object.a,
  b = object.b,
  objectRest = _objectWithoutProperties(object, ["a", "b"]);
```

`_objectWithoutProperties`는 객체와 해당 객체에서 제외할 키가 포함된 배열 두 가지를 인수로 받고, 이 두가지 값을 활용해 해당 객체에서 특정 키를 제외한다.

`_objectWithoutPropertiesLoose` 함수는 `Object.getOwnPropertySymbols`가 존재하는 환경인 경우(객체 내부에서 심벌의 존재를 확인할 수 있는 경우)를 대비해 이에 대한 예외 처리를 해준다.

</details>

배열과 달리 객체의 구조 분해 할당을 트랜스파일할 경우 복잡한 코드가 생성된다.

이처럼 객체 구조 분해 할당의 경우 트랜스파일을 거치면 번들링 크기가 상대적으로 크기 때문에 개발 환경이 ES5를 고려해야하고, 객체 구조 분해 할당을 자주 사용하지 않는다면 반드시 사용할 필요는 없다.

만약 트랜스파일은 부담스럽지만 객체 구조 객체 구조 분해 할당을 통한 `...rest`와 같은 함수가 필요하다면 외부 라이브러리를 사용해 보는 것도 좋은 방법이다.
ex. `lodash`의 `omit` 함수, `ramda`의 `omit` 함수 등

## 6.2 전개 구문

전개 구문(Spread syntax)은 구조 분해 할당과는 달리 배열이나 객체, 문자열과 같이 순회할 수 있는 값에 대해 그대로 전개해 간결하게 사용할 수 있는 구문이다.

> 배열 전개 구문은 ES2015에서, 객체의 전개 구문은 ES2018에서 도입되었다.

### 6.2.1 배열의 전개 구문

과거에는 배열 간 합성을 위해서 `push()`, `concat{}`, `splice()` 등의 메서드를 사용했다. 하지만 전개 구문을 사용하면 이러한 메서드를 사용하지 않고도 간결하게 배열을 합성할 수 있다.

<details>

<summary>예시</summary>

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
```

</details>

**전개 구문을 사용한 배열 복사**

배열 내부에서 `...arr`을 사용하면 해당 배열을 전개하는 것처럼 선언하고, 이를 내부 배열에서 활용해 기존 배열에 영향을 미치지 않고 새로운 배열을 복사할 수 있다.

<details>

<summary>예시</summary>

```js
const arr1 = [1, 2, 3];
const arr2 = arr1;

arr1 === arr2; // true, 내용이 아닌 참조를 복사하기 때문에

const arr3 = [4, 5, 6];
const arr4 = [...arr3];

arr3 === arr4; // false, 전개 구문을 활용해 실제 값만 복했기 때문에
```

</details>

**트랜스파일된 배열 전개 구문**

<details>

<summary>예시</summary>

- 트랜스파일 전

```jsx
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
```

- 트랜스파일 후

```jsx
var arr1 = [1, 2, 3];
var arr2 = [].concat(arr1, [4, 5, 6]);
```

</details>

### 6.2.2 객체의 전개 구문

객체에서도 배열과 비슷하게 전개 구문을 사용 가능하다.

<details>

<summary>예시</summary>

```js
const obj1 = { a: 1, b: 2 };

const obj2 = { c: 3, d: 4 };

const newObj = { ...obj1, ...obj2 }; // { "a": 1, "b": 2, "c": 3, "d": 4 }
```

</details>

한 가지 중요한 것은 **객체 전개 구문에 있어 순서가 중요하다는 것**이다.

전개 구문 이후에 값 할당이 있다면 전개 구문이 할당한 값을 덮어 쓰지만, 반대의 경우 오히려 전개 구문이 해당 값을 덮어쓴다. 즉, 전개 구문에 있는 값을 덮어쓸 것인지, 혹은 그 값을 받아들일 것인지는 순서에 따라 달라진다.

<details>

<summary>예시</summary>

```js
const obj = { a: 1, b: 2, c: 3 };

const newObj = { ...obj, c: 9 }; // { "a": 4, "b": 2, "c": 9 }

const newObj2 = { c: 9, ...obj }; // { "c": 9, "a": 4, "b": 2 }
```

</details>

**트랜스파일된 객체 전개 구문**

<details>

<summary>예시</summary>

- 트랜스파일 전

```jsx
const obj1 = { a: 1, b: 2 };

const obj2 = { c: 3, d: 4 };

const newObj = { ...obj1, ...obj2 };
```

- 트랜스파일 후

```jsx
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var obj1 = { a: 1, b: 2 };
var obj2 = { c: 3, d: 4 };

var newObj = _objectSpread(_objectSpread({}, obj1), obj2);
```

</details>

객체 분해 할당을 트랜스파일한 결과와 비슷한 차이가 나온다. 단순한 값을 복사하는 배열과는 다르게 객체의 경우 객체의 속성값 및 설명자 확인, 심벌 체크 등 때문에 트랜스파일된 코드가 커지는 것을 볼 수 있다.

객체 구조 분해 할당과 마찬가지로, 객체 전개 연산자 또한 트랜스파일되면 상대적으로 번들링이 커지기 때문에 주의해야 한다.

## 6.3 객체 초기자
