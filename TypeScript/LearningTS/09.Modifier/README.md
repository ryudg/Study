# 1. `top` 타입

4장 객체에서 가능한 값이 없고, 접근 불가능한 타입을 설명하기 위해 `bottom` 개념을 언급한 적이 있다. 당연히 그 반대의 개념도 존재한다.

`top` 타입은 시스템에서 가능한 모든 값을 나타내는 타입이다. 모든 다른 타입의 값은 타입이 `top`인 위치에 제공될 수 있다. 즉, 모든 타입은 `top` 타입에 할당할 수 있다.

## 1.1 `any` 다시 보기

`any` 타입은 모든 타입의 위치에 제공될 수 있다는 점에서 `top` 타입처럼 작동할 수 있다. `any`는 일반적으로 `console.log`의 매개변수와 같이 모든 타입의 데이터를 받아들이는 위치에서 사용한다.

```tsx
let anyValue: any;
anyValue = 123;
anyValue = "abc";

console.log(anyValue);
```

다만 `any`는 타입스크립트가 해당 값에 대한 할당 가능성 또는 멤버에 타입 검사를 수행하지 않도록 명시적으로 지시한다는 문제점을 갖는다. 이러한 안정성 부족은 타입스크립트의 타입 검사기를 빠르게 건너뛰려고 할 때 유용하지만, 타입 검사를 비활성화 하면 해당 값에 대한 타입스크립트의 유용성이 줄어든다.

어떤 값이든 될 수 있음을 나타내려면 `unknown` 타입이 훨씬 안전하다.

## 1.2 `unknown`

타입스크립트에서 `unknown` 타입은 진정한 top 타입이다. 모든 객체를 `unknown` 타입의 위치로 전달할 수 있다는 점에서 `any` 타입과 유사하다. `unknown` 타입과 `any` 타입의 주요 차이점으로는 타입스크립트는 `unknown` 타입의 값을 훨씬 더 제한적으로 취급한다는 점이다.

- 타입스크립트는 `unknown` 타입 값의 속성에 직접 접근할 수 없다.
- `unknown` 타입은 `top` 타입이 아닌 타입에는 할당할 수 없다.

아래 코드처럼 `unknown` 타입 값의 속성에 접근하려고 시도하면 타입스크립트는 타입 오류를 보고한다.

```tsx
function greetComedian(name: unknown) {
  console.log(`Announcing ${name.toUpperCase()}`);
  //                        ^^^^ 'name' is of type 'unknown'.
}
```

타입스크립트가 `unknown` 타입인 `name`에 접근할 수 있는 유일한 방법은 `instanceof`나 `typeof` 또는 타입 어서션을 사용하는 것처럼 값의 타입이 제한된 경우다.

아래 코드는 `unknown`에서 `string`으로 타입을 좁히기 위해 `typeof`를 사용한다.

```tsx
function greetComedianSafety(name: unknown) {
  if (typeof name === "string") {
    // => name의 타입은 unknown이지만
    console.log(`Announcing ${name.toUpperCase()}`); // => string으로 내로잉된다.
  } else {
    console.log("Well, I'm off.");
  }
}

greetComedianSafety("Amy Schumer"); // Announcing AMY SCHUMER
greetComedianSafety(123); // Well, I'm off.
```

앞서 이야기한 `unknown` 타입 값의 두 가지 제한으로 인해 `unknown`이 `any`보다 훨씬 안전한 타입으로 사용된다. 가능하다면 `any` 대신 `unknown`을 사용하자.

# 2. 타입 서술어

`instanceof`, `typeof`와 같은 자바스크립트 구문을 사용해 타입을 좁히는 방법을 살펴보았다.

제한된 검사로 이 방법을 직접 사용할 때는 괜찮지만, 로직을 함수로 감싸면 타입을 좁힐 수 없게 된다.

