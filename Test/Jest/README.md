# Jest

> https://jestjs.io/docs/getting-started

Jest는 FaceBook에 의해서 만들어진 테스팅 프레임 워크이며 테스트 케이스를 작성하고 실행할 수 있도록 도와준다.

## Install

```bash
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```

| 패키지 이름                 | 역할 및 설명                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `jest`                      | JavaScript 및 TypeScript 애플리케이션을 위한 테스트 프레임워크로, 테스트 작성, 실행 및 관리를 위한 핵심 라이브러리를 제공.                      |
| `@types/jest`               | TypeScript에서 Jest를 사용할 때 필요한 타입 정의를 제공.                                                                                        |
| `ts-jest`                   | TypeScript로 작성된 코드를 Jest에서 사용할 수 있도록 지원하며, TypeScript 컴파일러와 Jest 간의 통합을 담당.                                     |
| `jest-environment-jsdom`    | Jest 테스트 환경을 브라우저-like 환경인 jsdom으로 설정.                                                                                         |
| `@testing-library/react`    | React 컴포넌트를 테스트하기 위한 Testing Library의 React 구현체로, 실제 사용자 경험과 유사한 방식으로 테스트를 작성할 수 있도록 도구를 제공.    |
| `@testing-library/dom`      | DOM 요소를 테스트하기 위한 Testing Library의 DOM 구현체로, DOM에 대한 테스트를 더 쉽게 작성할 수 있도록 도구를 제공.                            |
| `@testing-library/jest-dom` | Jest에서 DOM 테스트 시 사용되는 확장 라이브러리로, 더 많은 매처(matchers) 및 유틸리티 함수를 추가하여 테스트 코드의 가독성과 유지보수성을 높임. |

<details>

<summary>알아두면 좋을만한 패키지</summary>

| 패키지 이름                   | 역할 및 설명                                                                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `jest-extended`               | Jest에서 제공하지 않는 추가적인 매처(matchers)를 제공.                                                                                         |
| `jest-styled-components`      | Jest에서 styled-components를 테스트하기 위한 확장 라이브러리로, styled-components에서 제공하는 `toHaveStyleRule`과 같은 매처(matchers)를 제공. |
| `jest-transform-stub`         | Jest에서 특정 파일을 트랜스파일링하지 않고, 원본 파일을 그대로 사용하도록 설정.                                                                |
| `@testing-library/user-event` | 사용자 이벤트 시뮬레이션을 위한 Testing Library의 확장 라이브러리로, 사용자가 실제로 어떻게 상호작용하는지 테스트.                             |
| `jest-watch-typeahead`        | Jest 테스트 실행 중 파일 변경을 감지하고 자동으로 해당 파일에 대한 테스트를 재실행하는 기능을 제공.                                            |
| `ts-jest/utils`               | TypeScript와 Jest를 함께 사용할 때 유용한 유틸리티 함수를 제공하는 라이브러리로, 특히 모듈 경로 등을 해결.                                     |
| `react-test-renderer`         | React 컴포넌트를 렌더링하고 테스트하기 위한 React의 공식 렌더러 라이브러리로, 컴포넌트 트리를 검사하고 스냅샷 테스트를 수행하는 데 사용.       |
| `jest-image-snapshot`         | 이미지 스냅샷 테스트를 지원하는 Jest 플러그인으로, UI 변경사항이 화면에 어떻게 나타나는지 비교하여 테스트할 수 있다.                           |
| `nock`                        | HTTP 요청을 가로채고 가짜 응답을 제공하여 서버 요청을 모의(mock)하는 데 사용되는 라이브러리로, 테스트 시 외부 API 호출을 테스트하는 데 유용.   |

</details>

## Configuration

Jest의 환경 설정을 하는 방법은 두 가지가 있다.

1. `package.json` 파일의 `jest` 속성을 통해 설정

```json
{
  "scripts": {
    // 생략...

    "test": "jest --watchAll"
  },
  // 생략...

  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "jest-environment-jsdom"
  }
}
```

