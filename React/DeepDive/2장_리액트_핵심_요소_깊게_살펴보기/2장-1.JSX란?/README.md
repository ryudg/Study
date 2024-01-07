# 1. JSX란?

리액트를 통해 JSX를 배우기 때문에 JSX가 리액트의 전유물이라고 오해하는 경우가 있지만, 이는 사실이 아니다. JSX는 리액트가 등장하면서 페이스북(메타)에서 소개한 새로운 구문이지만 리액트에서만 사용하는 것은 아니다. JSX는 XML과 유사한 내장형 구문이며, 리액트에 종속적이지 않은 독자적인 문법으로 보는 것이 옳다.

페이스북에서 독자적으로 개발했다는 사실에서 알 수 있듯 JSX는 ECMAScript 사양에 포함되어 있지 않다. 즉, 자바스크립트의 표준이 아니라는 의미이다.

<details>

<summary>따라서 V8이나 Deno 같은 자바스크립트 엔진이나 크롬, 웨일, 파이어폭스 등 브라우저에 의해서 실행되거나 표현되도록 만들어진 구문이 아니기 때문에 코드를 바로 실행하면 에러가 발생한다.</summary>

```tsx
// SyntaxError: Unexpected token '<'
const Component = (
  <div>
    <h1>Hello, world!</h1>
  </div>
);
```

</details>

JSX는 반드시 트랜스파일러를 거쳐야만 자바스크립트 런타임이 이해할 수 있는 의미 있는 자바스크립트 코드로 변환된다.

JSX의 설계 목적은 HTML이나 XML을 자바스크립트 내부에 표현하는 것이 유일한 목적이 아니라 다양한 트랜스파일러에서 다양한 속성을 가진 트리 구조를 토큰화해 ECMAScript로 변환하는 데 있다. 쉽게 말해, JSX 내부에 트리 구조로 표현하고 싶은 다양한 것들을 작성해두고, 이 JSX를 트랜스파일이라는 과정을 거쳐 자바스크립트가 이해할 수 있는 코드로 변경하는 것이 목표다.

JSX가 주로 사용되는 곳은 리액트 내부에서 반환하는 HTML과 자바스크립트 코드이지만 꼭 그것에 한정되어 있는 것은 아니다. 즉, JSX는 HTML, XML 외에도 다른 구문으로도 확장될 수 있게끔 고려되어 있으며 최대한 구문을 간결하고 친숙하게 작성할 수 있도록 설계되어 있다.

요약하자면, JSX는 자바스크립트 내부에서 표현하기 까다로웠던 XML 스타일의 트리 구문을 작성하는 데 많은 도움을 주는 새로운 문법이다.

## 1.1 JSX의 정의

JSX는 `JSXElement`, `JSXAttributes`, `JSXChildren`, `JSXStrings` 4가지 컴포넌트 기반으로 이루어져 있다.

### 1.1.1 `JSXElement`

JSX를 구성하는 가장 기본적인 요소로 HTML의 요소와 비슷한 역할을 한다. JSXElement가 되기 위해서는 아래와 같은 형태 중 하나를 만족해야 한다.

- `JSXOpeningElement`: 일반적으로 볼 수 있는 요소이며 `JSXOpeningElement`로 시작했다면 `JSXClosingElement`가 동일한 요소로 같은 단계에서 선언되어 있어야 한다.
  - `<JSXElement JSXAttributes(optional)> ...`
- `JSXSelfClosingElement`: `JSXOpeningElement`가 종료되었음을 알리는 요소로 반드시 `JSXOpeningElement`와 쌍으로 선언되어야 한다.
  - `... <JSXElement />`
- `JSXSelfClosingFragment`: 요소가 시작되고, 스스로 종료되는 형태로 내부적으로 자식을 포함할 수 없다.
  - `<JSXElement />`
- `JSXFragments`: 아무런 요소가 없는 형태로, `JSXSelfClosingFragment` 형태로 선언될 수 없다. 즉, `</>` 형태로 선언할 수 없다.
  - `<> JSXChildren(optional) </>`

