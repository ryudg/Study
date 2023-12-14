# 0. JavaSCript

## 0.1 JavaScript의 역사

1995년 넷스케이프의 브렌던 아이크는 웹 사이트에 쉽게 접근하고 사용할 수 있는 JavaScript를 10일만에 설계했다. 그 당시 개발자들이 10일만에 설계된 JavaScript의 아래에서 설명할 특이한 특성과 결점에 대해 조롱했다.

그러나 JavaScript는 1995년 이후 빠르게 발전했는데, JavaScript의 운영위원회인 TC39는 JavaScript의 기반이 되는 언어 사양인 ECMAScript의 새로운 버전을 2015년 부터 매년 출시했다.
이때 다른 최신 프로그래밍 언어에서 제공하는 기능에 맞춘 새로운 기능들도 함께 제공했다.
JavaScript는 Web Browser 뿐만 아니라 **Embedded Application**과 Server Runtime을 포함한 다양한 환경에서 새로운 버전과 이전 버전에 대한 하위 호환성을 유지했다.

> **임베디드 어플리케이션**
> 특정한 장치나 시스템 내부에 내장되어 동작하는 소프트웨어 응용 프로그램
>
> > e.g.
> > 자동차 내부의 엔진 제어, 브레이크 시스템, 공기 조절 시스템 등을 제어하는 소프트웨어 프로그램
> > 스마트폰의 카메라, 센서, 터치스크린, 무선 통신 기능을 제어하는 소프트웨어 프로그램

## 0.2 Vanilla JavaScript

중요한 언어 확장이나 Framework 없이 JavaScript를 사용하는 것을 “Vanilla”라고 부른다. 즉, 순수한 JavaScript를 의미한다.

### 0.2.1 예기치 못한 동작

```jsx
if ("" == 0) {
  console.log("console.log가 실행이 되는 이유는?");
  // JavaScript는 인수를 암묵적으로 형변환한다.
  // 즉 위의 조건에서 ""는 Falsy한 값이므로 동일 연산자(==)에 의해 false로 변환되고,
  // 0도 Falsy한 값이므로 동일 연산자(==)에 의해 false로 변환되므로 비교 조건은 참이다.
}

if (1 < x < 3) {
  console.log("console.log가 실행이 되는 이유는?");
  // JavaScript는 위의 조건을 1 < x을 먼저 평가 후
  // 평가된 값을 평겨된 값 < 3 처럼 순서대로 비교하며, true < 3 또는 false < 3처럼 동작한다.
  // true는 1로 형변환 되고, false는 0으로 형변환 되므로 x의 값이 어떠한 값이던 true가 반환된다.
}
```

```jsx
const obj = { width: 10, ***height***: 15 };
const area = obj.width * obj.***heigth***;

console.log(area);  // NaN이 출력된다.
// obj.width * obj.***heigth*** 구문에서 ***height***가 아닌 ***heigth***으로 오타가 발생했으므로
// 즉, obj.***heigth***는 정의되지 않은 값이므로 undefined가 반환된다.
// 따라서 10 * undefined로 계산이 되기 때문에 결과값은 NaN이다.
```

대부분의 프로그래밍 언어는 이러한 종류들의 오류가 발생하면 오류를 표출하거나, 일부는 코드가 실행이 되기 전 즉, 컴파일 중 오류를 표출 해준다.

하지만 JavaScript는 런타임 중에 타입 변환 및 오류를 처리하는 특성을 갖고 있다는 것을 의미한다.

### 0.2.2 구성요소에 대한 의미를 설명하는 표준화 내용 부재

JavaScript 언어 사양에는 함수의 매개변수, 함수 반환, 변수 또는 다른 구성 요소의 의미를 설명하는 표준화 된 내용이 없기 때문에 코드 작성 시 오류를 범할 가능성이 높다.

```jsx
/**
 * 두 개의 숫자를 더한 결과를 반환
 * @param {number} x - 첫 번째 숫자
 * @param {number} y - 두 번째 숫자
 * @returns {number} - 숫자 x와 y를 더한 결과
 * @throws {Error} - 입력이 숫자가 아닌 경우 에러를 발생
 */
function sum() { ... }
```