2. `jest.config.js` 파일을 통해 설정

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
};
```

## 파일 구조

테스트 파일의 구조도 두 가지 방식이 있다.

1. `__tests__` 디렉토리를 통해 구성

   테스트만 관리하는 하나의 디렉토리를 생성해 테스트 파일을 관리하여 테스트 파일을 찾기 쉽게 한다.

```bash
src
├── components
│   ├── Button.tsx
│   └── Input.tsx
├── __tests__
│   ├── Button.spec.tsx
│   └── Input.spec.tsx
```

2. 테스트 파일을 컴포넌트 파일과 같은 디렉토리에 생성

   테스트 하는 컴포넌트 파일과 같은 디렉토리에 테스트 파일을 생성하여 관리하여 응집도를 향상시키고, 소스 코드와 테스트 코드를 한 눈에 볼 수 있게 한다.

```bash
src
├── components
│   ├── Button.tsx
│   ├── Button.spec.tsx
│   ├── Input.tsx
│   └── Input.spec.tsx
```

> `*.test.ts`는 주로 Test-Driver Development(TDD) 방식으로 테스트를 작성할 때 사용하고,
>
> > TDD는 테스트를 먼저 작성하고, 테스트를 통과하는 코드를 작성하는 방식이다.
>
> `*.spec.ts`는 Behavior-Driven Development(BDD) 방식으로 테스트를 작성할 때 사용한다.
>
> > BDD는 테스트를 명세서처럼 작성하는 스타일이며, 테스트 코드를 읽기 쉽고 이해하기 쉽게 작성할 수 있도록 도와준다.
>
> 해당 규칙은 강제되는 것이 아니며, 개발자의 취향에 따라 자유롭게 작성하면 된다.

## API

### jest.fn()

`jest.fn()`은 Mock 함수를 생성하는 함수로, Mock 함수를 생성할 때 사용한다.

> Mock 함수란 실제 함수와 같은 동작을 하지만, 실제 함수를 호출하지 않고 함수 호출 여부와 함수 호출 시 전달된 인자 등을 확인할 수 있는 함수이다.
> 이를 통해 테스트 중에 함수의 호출 및 반환 값을 추적하고 제어할 수 있어 함수가 호출되었는지, 함수가 호출되었을 때 전달된 인자가 올바른지 등을 확인할 수 있다.

```tsx
// Mock 함수 생성
const mockFunction = jest.fn();

// Mock 함수 호출
mockFunction("argument1", "argument2");

// Mock 함수 호출 정보 확인
console.log(mockFunction.mock.calls); // 출력: [['argument1', 'argument2']]

// Mock 함수를 생성하고, 항상 true를 반환하는 함수
const returnsTrue = jest.fn(() => true);

// Mock 함수를 호출하면 항상 true가 반환되어, console.log에는 true가 출력
console.log(returnsTrue()); // true;

// Mock 함수가 호출되었는지 확인
expect(mockFunction).toHaveBeenCalled();

