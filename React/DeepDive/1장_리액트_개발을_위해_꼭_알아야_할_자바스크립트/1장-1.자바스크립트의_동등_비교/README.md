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

`undefined`는 오직 `undefined`만을 값으로 갖는다.
다음에 설명할 `null` 또한 오직 `null`만을 값으로 갖는다. 그 밖의 타입은 가질 수 있는 값이 두 개 이상이다.

**`null`**

`null`은 값이 없거나 비어 있음을 의미하는 원시 타입이다.

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

또한 2진수, 8진수, 16진수 등의 별도 데이터 타입을 제공하지 않으므로 각 진수별로 값을 표현해도 모두 10진수로 해석되어 동일한 값으로 표시된다.

**`BigInt`**

`number`가 다룰 수 있는 숫자 크기의 제한을 극복하기 위해 ES2020에서 새롭게 등장한 타입이며 최대 `2^53 - 1`을 저장할 수 있는 `number`의 한계를 넘어 더 큰 숫자를 저장할 수 있다.
`BigInt`는 `number`와 다르게 `BigInt`끼리만 연산이 가능하다.

**`String`**

`string`은 텍스트 타입의 데이터를 저장하기 위해 사용한다. `string`은 `''`, `""`, ` `` `로 표현할 수 있다.

백틱으로 표현하는 문자열은 작은따옴표, 큰따옴표와는 차이가 있다. 백틱을 사용해서 표현한 문자열을 템플릿 리터럴(template literal)이라고 부르며, 이 문자열은 여러 줄로 이뤄진 문자열을 표현할 수 있으며, 내부에 표현식을 넣을 수 있다.

자바스크립트 문자열의 특징 중 하나는 문자열이 원시 타입이며 변경 불가능한 값(immutable value)이라는 것이다. 즉, 한번 문자열이 생성되면 그 문자열을 변경할 수 없다는 것이다.

**`Symbol`**

`Symbol`은 ES2015(ES6)에서 새롭게 등장한 원시 타입으로, 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용한다.
심벌은 심벌 함수를 이용해서만 만들 수 있다. 즉, 심벌을 생성하려면 반드시 `Symbol()`을 사용해야 한다.

### 1.1.2 객체 타입

객체 타입을 간단하게 정리하면 앞의 7가지 원시 타입 이외의 모든 것, 즉 자바스크립트를 이루고 있는 대부분의 타입이 객체 타입이다. 여기에는 배열, 함수, 정규식, 클래스 등이 포함된다.

객체 타입은(object type)은 참조를 전달하고 해서 참조 타입(reference type)이라고도 부른다.

## 1.2 값을 저장하는 방식의 차이

원시 타입과 객체 타입의 가장 큰 차이점은, 바로 값을 저장하는 방식의 차이다. 값을 저장하는 방식의 차이가 동등 비교를 할 때 차이를 만드는 원인이다.

먼저 원시 타입은 불변 형태의 값으로 저장된다. 그리고 이 값은 변수 할당 시점에 메모리 영역을 차지하고 저장된다.

반면 객체는 프로퍼티를 삭제, 추가, 수정할 수 있으므로 원시 갑과 다르게 변경 가능한 형태로 저장되며, 값을 복사할 때도 값이 아닌 참조를 전달하게 된다.

객체는 값을 저장하는 게 아니라 참조를 저장하기 때문에 앞서 동일하게 선언했던 객체라 하더라도 저장하는 순간 다른 참조를 바라보기 때문에 `false`를 반환한다.
즉, 값은 같았을지라도 참조하는 곳이 다른 셈이다. 반면 참조를 전달하는 경우에는 이전에 원시값에서 했던 것과 같은 결과를 기대할 수 있다.

따라서 자바스크립트 개발자는 항상 객체 간에 비교가 발생하면, 이 객체 간의 비교는 우리가 이해하는 내부의 값이 같다 하더라도 결과는 대부분 `true`가 아닐 수 있다는 것을 인지해야한다.

## 1.3 `Object.is`

자바스크립트는 비교를 위한 메서드를 제공한다. 그 중 `Object.is`는 두 값을 비교할 때 사용하는 메서드다.
`Object.is`는 두 개의 인수를 받으며, 이 인수 두 개가 동일한지 확인하고 반환하는 메서드다. `Object.is`가 `==`나 `===`와 다른 점은 아래와 같다.

1. `==` vs `Object.is`: `==`는 두 값이 동일한지 확인하기 위해 암묵적 타입 변환을 하지만, `Object.is`는 암묵적 타입 변환을 하지 않는다.
2. `===` vs `Object.is`: `===`는 `+0`과 `-0`을 같다고 평가하지만, `Object.is`는 `+0`과 `-0`을 다르다고 평가한다.

한 가지 주의해야 할 점은 `Object.is`를 사용한다 해도 객체 비교에는 별 차이가 없다는 점이다.

## 1.4 리액트에서 동등 비교

리액트에서 사용하는 동등 비교는 `==`, `===`가 아닌 `Object.is`를 사용한다.

