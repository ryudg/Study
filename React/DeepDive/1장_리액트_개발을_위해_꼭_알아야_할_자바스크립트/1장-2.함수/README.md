# 2. 함수

리액트 뿐만 아니라 자바스크립트에서도 함수는 중요한 개념이다. 함수는 자바스크립트의 핵심이라고 할 수 있다.
또한 화살표 함수와 일반 함수의 차이점에 대해 알아보자.

## 2.1 함수란 무엇인가?

함수란 작업을 수행하거나 값을 계산하는 등의 과정을 표현하고, 이를 하나의 블록으로 감싸 실행 단위로 만들어 놓은 것이다.

```js
// function으로 시작해 }로 끝나는 부분까지가 함수를 정의한 부분이다.
function add(a, b) {
  // function 뒤에 오는 것이 함수명(add)이고, 함수명 뒤에 오는 것(a, b)이 매개변수이다.
  return a + b; // return은 함수의 결과를 반환하는 키워드이다.
}

add(1, 2); // 함수 이름을 사용해 함수를 호출하며, 이때 전달하는 값(1, 2)을 인수라고 한다.
```

```jsx
// 리액트 또한 함수의 기초적인 형태를 따른다.

// Component라는 함수를 정의한 부분이며
function Component(props) {
  // 매개변수로는 일반적으로 props라는 단일 객체를 받으며,
  return <div>안녕하세요</div>; // return으로 JSX를 반환한다.
}

// 자바스크립트에서는 함수를 호출할 때 함수명 뒤에 ()를 붙이지만, JSX에서는 함수명만을 사용한다.
<Component {...props} />;
```

## 2.2 함수를 정의하는 4가지 방법

자바스크립트에서 함수를 정의하는 방법은 4가지가 있다.

### 2.2.1 함수 선언문

자바스크립트에서 가장 많이 사용하는 함수 정의 방법이다. 함수 선언문은 표현식이 아닌 문이다.

> 표현식이란 무언가 값을 산출하는 구문을 의미한다.

즉, 함수 선언으로는 어떠한 값도 표현되지 않았으므로 표현식이 아닌 문이다.

```js
function add(a, b) {
  return a + b;
}
```

하지만,

```jsx
const add = function add(a, b) {
  return a + b;
};
```

함수 선언문은 선언이고 어떠한 값도 표현하지 않았으므로 표현식과는 달리 변수에 할당할 수 없는 것이 자연스러운데, 바로 위의 코드에서는 변수에 함수를 할당하는 표현식과 같은 형태를 띄고 있다. 이는 자바스크립트 엔진이 코드의 문맥에 따라 동일한 함수를 문이 아닌 표현식으로 해석하는 경우가 있기 때문이다.
따라서 위와 같이 이름을 가진 형태의 함수 리터럴은 코드 문맥에 따라 선언문으로도 해석되고 표현식으로도 해석된다.

### 2.2.2 함수 표현식

자바스크립트에서 함수는 일급 객체이므로 다른 함수의 매개변수가 될 수도 있고, 반환값이 될 수도 있으며, 변수에 할당할 수도 있다.

> 일급 객체란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 의미한다.

```js
const sum = function (a, b) {
  return a + b;
};
```

함수 표현식에서는 할당하려는 함수의 이름을 생략하는 것이 일반적인데, 혼란을 방지하기 위함이다.

```js
const sum = function subtract(a, b) {
  // 실제 프로덕션 코드에서는 사용하면 안되는 코드이다.
  return a + b;
};
sum(1, 2); // 3
subtract(1, 2); // Uncaught TypeError: subtract is not defined
```

실제 함수를 호출하기 위해서 사용된 것은 `sum`이며, `subtract`는 실제 함수 내부에서만 유효한 식별자일 뿐 함수를 외부에서 호출하는 데에는 사용할 수 없는 식별자다.

**함수 표현식과 선언식의 차이**
함수 표현식과 선언식의 가장 큰 차이는 함수 호이스팅이다.

> 함수 호이스팅이란 함수 선언문이 마치 코드 맨 앞단에 작성된 것처럼(실행 전 미리 메모리에 등록) 작동하는 자바스크립트의 특징이다.

```js
hello(); // hello

// 함수 선언문이 중간에 있음에도 상단의 hello()는 에러 없이 함수가 미리 선언된 것처럼 정상 작동한다.
function hello() {
  console.log("hello");
}

hello(); // hello
```

