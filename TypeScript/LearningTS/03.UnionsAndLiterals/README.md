# 0. 들어가기

## 0.1 [원시 타입](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#%EC%9B%90%EC%8B%9C-%ED%83%80%EC%9E%85--string-number-%EA%B7%B8%EB%A6%AC%EA%B3%A0-boolean)

JavaScript에서 가장 흔하게 사용되는 세 가지 원시 타입은 `string`, `number`, `boolean`이다.
이외에 (`null`, `undefined`, `symbol`, `bigint`)4가지 원시타입이 있다.

이외에 타입스크립트에서만 사용할 수 있는 `unknown`, `void`, literal, union, `any`, enum, tuple …

> `String`, `Number`, `Boolean`와 같은 (대문자로 시작하는) 타입은 유효한 타입이지만, 코드상에서 이러한 특수 내장 타입을 사용하는 경우는 극히 드물다.
> 항상 `string`, `number`, `boolean` 타입을 사용!!!

## 0.2 [any](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#any)

TypeScript는 7가지 원시 타입 이외에 `any`라고 불리는 특별한 타입을 가지고 있으며,
특정 값으로 인하여 타입 검사 오류가 발생하는 것을 원하지 않을 때 사용할 수 있다.

어떤 값의 타입이 `any`이면, 해당 값에 대하여 임의의 속성에 접근할 수 있고(이때 반환되는 값의 타입도 `any`),
함수인 것처럼 호출할 수 있고, 다른 임의 타입의 값에 할당하거나(받거나), 그 밖에도 구문적으로 유효한 것이라면 무엇이든 할 수 있다.

## 0.3 [noImplicitAny](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#noimplicitany)

타입이 지정되지 않은 값에 대하여 TypeScript가 문맥으로부터 그 타입을 추론해낼 수 없다면, 컴파일러는 `any` 타입을 부여하는 것이 기본 동작이다.

하지만 이런 상황은 보통 선호되지 않는데, **`any`는 타입 검사가 이루어지지 않기 때문**이다.
컴파일러 플래그 `noImplicitAny`를 사용하면 암묵적으로 `any`로 간주하는 모든 경우에 오류를 발생시킨다.

## 0.4 [변수에 대한 타입 표기](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#%EB%B3%80%EC%88%98%EC%97%90-%EB%8C%80%ED%95%9C-%ED%83%80%EC%9E%85-%ED%91%9C%EA%B8%B0)

`const`, `var`, 또는 `let` 등을 사용하여 변수를 선언할 때,
변수의 타입을 명시적으로 지정하기 위하여 타입 표기를 추가할 수 있으며 이는 선택 사항이다.

```ts
let myName: string = "Alice";
```

하지만 대부분의 경우, 타입 표기는 필요하지 않다. 가능하다면 TypeScript는 자동으로 코드 내의 있는 타입들을 추론하고자 시도한다.

# 1. 유니언 타입

```ts
let mathematician = Math.random() > 0.5 ? undefined : "Kim";
```

둘 다 모두 잠재적인 타입이자만 무조건 `undefined`이거나 혹은 무조건 `string`인 것은 아니다.
`mathematician`은`undefined`이거나 `string`일 수도 있다.

“이거 혹은 저거”와 같은 타입을 **“유니언union”** 이라고 한다.
유니언 타입은 값이 정확히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나인 것을 알고 있는 경우에 코드를 처리하는 개념이다. 조합에 사용된 각 타입을 유니언 타입의 *멤버*라고 부른다.

타입스크립트는 가능한 값 또는 구성 요소 사이에 `|` (버티컬 바) 파이프 연산자를 사용해 유니언 타입을 나타낸다. 앞에 나온 `mathematician`은 `undefined | string` 타입으로 간주된다.

## 1.1 유니언 타입 선언

변수의 초기값이 있더라도 변수에 대한 명시적 타입 애너테이션을 제공하는 것이 유용할 때 유니언 타입을 사용한다.

아래 예제에서 `thinker`의 초기값은 `null`이지만 잠재적으로 `null` 대신 `string`이 될 수 있음을 알려준다. 명시적으로 `string | null` 타입 애너테이션은 타입스크립트가 `thinker`의 값으로 `string` 타입의 값을 할당할 수 있음을 의미한다.

```ts
let thinker: string | null = null;

if (Math.random() > 0.5) {
  thinker = "Kim";
}
```

## 1.2 유니언 속성

