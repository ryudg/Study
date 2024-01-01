타입스크립트가 2012년 처음 출시되었을 때 웹 애플리케이션은 고유의 자바스크립트가 깊은 복잡성을 지원하는 기능을 추가하는 것보다 훨씬 더 빠르게 복잡해지고 있다. 당시 가장 인기 있었던 자바스크립트 언어인 커피스크립트는 자바스크립트와는 다르게 새롭고 흥미로운 구조를 도입하기도 했다.

오늘날, 타입스크립트와 같은 상위 집합 언어에 특정 새로운 런타임 기능으로 자바스크립트 구문을 확장하는 방식은 다음과 같은 이유로 나쁜 사례로 간주된다.

- 런타임 구문 확장이 최신 버전 자바스크립츠의 새로운 구문과 충돌할 수 있다는 점이 가장 중요하다.
- 언어를 처음 접하는 프로그래머가 자바스크립트가 끝나는 곳과 다른 언어가 시작하는 곳을 이해하기 어렵게 만든다.
- 상위 집합 언어 코드를 사용하고 자바스크립트를 내보내는 트랜스파일러의 복잡성을 증가시킨다.

따라서 초기 타입스크립트 설계자들이 타입스크립트 언어로 자바스크립트의 세 가지 구문 확장을 도입했다는 것에 대해서 아쉬움을 표현할 수 있다.

- 클래스: 사양이 승인됨에 따라 자바스크립트 클래스에 맞춘 클래스
- 열거형: 키와 값의 일반 객체와 유사한 간단한 구문
- 네임스페이스: 코드를 구조화하고 배열하는 최신 모듈보다 앞선 해결책

> 💡 타입스크립트의 자바스크립트에 대한 런타임 구문 확장과 관련된 ‘원죄’는 다행히도 언어 초기에서 부터 내린 설계 결정이 아니다. 타입스크립트는 자바스크립트 자체에 추가되는 승인 절차를 통해 상당한 진전을 이룰 때까지 새로운 런타임 구문 구조를추가하지 않았다.

# 1. 클래스 매개변수 속성

> 💡 클래스를 많이 사용하는 프로젝트나 클래스 이점을 갖는 프레임워크가 아니라면 클래스 매개변수 속성을 사용하지 않는것이 좋다.

자바스크립트 클래스에서는 생성자에서 매개변수를 받고 즉시 클래스 속성에 할당하는 것이 일반적이다.

아래 `Engineer` 클래스는 타입이 `string`인 하나의 `area` 매개변수를 받고, 타입이 `string`인 `area` 클래스 변수에 할당한다.

```tsx
class Enginner {
  readonly area: string;

  constructor(area: string) {
    this.area = area;
    console.log(`I Work in ${area} area`);
  }
}

const engineer = new Enginner("Frontend").area; // 타입은 string
```

타입스크립트가 이러한 종류의 **매개변수 속성parameter property**을 선언하기 위한 단축 구문을 제공한다. 속성을 클래스 생성자의 시작 부분에 동일한 타입의 멤버 속성으로 할당된다. 생성자의 매개변수 앞에 `readonly` 또는 `public`, `protected`, `private` 제한자 중 하나를 배치하면 타입스크립트가 동일한 이름과 타입의 속성도 선언하도록 지시한다.

`Engineer` 코드에서 `area`에 대한 매개변수 속성을 사용해 타입스크립트로 재작성할 수 있다.

```tsx
class Enginner {
  constructor(readonly area: string) {
    this.area = area;
    console.log(`I Work in ${area} area`);
  }
}

const engineer = new Enginner("Backend").area; // 타입은 string
```

매개변수 속성은 클래스 생성자의 맨 처음에 할당된다(또는 기본 클래스로부터 파생된 클래스인 경우 `super()`를 호출한 이후 할당된다). 매개변수 속성은 다른 매개변수 또는 클래스 속성과 혼합될 수 있다.

아래 `NamedEngineer` 클래스는 일반 속성 `fullName`, 일반 매개변수 `name`, 매개변수 속성 `area`를 선언한다.

```tsx
class NamedEnginner {
  fullName: string;

  constructor(name: string, public area: string) {
    this.fullName = `${name} ${area} Enginner`;
  }
}
```