따라서 JavaScript 개발자들은 블록 주석으로 함수와 변수를 설명하는 JSDoc 표준을 채택했다.
이를 이용해 형식화된 함수와 변수 코드 바로 위에 문서 주석을 작성함으로써 코드에 대한 설명을 추가할 수 있다.
하지만 JSDoc은 아래와 같은 문제점이 있다.

1. JSDoc 설명이 코드가 잘못되는 것을 막을 수 없다.
2. JSDoc 설명이 이전에는 정확했더라도 코드 리팩터링 중 생긴 변경 사항과 관련된 유효하지 않은 JSDoc 주석을 찾기 어렵다.
3. 복잡한 객체를 설명할 때는 JSDoc을 다루기 어려울 뿐더러 작성해야하는 코드가 장황해진다.

### 0.2.3 개발자 편의성의 부재

```jsx
function sum(a, b) {
  return a + b;
}

const result = sum(1, 2);

console.log(result**.toString()**);
```

위 코드 작성 시 Number에서 제공하는 `toString()` 가 자동완성이 되는가?
`result`라는 값이 정해져 있지 않기 때문에 JavaScript에서 제공하는 Number의 내장 메서드인 `toString()`를 일일이 타이핑 해야한다. 만약 오타가 발생하면 Error가 발생하는 것은 당연하다.

# 1. TypeScript

TypeScript는 2010년대 초 Microsoft 내부에서 만들어진 후 2012년에 출시 및 오픈소스화 되었다.

TypeScript는 아래의 네 가지로 설명된다.

1. **프로그래밍 언어**
   JavaScript의 모든 구문과, 타입을 정의하고 사용하기 위한 새로운 TypeScript 고유 구문이 포함된 언어
2. **타입 검사기**
   JavaScript 및 TypeScript로 작성된 파일에서 생성된 모든 구성 요소(변수, 함수 등)을 이해하고 잘못 구성된 부분을 알려주는 프로그램
3. **컴파일러 (⇒ 트랜스파일러)**
   타입 검사기를 실행하고 문제를 보고한 후 이에 대응되는 JavaScript 코드를 생성하는 프로그램
4. **언어 서비스**
   타입 검사기를 시용해 VSCode와 같은 IDE에 개발자들에게 유용한 유틸리티 제공

TypeScript 공식 사이트에서는 “**TypeScript is JavaScript with syntax for types.**”라고 설명한다.
즉, “TypeScript는 타입을 위한 구문이 있는 JavaScript”라는 의미이다.

**TypeScript는 기본적으로 JavaScript이다.**
과장해서 TypeScript의 90%가 JavaScript이고 나머지 10%가 Type라고 해도 무방하다.
즉, JavaScript 이해도가 높을 수록 TypeScript를 더 잘 이해할 수 있다.

## 1.1 Basic TypeScript

코드를 실행하기 전 이러한 잠재적인 에러들을 미리 발견할 수 있으면 좋을 것이다.
TypeScript와 같은 정적 타입 검사기의 역할, 정적 타입 시스템Static Type System은 작성한 프로그램에서 사용된 값들의 형태와 동작을 설명한다. 이로써 TypeScript와 같은 타입 검사기는 이 정보를 기반으로 프로그램이 제대로 작동하지 않을 때 경고해준다.

## 1.2 TypeScript를 도대체 왜 쓰는가

JavaScript에서 발생하는 에러는 크게 세 가지로 분류할 수 있다.

1. 문법에러SyntaxError ⇒ JavaScript와 TypeScript가 아예 동작하지 않는다.
2. 타입에러TypeError
3. 런타임에러RuntimeError(실제 코드가 실행 되었을 때)