값이 유니언 타입일 때 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다. 유니언 외의 타입에 접근하려고 하면 타입 검사 오류가 발생한다.

`number | string`라는 유니언 타입의 경우, `string` 타입에만 유효한 메서드는 사용할 수 없고,
유니언 타입의 **모든 멤버**에 대하여 유효한 작업일 때에만 허용된다는 의미이다.

모든 유니언 타입에 존재하지 않는 속성에 대한 접근을 제한하는 것은 안전 조치에 해당한다.
객체가 어떤 속성을 포함한 타입으로 확실하게 알려지지 않은 경우, 타입스크립트는 해당 속성을 사용하려고 시도하는 것이 안전하지 않다고 여긴다. 그런 속성이 존재 하지 않을 수도 있기 때문이다.

이를 해결하기 위해서는 **유니언을 좁혀**야 하는데 이는 타입 표기가 없는 자바스크립트에서 벌어지는 일과 동일하다. 좁히기란 TypeScript가 코드 구조를 바탕으로 어떤 값을 보다 구체적인 타입으로 추론할 수 있을 때 발생한다.

> 유니언은 의미상 합집합을 뜻하는데, 실제로는 유니언 타입이 프로퍼티들의 교집합을 가리키는 것처럼 보여 헷갈리게 느낄 수 있다. 유니언이라는 명칭은 타입 이론에서 비롯된 것이다.
>
> number | string 유니언 타입은 각각의 타입을 가지는 값들에 대하여 합집합을 취하여 구성된다.
> 두 집합과 각각의 집합에 대한 특성이 주어졌을 때, 두 집합의 유니언에는 각각의 특성들의 교집합만이 적용된다.
>
> 예를 들어, 한 방에는 모자를 쓰고 키가 큰 사람들이 있고 다른 방에는 모자를 쓰고 스페인어를 사용하는 사람들이 있다고 가정하자. 이때 두 방을 합친다면, 모든 사람들에 대하여 우리가 알 수 있는 사실은 바로 누구나 반드시 모자를 쓰고 있다는 것이다.

# 2. 내로잉 Narrowing (타입 좁히기)

내로잉은 값이 정의, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것이다.
타입스크립트가 값의 타입이 이전에 알려진 것보다 더 좁혀졌다는 것을 알게 되면 값을 더 구체적인 타입으로 취급한다. 타입을 좁히는 데 사용할 수 있는 논리적 검사를 **타입 가드**라고 한다.

아래는 타입스크립트가 코드에서 타입을 좁히는데 흔히 사용하는 타입 가드들이다.

## 2.1 Assignment narrowing (할당 범위 좁히기)

변수에 값을 직접 할당하면 타입스크립트는 변수의 타입을 할당된 값의 타입으로 좁힌다.

```ts
let admiral: number | string;

admiral = "Grace Hopper";

admiral.toUpperCase(); // OK

admiral.toFixed();
//      ^^^^^^^ Property 'toFixed' does not exist on type 'string'.
```

변수에 유니언 타입 애너테이션이 명시되고 초깃값이 주어질 때 할당 내로잉이 작동한다.
타입스크립트는 변수가 나중에 유니언 타입으로 선언된 타입 중 하나의 값을 받을 수 있지만, 처음에는 초기에 할당된 값의 타입으로 시작한다.

## 2.2 Condition checking narrowing (조건문을 통해 범위 좁히기)

일반적으로 타입스크립트에서는 변수가 알려진 값과 같은지 확인하는 `if` 문을 통해 변수의 값을 좁히는 방법을 사용한다. 타입스크립트는 `if` 문 내에서 변수가 알려진 값과 동일한 타입인지 확인한다.

```ts
// scientist: number | string 타입
let scientist = Math.random() > 0.5 ? "Newton" : 100;

if (scientist === "Newton") {
  // scientist: "Newton" 타입
  // 해당 조건문 안에서는 scientist의 값이 반드시 "Newton"이어야 한다.
  scientist.toUpperCase(); // OK
}

// scientist: number | string 타입
scientist.toUpperCase();
//        ^^^^^^^^^^^^ Property 'toUpperCase' does not exist on type 'string | number'.
//                     Property 'toUpperCase' does not exist on type 'number'.
```

## 2.3 `typeof` narrowing (typeof 연산자를 통한 범위 좁히기)

타입스크립트는 직접 값을 확인해 타입을 좁히기도 하지만, `typeof` 연산자를 사용할 수도 있다.