매개변수 속성이 없는 이와 동등한 타입스크립트 코드는 비슷해 보이지만 `area`를 명시적으로 할당하기 위한 코드가 몇 줄 더 있다.

```tsx
class NamedEnginner {
  fullName: string;
  area: string;

  constructor(name: string, area: string) {
    this.area = area;
    this.fullName = `${name} ${area} Enginner`;
  }
}
```

매개변수 속성은 타입스크립트 커뮤니티에서 가끔 논의되는 주제이다. 대부분의 프로젝트는 런타임 구문 확장이므로 앞에서 언급했던 단점으로 인해 어려움을 겪기 때문에 매개변수를 완전히 사용하지 않는 것을 선호한다. 또한 매개변수 속성은 새로운 `#` 클래스 `private` 필드 구문과 함께 사용할 수 없다.

반면 클래스 생성을 매우 선호하는 프로젝트에서는 매개변수 속성을 사용하면 좋다. 매개변수 속성은 매개변수 속성 이름과 타입을 두 번 선언해야 하는 편의 문제를 해결하는데, 이 선언은 자바스크립트가 아닌 타입스크립트 고유의 것이다.

# 2. 실험적인 데코레이터

> 💡 ECMAScript 버전이 데코레이터 구문으로 승인될 때까지 가능하면 데코레이터를 사용하지 않는 것이 좋다. 타입스크립트 데코레이터 사용을 권장하는 앵귤러나 Nest.JS와 같은 프레임워크 버전에서 작업하는 경우 프레임워크 설명서에서 데코레이터를 사용하는 방법을 알려준다.

클래스를 포함하는 많은 다른 언어에서는 클래스와 클래스의 멤버를 수정하기 위한 일종의 런타임 로직으로 주석을 달거나 데코레이팅할 수 있다. 데코레이터 함수는 `@`와 함수 이름을 먼저 배치해 클래스와 멤버에 주석을 달 수 있도록 하는 자바스크립트를 위한 제안이다.

아래 코드는 `MyClass` 클래스에 데코레이터를 사용하기 위한 구문을 보여준다.

```tsx
function myDecorator(target: any) {
  console.log("myDecorator");
}

@myDecorator
class MyClass {
  constructor() {
    console.log("constructor");
  }
}
```