// Mock 함수가 특정 인자와 함께 호출되었는지 확인
expect(mockFunction).toHaveBeenCalledWith("argument1", "argument2");
```

### `expect`

| 메서드                                         | 설명                                                            |
| ---------------------------------------------- | --------------------------------------------------------------- |
| `expect(value)`                                | 값을 테스트하기 위한 `expect` 객체를 생성한다.                  |
| `.toBe(expected)`                              | 값이 기대값과 정확히 일치하는지 검사한다.                       |
| `.toEqual(expected)`                           | 객체나 배열의 내용이 기대값과 동일한지 검사한다.                |
| `.not.toBe(expected)`                          | 값이 기대값과 정확히 일치하지 않는지 검사한다.                  |
| `.toBeNull()`                                  | 값이 `null`인지 검사한다.                                       |
| `.toBeDefined()`                               | 값이 정의되었는지 검사한다.                                     |
| `.toBeTruthy()`                                | 값이 Truthy한 값인지 검사한다.                                  |
| `.toBeFalsy()`                                 | 값이 Falsy한 값인지 검사한다.                                   |
| `.toContain(expected)`                         | 배열이나 문자열이 특정 값 또는 요소를 포함하는지 검사한다.      |
| `.toHaveLength(expected)`                      | 배열이나 문자열의 길이가 기대값과 일치하는지 검사한다.          |
| `.toMatch(patternOrRegex)`                     | 정규 표현식이나 문자열과 일치하는지 검사한다.                   |
| `.toHaveBeenCalledWith(arg1, arg2, ...)`       | 함수가 특정 인자와 함께 호출되었는지 검사한다.                  |
| `.toHaveBeenCalledTimes(expected)`             | 함수가 특정 횟수로 호출되었는지 검사한다.                       |
| `.toHaveBeenCalled()`                          | 함수가 최소한 한 번 이상 호출되었는지 검사한다.                 |
| `.toHaveBeenLastCalledWith(arg1, arg2, ...)`   | 함수가 마지막 호출될 때 특정 인자와 함께 호출되었는지 검사한다. |
| `.toHaveReturned()`                            | 함수가 반환 값을 가지는지 검사한다.                             |
| `.toHaveReturnedWith(expected)`                | 함수가 특정 값과 일치하는 값을 반환했는지 검사한다.             |
| `.toHaveBeenNthCalledWith(n, arg1, arg2, ...)` | 함수가 n번째 호출될 때 특정 인자와 함께 호출되었는지 검사한다.  |
| `.toThrow()`                                   | 함수가 예외를 발생시켰는지 검사한다.                            |
| `.toThrowErrorMatchingSnapshot()`              | 함수가 스냅샷과 일치하는 에러를 발생시켰는지 검사한다.          |

이러한 `expect` 객체의 메서드들은 Jest에서 테스트 시나리오를 작성할 때 사용되며, 각 메서드는 특정 검사 기능을 수행한다.

## 회원가입 예시

화원가입 페이지인 `SignupPage`에서는 이메일과 비밀번호, 비밀번호 확인 값을 입력하고, 회원가입 버튼을 클릭했을 때 정상적으로 가입이 완료되면 로그인 페이지로 넘어가는 페이지에서, 페이지 이동을 위해 react-router-dom을 사용하고, 비동기 서버 통신을 통해 회원가입 요청을 보내고 상태를 관리하기 위해 react-query를 사용한다.

이때 테스트 코드에서는 실제 페이지 routing을 하는것 처럼 `Provider`로 `reder`될 `SignupPage`를 감싸줘야 한다.

### 실패 케이스

<details>

<summary>코드</summary>

> given: 환경
> when: 조건
> then: 결과

#### given

```tsx
// SignupPage.spec.tsx

// 생략...

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe("회원가입 테스트", () => {
  test("비밀번호화 비밀번호 확인값이 일치하지 않으면 에러메세지 출력", async () => {
    // give => 회원가입 페이지가 그려짐
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });

  // 생략...
});
```

#### when

비밀번호화 비밀번호 확인값이 일치하지 않는 것을 확인하려면 비밀번호와 비밀번호 확인을 입력한 후, 회원가입 양식을 제출해야 한다.

이를 진행하기 위해서는 testing-library의 `fireEvent`를 사용해야 한다.

비밀번호와 비밀번호 확인 인풋을 testing-library의 `screen`의 `getByLabelText`를 사용해 찾는다.

```tsx
// SignupPage.spec.tsx

// 생략...

describe("회원가입 테스트", () => {
  test("비밀번호화 비밀번호 확인값이 일치하지 않으면 에러메세지 출력", async () => {
    // 생략...
    // when => 비밀번호와 비밀번호 확인값이 일치하지 않는 경우
    const password = screen.getByLabelText("비밀번호");
    const confirmPassword = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "wrongPassword" } });
  });
});
```

#### then

비밀번호와 비밀번호 확인값이 일치하지 않는 경우, 에러메세지가 출력되어야 하는 것을 확인하려면 해당 에러메세지를 testing-library의 `screen`의 `findByTestId`를 사용해 찾아야 한다.

```tsx
// SignupPage.tsx

export default function SignupPage() => {
  // 생략...

  return (
    // 생략...
    <ErrorMessage data-testid="error-message">
      비밀번호가 일치하지 않습니다
    </ErrorMessage>
    // 생략...
  );
}

```

```tsx
// SignupPage.spec.tsx

// 생략...