위의 예제와 유사하게 아래 `if` 문에서 `typeof researcher`가 `string`인지 확인해 타입스크립트에 `researcher`의 타입이 `string`임을 나태난다.

```ts
let reasearcher = Math.random() > 0.5 ? "Newton" : 100;

if (typeof reasearcher === "string") {
  reasearcher.toUpperCase(); // OK
}
```

> null의 typeof 반환값은 object 이다. 그렇기 때문에 null 값을 판별할 다른 방법이 필요하다.
>
> ```ts
> function printAll(strs: string | string[] | null) {
>   if (typeof strs === "object") {
>     for (const s of strs) {
>       //            ^^^^ 'strs' is possibly 'null'.
>       console.log(s);
>     }
>   } else if (typeof strs === "string") {
>     console.log(strs);
>   }
> }
> ```

## 2.4 Truthiness narrowing (진실성 좁히기)

위에서 언급한 `null` 값 등을 축소할 수 있는 좋은 방법은 조건문에서 `&&` , `||`, `!` 등을 사용하거나 파라미터 자체의 참, 거짓을 판별하는 것이다.

즉, JavaScript의 조건문에서 `falsy` 값들은 `fasle`로 반환되기 때문에 타입 축소에 활용할 수 있다.

- `0`
- `NaN`
- `""` (빈문자열)
- `0n`(`bigint` 제로 버전)
- `null`
- `undefined`

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

## 2.5 Equality narrowing

어떤한 연산을 하기 전에 두 값이 같은 지(with strict equality)를 통해서 비교한다.
`===` (=일치연산자)으로 암묵적 형변환 없이 완전히 동일한(타입과 값 모두 같은) 값을 판별하여 축소할 수도 있으며,
`!==`, `==`, `!=` 를 사용하여 타입을 축소할 수 있다. 조건문이 아니라 스위치문을 사용하는 것도 좋다.

```ts
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 'x'또는 'y'에서 '문자열' 메서드를 호출 할 수 있다.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}
```

### 2.5.1 Looser Equality

특수한 경우, 타입 검사에서 느슨한 타입 검사가 필요할 수 있다.

```ts
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // 'null'과 'undefined'를 모두 제거
  if (container.value != null) {
    console.log(container.value);

    container.value *= factor;
  }
}
```

## 2.6 The [`in`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/in) operator narrowing (in 연산자를 통한 타입 좁히기)

JavaScript에서의 `in`은 이터러블 객체에서 어떤한 속성이 있는지 없는지를 판단하는 연산자이다. 이를 이용해서도 타입 축소를 할 수 있다.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

## 2.7 [`instanceof`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/instanceof) narrowing ( `instanceOf` 연산자를 통한 타입 좁히기)

JavaScript에서는 값이 다른 값의 `instance` 인지를 판단하는 `instanceof` 라는 연산자가 있다. 
`x instanceof Date` 는 `Date` 라는 프로토타입 체인 안에 `x`라는 `instance`가 있나 확인하는 것이다.

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

const today = new Date("2023-10-06");

