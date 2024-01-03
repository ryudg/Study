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

## 테스트 작성

<details>

<summary>로그인 폼</summary>

```tsx
import React, { useState } from "react";
import LoginInput from "./LoginInput";

interface SignUpFormProps {
  onSubmit: (email: string, password: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // 이메일 입력값 변경 시 호출되는 함수
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(null); // 이메일 에러 초기화
  };

  // 비밀번호 입력값 변경 시 호출되는 함수
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(null); // 비밀번호 에러 초기화
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    // 이메일 유효성 검사
    if (!email) {
      setEmailError("Please enter a valid email address");
    }

    // 비밀번호 유효성 검사
    if (!password) {
      setPasswordError("Please enter a valid password");
    }

    // 이메일과 비밀번호가 모두 입력되었으면 true 반환
    return email && password;
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사 후 제출
    if (validateForm()) {
      onSubmit(email, password); // 외부에서 전달받은 제출 함수 호출
      resetForm(); // 폼 초기화
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginInput
        label="Email:"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />

      <LoginInput
        label="Password:"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
```

</details>

<details>

<summary>이메일/비밀번호 인풋</summary>

```tsx
import React from "react";

interface LoginInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

function LoginInput({ label, type, value, onChange, error }: LoginInputProps) {
  return (
    <>
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <br />
    </>
  );
}

export default LoginInput;
```

</details>

<details>

<summary>테스트 코드</summary>

```tsx
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SignUpForm from "../components/SignUpForm";

describe("SignUpForm Component", () => {
  let mockOnSubmit: jest.Mock;

  beforeEach(() => {
    // given: SignUpForm 컴포넌트가 렌더링되었고, onSubmit 콜백 함수가 모의 함수로 설정되었다.
    mockOnSubmit = jest.fn();
  });

  afterEach(() => {
    // then: 테스트 종료 후에 form 값 초기화
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "" },
    });
  });

  describe("값을 입력하지 않고 제출했을 때", () => {
    test("이메일을 입력하지 않으면 에러 메세지가 출력된다.", async () => {
      // when: SignUpForm 컴포넌트가 렌더링되고 Sign Up 버튼을 클릭했을 때
      render(<SignUpForm onSubmit={mockOnSubmit} />);
      fireEvent.click(screen.getByText("Sign Up"));

      // then: 이메일에 대한 에러 메시지가 나타나고 onSubmit이 호출되지 않았다.
      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address")
        ).toBeInTheDocument();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test("비밀번호를 입력하지 않으면 에러 메세지가 출력된다.", async () => {
      // when: SignUpForm 컴포넌트가 렌더링되고 Sign Up 버튼을 클릭했을 때
      render(<SignUpForm onSubmit={mockOnSubmit} />);
      fireEvent.click(screen.getByText("Sign Up"));

      // then: 비밀번호에 대한 에러 메시지가 나타나고 onSubmit이 호출되지 않았다.
      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid password")
        ).toBeInTheDocument();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe("값을 입력하고 제출했을 때", () => {
    test("유효한 이메일과 비밀번호를 입력하면 onSubmit이 호출된다.", async () => {
      // given: SignUpForm 컴포넌트가 렌더링되었고, 이메일과 비밀번호를 입력하고 Sign Up 버튼을 클릭했을 때
      render(<SignUpForm onSubmit={mockOnSubmit} />);
      fireEvent.change(screen.getByLabelText("Email:"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password:"), {
        target: { value: "password123" },
      });

      // when: Sign Up 버튼을 클릭했을 때
      fireEvent.click(screen.getByText("Sign Up"));

      // then: onSubmit이 유효한 값과 함께 호출되었다.
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          "test@example.com",
          "password123"
        );
      });
    });
  });
});
```

</details>

<details>

<summary>테스트 결과</summary>

```bash
 PASS  src/__test__/SignUpForm.spec.tsx
  SignUpForm Component
    값을 입력하지 않고 제출했을 때
      ✓ 이메일을 입력하지 않으면 에러 메세지가 출력됩니다. (24 ms)
      ✓ 비밀번호를 입력하지 않으면 에러 메세지가 출력됩니다. (5 ms)
    값을 입력하고 제출했을 때
      ✓ 유효한 이메일과 비밀번호를 입력하면 onSubmit이 호출됩니다. (7 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.321 s, estimated 1 s
Ran all test suites related to changed files.
```

</details>

### Jest

#### jest.fn()

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

#### `expect`

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