describe("회원가입 테스트", () => {
  test("비밀비밀번호화 비밀번호 확인값이 일치하지 않으면 에러메세지 출력번호", async () => {
    // 생략...
    // then => 에러메세지가 출력됨
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
```

</details>

### 성공 케이스

<details>

<summary>코드</summary>

#### given

기존의 회원가입 페이지가 그려지는 테스트 코드는 실페 케이스와 성공 케이스가 동일하기 때문에 `beforeEach`를 사용해 공통된 부분을 묶어준다. 그러면 각각의 `test`가 돌아가기 전에 화면을 그리기 때문에 테스트 코드가 더 간결해진다.

회원가입 조건이 충족되면 회원가입 버튼이 활성화되야 하는데, 이떄 회원가입 버튼이 비활성화 되었다는 것을 검증하는 테스트 코드를 작성한다.

회원가입 버튼을 testing-library의 `screen`의 `getByRole`를 사용해 찾는다.

```tsx
// SignupPage.tsx

export default function SignupPage() => {
  // 생략...

  return (
    // 생략...
    <SignupButton
      disabled={!email || !password || password != confirmPassword}
      onClick={() => handleSignup({ username: email, password })}
    >
      회원가입
    </SignupButton>
    // 생략...
  );
}
```

```tsx
// SignupPage.spec.tsx

describe("회원가입 테스트", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });

  // 실페 케이스 생략...

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화된다", async () => {
    // given => 회원가입 페이지가 그려짐(실패 케이스와 동일하기 때문에 beforeEach 사용), 버튼이 비활성화 되어있는지 확인
    const signupButton = screen.getByRole("button", { name: "회원가입" });
    expect(signupButton).toBeDisabled();
  });
});
```

#### when

실패 케이스와 테스트 코드는 동일하지만, 비밀번호와 비밀번호 확인의 값은 일치해야 한다.

```tsx
// SignupPage.spec.tsx

describe("회원가입 테스트", () => {
  // beforeEach...

  // 실페 케이스 생략...

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화된다", async () => {
    // when => 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
  });
});
```

#### then

실패 케이스와 테스트 코드는 동일하지만, 회원가입 버튼이 활성화 되었다는 것을 검증한다.

```tsx
// SignupPage.spec.tsx