logValue(today);
logValue("hello world");
```

## 2.8 Control flow analysis (제어 흐름 분석하기)

유니온 타입으로 선언된 변수는 조건문과 반복문들을 거치면서 중간중간 타입이 바뀌기도 하고, 특정 타입으로는 다시 돌아가지 않기도 한다. 제어 흐름에 따라 타입스크립트는 그때 그때의 타입을 추론하여 알려준다.

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

## 2.9 Using type predicates

지금까지 축소를 처리하기 위해 기존 JavaScript 구문을 사용하여 작업했지만 때로는 코드 전체에서 유형이 변경되는 방식을 보다 직접적으로 제어하고 싶을 때가 있다. 즉, 타입을 축소할 때 타입스크립트의 타입 예측을 사용할 수 있다는 것.

타입 예측은 `is` 키워드를 사용할 수 있다. 일반적으로 `true`, `false`를 반환하는 `Fish`임을 확인하는 함수가 있다. 이 함수를 통해 `true`가 나온다면 `pet`은 `Fish`였음이 자명하다. 이때 `is`를 통해 `pet`을 `Fish`로 예측 가능하게 명시하는 것이다.

```ts
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getSmallPet(): Fish | Bird {
  return {} as Fish | Bird;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

## 2.10 Discriminated unions(Taged Union)

지금까지 살펴본 대부분의 예제는 `string` , `boolean` 및 `number` 와 같은 간단한 유형으로 단일 변수를 좁히는 데 중점을 두었다 . 이것이 일반적이지만 자바스크립트에서 대부분의 경우 복잡한 구조를 다룬다.

원 또는 사각형의 모양을 나타내는 `interface`가 있다고 하자.
이는 둘중 어느 것일지 모르니 반지름과 길이 둘다 있을수도, 없을 수도 있다고 정의했다.

```ts
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  //               ^^^^^^^^^^^^ 'shape.radius' is possibly 'undefined'.
}
```

오류를 피하기 위해 아래와 같이 작성해보자.
하지만 여전히 오류가 나는데, `kind`가 `circle`이여도 여전히 `radius`는 선언되어 있을수도 있고 없을수도 있는 속성이기 때문이다.

```ts
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
    //               ^^^^^^^^^^^^ 'shape.radius' is possibly 'undefined'.
  }
}
```

그렇다면, 원일때는 반드시 반지름이 있다고, 아래 처럼 `!`를 써서 `radius`가 반드시 있으니까 타입스크립트에게 오류를 뿜지 말아달라고 할 수도 있다.

> **`!`** non-null assertion operator로, 해당 변수가 null 또는 undefined가 아님을 명시적으로 나타냄

하지만, 실제로 `shape.radius`가 `null` 또는 `undefined`일 경우 런타임 에러가 발생할 수 있다…

```tsx
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}
```

모든 문제를 해결하기 위해 타입을 정의하는 것 자체를 수정해보자.
아래처럼 특정 모양이 필수적으로 가져야 하는 속성을 분리하여 원과 사각형을 분리한다. 그리고 두 타입의 유니온 타입을 `type` 으로 선언해준다.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

즉, `Shape` 라는 타입은 공통적으로 `kind` 라는 속성을 가지고, 각각 고유의 필수적인 속성도 가지게 되었다.

```tsx
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  //                     Property 'radius' does not exist on type 'Shape'.
  //                     Property 'radius' does not exist on type 'Square'.
}
```

여전히 위 코드는 `shape`이 사각형일수도 있으니 오류를 보여주지만, 그 내용이 보다 정확하다.

## 2.11 Never & Exhaustiveness checking

절대 나오지 않을 경우를 정의할 수 있다. 혹시 모를 상황에 대비하여 마지막 안전 장치를 하나 더하는 셈이다.

`Shape` 는 원 또는 사각형이기 때문에 `default` 에 들어갈 일은 없다. 하지만 만에 하나 혹시 모를 상황에서 아무것도 남지 않은 지점까지 옵션을 줄일 수 있다. 절대 안나올 타입이라는 의미이다.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

# 3. 리터럴 타입

리터럴 타입은 좀 더 구체적인 버전의 원시 타입이다.

```ts
const philosoper = "Hypatia";
```

`philosoper`는 단순한 `string` 타입이 아닌 **`“Hypatia”`** 라는 특별한 값이다. 따라서 변수 `philosoper`의 타입은 좀 더 구체적인 `"Hypatia"`인 것이다.

이것이 리터럴 타입의 개념이다. 원시 타입 값 중 어떤 것이 아닌 **특정 원싯값**으로 알려진 타입이 리터럴 타입.
원시 타입 `string`은 존재할 수 있는 모든 가능한 문자열의 집합을 나타낸다. 하지만 리터럴 타입인 `"Hypatia"`는 하나의 문자열만 나타낸다.

각 원시 타입은 해당 타입이 가질 수 있는 가능한 모든 리터럴 값의 전체 조합으로 생각할 수 있다.
즉, 원시 타입은 해당 타입의 가능한 모든 리터럴 값의 집합이다.

`boolean`, `null`, `undefined` 타입 외에 `number`, `string`과 같은 모든 원시 타입에는 무한한 수의 리터럴 타입이 있다. 일반적인 타입스크립트 코드에서 발견할 수 있는 타입은 아래와 같다.

- `boolean` : `true | false`
- `null`과 `undefined` : 둘 다 자기 자신. 즉, 오직 하나의 리터럴만 가짐
- `number` : `0 | 1 | 2 ... | 0.1 | 0.2 | ...`
- `string` : `“” | "a" | ...`

## 3.1 리터럴 할당 가능성

`number`와 `string`과 같은 서로 다른 원시 타입이 서로 할당되지 못한다.
마찬가지로 `0`과 `1`처럼 동일한 원시 타입일지라도 서로 다른 리터럴 타입은 서로 할당할 수 없다.

```ts
let specificallyAda: "Ada";

specificallyAda = "Ada";

specificallyAda = "Grace";
// ^^^^^^^^^^^^^^^ Type '"Grace"' is not assignable to type '"Ada"'.

let someString = "";

specificallyAda = someString;
// ^^^^^^^^^^^^^^^ Type 'string' is not assignable to type '"Ada"'.
```

그러나 리터럴 타입은 그 값이 해당하는 원시 타입에 할당할 수 있다. 모든 특정 리터럴 문자열은 여전히 `string`이기 때문이다.

단순한 변수 할당이 타입 추론에 의해 강력한 기능을 가지게 된 것이다.

```tsx
// let somthing: string과 같은 의미
let something = "";

something = "Hello"; // ok

// something = 123; // error
```

# 4. 엄격한 `null` 검사

리터럴로 좁혀진 유니언의 힘은 타입스크립트에서 **“엄격한 `null` 검사strict null checking”** 라 부르는 타입 시스템 영역인 “잠재적으로 정의되지 않은 `undefined` 값”으로 작업할 때 특히 두드러진다.

타입스크립트는 “십억 달러의 실수”를 바로잡기 위해 엄격한 `null` 검사를 사용하며 이는 최신 프로그래밍 언어의 큰 변화 중 하나이다.

## 4.1 [십억 달러의 실수](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)

> `null`의 개념을 최초로 만들어 낸 [Tony Hoare](http://en.wikipedia.org/wiki/Tony_Hoare)는
> ”저는 이를 십억 달러의 실수라고 부릅니다. 1965년, `null` 참초의 발명으로 수많은 오류, 취약성 및 시스템 충돌이 발생했으며 지난 40년 동안 십억 달러의 고통과 피해을 입었을 것입니다.” 라고 이야기를 했다.

즉, 변수에 들어갈 값이 없는 상황을 좀 쉽게 해결하자는 마음에 `null` 참조를 허용했는데 이 때문에 수십 년 동안 일어난 문제가 십억 달러 수준으로 손해가 될 만큼 엄청나다는 것을 뜻하는 말이다.

“십억 달러의 실수”는 다른 타입이 필요한 위치에서 `null` 값을 사용하도록 허용하는 많은 타입시스템을 가리키는 프로그래밍 용어이다.
엄격한 `null` 검사가 없는 언어에서는 `string` 타입 변수에 `null`을 허용하는 것이 허용된다.
하지만, `null`을 허용하지 않는 언어에서는 `string` 타입 변수에 `null`을 할당하는 것이 허용되지 않는다.

```ts
let nameMaybe = Math.random() < 0.5 ? "John" : undefined;

nameMaybe.toLowerCase();
// ^^^^^^ 'nameMaybe' is possibly 'undefined'.
```

`strictNullChecks`는 엄격한 null 검사를 활성화하지 여부를 결정한다.

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es6",
    // "strict": true
    "strictNullChecks": true
  }
}
```

## 4.2 Non-null assertion operator

자바스크립트를 포함한 대부분 프로그래밍 언어에서 느낌표`!` 는 주로 부정을 의미하는 연산자로 사용된다.

하지만 타입스크립트에서 변수 앞이 아닌, **뒤에** 느낌표를 사용하면 다른 용도로 사용할 수 있는데, 피연산자가 **Nullish**(null이나 undefined) 값이 아님을 단언할 수 있다.

이를 Null이 아닌 단언 연산자(Non-null assertion operator) 또는 확정 할당 어선셜(Definite Assignment Assertions) 이라고도 부른다. Null이 아닌 어선셜 연산자는 피연산자가 null이 아니라고 컴파일러에게 전달하여 일시적으로 Null 제약조건을 완화시킨다.

```tsx