```js
// 만약 hello가 var 키워드로 선언되었기 때문에, undefined로 초기화되어 있을 것이다.
// 즉, 함수와 다르게 변수는 선언과 동시에 undefined로 초기화되고 할당문이 실행되는 시점 즉, 런타임 시점에 함수가 할당되어 작동한다.

hello(); // Uncaught TypeError: hello is not a function

// 함수 표현식은 함수 호이스팅이 일어나지 않으므로 함수를 선언하기 전에 호출하면 에러가 발생한다.
var hello = function () {
  console.log("hello");
};

hello(); // hello
```

### 2.2.3 Function 생성자 함수

생성자 함수는 자주 사용되지 않는 함수 선언 방식이다.

```js
const sum = new Function("a", "b", "return a + b");
```

생성자 방식으로 함수를 만들게 되면 함수의 클로저가 생성되지 않으며, 가독성 또한 좋지 않다.

### 2.2.4 화살표 함수

ES6에서 도입된 함수 선언 방식이다.

```js
const sum = (a, b) => {
  return a + b;
};
```

앞서 언급한 함수 생성 방식과 차이점이 있는데,

1. `constructor`를 사용할 수 없다. 즉, 생성자 함수로 사용할 수 없다는 의미이다.

```js
const Sum = (a, b) => {
  this.a = a;
  this.b = b;
};

const sumSum = new Sum(1, 2); // Uncaught TypeError: Sum is not a constructor
```

2. `arguments`를 생성하지 않는다.

```js
function greet() {
  console.log(arguments);
}
greet("hello", "world"); // Arguments(2) ["hello", "world", callee: ƒ, Symbol(Symbol.iterator): ƒ]

const greetArrow = () => {
  console.log(arguments);
};
greetArrow("hello", "world"); // Uncaught ReferenceError: arguments is not defined
```

3. `this`를 생성하지 않는다.

> `this`는 자신이 속한 객체나 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다.
> `this`는 화살표 함수 이전까지는 함수를 정의할 때 결정되는 것이 아니라, 함수가 어떻게 호출되었는지에 따라 동적으로 결정되는 특징이 있다.
> 만약 함수가 객체의 메서드로 호출되면 `this`는 해당 객체를 가리키고, 함수가 일반 함수로 호출되면 `this`는 전역 객체를 가리킨다.

```js
const person = {
  name: "Lee",
  getName: function () {
    console.log(this.name);
  },
};
person.getName(); // Lee

const personArrow = {
  name: "Lee",
  getName: () => {
    console.log(this.name);
  },
};
personArrow.getName(); // undefined
```

화살표 함수는 함수 자체의 바인딩을 갖지 않는다. 화살표 함수 내부에서 `this`를 참조하면 상위 스코프의 `this`를 그대로 참조한다.

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  functionCountUp() {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  }

  ArrowCountUp = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  };

  render() {
    return (
      <div className="App">
        {/* Cannot read properties of undefined (reading 'setState') */}
        <button onClick={this.functionCountUp}>CountUp</button>

        {/* Ok */}
        <button onClick={this.ArrowCountUp}>ArrowCountUp</button>
      </div>
    );
  }
}
```

화살표 함수의 `this`가 선언 시점에 결정된다는 일반 함수와 달리, 화살표 함수는 `this`가 선언 시점에 결정되지 않는다.
따라서 화살표 함수와 일반 함수를 사용할 때, 특히 `this`를 사용할 수밖에 없는 클래스 컴포넌트의 경우에는 주의가 필요하다.

## 2.3 다양한 함수

함수를 사용하는 방식에도 여러가지가 있다. 아래에서 설명할 함수 외에도 콜백 함수, 순수 함수와 비순수 함수, 재귀 함수, 중첩 함수 등이 있다.

### 2.3.1 즉시 실행 함수

IIFE(Immediately Invoked Function Expression)라고도 불리는 즉시 실행 함수는 함수를 선언함과 동시에 호출하는 함수이다. 단 한 번만 호출되며, 다시 호출할 수 없다.

```js
(function sum(x, y) {
  return x + y;
})(123, 321); // 444
```

즉시 실행 함수에는 일반적으로 이름을 붙이지 않는데, 한 번 선언하고 호출된 이후 재사용할 수 없기 때문이다.
이러한 특징을 이용해 글로벌 스코프를 오염시키지 않는 독립적인 함수 스코프를 운용할 수 있다. 함수 선언과 실행이 바로 그 자리에서 끝나기 때문에 즉시 실행 함수 내부에 있는 값은 그 함수 내부가 아니고서는 접근이 불가능기 때문이다.

### 2.3.2 고차 함수

함수가 일급 객체라는 특징을 활용하면 함수를 인수로 받거나 결과로 새로운 함수를 반환시킬 수 있다. 이렇게 함수를 인수로 받아서 실행하는 함수를 고차 함수 HOF( Higher Order function)라고 한다.

```js
// 함수를 매개변수로 받는 고차 함수
const multiply = [1, 2, 3, 4].map((item) => item * 2); // [2, 4, 6, 8]