예를 들어 아래 `isNumberOrString` 함수는 `value`를 받고 그 값이 `number` 또는 `string`인지 나타내는 `boolean` 값을 반환한다. `isNumberOrString(value)`가 `true`를 반환하므로 `if` 문 내부의 값이 두 가지 타입 중 하나여야 한다고 유추할 수 있지만 타입스크립트는 그렇지 않다. 타입스크립트는 `isNumberOrString`이 `boolean` 값을 반환한다는 사실만 알 수 있고, 인수의 타입을 좁히기 위함이라는 건 알 수 없다.

```tsx
function isNumberOrString(value: string) {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    //                   ^^^^^ Argument of type 'string | number | null | undefined' is not assignable to parameter of type 'string'.
    //                         Type 'undefined' is not assignable to type 'string'.
    value.toString();
    //^^^^^ 'value' is possibly 'null' or 'undefined'.
  } else {
    console.log("Value does not exist:", value);
  }
}
```

타입스크립트에는 인순가 특정 타입인지 여부를 나타내기 위해 `boolean` 값을 반환하는 함수를 위한 특별한 구문이 있다. 이를 “**타입 서술어type predicate”**라고 부르며 ‘사용자 정의 타입 가드user-defined type guard’라고도 부른다. 타입 서술어는 일반적으로 매개변수로 전달된 인수가 매개변수의 타입보다 더 구체적인 타입인지 여부를 나타내는 데 사용된다.

타입 서술어의 반환 타입은 매개변수의 이름, `is` 키워드, 특정 타입으로 선언할 수 있다.

```tsx
function typePredicate(input: WideType): input is NarrowType;
```

이전 코드의 `isNumberOrString` 함수에서 `value`를 `value is number | string`으로 명시적으로 변경하면 명시적 반환 타입을 가질 수 있다. 그러면 타입스크립트는 `value`가 `number | string`인 경우 코드 블록은 `number | string` 타입의 값을 가져야 한다고 추론한다.

반면에 `value`가 `number | string`이 아닌 경우의 코드 블록은 `null | undefined` 타입의 값을 가져야 한다.

```tsx
function isNumberOrString(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    value.toString(); // value의 타입은 number | string
  } else {
    console.log("Value does not exist:", value); // value의 타입은 null | undefined
  }
}
```

타입 서술어는 단순히 `boolean` 값을 반환하는 것이 아니라 인수가 더 구체적인 타입임을 나타내는 것이라고 생각할 수 있다.

타입 서술어는 이미 한 인터페이스의 인스턴스로 알려진 객체가 더 구체적인 인터페이스의 인스턴스인지 여부를 검사하는 데 자주 사용된다.

아래 `StandupComedian` 인터페이스는 `Comedian` 인터페이스 위에 추가 정보를 갖는다. `isStandupComedian` 타입 가드는 `Comedain`이 구체적으로 `StandupComedian`인지 여부를 확인한느데 사용 된다.

```tsx
interface Comedian {
  funny: boolean;
}

interface StandupComedian extends Comedian {
  routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
  return "routine" in value;
}

function workWithComedian(value: Comedian) {
  if (isStandupComedian(value)) {
    console.log(value.routine); // value의 타입은 StandupComedian
  }

  console.log(value.routine); // value의 타입은 Comedian
  //                ^^^^^^^ Property 'routine' does not exist on type 'Comedian'.
}
```

타입 서술어는 `false` 조건에서 타입을 좁히기 때문에 타입 서술어가 입력된 타입 이상을 검사하는 경우 예상치 못한 결과를 얻을 수 있음을 주의하자.

아래 `isLongString` 타입 서술어는 `input` 매개변수가 `undefined` 또는 길이가 `7`보다 작은 `string`인 경우 `false`를 반환한다. 결과적으로 `else` 문(`false` 조건)은 `text`를 `undefined` 타입으로 좁힌다.

```tsx
function isLongString(input: string | undefined): input is string {
  return !!input && input.length > 7;
}

function workWithText(text: string | undefined) {
  if (isLongString(text)) {
    console.log("Logn text:", text.length); // text의 타입은 string
  } else {
    console.log("Short text:", text?.length); // text의 타입은 undefined
    //                              ^^^^^^ Property 'length' does not exist on type 'never'.
  }
}
```