let myString: string | undefined = undefined;
let stringLength: number = myString**!**.length; // Non-null assertion operator 사용

// let stringLength: number = myString.length; // Non-null assertion operator 사용하지 않았을 때
//                            ^^^^^^^^ 'myString' is possibly 'undefined'.
```

## 4.3 참 검사를 통한 내로잉

자바스크립트에서 **참** 또는 **truthy**는 `&&` 연산자 또는 `if` 문처럼 `boolean` 문맥에서 `trune`로 간주된다.

`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`처럼 **falsy**로 정의된 값을 제외한 모든 값은 참이다.

타입스크립트는 잠재적인 값 중 truthy로 확인된 일부에 한해서만 변수의 타입을 좁힐 수 있다.

```ts
let geneticist = Math.random() > 0.5 ? "Gregor Mendel" : undefined;

if (geneticist) {
  geneticist.toUpperCase();
}
geneticist.toUpperCase();
// ^^^^^^^^^^ 'geneticist' is possibly 'undefined'.

geneticist && geneticist.toUpperCase(); // string | undefined
geneticist?.toUpperCase(); // string | undefined
```

`geneticist`는 `string | undefined` 타입이며 `undefined`는 항상 falsy이므로 타입스크립트는 `if` 문의 코드 블록에서는 `geneticist`가 `string` 타입이 되어야 한다고 추론할 수 있다.

논리 연산자 `&&`와 옵셔널 체이닝 연산자 `?`는 참 여부를 검사하는 일을 수행한다. 하지만 참 여부 확인 이외에 다른 기능은 제공하지 않는다. `string | undefined` 값에 대해 알고 있는 것이 flasy라면, 그것이 빈 문자열인지 `undefined`인지 알 수 없다는 이야기다.

## 4.4 초깃값이 없는 변수

자바스크립트에서 초기값이 없는 변수는 기본적으로 `undefined`가 된다.
타입스크립트는 값이 할당될 때까지 변수가 `undefined`임을 이해할 만큼 똑똑하다.
따라서 값이 할당되기 전에 속성 중 하나에 접근하려는 것처럼 해당 변수를 사용하려고 시도하면 아래처럼 오류가 발생한다.

```ts
let mathematician: string;