> [**JavaScript에서 많이 발생하는 에러 순위**](https://rollbar.com/blog/top-10-javascript-errors-from-1000-projects-and-how-to-avoid-them/)
>
> 1. Uncaught TypeError: Cannot read property
> 2. TypeError: ‘undefined’ is not an object (evaluating
> 3. TypeError: null is not an object (evaluating
> 4. (unknown): Script error
> 5. TypeError: Object doesn’t support property
> 6. TypeError: ‘undefined’ is not a function
> 7. Uncaught RangeError
> 8. TypeError: Cannot read property ‘length’
> 9. Uncaught TypeError: Cannot set property
> 10. ReferenceError: event is not defined
>
> **위의 에러 중 4, 7번을 제외한 에러들은 TypeScript가 미리 탐지할 수 있는 에러들이다.**

# 2. tsc, TypeScript Compiler

```bash
# TypeScript 컴파일러 tsc 전역 설치
npm install -g typescript
```

```bash
# TypeScript가 설치되었는지 확인해 보자
tsc --version
Version 5.2.2
```

> npm ls -g 명령어를 입력하면 전역에 설치된 모듈을 확인할 수 있다.
>
> ```bash
> /.nvm/versions/node/v18.16.0/lib
> ├── add-gitignore@1.1.1
> ├── corepack@0.17.0
> ├── degit@2.8.4
> ├── express-generator@4.16.1
> ├── express@4.18.2
> ├── nodemon@3.0.1
> ├── npm@9.5.1
> ├── pnpm@8.7.0
> └── typescript@5.2.2
> ```

```tsx
function sum(x, y) {
  return x + y;
}

console.log(sum(1, 2, 3));
```

위의 코드는 에러를 출력하지만 정상적으로 컴파일 된다.

런타임에 실행되는 코드는 타입스크립트의 타입 검사를 받지 않기 때문에 컴파일 에러가 발생하지 않는다.
TypeScript가 JavaScript로 변환하는 작업 때문에 코드 실행이 중단되어야 할 이유가 전혀 없다.
즉, 타입스크립트는 컴파일 시점에만 타입 검사를 하고 런타임에는 타입 검사를 하지 않는다는 뜻이다.

## 2.1 지워진 타입

앞서 작성한 `greet` 함수를 `tsc hello.ts` 명령어를 이용해 컴파일해보자

```tsx
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

컴파일 결과 아래와 같은 코드로 컴파일 됐음을 확인할 수 있다.

```tsx
function greet(person, date) {
  console.log(
    "Hello ".concat(person, ", today is ").concat(date.toDateString(), "!")
  );
}
greet("Maddison", new Date());
```

타입 표기는 JavaScript(엄밀히 말해 ECMAScript)의 일부가 아니므로, TypeScript를 수정 없이 그대로 실행할 수 있는 브라우저나 런타임 환경은 존재하지 않는다. 즉, TypeScript를 사용할 때 컴파일러가 필요한 이유다.

TypeScript 전용 코드를 제거하거나 변환하여 실행할 수 있도록 만들 방법이 필요하다는 의미다.
대부분의 TypeScript 전용 코드는 컴파일 후 제거되며, 타입 표기 또한 지워진다.

## 2.2 다운 레벨링

위의 코드를 살펴보자.

템플릿 문자열 `Hello ${person}, today is ${date.toDateString()}!` 이
연결 문자 연산자로 `"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!")` 변경되었다.

왜 변경되었을까?
템플릿 문자열은 ECMAScript 2015(ES6)라고 불리는 버전의 ECMAScript에서 등장한 기능이다.
TypeScript는 새 버전의 ECMAScript의 코드를 ECMAScript 3 또는 ECMAScript 5와 같은 예전 버전의 것들로 다시 작성해준다.
상위 버전의 ECMAScript를 하위 버전으로 변경하는 과정을 Down Leveling이라고 부른다.

TypeScript는 구버전 ES3를 타겟으로 동작하는 것이 기본 동작이다. `--target` 플래그를 설정하면 보다 최근 버전으로 타겟 변환을 할 수 있다. `--target es2015`를 실행하면 TypeScript가 ECMAScript 2015를 타겟으로 동작할 수 있으며, ECMAScript 2015가 지원되는 런타임이기만 하면 해당 코드가 실행될 수 있도록 변환된다는 의미이다.

> 💡 타겟 버전의 기본값은 ES3이지만, 현존하는 대다수의 브라우저들은 ES2015를 지원하고 있다.
> 따라서 특정 구버전 브라우저에 대한 호환성 유지가 주요 이슈가 아니라면, 대부분의 경우 안심하고 ES2015 또는 그 이상을 컴파일러 타겟으로 지정할 수 있다.