하지만 타입 서술어는 속성이나 값의 타입을 확인하는 것 이상을 수행해 잘못 사용하기 쉬으므로 가능하면 피하는 것이 좋다. 대부분은 간단한 타입 서술어만으로도 충분하다.

# 3. 타입 연산자

키워드나 기존 타입의 이름만 사용해 모든 타입을 나타낼 수는 없다. 떄로는 기존 타입의 속성 일부를 변환해서 두 타입을 결합하는 새로운 타입을 생성해야 할 때도 있다.

## 3.1 `keyof`

자바스크립트 객체는 (반드시 그렇지는 않지만) 일반적으로 `string` 타입인 동적값을 사용하여 검색된 멤버를 갖는다. 타입 시스템에서 이러한 키를 표현하려면 상당히 까다로울 수 있다. `string` 같은 포괄적인 원시 타입을 사용하면 컨테이너 값에 대해 유효하지 않은 키가 허용된다.

엄격한 구성 설정을 사용할 때 타입스크립트는 아래 예제에서 볼 수 있는 것과 같은 ratings[key]에 대한 오류를 보고한다. 타입 string은 Ratings 인터페이스에서 속성으로 허용되지 않는 값을 허용하고, Ratings는 string 키를 허용하는 인덱스 시그니처를 선언하지 않는다.

```tsx
interface Ratings {
  audience: number;
  critics: number;
}

function getRating(ratings: Ratings, key: string): number {
  return ratings[key];
  //     ^^^^^^^^^^^^ Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Ratings'.
  //                  No index signature with a parameter of type 'string' was found on type 'Ratings'.
}

const ratings: Ratings = {
  audience: 95,
  critics: 98,
};

getRating(ratings, "audience");
getRating(ratings, "critics");

getRating(ratings, "not valid"); // 허용되지만 사용하면 안됨
```

또 다른 옵션은 허용되는 키를 위한 리터럴 유니언 타입을 사용하는 것이다. 이 경우 컨테이너 값에 존재하는 키만 적절하게 제한하는 것이 더 정확하다.

```tsx
interface Ratings {
  audience: number;
  critics: number;
}

function getRating(ratings: Ratings, key: "audience" | "critics"): number {
  return ratings[key];
}

const ratings: Ratings = {
  audience: 95,
  critics: 98,
};

getRating(ratings, "audience");
getRating(ratings, "critics");

getRating(ratings, "not valid");
//                 ^^^^^^^^^^^ Argument of type '"not valid"' is not assignable to parameter of type '"audience" | "critics"'.
```

그러나 인터페이스에 수십 개 이상의 멤버가 있다면 어떻게 될까? 각 멤버의 키를 유니언 타입에 모두 입력하고 최신 상태를 유지해야 하는 상당히 번거로운 작업이 필요하다.

대신 타입스크립트에서는 기존에 존재하는 타입을 사용하고, 해당 타입에 허용되는 모든 키의 조합을 반환하는 `keyof` 연산자를 제공한다. 타입 애너테이션처럼 타입을 사용하는 모든 곳에서 타입 이름 앞에 `keyof` 연산자를 배치한다.

아래 `keyof Ratings`는 `"audience" | "critics"`과 동일하지만, 작성하는 것이 훨씬 빠르고 `Ratings` 인터페이스가 변경되더라도 수동으로 업데이트할 필요가 없다.

```tsx
interface Ratings {
  audience: number;
  critics: number;
}

function getCountKeyof(ratings: Ratings, key: keyof Ratings) {
  return ratings[key];
}

const ratings: Ratings = {
  audience: 95,
  critics: 98,
};

getCountKeyof(ratings, "audience");
getCountKeyof(ratings, "critics");

getCountKeyof(ratings, "not valid");
//                     ^^^^^^^^^^^ Argument of type '"not valid"' is not assignable to parameter of type 'keyof Ratings'.
```