mathematician?.length;
// ^^^^^^^^^^^ Variable 'mathematician' is used before being assigned.

mathematician = "Mark Goldberg";
mathematician.length; // OK
```

변수 타입에 `undefined`가 포함되어 있는 경우에는 오류가 발생하지 않는다. `undefined`는 유효한 타입이기 때문에 사용 전에는 정의할 필요가 없음을 타입스크립트에 나타낸다.

```tsx
let mathematician: string | undefined;

mathematician?.length; // OK
```

# 5. 타입 별칭

코드에서 볼 수 있는 유니언 타입 대부분은 두세 개의 구성 요소만 갖는다. 그러나 가끔 반복해서 입력하기 불편한 긴 형태의 유니언 타입을 발견할 수 있다.

```tsx
let rawDataFist: boolean | number | string | null | undefined;
let rawDataSecond: boolean | number | string | null | undefined;
let rawDataThird: boolean | number | string | null | undefined;
```

타입스크립트에는 재사용하는 타입에 더 쉬운 이름을 할당하는 **타입 별칭type alias**가 있다.

타입 별칭은 `**type 새로운 이름 = 타입`\*\* 형태를 갖는다. 보통 타입 별칭은 파스칼 케이스(=첫 글자와 중간 글자들이 대문자)로 작성한다.

타입 별칭은 타입 시스템의 “복사해서 붙여넣기”처럼 작동한다. 타입스크립트가 타입 별칭을 발견하면 해당 별칭이 참조하는 실제 타입을 입력한 것처럼 작동한다.

```tsx
type RawData = boolean | number | string | null | undefined;

let rawDataFist: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;
```

## 5.1 타입 별칭은 자바스크립트가 아니다.

타입 별칭은 타입 애너테이션처럼 자바스크립트로 컴파일 되지 않는다. 순전히 타입스크립트 타입 시스템 내에서만 존재한다.

위 의 코드를 컴파일하면 아래와 같은 결과물로 컴파일 된다.

```bash
❯ tsc 3.UnionsAndLiterals/05-2.alias.ts --target es6
```

```js
let rawDataFist;
let rawDataSecond;
let rawDataThird;
```

타입 별칭은 순전히 타입 시스템에만 존재하므로 런타임 코드에서는 참조할 수 없다.
타입스크립트는 런타임에 존재하지 않는 항목에 접근하려고 하면 타입 오류로 알려준다.

```tsx
type SomeType = string | null | undefined;

console.log(SomeType);
//          ^^^^^^^^ 'SomeType' only refers to a type, but is being used as a value here.
```

즉, 타입 별칭은 “개발 시”에만 존재한다.

## 5.2 타입 별칭 결합

타입 별칭은 다른 타입 별칭을 참조할 수 있다. 유니언 타입인 타입 별칭 내에 또 다른 유니언 타입인 타입 별칭을 포함하고 있다면 다른 타입 별칭을 참조하는 것이 유용하다.

```ts
type Id = number | string;

// IdMaybe 타입은 Id 타입에 null과 undefined를 추가한 타입이다.
type IdMaybe = Id | null | undefined;
```