describe("회원가입 테스트", () => {
  // beforeEach...

  // 실페 케이스 생략...

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화된다", async () => {
    // then => 회원가입 버튼 활성화
    expect(signupButton).toBeEnabled();
  });
});
```

</details>

### 테스트 결과

<details>

<summary>코드</summary>

```bash
 PASS  src/__test__/Signup.spec.tsx
  회원가입 테스트
    ✓ 비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다 (47 ms)
    ✓ 이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화된다 (44 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.858 s, estimated 2 s
Ran all test suites.

Watch Usage: Press w to show more.
```

</details>

## 로그인 예시

로그인 페이지인 `LoginPage`는 이메일과 비밀번호를 입력하고, 로그인에 실패하면 "로그인 정보를 확인해주세요"라는 에러메세지가 출력된다.

회원가입과 차이점은 실제 HTTP 통신이 일어난다는 것이다. 즉, 통신 결과에 따라 로그인 성공과 실패가 결정되므로 통신 결과에 따라 테스트 코드를 작성해야 한다.

로그인도 회원가입과 마찬가지로 react-query를 사용해 로그인 요청을 보내며, react-router-dom을 사용해 페이지 이동을 한다.

### 실패 케이스

<details>

<summary>코드</summary>

#### given

회원가입 테시트 코드와 유사하다.

```tsx
// Login.spec.tsx

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe("로그인 테스트", () => {
  test("로그인에 실패하면 에러메세지가 나타난다", async () => {
    //given => 로그인 화면이 그려진다
    const routes = [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });
});
```

#### when

[react-query 테스트](https://tanstack.com/query/latest/docs/react/guides/testing)를 위해 패키지를 설치(굳이 설치하지 않아도 된다.)

```bash
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

<details>

<summary>공식 문서 코드</summary>

```tsx
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });

await waitFor(() => result.current.isSuccess);

expect(result.current.data).toEqual("Hello");
```

</details>

공식 문서의 코드를 참고해 테스트를 진행하면 error가 발생하는데, HTTP call이 발생하지 않기 때문이다. 따라서 실제 사용자가 서비스를 이용하는 것처럼 로그인을 시도하고, 로그인에 실패하는 경우를 테스트 해야 한다.

```tsx
// Login.spec.tsx

// 생략...

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("로그인 테스트", () => {
  test("로그인에 실패하면 에러메세지가 나타난다", async () => {
    // 생략...
    // when => 사용자가 로그인에 실패한다
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });
  });
});
```

하지만 테스틑 진행하면 `axios` 에러가 발생하는데, 이를 [해결](https://tanstack.com/query/v4/docs/react/guides/testing#turn-off-network-error-logging)하기 위해서는 공식 문서에서 로깅을 꺼야한다.

```tsx
const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  },
});
```

조금 더 확실한 방법은 `beforeEach`를 활용해 mocking을 활용해 콘솔 에러가 발생하면 에러를 무시하도록 설정하고, `afterAll`에서 모든 테스트가 끝나면 mocking을 해제하는 것이다.

```tsx
// Login.spec.tsx

// 생략...

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("로그인 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("로그인에 실패하면 에러메세지가 나타난다", async () => {
    // 생략...
    // when => 사용자가 로그인에 실패한다
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });
  });
});
```

하지만, 이 테스트의 문제점은 실제로 서버에 요청이 들어간 이후 검증을 한다는 것이다. 이를 방지하기 위해서는 HTTP request를 mocking해야 한다.
즉, 실제 서버에서 `BadRequest` 응답이 온 것처럼 처리한다는 것이다.

이를 위해서 `nock` 패키지를 사용한다.

```bash
npm install --save-dev nock
```

```tsx
// Login.spec.tsx

import * as nock from "nock";
// 생략...

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("로그인 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("로그인에 실패하면 에러메세지가 나타난다", async () => {
    // 생략...
    // when => 사용자가 로그인에 실패한다
    nock("https://url.com")
      .post("/user/login/", {
        username: "wrong@email.com",
        password: "wrongPassword",
      })
      .reply(400, { msg: "NO_SUCH_USER" });

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });
  });
});
```

이렇게 처리하면 서버로 request가 가지 않는다.

#### then

로그인에 실패하면 에러메세지가 나타나야 한다. 회원가입과 유사하게 에러메세지를 testing-library의 `screen`의 `findByTestId`를 사용해 찾고, `toBeInTheDocument`를 사용해 해당 요소가 화면에 그려졌는지 확인한다.

```tsx
// Login.spec.tsx

// 생략...

describe("로그인 테스트", () => {
  test("로그인에 실패하면 에러메세지가 나타난다", async () => {
    // then - 에러메세지가 나타남
    await waitFor(() => result.current.isError);
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
```

</details>

### 성공 케이스

<details>

<summary>코드</summary>

성공 케이스는 회원가입 테스트와 유사하게 실패 성공 테스트가 비슷하다.

```tsx
// Login.spec.tsx

// 생략...

test("로그인에 성공하면 에러메세지가 나타나지 않는다", async () => {
  // 실패 테스트 케이스

  // given - 로그인 화면이 그려진다
  const routes = [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/login"],
    initialIndex: 0,
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  // when - 사용자가 로그인에 성공한다
  nock("https://url.com")
    .post("/user/login/", {
      username: "valid@email.com",
      password: "validPassword",
    })
    .reply(200, { token: "validToken" });

  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");

  fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "validPassword" } });

  const loginButton = screen.getByRole("button", { name: "로그인" });
  fireEvent.click(loginButton);

  const { result } = renderHook(() => useLogin(), {
    wrapper,
  });

  // then - 에러메세지가 나타나지 않음
  await waitFor(() => result.current.isSuccess);
  const errorMessage = screen.queryByTestId("error-message");
  expect(errorMessage).not.toBeInTheDocument();
});
```

</details>

### 테스트 결과

<details>

<summary>코드</summary>

```bash
 PASS  src/__test__/Login.spec.tsx
  로그인 테스트
    ✓ 로그인에 실패하면 에러메세지가 나타난다 (93 ms)
    ✓ 로그인에 성공하면 에러메세지가 나타나지 않는다 (21 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.129 s
Ran all test suites.
```

</details>