```typescript
/**
 * Object.is 메서드를 사용하고자 하는데, 만약 환경이나 브라우저에서 이 메서드가 지원되지 않는 경우를 대비하여 직접 폴리필을 제공한다.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

const objectIs: (x: any, y: any) => boolean =
  // $FlowFixMe[method-unbinding]
  typeof Object.is === "function" ? Object.is : is;

export default objectIs;
```

> - [Mdn - Object.is()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
> - [React - objectIs](https://github.com/facebook/react/blob/493610f299ddf7d06e147e60dc4f2b97482982d2/packages/shared/objectIs.js#L1-L24)
> - [React - shallowEqual](https://github.com/facebook/react/blob/493610f299ddf7d06e147e60dc4f2b97482982d2/packages/shared/shallowEqual.js#L1-L54) -> 리액트에서는 objectIs를 기반으로 동등 비교를 하는 `shallowEqual`이라는 함수를 만들어 사용한다.
>   - 의존성 비교 등 리액트의 동등 비교가 필요한 다양한 곳에서 사용된다.

리액트에서 비교는 `Object.is`로 먼저 비교를 수행한 뒤 `Object.is`에서 수행하지 못하는 비교, 즉 객체 간 얕은 비교를 한 번 더 수행한다.

> 객체간 얕은 비교란 객체의 첫 번째 깊이에 존재하는 값만 비교하는 것을 말한다.

```js
// Object.is는 참조가 다른 객체에 대해 비교가 불가능하다.
Object.is({ hello: "world" }, { hello: "world" }); // false

// 리액트에서 구현한 shallowEqual은 객체의 첫 번째 깊이에 존재하는 값만 비교한다.
shallowEqual({ hello: "world" }, { hello: "world" }); // true

// 그러나 두 번째 깊이 이상에 존재하는 값은 비교하지 않는다.
shallowEqual({ hello: { world: "world" } }, { hello: { world: "world" } }); // false
```

리액트에서 사용하는 JSX props는 객체이며 해당하는 객체만 일차적으로 비교한다.

```tsx
type Props = {
  hello: string;
};

// props는 객체이며, props에서 꺼내온 값을 기준으로 렌더링을 수행한다. 따라서 얕은 비교로도 충분하다.
function Component(props: Props) {
  return <div>{props.hello}</div>;
}

function App() {
  return <Component hello="hello" />;
}
```

만약 `props`에 또 다른 객체를 넘겨준다면 리액트 렌더링이 예상치 못하게 작동한다.

```tsx
import { memo, useEffect, useState } from "react";

type Props = {
  counter: number;
};

const Component = memo((props: Props) => {
  useEffect(() => {
    console.log("렌더링이 되었습니다.");
  });

  return <div>{props.counter}</div>;
});

type DeepProps = {
  counter: {
    counter: number;
  };
};

const DeepComponent = memo((props: DeepProps) => {
  useEffect(() => {
    console.log("렌더링이 되었습니다.");
  });

  return <div>{props.counter.counter}</div>;
});

export default function App() {
  const [, setCounter] = useState(0);

  const handleCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <>
      <div className="App">
        <Component counter={1} />
        <DeepComponent counter={{ counter: 1 }} />
        <button onClick={handleCounter}>counter</button>
      </div>
    </>
  );
}
```

위 코드와 같이 `props`가 깊어지는 경우(객체 안에 또 다른 객체가 있을 경우) `React.memo`는 컴포넌트에 실제로 변경된 값이 없음에도 불구하고 메모이제이션된 컴포넌트를 반환하지 못한다.
즉, `Component`는 `pops.counter`가 존재하지만, `DeepComponent는 `props.counter.counter`에 `props`가 존재한다.
상위 컴ㅁ포넌트인 `App`에서 버튼을 클릭해 렌더링을 일으킬 경우 `shallowEqual`을 사용하는 `Componenet`함수는 정확히 객체 간 비교를 수행해서 렌더링을 방지해 주지만,`DeepComponent`는 제대로 비교하지 못해 `memo`가 제대로 작동하지 않는다.

만약 내부의 객체까지 완벽하게 비교하기 위해 재귀문까지 넣었더라면 성능상의 문제가 발생할 수 있다.

## 1.5 요약

- 자바스크립트에서 데이터 타입이란?
  - 7가지 원시 타입(`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`)과 객체 타입(`object`)으로 나뉜다.
  - 원시 타입은 불변 형태의 값으로 저장되며, 객체 타입은 변경 가능한 값으로 저장된다.
  - 원시 타입은 값 자체를 비교하고, 객체 타입은 참조를 비교한다.
  - 따라서, 객체 타입은 동등 비교를 할 때 `Object.is`를 사용한다.
- 자바스크립트에서 객체 비교의 불완전성 때문에 리액트의 함수형 프로그래밍 모델에서 언어적인 한계를 뛰어넘을 수 없으므로 얕은 비교만 사용해 비교를 수행한다.
