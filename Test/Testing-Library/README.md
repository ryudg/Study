# Testing Library

> https://testing-library.com/docs/

Testing Library는 컴포넌트의 테스트를 더 쉽고 직관적으로 작성할 수 있도록 도와주는 라이브러리다.
Testing Library는 테스트 러너나 프레임워크가 아니기 때문에 특정 테스트 프레임워크에 종속되지 않으며 Jest, Mocha + JSDOM 또는 실제 브라우저와 같은 DOM API를 제공하는 다양한 환경과 호환된다.

## Install

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Guiding

> The more your tests resemble the way your software is used, the more confidence they can give you.
>
> 많은 테스트가 소프트웨어의 사용 방식과 유사할수록 더 많은 신뢰성을 제공할 수 있다.

- 컴포넌트 렌더링과 관련이 있다면 컴포넌트 인스턴스가 아닌 DOM 노드를 직접 다루어야 하며 이 동작이 컴포넌트 인스턴스를 다루도록 하면 안된다.
- 사용자가 응용 프로그램 구성 요소를 사용하는 방식으로 테스트하는 데 일반적으로 유용해야 한다. 여기서는 컴퓨터 및 종종 시뮬레이션된 브라우저 환경을 사용하고 있기 때문에 어느 정도의 트레이드 오프가 있지만, 일반적으로 유틸리티는 구성 요소를 의도된 방식대로 사용하는 테스트를 해야 한다.
- 유틸리티 구현과 API는 간단하고 유연해야 한다.

## API

### `fireEvent`

`fireEvent`는 UI 이벤트를 트리거하는 데 사용되며 이를 통해 사용자 인터랙션을 시뮬레이션하고 해당 이벤트에 대한 테스트 케이스를 작성할 수 있다.

이를 통해 다양한 이벤트를 시뮬레이트하여 테스트 시나리오를 다룰 수 있다.

| 메서드                                    | 설명                               |
| ----------------------------------------- | ---------------------------------- |
| `fireEvent.click(element, options)`       | 클릭 이벤트를 발생시킨다.          |
| `fireEvent.change(element, options)`      | 변경 이벤트를 발생시킨다.          |
| `fireEvent.input(element, options)`       | 입력 이벤트를 발생시킨다.          |
| `fireEvent.submit(form, options)`         | 폼 제출 이벤트를 발생시킨다.       |
| `fireEvent.focus(element, options)`       | 포커스 이벤트를 발생시킨다.        |
| `fireEvent.blur(element, options)`        | 블러 이벤트를 발생시킨다.          |
| `fireEvent.select(element, options)`      | 선택 이벤트를 발생시킨다.          |
| `fireEvent.dblClick(element, options)`    | 더블 클릭 이벤트를 발생시킨다.     |
| `fireEvent.contextMenu(element, options)` | 컨텍스트 메뉴 이벤트를 발생시킨다. |
| `fireEvent.mouseOver(element, options)`   | 마우스 오버 이벤트를 발생시킨다.   |
| `fireEvent.mouseOut(element, options)`    | 마우스 아웃 이벤트를 발생시킨다.   |

| options         | 설명                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| `bubbles`       | 이벤트가 버블링되는지 여부를 나타내는 불리언 값으로, 기본값은 `true`.  |
| `cancelable`    | 이벤트가 취소 가능한지 여부를 나타내는 불리언 값으로, 기본값은 `true`. |
| `button`        | 마우스 이벤트의 버튼을 나타내는 숫자 값으로, 기본값은 `0`.             |
| `relatedTarget` | 이벤트의 관련 대상을 나타내는 요소로, 기본값은 `null`.                 |
| `target`        | 이벤트의 대상을 나타내는 요소로, 기본값은 `null`.                      |
| `key`           | 키보드 이벤트의 키를 나타내는 문자열 값으로, 기본값은 `''`.            |
| `code`          | 키보드 이벤트의 키의 코드를 나타내는 문자열 값으로, 기본값은 `''`.     |

### `render`

컴포넌트를 렌더링하고 테스트 환경을 설정하는 데 사용되는 함수이며, 테스트 작성 시 컴포넌트를 가상 DOM에 렌더링하고, 그 결과로 컴포넌트의 인스턴스 및 DOM 엘리먼트에 접근할 수 있는 `render` 함수를 제공한다.

보통 `render` 함수는 테스트 케이스의 시작 부분에서 호출되며, 테스트 하고자 하는 컴포넌트를 렌더한다.
그 후에 결과를 통해 컴포넌트와 상호작용하거나 특정 상태를 테스트하는 등 다양한 테스트 시나리오를 작성할 수 있다.