> <details>
> <summary>대문자로 시작해야만 하는 컴포넌트</summary>
>
> ```tsx
> function hello(text) {
>   return <div>{text}</div>;
> }
>
> export default function App() {
>   // Property 'hello' does not exist on type 'JSX.IntrinsicElements'.
>   return <hello text="Hello, world!" />;
> }
> ```
>
> 리액트에서 HTML 구문 이외의 사용자 정의 컴포넌트명은 반드시 대문자로 시작해야 한다.
> 이는 JSXElement 표준에 명시되어있지 않지만 리액트에서 HTML 태그명과 사용자 정의 컴포넌트 태그명을 구분하기 위해서 사용하는 규칙이다.

#### 1.1.1.1 `JSXElementName`

`JSXElementName`은 `JSXElement`의 요소 이름으로 쓸 수 있는 것을 의미한다. 이름으로 가능한 것은 아래와 같다.

- `JSXIdentifier`: JSX 내부에서 사용할 수 있는 식별자로 자바스크립트의 식별자 규칙을 따른다.
  즉, `<$></$>`, `<_></_>`도 가능하지만 숫자로 시작하거나 `$`, `_`를 제외한 특수문자는 사용할 수 없다.
  <details>

  <summary><code>JSXNamespacedName</code> 예시</summary>

  ```tsx
  function Valid$() {
    return <$>Valid$</$>;
  }

  function Valid_() {
    return <_>Valid_</_>;
  }

  function Invalid() {
    return <123>invalid</123>;
  }
  ```

  </details>

- `JSXNamespacedName`: `JSXIdentifier:JSXIdentifier`의 조합이며 `:`을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자로 취급된다.
  `:`로 묶을 수 있는 것은 하나 뿐이며, 두 개이상은 허용되지 않는다.
  <details>

  <summary><code>JSXNamespacedName</code> 예시</summary>

  ```tsx
  function Valid() {
    return <foo:bar>Valid</foo:bar>;
  }

  function Invalid() {
    return <foo:bar:bazz>Invalid</foo:bar:bazz>;
  }
  ```

  </details>

- `JSXMemberExpression`: `JSXIdentifier`와 `JSXMemberExpression`의 조합이며 `.`을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자로 취급된다.
  `JSXNamespacedName`와는 다르게 `.`로는 여러 개의 식별자를 이어줄 수 있지만 `JSXNamespaceName`과 이어서 사용할 수는 없다.
  <details>

  <summary><code>JSXMemberExpression</code> 예시</summary>

  ```tsx
  function Valid() {
    return <foo.bar>Valid</foo.bar>;
  }

  function Valid2() {
    return <foo.bar.bazz>Invalid</foo.bar.bazz>;
  }

  function Invalid() {
    return <foo:bar.bazz>Invalid</foo:bar.bazz>;
  }
  ```

  </details>

### 1.1.2 `JSXAttributes`

`JSXElement`에 부여할 수 있는 속성을 의미한다. 단순히 속성을 의미하기 때문에 모든 경우에서 필수값이 아니고, 존재하지 않아도 에러가 발생하지 않는다.

- `JSXSpreadAttribute`: 자바스크립트의 전개 연산자와 동일한 역할을 한다.
  <details>

  <summary><code>JSXSpreadAttribute</code> 예시</summary>

  ```tsx
  const AssignmentExpression = {
    className: "foo",
    id: "bar",
  };

  function Valid() {
    return <div {...AssignmentExpression} />;
  }
  ```

  `AssignmentExpression`에는 단순 객체 뿐만 아니라 자바스크립트에서 사용할 수 있는 모든 표현식을 사용할 수 있다.

  </details>

- `JSXAttribute`: 속성을 나타내는 키와 값으로 짝을 이뤄 표현한다. 키는 `JSXAttributeName`으로, 값은 `JSXAttributeValue`로 표현한다.

  - `JSXAttributeName`: 속성의 키 값. 키로는 `JSXIdentifier`, `JSXNamespacedName`을 사용할 수 있다.

    <details>

    <summary><code>JSXAttributeName</code> 예시</summary>

    ```tsx
    function Valid() {
      return <foo.bar foo:bar="baz" />;
    }
    ```

  - `JSXAttributeValue`: 속성의 키에 할당할 수 있는 값으로, 아래의 조건을 만족해야 한다.

    - `""`, `''`로 구성된 문자열: 자바스크립트의 문자열과 동일하며, 빈 값이여도 허용된다.
    - `{}`: 자바스크립트의 표현식을 의미하며, 변수에 값을 넣을 수 있는 표현식은 JSX 속성의 값으로도 사용할 수 있다.
    - `JSXElement`: 값으로 다른 JSX 요소를 사용할 수 있다.
      <details>

      <summary><code>JSXElement</code> 예시</summary>

      ```tsx
      function Child({ attribute }) {
        return <div>{attribute}</div>;
      }

      export default function App() {
        return <Child attribute=<div>child</div> />;
      }
      ```

      `<Child attribute=<div>child</div> />`보다 `<Child attribute={<div>child</div>} />`에 익숙할 수도 있다. 이는 문법적 오류가 아닌 `prettier`의 규칙이다.
      </details>

    - `JSXFragment`: 값으로 별도 속성을 갖지 않는 형태의 JSX 요소를 사용할 수 있다. 즉, 비어있는 `<></>` 형태의 요소를 사용할 수 있다는 의미이다.

