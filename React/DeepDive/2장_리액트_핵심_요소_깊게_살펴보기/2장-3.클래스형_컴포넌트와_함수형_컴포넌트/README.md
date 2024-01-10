# 3. 클래스형 컴포넌트와 함수형 컴포넌트

함수형 컴포넌트는 사실 리액트 0.14버전에 만들어진 컴포넌트 선언 방식이다.
이 당시 함수형 컴포넌트는 stateless functional component, 무상태 함수형 컴포넌트라고 불렸으며 별도의 상태 없이 단순히 요소를 정적으로 렌더링하는 것이 목적이었다.

<details>

<summary>0.14버전 함수형 컴포넌트 예제</summary>

```tsx
var Aquarium = (props) => {
  var fish = getFish(props.species);

  return <Tamk>{fish}</Tamk>;
};
```

```tsx
var Aquarium = ({ species }) => <Tamk>{getFish(species)}</Tamk>;
```

</details>

즉, 클래스형 컴포넌트에서 별다른 생명주기 메서드나 상태(`this.state`)가 필요 없이 `render`만 하는 경우에 제한적으로 사용했다.
함수형 컴포넌트가 본격적으로 사용되기 시작한 것은 리액트 16.8버전에서 훅이 도입되면서부터다.

## 3.1 클래스형 컴포넌트

리액트 16.8 미만으로 작성된 코드에는 클래스형 컴포넌트가 대다수일 것이다.
이런 오래된 코드의 유지보수 혹은 오래전에 개발된 라이브러리를 사용할 때 기본적으로 클래스형 컴포넌트의 구조를 이해하고 있어야 한다.

```tsx
import React from "react";

class MyComponent extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}
```

기본적으로 클래스형 컴포넌트를 만들기 위해서는 클래스를 선언하고, `extends`로 컴포넌트를 `extends`해야한다.
`extends` 구문에 사용할 수 있는 클래스는 `React.Component`, `React.PureComponent`가 있다.

<details>

<summary>클래스형 컴포넌트 예제</summary>

```tsx
import React from "react";

// props의 타입
interface MyProps {
  required?: boolean;
  text: string;
}

// state의 타입
interface MyState {
  count: number;
  isLimited?: boolean;
}

// Component에 제네릭으로 props와 state의 타입을 순서대로 넣어준다.
class MyComponent extends React.Component<MyProps, MyState> {
  // constructor에서 props를 넘겨주고 state의 기본값을 설정한다.
  private constructor(props: MyProps) {
    super(props);
    this.state = {
      count: 0,
      isLimited: false,
    };
  }

  // render 내부에서 쓰일 함수 선언
  private handleClick = () => {
    const newValue = this.state.count + 1;
    this.setState({ count: newValue, isLimited: newValue >= 10 });
  };

  // render에서 컴포넌트가 렌더링할 내용 정의
  public render() {
    // props와 state 값을 this 즉, 해당 클래스에서 꺼낸다.
    const {
      props: { required, text },
      state: { count, isLimited },
    } = this;

    return (
      <h2>
        My Component
        <div>{required ? "필수" : "필수아님"}</div>
        <div>문자: {text}</div>
        <div>count: {count}</div>
        <button onClick={this.handleClick} disabled={isLimited}>
          증가
        </button>
      </h2>
    );
  }
}
```

</details>

### 3.1.1 클래스형 컴포넌트의 생명주기 메서드

#### 3.1.1.1 `render()`

#### 3.1.1.2 `componentDidMount()`

#### 3.1.1.3 `componentDidUpdate()`

#### 3.1.1.4 `componentWillUnmount()`

#### 3.1.1.5 `shouldComponentUpdate()`

#### 3.1.1.6 `static getDerivedStateFromProps()`

#### 3.1.1.7 `getSnapshotBeforeUpdate()`

#### 3.1.1.8 정리

#### 3.1.1.9 `getDerivedStateFromError()`

#### 3.1.1.10 `componentDidCatch()`

### 3.1.2 클래스형 컴포넌트의 한계

## 3.2 함수형 컴포넌트

## 3.3 함수형 컴포넌트 vs. 클래스형 컴포넌트

### 3.3.1 생명주기 메서드의 부재

### 3.3.2 함수형 컴포넌트와 렌더링된 값

### 3.3.3 클래스형 컴포넌트의 필요성

## 3.4 요약