// 함수를 반환하는 고차 함수
const add = function (a) {
  // a가 존재하는 클로저 생성
  return function (b) {
    // b를 인수로 받아 두 합을 반환하는 또 다른 함수 생성
    return a + b;
  };
};

add(1)(3); // 4
```

이러한 특징을 활용해 함수형 컴포넌트를 인수로 받아 새로운 함수형 컴포넌트를 반환하는 고차 컴포넌트를 만들 수 있다. 이런 컴포넌트를 고차 함수와 유사하게 고차 컴포넌트 HOC(Higher Order Component)라고 한다. 고차 컴포넌트를 만들면 컴포넌트 내부에서 공통으로 관리되는 로직을 분리해 관리할 수 있어 효율적인 리팩토링이 가능하다.

## 2.4 함수를 만들때 주의사항

### 2.4.1 함수의 부수효과를 최대한 억제하라

함수의 부수 효과(Side Effect)란 함수 내의 작동으로 인해 함수가 아닌 함수 외부에 영향을 끼치는 것을 의미한다.
부수 효과가 없는 함수를 순수 함수라 하고, 부수 효과가 존재하는 함수를 비순수 함수라고 한다.

즉, 순수 함수는 부수 효과가 없고, 언제 어디서나 어떠한 상황에서든 동일한 인수를 받으면 동일한 결과를 반환하는 동일 입력 동일 출력의 함수다.
그리고 이러한 작동 와중에 외부에 영향을 끼쳐서는 안된다.

```jsx
function PureComponent(props) {
  const { a, b } = props;

  return <div>{a + b}</div>;
}
```

위 컴포넌트는 순수한 함수형 컴포넌트다. `props`의 값 `a`, `b`를 더하고 그 결과를 `HTMLDivElement`로 렌더링 한다. 외부에 어떠한 영향도 미치지 않으며 동일 입력 동일 출력의 순수한 함수형 컴포넌트이다. 순수 함수는 결과가 항상 동일하기 때문에 예측 가능하며 안정적이라는 장점이 있다.

웹 애플리케이션을 만드는 과정에서 부수 효과는 필연적으로 발생한다.
컴포넌트 내부에서 API를 호출하면 HTTP request가 발생하기 때문에 부수 효과가 발생한다. `console.log` 또한 브라우저 콘솔창이라는 외부에 영향을 끼치는 부수 효과를 발생시킨다. HTML 문서의 `title`을 변경하는 것도 부수 효과다.
이러한 부수 효과는 웹 애플리케이션을 만드는 과정에서 필연적으로 발생하지만 최대한 억제해야 한다.

리약트의 관점에서 부수 효과를 처리하는 훅인 `useEffect`의 작동을 최소화하는 것이 부수 효과를 억제하는 방법이다. `useEffect`의 사용은 피할 수 없지만 최소한으로 줄임으로써 함수의 역할을 좁히고, 컴포넌트의 안정성을 높일 수 있다.

### 2.4.2 가능한 함수를 작게 만들어라

ESLint에는 `max-lines-per-function`이라는 규칙이 있다. 이 규칙은 함수의 최대 라인 수를 제한하는 규칙이다. 이 규칙은 함수의 크기를 제한함으로써 함수의 역할을 명확히 하고, 함수의 재사용성을 높이고, 가독성을 향상시킨다.
즉, 함수당 코드의 길이가 길어질수록 문제를 일으킬 여지가 있는 코드일 가능성이 높고, 내부에서 무슨 일이 일어나는지 추적하기 어려워 진다는 의미이다.

요점은, 하나의 함수에서 많은 일을 하지 않게 하는 것이다. 함수는 하나의 일을, 그 하나만 잘 하도록 만들어야 한다.

### 2.4.3 누구나 이해할 수 있는 이름을 붙여라

함수나 변수에 이름을 붙일 때는 누구나 이해할 수 있는 이름으로 또한 간결하게 작성을 해야하는데, 이는 프로그래밍에서 가장 어려운 일 중 하나다.

하지만, 이름을 잘 지으면 코드를 이해하기 쉬워지고, 코드를 이해하기 쉬워지면 코드를 수정하기 쉬워진다.

## 2.5 요약

함수를 완벽하게 이해하기 위해서는 알아둬야할 것이 많다. 하지만, 함수를 완벽하게 이해하지 못해도 프로그래밍을 할 수는 있다.
하지만, 함수를 완벽하게 이해하지 못하면 프로그래밍을 할 때 많은 어려움을 겪을 수 있다. 따라서 함수를 완벽하게 이해하기 위해 노력해야 한다.