`keyof`는 존재하는 타입의 키를 바탕으로 유니언 타입을 생성하는 훌륭한 기능이다.

## 3.2 `typeof`

타입스크립트에서 제공하는 또 다른 타입 연산자는 `typeof`이다. `typeof`는 제공되는 값의 타입을 반환한다. `typeof`는 값의 타입을 수동으로 작성하는 것이 복잡한 경우에 사용하면 매우 유용하다.

아래 `adaptation` 변수는 `original`과 동일한 타입으로 선언되었다.

```tsx
const original = {
  medium: "movie",
  title: "Mean Girls",
};

let adaptation: typeof original;

if (Math.random() > 0.5) {
  adaptation = {
    ...original,
    medium: "play",
  };
} else {
  adaptation = {
    ...original,
    medium: 2,
    //^^^^^^ Type 'number' is not assignable to type 'string'.
  };
}
```

`typeof` 타입 연산자는 시각적으로 주어진 값이 어떤 타입인지를 반환할 때 사용하는 런타임 `typeof` 연산자처럼 보이지만 이 둘은 차이가 있다. 둘은 단지 우연히 같은 단어를 사용할 뿐이다. 자바스크립트의 `typeof` 연산자는 타입에 대한 문자열 이름을 반환하는 런타임 연산자다. 타입스크립트의 `typeof` 연산자는 타입스크립트에서만 사용할 수 있으며 컴파일된 자바스크립트 코드에는 나타나지 않는다.

### 3.2.1 `keyof` `typeof`

`typeof`는 값의 타입을 검색하고, `keyof`는 타입에 허용된 키를 검색한다.
타입스크립트는 두 키워드를 함께 연결해 값의 타입에 허용된 키를 간결하게 검색할 수 있다. 두 키워드를 함께 사용하면 `typeof` 타입 연산자를 `keyof` 타입 연산자와 함께 작업할 때 유용하다.

아래 예제에서 `logRating` 함수는 `ratings` 값의 키 중 하나를 받는다. 코드는 인터페이스를 생성하는 것 대신
`keyof typeof`를 사용해 키가 `ratings` 값 타입의 키 중 하나여야함을 나타낸다.

```tsx
const ratings = {
  imdb: 8.4,
  metacritic: 82,
};

function logRating(key: keyof typeof ratings) {
  console.log(ratings[key]);
}

logRating("imdb");
logRating("metacritic");

logRating("invalid");
//        ^^^^^^^^^ Argument of type '"invalid"' is not assignable to parameter of type '"imdb" | "metacritic"'.
```

`keyof`와 `typeof`를 결합해서 사용하면 명시적 인터페이스 타입이 없는 객체에 허영된 키를 나타내는 타입에 대한 코드를 작성하고 업데이트하는 수고를 줄일 수 있다.

# 4. 타입 어서션

타입스크립트는 코드가 강력하게 **“타입화strongly typed”**될 때 가장 잘 작동한다. 즉, 코드의 모든 값이 정확히 알려진 타입을 가지는 경우다. 타입스크립트의 타입 검사기가 복잡한 코드를 이해할 수 있도록 `top` 타입과 타입 가드 같은 기능을 제공한다. 그러나 경우에 따라서는 코드가 어떻게 작동하는지 타입 시스템에 100% 정확하게 알리는 것이 불가능할 때도 있다.

예를 들어 `JSON.parse`는 의도적으로 `top` 타입인 `any`를 반환한다. `JSON.parse`에 주어진 특정 문자열값이 특정한 값 타입을 반환해야 한다는 것을 타입 시스템에 안전하게 알릴 수 있는 방법은 없다. 반환 타입에 대해 한 번만 사용되는 제네릭 타입을 추가하는 것은 제네릭의 황금률The Golen Rule of Generics로 알려진 모범 사례를 위반하는 것이다.