```tsx
import { render } from "@testing-library/react";
import SignUpForm from "../components/SignUpForm";

describe("SignUpForm Component", () => {
  test("이메일 인풋이 렌더링되어야 합니다.", () => {
    // given: SignUpForm 컴포넌트가 렌더링되었을 때
    const { getByLabelText } = render(<SignUpForm onSubmit={jest.fn()} />);

    // when: 이메일 인풋을 찾을 때
    const emailInput = getByLabelText("Email:");

    // then: 이메일 인풋이 렌더링되었다.
    expect(emailInput).toBeInTheDocument();
  });
});
```

### `waitFor`

`waitFor`는 비동기적인 작업이 완료될 때까지 기다리는 데 사용되는 함수이며, 테스트 중 비동기적인 상태 변경이나 렌더링이 발생할 때 사용된다.

보통은 특정 엘리먼트가 나타날 때까지, 상태가 변경될 때까지, 조건이 충족될 때까지 대기하는 데 사용된다.

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("특정 엘리먼트가 렌더링될 때까지 대기", async () => {
  render(<MyComponent />);

  // 특정 엘리먼트가 렌더링될 때까지 대기
  await waitFor(() => {
    const element = screen.getByText("특정 텍스트");
    expect(element).toBeInTheDocument();
  });
});
```

### `screen`

`screen`은 테스트 중에 DOM에 렌더링된 컴포넌트의 엘리먼트에 쉽게 접근할 수 있게 해주는 객체이며, `render`함수를 사용해 렌더링된 컴포넌트에 대한 쿼리 및 검증 메서드를 통해 테스트 시나리오를 작성할 수 있다.

| 쿼리                 | 설명                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `screen.getBy...`    | 엘리먼트를 찾지 못하면 에러를 발생시키는 쿼리로, 엘리먼트가 1개만 존재하는 경우 사용한다.    |
| `screen.queryBy...`  | 엘리먼트를 찾지 못하면 `null`을 반환하는 쿼리로, 엘리먼트가 1개만 존재하는 경우 사용한다.    |
| `screen.findBy...`   | 엘리먼트를 찾지 못하면 Promise를 반환하는 쿼리로, 엘리먼트가 1개만 존재하는 경우 사용한다.   |
| `screen.getAllBy...` | 엘리먼트를 찾지 못하면 에러를 발생시키는 쿼리로, 엘리먼트가 여러 개 존재하는 경우 사용한다.  |
| `screen.queryAll...` | 엘리먼트를 찾지 못하면 빈 배열을 반환하는 쿼리로, 엘리먼트가 여러 개 존재하는 경우 사용한다. |
| `screen.findAll...`  | 엘리먼트를 찾지 못하면 Promise를 반환하는 쿼리로, 엘리먼트가 여러 개 존재하는 경우 사용한다. |

| 쿼리                 | 설명                                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `...Role`            | 접근성 트리에 노출된 모든 엘리먼트를 쿼리하는 데 사용된다. `name` 옵션을 사용하여 accessible name으로 반환된 엘리먼트를 필터링할 수 있다. `name` 옵션과 함께 사용되어 예: `getByRole('button', {name: /submit/i})`. |
| `...LabelText`       | 폼 필드에 특히 효과적인 메서드이다. 웹사이트 폼을 탐색할 때 사용자는 레이블 텍스트를 사용하여 엘리먼트를 찾는다. 이 메서드는 그 동작을 모방하므로 이를 우선적으로 사용하는 것이 좋다.                               |
| `...PlaceholderText` | placeholder는 레이블의 대체로 사용해서는 안 된다. 그러나 이게 유일한 정보인 경우 다른 대안보다는 나은 선택이다.                                                                                                     |
| `...Text`            | 폼 이외의 곳에서 텍스트 콘텐츠는 사용자가 엘리먼트를 찾는 주요 방법이다. 이 메서드는 비대화형 엘리먼트(예: div, span, paragraph)를 찾는 데 사용될 수 있다.                                                          |
| `...DisplayValue`    | 폼 엘리먼트의 현재 값은 기존 값이 채워진 페이지를 탐색하는 데 유용할 수 있다.                                                                                                                                       |
| `...AltText`         | 엘리먼트가 alt 텍스트를 지원하는 경우(이미지, area, input 및 사용자 정의 엘리먼트 등), 해당 엘리먼트를 찾기 위해 사용할 수 있다.                                                                                    |
| `...Title`           | title 속성은 스크린 리더에 의해 일관적으로 읽히지 않으며 시각적 사용자에게는 기본적으로 표시되지 않는다.                                                                                                            |
| `...TestId`          | 사용자는 이를 보거나 듣지 못하므로 이 쿼리는 접근성 이름이나 텍스트와 일치하지 않거나 의미가 없는 경우에 권장된다(예: 텍스트가 동적인 경우).                                                                        |