> [ECMAScript에서는 아직 데코레이터를 승인하지 않았으므로 타입스크립트에서는 기본적으로 데코레이터를 지원하지는 않는다.](https://www.typescriptlang.org/ko/docs/handbook/decorators.html#handbook-content)

그러나 타입스크립트는 데코레이터의 오래된 실험적인 버전을 코드에서 사용할 수 있도록 제공하는 `experimentalDecorators` 컴파일러 옵션을 제공한다. `experimentalDecorators` 컴파일러 옵션은 `tsc` CLI나 다른 컴파일러 옵션과 마찬가지고 TSConfig 파일을 통해 활성화 할 수 있다.

```tsx
// tsconfig.jsom

{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

데코레이터의 각 사용법은 데코레이팅하는 엔티티가 생성되지마자 한 번 실행된다. 각 종류의 데코레이터(접근자, 클래스, 메서드, 매개변수, 속성)는 데코레이팅하는 엔티티를 설명하는 서로 다른 인수 집합을 받는다.

아래 `Greeter` 클래스 메서드에서 사용된 `logOnCall` 데코레이터는 `Greeter` 클래스 자체와 속성(`log`)의 키, 그리고 속성을 설명하는 `decriptor` 객체를 받는다. `Greeter` 클래스에서 원래의 `greet` 메서드를 호출하기 전에 `descriptor.value`를 수정해 `greet` 메서드를 데코레이팅 한다.

```tsx
function logOnCall(target: any, key: string, decriptor: PropertyDescriptor) {
  const original = decriptor.value;
  console.log("[logOnCall] I am decorating", target.constructor.name);

  decriptor.value = function (...args: unknown[]) {
    console.log(`[decorator.vlaue] Calling '${key}' with`, ...args);
  };
}

class GreeterClass {
  @logOnCall
  greet(message: string) {
    console.log(`[greet] Hello, ${message}!`);
  }
}

new GreeterClass().greet("You");
// Output log:
// [logOnCall] I am decorating GreeterClass
// [decorator.vlaue] Calling 'greet' with You
// [greet] Hello, You!
```

타입스크립트의 데코레이터 지원은 실험적이고 ECMAScript가 제안하는 최신 초안과 일치하지 않는다. 특히 자신만의 데코레이터를 작성하는 것은 어떠한 타입스크립트 프로젝트에서도 정당화 되지 않는다.

# 3. 열거형

> 💡 자주 반복되는 리터럴 집합이 있고, 그 리터럴 집합을 공통 이름으로 설명할 수 있으며, 열거형으로 전환했을 때 훨씬 더 읽기 쉽지 않은 경우라면 열거형을 사용해서는 안된다.

대부분의 프로그래밍 언어는 연관된 값 집합을 나타내는 `enum` 또는 열거형 타입의 개념을 포함한다. 열거형은 각 값에 대해 친숙한 이름을 사용한 객체에 저장된 리터럴 값 집합으로 생각할 수 있다.

자바스크립트는 열거형 구문을 포함하지 않으므로 열거형을 배치해야 하는 곳에 일반적인 객체를 사용한다. 예를 들어 HTTP 상태 코드를 숫자로 저장하고 사용할 수 있지만, 개발자들은 친숙한 이름으로 키를 지정해 객체에 저장하는 방식인 더 읽기 쉬운 방법을 찾아냈다.

```tsx
const StatusCodes = {
  InternalServerError: 500,
  NotFound: 404,
  Ok: 200,
  // ...
} as const;

StatusCodes.InternalServerError; // 500
```

타입스크립트에서 열거형 같은 객체를 사용할 때 까다로운 점은 값이 해당 객체의 값 중 하나여야 함을 나타내는 훌륭한 타입 시스템 방법이 없다는 것이다. 한 가지 일반적인 방법은 “타입 제한자”의 `keyof`와 `typeof` 타입 제한자를 함께 사용해 하나의 값을 해킹하는 것이지만, 이렇게 하려면 상당한 양의 구문을 입력해야한다.

아래 `StatusCodeValue` 타입은 가능한 상태 코드 번호 값에 대한 타입 유니언을 생성하기 위해 이전 `StatusCodes` 값을 사용한다.

```tsx
const StatusCodes = {
  InternalServerError: 500,
  NotFound: 404,
  Ok: 200,
  // ...
} as const;

type StatusCodeValue = (typeof StatusCodes)[keyof typeof StatusCodes]; // 500 | 404 | 200

let statusCodeValue: StatusCodeValue;
statusCodeValue = 200;
statusCodeValue = 404;
statusCodeValue = 500;

statusCodeValue = 400;
//^^^^^^^^^^^^^ Type '400' is not assignable to type 'StatusCodeValue'.
```

타입스크립트는 타입이 `number` 또는 `string`인 리터럴 값들을 갖는 객체를 생성하기 위한 `enum` 구문을 제공한다. 열거형은 `enum` 키워드로 시작해 객체 이름(일반적으로 파스칼 케이스), 그다음 쉼표로 구분된 키를 포함한 `{}` 객체이다. 각 키는 초깃값 앞에 선택적으로 `=`를 사용할 수 있다.

이전 `StatusCodes` 객체는 아래 `StatusCode` 열거형과 같다.

```tsx
enum StatusCode {
  InternalServerError = 500,
  NotFound = 404,
  Ok = 200,
  // ...
}

StatusCode.InternalServerError; // 500
```

클래스 이름처럼 `StatusCode` 같은 열거형 이름은 타입 애너테이션에서 타입 이름으로 사용할 수 있다. 아래 `StatusCode` 타입의 `statusCode` 변수에는 `StatusCode.Ok` 또는 숫자값을 제공할 수 있다.

```tsx
// ...

let statusCode: StatusCode;
statusCode = StatusCode.Ok;
statusCode = 200;
```

> 💡 타입스크립트는 약간의 타입 안정성을 희생하여 편의상 숫자 열거형 값에 임의의 숫자를 할당할 수 있다. `statusCode = -1`은 이전 코드에서도 허용된다.

컴파일된 자바스크립트에서 열거형은 이에 상응하는 객체로 컴파일 된다. 열거형의 각 멤버는 해당 값을 갖는 객체 멤버 키가 되고 그 반대의 경우도 마찬가지이다.

이전 `enum StatusCode`는 대략 아래와 같은 자바스크립트 코드를 생성한다.

```tsx
var StatusCode;
(function (StatusCode) {
  StatusCode[(StatusCode["InternalServerError"] = 500)] = "InternalServerError";
  StatusCode[(StatusCode["NotFound"] = 404)] = "NotFound";
  StatusCode[(StatusCode["Ok"] = 200)] = "Ok";
  // ...
})(StatusCode || (StatusCode = {}));
```

열거형은 타입스크립트 커뮤니티에서 다소 논쟁의 여지가 있는 주제이다. 한편으로는 “자바스크립트에 새로운 런타임 구문 구조를 절대 추가하지 않는다”는 타입스크립트의 일반적은 만트라mantra를 위반한다. 열거형은 개발자가 학습해야 하는 자바스크립트가 아닌 새로운 구문을 제시하며, 이 장 후반부에서 다룰 `preserveConstEnums`와 같은 옵션에 대한 몇 가지 결함을 갖는다.

다른 한편으로는 알려진 값 집합을 명시적으로 선언하는 데 열거형이 매우 유용하다. 열거형은 타입스크립트와 VSCode 소스 저장소에서 모두 광범위하게 사용된다.

## 3.1 자동 숫자값

열거형의 멤버는 명시적인 초깃값을 가질 필요가 없다. 값이 생략되면 타입스크립트는 첫 번째 값을 0으로 시작하고 각 후속 값을 1씩 증가시킨다. 열거형 멤버의 값이 고유하고 키 이름과 연결되는 것 외에는 중요하지 않다면 타입스크립트에서 열거형 멤버의 값을 선택하도록 하는 것은 좋은 옵션이다.

아래 `VisualTheme` 열거형은 타입스크립트에서 값을 완전히 선택할 수 있으므로 그 결과 세 개의 정수가 생성된다.

```tsx
enum VisualTheme {
  Dark, // 0
  Light, // 1
  System, // 2
}
```

내보낸 자바스크립트는 값이 명시적으로 설정된 것처럼 보인다.

```tsx
var VisualTheme;
(function (VisualTheme) {
  VisualTheme[(VisualTheme["Dark"] = 0)] = "Dark";
  VisualTheme[(VisualTheme["Light"] = 1)] = "Light";
  VisualTheme[(VisualTheme["System"] = 2)] = "System";
})(VisualTheme || (VisualTheme = {}));
```

숫자값이 있는 열거형에서 명시적 값을 갖지 않는 모든 멤버는 이전 값보다 1 더 큰 값을 갖는다.

예를 들어 `Direction` 열거형은 `Top` 멤버의 값이 1이고 나머지 값은 양의 정수라는 것만 고려한다.

```tsx
enum Direction {
  Top = 1,
  Right,
  Bottom,
  Left,
}
```

출력된 자바스크립트에서는 나머지 멤버가 명시적 값 2, 3, 4를 가진 것처럼 보인다.

```tsx
var Direction;
(function (Direction) {
  Direction[(Direction["Top"] = 1)] = "Top";
  Direction[(Direction["Right"] = 2)] = "Right";
  Direction[(Direction["Bottom"] = 3)] = "Bottom";
  Direction[(Direction["Left"] = 4)] = "Left";
})(Direction || (Direction = {}));
```

> 💡 열거형의 순서를 수정하면 기본 번호가 변경된다. 만약에 데이터베이스 같은 곳에 열거형 값을 저장하고 있다면 열거형 순서를 변경하거나 항목을 제거할 때 주의해야 한다. 저장된 번호가 더 이상 코드가 예상하는 것과 같지 않기 때문에 데이터가 갑자기 손상될 수 있다.

## 3.2 문자열값을 갖는 열거형

열거형은 멤버로 숫자 대신 문자열값을 사용할 수 있다.

아래 `LoadStyle` 열거형은 멤버로 문자열값을 사용한다.

```tsx
enum LoadStyle {
  AsNeed = "as-need",
  Eager = "eager",
}
```

문자열값을 멤버로 갖는 열거형의 출력 자바스크립트는 숫자값을 멤버로 갖는 열거형과 구조적으로 동일히다.

```tsx
var LoadStyle;
(function (LoadStyle) {
  LoadStyle["AsNeed"] = "as-need";
  LoadStyle["Eager"] = "eager";
})(LoadStyle || (LoadStyle = {}));
```

문자열값을 갖는 열거형은 읽기 쉬운 이름으로 공유 상수의 별칭을 지정하는 데 유용하다. 문자열 리터럴 유니언 타입을 사용하는 대신 문자열값을 갖는 열거형을 사용하면 강력한 편집기 자동 완성과 해당 속성의 이름 변경이 가능해진다.
문자열값의 한 가지 단점은 타입스크립트에 따라 자동으로 계산할 수 없다는 것이다. 숫자값이 있는 멤버 뒤에 오는 열거형 멤버만 자동으로 계산할 수 있다.

타입스크립트는 다음 열거형의 `ImplicitNumber`의 이전 멤버 값이 숫자 9000이기 때문에 `ImplicitNumber` 값에 9001을 제공할 수 있다. 하지만 `NotAllowed` 멤버는 문자열 값을 갖는 멤버 뒤에 오기 때문에 오류를 발생시킨다.

```tsx
enum Wat {
  FirstString = "first",
  SomeNumber = 9000,
  ImplicitNumber, // 9001
  AnotherString = "another",

  NotAllowed,
  //^^^^^^^^ Enum member must have initializer.
}
```

> 💡 이론적으로 숫자와 문자열 모드를 멤버로 갖는 열거형을 만들 수 있다. 하지만 실제로 이런 형태의 열거형은 불필요하고 혼란스러울 수 있으므로 사용해서는 안된다.

## 3.3 `const` 열거형

열거형은 런타임 객체를 생성하므로 리터럴 값 유니언을 사용하는 일반적인 전략보다 더 많은 코드를 생성한다. 타입스크립트는 `const` 제한자로 열거형을 선언해 컴파일된 자바스크립트 코드에서 객체 정의와 속성 조회를 생략하도록 지시한다.

아래 `DisplayHint` 열거형은 `displayHint` 변수의 값으로 사용된다.

```tsx
const enum DisplayHint {
  Opaque = 0,
  Semitransparent,
  Transparent,
}

let displayHint = DisplayHint.Transparent;
```

컴파일된 자바스크립트 코드에는 열거형 선언이 모두 누락되고 열거형의 값에 대한 주석을 사용한다.

```tsx
let displayHint = 2; /* DisplayHint.Transparent */
```

열거형 객체 정의를 생성하는 것이 여전히 바람직한 프로젝트라면 열거형 정의 자체가 존재하도록 만드는 `perserveConstEnums` 컴파일러 옵션을 사용한다. 여전히 값은 열거형 객체에 접근하는 대신에 리터럴을 직접 사용한다.

이전 코드는 컴파일된 자바스크립트 출력에서 속성 조회를 생략한다.

```tsx
var DisplayHint;
(function (DisplayHint) {
  DisplayHint[(DisplayHint["Opaque"] = 0)] = "Opaque";
  DisplayHint[(DisplayHint["Semitransparent"] = 1)] = "Semitransparent";
  DisplayHint[(DisplayHint["Transparent"] = 2)] = "Transparent";
})(DisplayHint || (DisplayHint = {}));
var displayHint = 2; /* DisplayHint.Transparent */
```

`perserveConstEnums`는 생성된 자바스크립트 코드의 크기를 줄이는 데 유용하지만 타입스크립트 코드를 변환하는 모든 방법이 이를 지원하는 것은 아니다.

# 4. 네임스페이스

> 💡 기존 패키지에 대한 `DefinitelyTyped` 타입 정의를 작성하지 않는 한 네임스페이스를 사용하지 말자. 네임스페이스는 최신 자바스크립트 모듈 의미 체계와 일치하지 않는다. 자동 멤버 할당은 코드를 읽는 것을 혼란스럽게 만들 수 있다. `.d.ts` 파일에서 네임스페이스를 접할 수 있기 때문에 이번 절에서 언급할 뿐이다.

ECMAScript 모듈이 승인되기 전에는 웹 애플리케이션이 출력 코드 대부분을 브라우저에 따라 로드되는 하나의 파일로 묶는 것이 일반적이었다. 이러한 거대한 하나의 파이른 종종 프로젝트의 서로 다른 영역에 걸쳐서 중요한 값에 대한 참조를 위해 전역 변수를 생성했다. `RequireJS`와 같은 오래된 모듈 로더를 설정하는 것보다 페이지에 하나의 파일을 포함하는 것이 더 간단하고, 아직 HTTP/2 다운로드 스트리밍을 지원하지 않는 서버가 많았기에 로드 성능이 더 좋은 경우가 많았다. 하나의 출력을 위해 만들어진 프로젝트에는 코드 영역과 전역 변수를 구성하는 방법이 필요했다.

타입스크립트 언어는 지금은 네임스페이스라 부르는 **내부 모듈internal module** 개념을 가진 하나의 해결책을 제공했다. 네임스페이스는 객체의 멤버로 호출할 수 있는 내보낸exported 콘텐츠가 있는, 전역으로 사용 가능한 객체다. 네임스페이스는 namespace 키워드와 `{}` 코드 블록으로 정의한다. 네임스페이스 블록의 모든 코드는 함수 클로저 내에서 평가된다.

아래 `Randomized` 네임스페이스는 `value` 변수를 생성하고 내부적으로 사용한다.

```tsx
namespace Randomized {
  const value = Math.random();
  console.log(`My value is ${value}`);
}
```

출력된 자바스크립트는 `Randomized` 객체를 생성하고 함수 내부의 블록 내용을 확인하기 때문에 `value` 변수는 네임스페이스 외부에서는 사용할 수 없다.

```tsx
var Randomized;
(function (Randomized) {
  var value = Math.random();
  console.log("My value is ".concat(value));
})(Randomized || (Randomized = {}));
```

> 💡 네임스페이스와 `namespace` 키워드는 원래 타입스크립트에서 `module`로 불렸다. 최신 모듈 로더와 ECMAScript 모듈의 등장을 감안할 때, 돌이켜보면 `module` 키워드 사용은 유감스러운 선택이었다. `module` 키워드는 여전히 아주 오래된 프로젝트에서 가끔 발견되지만 `namespace`로 안전하게 대체할 수 있고 대체해야만 한다.

## 4.1 네임스페이스 내보내기

네임스페이스를 유용하게 만드는 핵심 기능은 콘텐츠를 네임스페이스 객체의 멤버로 만들어 내보내는 기능이다. 이 작업 덕부에 코드의 다른 영역에서 네임스페이스 이름으로 해당 멤버를 참조할 수 있다.

아래 `Settings` 네임스페이스는 내부와 외부에서 사용되는 `descrive`, `name`, `version` 값을 네임스페이스로 내보낸다.

```tsx
namespace Settings {
  export const name = "My Application";
  export const version = "1.0.0";
  export function describe() {
    return `${name} v${version}`;
  }
  console.log("Initializing", describe());
}

console.log("Initializing", Settings.describe());
```

출력된 자바스크립트는 이런 값을 사용할 때 내부와 외부 모두에서 `Settings`의 멤버로 항상 참조됨을 보여준다. (예를 들면 `Settings.name`)

```tsx
var Settings;
(function (Settings) {
  Settings.name = "My Application";
  Settings.version = "1.0.0";
  function describe() {
    return "".concat(Settings.name, " v").concat(Settings.version);
  }
  Settings.describe = describe;
  console.log("Initializing", describe());
})(Settings || (Settings = {}));
console.log("Initializing", Settings.describe());
```

출력 객체에 `var`를 사용하고내보낸 콘텐츠를 해당 객체의 멤버로 참조하도록 하면, 네임스페이스가 여러 파일에 걸쳐 분할되어 작성되었더라도 아주 잘 작동한다. 이전 `Settings` 네임스페이스는 여러 파일에 걸쳐 다시 작성할 수 있다.

```tsx
namespace Settings {
  export const name = "My Application";
  export const version = "1.0.0";
}
```

```tsx
namespace Settings {
  export function describe() {
    return `${name} v${version}`;
  }
}
```

```tsx
console.log("Initialized", Settings.describe());
```

함께 연결된 출력 자바스크립트는 아래와 같다.

```tsx
var Settings;
(function (Settings) {
  Settings.name = "My Application";
  Settings.version = "1.0.0";
})(Settings || (Settings = {}));
```

```tsx
var Settings;
(function (Settings) {
  function describe() {
    return "".concat(name, " v").concat(version);
  }
  Settings.describe = describe;
})(Settings || (Settings = {}));
```

단일 파일과 다중 파일 선언 형식 모두 런타임에서 출력된 객체는 3개의 키가 있는 객체이다.

```tsx
const Settings = {
	describe: function describe() {
		return `${name} v${version}`;
	},
	name: "My Application";
	version: "1.0.0";
};
```

네임스페이스를 사용할 때의 주요 차이점은 서로 다른 파일로 분할될 수 있고 멤버가 네임스페이스의 이름으로 여전히 참조할 수 있다는 점이다.

## 4.2 중첩된 네임스페이스

네임스페이스는 다른 네임스페이스 내에서 네임스페이스를 내보내거나 하나 이상의 마침표(`.`)를 사용해 무한으로 중첩nested할 수 있다.

아래 두 개의 네임스페이스 선언은 동일하게 작동한다.

```tsx
namespace Root.Nested {
  export const value1 = true;
}

namespace Root {
  export namespace Nested {
    export const value2 = true;
  }
}
```

둘 다 구조적으로 동일한 코드로 컴파일 된다.

```tsx
var Root;

(function (Root) {
  var Nested;
  (function (Nested) {
    Nested.value1 = true;
  })((Nested = Root.Nested || (Root.Nested = {})));
})(Root || (Root = {}));

(function (Root) {
  var Nested;
  (function (Nested) {
    Nested.value2 = true;
  })((Nested = Root.Nested || (Root.Nested = {})));
})(Root || (Root = {}));
```

중첩된 네임스페이스는 네임스페이스로 구성된 더 큰 프로젝트의 구역들 사이에 더 자세한 설명을 적용할 수 있는 편리한 방법이다. 많은 개발자가 그들의 프로젝트 이름을 최상위 네임스페이스로 사용하고, 프로젝트의 각 주요 영역을 자식 네임스페이스로 사용한다.

## 4.3 타입 정의에서 네임스페이스

오늘날 네임스페이스를 사용하는 것에 대한 유일한 보상과 이 책에서 네임스페이스를 다루기로 선택한 유일한 이유는 네임스페이스가 `DefinitelyTyped` 타입 정의에 유용하기 때문이다. 많은 자바스크립트 라이브러리, 특히 제이쿼리와 같은 오래된 웹 애플리케이션에서 고정적으로 사용하는 라이브러리는 전통적인 `<script>` 태그를 사용해 웹 브라우저에 포함되도록 설정한다. 네임스페이스를 타이핑할 때는 모든 코드에 사용 가능한 전역 변수, 즉, 네임스페이스로 완벽하게 감싼 구조를 생성한다는 것을 나타내야 한다.

또한 많은 브라우저 지원 자바스크립트 라이브러리는 더 현대적인 모듈 시스템에 삽입되고 전역 네임스페이스를 생성하기 위해 설정된다. 타입스크립트는 모듈 타입 정의에 `export as namespace`와 그 뒤에 전역 이름을 포함하고, 해당 이름을 사용해서 모듈 전역으로 사용할 수 있음을 나타낸다.

예를 들어 모듈에 대한 아래 선언 파일은 `value`를 내보내고 전역으로 사용할 수 있다.

```tsx
export const value: number;
export as namespace libExample;
```

타입 시스템은 `import(”my-example-lib”)`와 `window.libExample` 모두 `number` 타입의 `value` 속성과 함께 모듈을 반환한다는 것을 알고 있다.

```tsx
// src/index.ts

import * as libExample from "my-example-lib";
const value = window.libExample.value;
```

## 4.4 네임스페이스보다 모듈 선호

네임스페이스를 사용하는 대신 ECAMScript 모듈을 사용해 최신 표준에 맞게 이전 예제의 `settings/constants.ts` 파일과 `settings/describe.ts` 파일을 재작성할 수 있다.

```tsx
export const name = "My Application";
export const version = "1.0.0";
```

```tsx
import { name, version } from "./constants";

export function describe() {
  return `${name} v${version}`;
}

console.log("Initializing", describe());
```

```tsx
import { describe } from "./settings/describe";

console.log("Initializing", describe());
```

네임스페이스로 구조화된 타입스크립트 코드는 웹팩과 같은 최신 빌더에서 사용하지 않는 파일을 제거하는 것이 쉽지 않다. 네임스페이스는 ECMAScript 모듈처럼 파일 간에 명시적으로 선언되는 게 아니라 암시적으로 연결을 생성하기 때문이다. 따라서 타입스크립트 네임스페이스가 아닌 ECMAScript 모듈을 사용해 런타임 코드를 작성하는 것이 훨씬 더 좋다.

> 💡 2022년 11월 기준 타입스크립트 자체는 네임스페이스로 작성되지만 타입스크립트 팀은 모듈로 마이그레이션하는 작업을 진행하였으며 컴파일러는 10~15% 더 빨라졌으며, `tsc`는 30% 더 빠르게 시작할 수 있고 npm 패키지는 43% 더 작아졌다.

# 5. 타입 전용 가져오기와 내보내기

마지막 구문 확장인 타입 전용 가져오기와 내보내기는 매우 유용하며 내보내진 자바스크립트 출력에 어떠한 복잡성도 추가하지 않는다.

타입스크립트의 트랜스파일러는 자바스크립트 런타임에서 사용되지 않으므로 파일의 가져오기와 내보내기에서 타입 시스템에서만 사용되는 값을 제거한다.

예를 들어 아래 `index.ts` 파일은 action 변수와 ActivistArea 타입을 생성한 다음, 나중에 독립형 내보내기 선언을 사용해서 두 개를 모두 내보낸다. `index.js`로 컴파일 할 때 타입스크립트의 트랜스파일러는 독립형 내보내기 선언에서 `ActicistArea`를 제거해야 함을 알고 있다.

```tsx
const action = {
  area: "people",
  name: "Bella Abzug",
  role: "politician",
};

type ActivistArea = "nature" | "people";

export { action, ActivistArea };
```

```tsx
const action = {
  area: "people",
  name: "Bella Abzug",
  role: "politician",
};

export { action };
```

`ActicistArea`와 같이 다시 내보낸 타입을 제거하려면 타입스크립트 타입 시스템에 대한 지식이 필요하다. 한 번에 하나의 파일에서 작동하는 바벨 같은 트랜스파일러는 각 일므이 타입 시스템에서만 사용되는지 여부를 알 수 있는 타입스크립트 타입 시스템에 접근할 수 없다. 13장 “구성 옵션”에서 다룬 타입스크립트의 `isolatedModules` 컴파일러 옵션은 코드가 타입스크립트가 아닌 다른 도구에서 변환되는지 확인할 때 매우 유용하다.

타입스크립트는 `export`와 `import` 선언에서 개별적으로 가져온 이름 또는 전체 `{ … }` 객체 앞에 `type` 제한자를 추가할 수 있다. 이렇게 하면 타입 시스템에서만 사용된다는 것을 나타낸다. 패키지의 기본 가져오기를 `type`으로 표시할 수 있다.

아래 코드에서 `05-2.exportImport.ts`가 출력 `05-2.exportImport.js`로 변환될 때 `value` 가져오기와 내보내기만 유지된다.

```js
import { type TypeOne, value } from "my-example-types";
import type { TypeTwo } from "my-example-types";
import type DefaultType from "my-example-types";

export { type TypeOne, value };
export type { DefaultType, TypeTwo };
```

```tsx
import { value } from "my-example-types";
export { value };
```

일부 타입스크립트 개발자는 타입으로만 사용되는 가져오기를 더 명확하게 하기 위해 타입 전용 가져오기 사용을 선호한다. 가져오기가 타입 전용으로 표시된 경우, 이를 런타임 값으로 사용하려고 하면 타입스크립트 오류가 발생한다.

아래 `ClassOne`은 정상적으로 가져오고 런타임에 사용할 수 있지만 `ClassTwo`는 타입으로 가져오기 때문에 사용할 수 없다.

```tsx
import { ClassOne, type ClassTwo } from "my-example-types";

new ClassOne();

new ClassTwo();
//  ^^^^^^^^ 'ClassTwo' cannot be used as a value because it was imported using 'import type'.
```

내보내진 자바스크립트에 복잡성을 더하는 대신, 타입 전용 가져오기와 내보내기는 코드 일부를 제거할 수 있을 때 타입스크립트 외부의 트랜스파일러에 명확하게 알린다. 따라서 대부분의 타입스크립트 개발자는 이번 장에서 다룬 구문 확장에 대한 거부감으로 인해 타입 전용 가져오기와 내보내기를 잘 사용하지 않는다.