타입스크립트는 값의 타입에 대한 타입 시스템의 이해를 재정의하기 위한 구문으로 **“타입 어서션type assertion”**(타입 캐스트type cast라고도 부른다.)을 제공한다. 다른 타입을 의미하는 값의 타입 다음에 `as` 키워드를 배치한다. 타입 시스템은 어서션을 따르고 값을 해당 타입으로 처리한다.

아래 코드에서 `JSON.parse`로부터 반환된 결과는 `string[]`, `[string, string]`, `["grace", "frankie"]` 같은 타입이 될 수 있다. 세 줄의 코드에서 타입 어서션을 사용해 `any`인 타입을 셋 중 하나로 전환한다.

```tsx
const rawData = '["grace", "frankie"]';

const result1 = JSON.parse(rawData); // 타입은 any

const result2 = JSON.parse(rawData) as string[]; // 타입은 string[]

const result3 = JSON.parse(rawData) as [string, string]; // 타입은 [string, string]

const result4 = JSON.parse(rawData) as ["grace", "frankie"]; // 타입은 ["grace", "frankie"]
```

타입 어서션은 타입스크립트 타입 시스템에만 존재하며 자바스크립트로 컴파일될 때 다른 타입 시스템 구문과 함께 제거된다. 위 코드를 자바스크립트로 컴파일 하면 결과는 아래와 같다.

```tsx
var rawData = '["grace", "frankie"]';
var result1 = JSON.parse(rawData);
var result2 = JSON.parse(rawData);
var result3 = JSON.parse(rawData);
var result4 = JSON.parse(rawData);
```

> 💡 `item as type` 대신 `<type>item` 같은 캐스팅 구문을 볼 수 있는데, 이 구문은 JSX와 호환되지 않고 `.tsx` 파일에서도 작동하지 않기 때문에 권장하지 않는다.

타입스크립트 모범 사례는 가능한 한 타입 어서션을 사용하지 않는 것이다. 코드가 완전히 타입화되고 어서션을 사용해 타입스크립트의 타입 이해를 방해할 필요가 없는 것이 가장 좋다. 그러나 타입 어서션이 유용하고 심지어 필요한 경우가 종종있다.

## 4.1 포착된 오류 타입 어서션

오류를 처리할 때 타입 어서션이 매우 유용할 수 있다. `try` 블록의 코드가 예상과 다른 객체를 예기치 않게 발생할 수 있기 때문에 `catch` 블록에서 포착된 오류가 어떤 타입인지 아는 것은 일반적으로 불가능하다. 게다가 자바스크립트의 모범 사례는 항상 `Error` 클래스의 인스턴스를 발생시키지만, 일부 프로젝트에서는 문자열 리터럴 또는 다른 의외의 값을 발생시키기도 한다.

코드 영영이 `Error` 클래스의 인스턴스를 발생시킬 거라 틀림없이 확신한다면 타입 어서션을 사용해 포착된 어서션을 오류로 처리할 수 있다. 아래 코드에서 `Error` 클래스의 인스턴스라고 가정된 `error`의 `message` 속성에 접근한다.

```tsx
try {
  // 오류를 발생시키는 코드
} catch (error) {
  console.log("Error!!!", (error as Error).message);
}
```

발생된 오류가 예상된 오류 타입인지를 확인하기 위해 `instanceof` 검사와 같은 타입 내로잉을 사용하는 것이 더 안전하다. 아래 코드는 `catch` 블록에 발생한 `error`가 `Error` 클래스의 인스턴스인지를 검사해 콘솔에 `Error`의 `message`를 출력할지 `error` 자체를 출력할지 여부를 확인한다.

```tsx
try {
  // 오류를 발생시키는 코드
} catch (error) {
  console.log("Error!!!", error instanceof Error ? error.message : error);
}
```

## 4.2 non-null 어서션