### 1.1.3 `JSXChildren`

`JSXElement`의 자식 값을 나타낸다. JSX는 속성을 가진 트리 구조를 나타내기 위해 만들어졌기 때문에 JSX로 부모-자식 관계를 나타낼 수 있으며, 자식을 `JSXChildren`으로 표현한다.

- `JSXChild`: `JSXChildren`을 이루는 기본 단위이며, `JSXChildren`은 `JSXChild`를 0개 이상 가질 수 있으며, 없어도 된다.

  - `JSXText`: `{`, `}`, `<`, `>`를 제외한 모든 문자열을 의미한다.
  - `JSXElement`: 값으로 다른 JSX 요소를 사용할 수 있다.
  - `JSXFragments`: 값으로 빈 JSX 요소인 `<></>`를 사용할 수 있다.
  - `{ JSXChildExpression (optional) }`: `JSXChildExpression`는 자바스크립트의 표현식을 의미한다.
    <details>

    <summary><code>JSXChild</code> 예시</summary>

    ```tsx
    export default function App() {
      // foo라는 문자가 출력된다.
      return <>{(() => "foo")()}</>;
    }
    ```

    </details>

### 1.1.4 `JSXStrings`

`JSXAttributeValue`와 `JSXText`는 HTML과 JSX 사이에 복사-붙여넣기를 쉽게 할 수 있도록 설계되어있다. HTML에서 사용 가능한 문자열은 모두 `JSXStrings`에서도 가능하다.

> 여기서 문자열이란, `"..."`, `'...'`, JSXText를 의미한다.

`\`로 시작하는 이스케이프 문자 형태는 자바스크립트에서 특수문자를 처리할 때 사용되며, HTML에서는 제약 없이 사용 가능하지만 JSX에서는 제약(`\`를 표현하기 위해서는 `\\`로 이스케이프)이 있다.

<details>

<summary>이스케이프 예시</summary>

```tsx
// 문제 없음
<button>\</button>

// 문제 없음
let escape = "\\";


// Uncaught SyntaxError: Invalid or unexpected token
let escape = "\";
```

</details>

## 1.2 JSX 예제

<details>

<summary>JSX 예제</summary>

```tsx
// 하나의 요소로 구성된 형태
const ComponentA = <div>foo</div>;

// 자식 없이 SelfClosingElement로 구성된 형태
const ComponentB = <div />;

// 옵션을 {}와 전개 연산자로 구성한 형태
const ComponentC = <div {...{ className: "foo" }} />;

// 속성만 넣은 형태
const ComponentD = <div isTrue />;

// 속성과 값을 넣은 형태
const ComponentE = <div isTrue={false} />;
const ComponentF = <div text="텍스트" text2="텍스트" />;
const ComponentG = <div Children={<div>자식</div>} />;

// 자식을 가진 형태
const ComponentH = (
  <div>
    자식1
    <div>자식2</div>
  </div>
);
```

</details>

<details>

<summary>리액트에서는 유효하지 않거나 사용하는 경우가 거의 없지만 JSX 문법으로는 유효한 경우.</summary>

```tsx
function ComponentA() {
  return <A.B></A.B>;
}

function ComponentB() {
  return <A.B.C></A.B.C>;
}

function ComponentC() {
  return <A:B.C></A:B.C>;
}

function ComponentD() {
  return <$></$>;
}

function ComponentE() {
  return <_></_>;
}
```

</details>

## 1.3 JSX는 어떻게 자바스크립트에서 변환될까?

자바스크립트에서 JSX가 변환되는 방식을 알기 위해서는 리액트에서 JSX를 변환하는 `@babel/plugin-transform-react-jsx` 플러그인을 살펴보면 된다.

이 플러그인은 JSX 구문을 자바스크립트가 이해할 수 있는 코드로 변환해주는 역할을 한다.

```tsx
const ComponentA = <Foo required={true}>Hello World</Foo>;