타입 어서션이 유용한 경우를 하나 더 살펴보자면, 실제로는 아니고 이론적으로만 `null` 또는 `undefined`를 포함할 수 있는 변수에서 `null`과 `undefined`를 제거할 때 타입 어서션을 주로 사용한다. 타입스크립트에서는 너무 흔한 상황이라 이와 관련된 약어를 제공한다. `null`과 `undefined`를 제외한 값의 전체 타입을 작성하는 대신 `!`를 사용하면 된다. 즉, **non-null** 어서션은 타입이 `null`과 `undefined`가 아니라고 간주한다.

아래 두 가지 타입 어서션은 둘 다 `Date | undefined`가 아니고 `Date`가 된다는 점에서 동일하다.

```tsx
// 타입은 Date | undefined
let maybeDate = Math.random() > 0.5 ? undefined : new Date();

maybeDate as Date; // 타입은 Date

maybeDate!; // 타입은 Date
```

non-null 어서션은 값을 반환하거나 존재하지 않는 경우 `undefined`를 반환하는 `Map.get`과 같은 API에서 특히 유용하다.

아래 `seasonCounts`는 일반적인 `Map<string, number>`이다. `seasonCounts`는 `“I love Lucy"` 키를 포함하고 있으므로 `knownValue` 변수는 `!`를 사용해 해당 타입에서 `| undefined`를 제거할 수 있다.

```tsx
const seasonCounts = new Map([
  ["I love Lucy", 6.6],
  ["The Golden Girls", 7.7],
]);

const maybeValue = seasonCounts.get("I love Lucy"); // 타입은 number | undefined
console.log(maybeValue.toFixed(1));
//          ^^^^^^^^^^               'maybeValue' is possibly 'undefined'.

const knownValue = seasonCounts.get("I love Lucy")**!**; // 타입은 number
console.log(knownValue.toFixed(1));
```

## 4.3 타입 어서션 주의 사항

`any` 타입과 마찬가지로 타입 어서션은 타입스크립트의 타입 시스템에 필요한 하나의 도피 수단이다. 따라서 `any` 타입을 사용할 때처럼 꼭 필요한 경우가 아니라면 가능한 한 사용하지 말아야 한다. 값의 타입에 대해 더 쉽게 어서션하는 것보다 코드를 나타내는 더 정확한 타입을 갖는 것이 좋다. 또한 이러한 어서션은 종종 잘못되기도 한다. 작성 당시 이미 잘못되었거나 코드베이스가 변경됨에 따라 나중에 달라지기도 한다.

예를 들어 `seasonCounts` 코드에서 `Map`이 시간이 지남에 따라 다른 값을 갖도록 변경된다고 가정해 보자. non-null 어서션은 여전히 코드가 타입스크립트 타입 검사를 통과하도록 만들지만 런타임 오류가 발생한다.

```tsx
const seasonCounts = new Map([
  ["**I love John**", 6.6],
  ["The Golden Girls", 7.7],
]);

const knownValue = seasonCounts.get("I love Lucy")!; // 타입은 number

console.log(knownValue.toFixed(1)); // 타입 오류는 아니지만, 런타임 오류가 발생한다.
```

타입 어서션은 자주 사용하면 안되고, 사용하는 것이 안전하다고 확실히 확신할 때만 사용해야 한다.

### 4.3.1 어서션 vs 선언

변수 타입을 선언하기 위해 타입 애너테이션을 사용하는 것과 초깃값으로 변수 타입을 변경하기 위해 타입 어서션을 사용하는 것 사이에는 차이가 있다. 변수의 타입 애너테이션과 초깃값이 모두 있을 때, 타입스크립트의 타입 검사기는 변수의 타입 애너테이션에 대한 변수의 초깃값에 대해 할당 가능성 검사를 수행한다. 그러나 타입 어서션은 타입스크립트에 타입 검사 중 일부를 건너뛰도록 명시적으로 지시한다.

아래 `acts` 멤버가 없는 동일한 결함을 가지며, 타입이 `Entertainer`인 객체 두 개를 생성하는 코드이다. 타입스크립트는 `Entertainer` 타입 애너테이션으로 인해 `declared` 변수에서 오류를 잡을 수 있다. 하지만 타입 어서션 때문에 `asserted` 변수에 대해서는 오류를 잡을 수 없다.

```tsx
interface Entertainer {
  acts: string[];
  name: string;
}

const declared: Entertainer = {
  //  ^^^^^^^^ Property 'acts' is missing in type '{ name: string; }' but required in type 'Entertainer'.
  name: "Moms Mabley",
};

const asserted = {
  name: "Moms Mabley",
} as Entertainer; // 허용되지만 런타임 시 오류 발생
```

따라서 타입 애너테이션을 사용하거나 타입스크립트가 초깃값에서 변수의 타입을 유추하도록 하는 것이 매우 바람직하다.

### 4.3.2 어서션 할당 가능성

타입 어서션은 일부 값의 타입이 약간 잘못된 상황에서 필요한 작은 도피 수단일 뿐이다. 타입스크립트는 타입 중 하나가 다른 타입에 할당 가능한 경우에만 두 타입 간의 타입 어서션을 허용한다. 완전히 서로 관련이 없는 두 타입 사이에 타입 어서션이 있는 경우에는 타입스크립트가 타입 오류를 감지하고 알려준다.

예를 들어 원시 타입은 서로 관련이 전혀 없으므로 하나의 원시 타입에서 다른 원시 타입으로 전환하는 것은 허용되지 않는다.

```tsx
let myValue = "Stella!" as number;
//            ^^^^^^^^^^^^^^^^^^^ Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

하나의 타입에서 값을 완전히 관련 없는 타입으로 전환해야 하는 경우 **“이중 타입 어서션double type assertion”** 을 사용한다. 먼저 값을 **any**나 **unknown** 같은 **top** 타입으로 전환한 다음, 그 결과를 관련 없는 타입으로 전환한다.

```tsx
// 9.Modifier/05-8.assertion.ts

// 생략...

let myValueDouble = "1337" as unknown as number;
```

`as unknown as ...` 이중 타입 어서션은 위험하고 거의 항상 코드의 타입이 잘못되었다는 징후를 나타낸다. 타입 시스템의 도피 수단으로 이중 타입 어서션을 사용하면, 주변 코드를 변경해서 이전에 작동하던 코드에 문제가 발생할 경우, 타입 시스템이 구해주지 못할 수 있음을 의미한다. 이중 타입 어서션 사용을 권장하기 위함이 아니라 타입 시스템 설명을 돕기 위한 사전 예방 차원에서 이 장을 알아 보았다.

# 5. `const` 어서션

`const` 어서션은 배열, 원시 타입, 별칭 등 모든 값을 상수로 취급해야 함을 나타내는 데 사용한다. 특히 `as const`는 수신하는 모든 타입에 아래 세 가지 규칙을 적용한다.

- 배열은 가변 배열이 아니라 읽기 전용 튜플로 취급된다.
- 리터럴은 일반적인 원시 타입과 동등하지 않고 리터럴로 취급된다.
- 객체의 속성은 읽기 전용을 간주된다.

아래 배열이 튜플로 간주되는 것처럼 배열이 튜플이 되는 것을 보았다.

```tsx
[0, ""]; // 타입은 (number | string)[]

[0, ""] as const; // 타입은 readonly [0, ""]
```

`as const`가 생성하는 다른 두 가지 변경 사항을 알아보자

## 5.1 리터럴에서 원시 타입으로

타입 시스템이 리터럴 값을 일바적인 원시 타입으로 확장하기보다 특정 리터럴로 이해하는 것이 유용할 수 있다.

예를 들어 튜플을 반환하는 함수처럼 일반적인 원시 타입 대신 특정 리터럴을 생산한다고 알려진 함수에서 유용할 수 있다. 아래 함수는 좀 더 구체적으로 만들 수 있는 값을 반환한다. 여기에서 `getNameConst`의 반환 타입은 일반적인 `string` 대신 `“Maria Bamford”`라는 더 구체적인 값이다.

```tsx
const getName = () => "Maria Bamford"; // 타입은 () => string