const ComponentB = <>Hello World</>;

const ComponentC = (
  <div>
    <span>Hello World</span>
  </div>
);
```

위의 코드는 아래와 같이 변환된다.

```tsx
"use strict";

var ComponentA = React.createElement(
  Foo,
  {
    required: true,
  },
  "Hello World"
);

var ComponentB = React.createElement(React.Fragment, null, "Hello World");

var ComponentC = React.createElement(
  "div",
  null,
  React.createElement("span", null, "Hello World")
);
```

<details>

<summary>리액트 17, 바벨 7.9.0 이후 추가된 자동 런타임(automatic runtime)으로 트랜스파일한 결과</summary>

```tsx
"use strict";

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

var ComponentA = (0, _jsxRuntime.jsx)(Foo, {
  required: true,
  children: "Hello World",
});

var ComponentB = (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
  children: "Hello World",
});

var ComponentC = (0, _jsxRuntime.jsx)("div", {
  children: (0, _jsxRuntime.jsx)("span", { children: "Hello World" }),
});
```

</details>

`@babel/plugin-transform-react-jsx` 플러그인을 직접 사용하고 싶다면 패키지를 설치 후 아래와 같이 사용하면 된다.

```tsx
import * as Babel from "@babel/stanalone";

Babel.regusterPlugin(
  "@babel/plugin-transform-react-jsx",
  require("@babel/plugin-transform-react-jsx")
);

const BABEL_CONFIG = {
  presets: [],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        throwIfNamespace: false,
        runtime: "automatic",
        importSource: "custom-jsx-library",
      },
    ],
  ],
};

const SOURCE_CODE = `const ComponentA = <Foo>Hello</Foo>`;

const { code } = Babel.transformSync(SOURCE_CODE, BABEL_CONFIG);
```

결과물에 차이가 있지만 공통점이 있다.

1. `JSXElement`를 첫 번째 인수로 선언해 요소를 정의한다.
2. optional인 `JSXChildren`, `JSXAtrributes`, `JSXStrings`은 이후 인수로 넘겨 처리한다.

이 점을 활용하면 경우에 따라 다른 `JSXElement`를 렌더링해야할 때 굳이 요소 전체를 감싸지 않더라도 처리할 수 있다.
이는 `JSXElement`만 다르고, `JSXAtrributes`, `JSXChildren`이 동일한 상확에서 중복된 코드를 최소화할 수 있어 유용하다.

<details>

<summary><code>props</code> 여부에 따라 <code>children</code> 요소만 달라지는 경우</summary>

<details>

<summary>전체 내용을 삼항 연산자로 처리할 경우 중복된 코드가 발생한다.</summary>

```tsx
import { createElement, PropsWithChildren } from "react";

function TextOrHeading({
  isHeading,
  children,
}: PropsWithChildren<{ isHeading: boolean }>) {
  return isHeading ? (
    <h1 className="text">{children}</h1>
  ) : (
    <p className="text">{children}</p>
  );
}
```

</details>

<details>

<summary>JSX가 변환되는 특성을 활용할 경우 중복된 코드를 최소화할 수 있다.</summary>

```tsx
import { createElement } from "react";

function TextOrHeading({
  isHeading,
  children,
}: PropsWithChildren<{ isHeading: boolean }>) {
  return createElement(isHeading ? "h1" : "p", { className: "text" }, children);
}
```

</details>

JSX 반환값이 결국 `React.createElement`로 귀결된다는 사실을 알면 쉽게 리팩터링할 수 있다.

</details>

## 1.4 요약

리액트에서는 모든 JSX 문법이 사용되는 것은 아니다.

JSX 문법에는 있지만, 실제 리액트에서 사용하지 않는 문법은 `JSXNamespacedName`, `JSXMemberExpression`이 있다.

다른 라이브러리 또한 JSX를 채용하고 있으며 리액트에서 사용하는 JSX 문법과 다른 문법을 사용할 수 있다.

리액트 내부에서 JSX가 어떻게 변환되는지 어떤 결과물을 만들어내는지 알아둔다면 JSX를 더욱 효율적으로 사용할 수 있다.