const getNameConst = () => "Maria Bamford" as const; // 타입은 () => "Maria Bamford"
```

값의 특정 필드가 더 구체적인 리터럴 값을 갖도록 하는 것도 유용하다. 많은 인기 있는 라이브러리는 값의 판별 필드가 특정 리터럴이 되도록 요구한다. 따라서 해당 코드의 타입이 값을 더 구체적으로 추론할 수 있다.

아래 `narrowJoke` 변수는 `string` 대신 `“one-liner”`를 `style` 값으로 가지므로 `Joke` 타입이 필요한 위치에 제공될 수 있다.

```tsx
interface Joke {
  quote: string;
  style: "story" | "one-liner";
}

function tellJoke(joke: Joke) {
  if (joke.style === "one-liner") {
    console.log(joke.quote);
  } else {
    console.log(joke.quote.split("\n"));
  }
}

// 타입은 { quote: string; style: "one-liner"; }
const narrowJoke = {
  quote: "If you stay alive for no other reason do it for spite.",
  style: "one-liner" as const,
};
tellJoke(narrowJoke);

// 타입은 { quote: string; style: string; }
const wideObject = {
  quote: "Time flies when you are anxious!",
  style: "one-liner",
};

tellJoke(wideObject);
//       ^^^^^^^^^^ Argument of type '{ quote: string; style: string; }' is not assignable to parameter of type 'Joke'.
//                  Types of property 'style' are incompatible.
//                  Type 'string' is not assignable to type '"story" | "one-liner"'.
```

## 5.2 읽기 전용 객체

변수의 초깃값으로 사용되는 것과 같은 객체 리터럴은 `let` 변수의 초깃값이 확장되는 것과 동일한 방식으로 속성 타입을 확장한다. `apple` 같은 문자열 값은 `string`과 같은 원시 타입이 되고, 배열은 튜플이 아닌 `array` 타입이 된다. 하지만 이러한 값의 일부 또는 전체를 나중에 특정 리터럴 타입이 필요한 위치에서 사용해야 할 때 잘 맞지 않을 수 있다.

그러나 `as const`를 사용해 값 리터럴을 어서션하면 유추된 타입이 가능한 한 구체적으로 전환된다. 모든 멤버 속성은 `readonly`가 되고, 리터럴은 일반적인 원시 타입 대신 고유한 리터럴 타입으로 간주되며, 배열은 읽기 전용 튜플이 된다. 즉, 값 리터럴에 `const` 어서션을 적용하면 해당 값 리터럴이 변경되지 않고 모든 멤버에 동일한 `const` 어서션 로직이 재귀적으로 적용된다.

예를 들어 아래 `preferenceMutable` 값은 `as const` 없이 선언되었으므로 이름은 원시 타입인 `string`이 되고 수정이 허용된다. 그러나 `preferenceRadonly`는 `as const`로 선언되었으므로 해당 멤버 값은 리터럴이고 수정이 허용되지 않는다.

```tsx
function describePreference(preference: "maybe" | "no" | "yes") {
  switch (preference) {
    case "maybe":
      return "I suppose...";
    case "no":
      return "No thanks...";
    case "yes":
      return "Yes please!!";
  }
}

// 타입은 { movie: string; standup: string; }
const preferencesMutable = {
  movie: "maybe",
  standup: "yes",
};

describePreference(preferencesMutable.movie);
//                 ^^^^^^^^^^^^^^^^^^^^^^^^ Argument of type 'string' is not assignable to parameter of type '"maybe" | "no" | "yes"'.

preferencesMutable.movie = "no";

const preferencesReadOnly = {
  movie: "maybe",
  standup: "yes",
} as const;

describePreference(preferencesReadOnly.movie);

preferencesReadOnly.movie = "no";
//                  ^^^^^ Cannot assign to 'movie' because it is a read-only property.
```
