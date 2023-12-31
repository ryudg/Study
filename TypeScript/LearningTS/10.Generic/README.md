자바스크립트에서 아래 `identity` 함수는 모든 가능한 타입으로 `input`을 받고, 동일한 `input`을 출력으로 반환한다. 그렇다면 여기서 매개변수 타입과 반환 타입을 어떻게 설명해야 할까?

```tsx
function identity(input) {
  return input;
}

identity(1);
identity("1");
identity(true);
identity(null);
identity(undefined);
identity({ quote: "I think your self emerges more clearly through time." });
```

`input`을 `any`로 선언할 수 있지만 그렇게 되면 함수의 반환 타입 역시 `any`가 된다.

```tsx
function identity(input: any) {
  return input;
}

let value = identity("hello"); // 타입은 any
```

`input`이 모든 입력을 허용한다면, `input` 타입과 함수 반환 타입 간의 관계를 말할 수 있는 방법이 필요하다. 타입스크립트는 **제네릭generic**을 사용해 타입 간의 관계를 알아낸다.

타입스크립트에서 함수와 같은 구조체는 **제네릭 타입 매개변수**를 원하는 수만큼 선언할 수 있다. 제네릭 타입 매개변수는 제네릭 구조체의 각 사용법에 따라 타입이 결정된다. 이러한 타입 매개변수는 구조체의 각 인스턴스에서 서로 다른 일부 타입을 나타내기 위해 구조체의 타입으로 사영된다. 타입 매개변수는 구조체의 각 인스턴스에 대해 **타입 인수**라고 하는 서로 다른 타입을 함께 제공할 수 있지만, 타입 인수가 제공된 인스턴스 내에서는 일관성을 유지한다.

타입 매개변수는 전형적으로 `T`나 `U`같은 단일 문자 이름 또는 `Key`와 `Value` 같은 파스칼 케이스 이름을 갖는다. 이 장에서 다루는 모든 구조체에서는 `<`, `>`를 사용해 `someFunction<T>` 또는 `SomeInterface<T>`처럼 제네릭을 선언한다.

```tsx
function add(x: number | string, y: number | string) {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  } else if (typeof x === "string" && typeof y === "string") {
    return x.toUpperCase() + y.toUpperCase();
  }
}
const add1 = add(1, 2);
const add2 = add(1, "2");

function addGeneric<T>(x: T, y: T) {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  } else if (typeof x === "string" && typeof y === "string") {
    return x.toUpperCase() + y.toUpperCase();
  }
}
const addGeneric1 = addGeneric(1, 2);
const addGeneric2 = addGeneric(1, "2");
//                                ^^^ Argument of type 'string' is not assignable to parameter of type 'number'.
```

# 1. 제네릭 함수

매개변수 괄호 바로 앞 홑화살괄호 (`<`, `>`)로 묶인 타입 매개변수에 별칭을 배치해 함수를 제네릭으로 만든다. 그러면 해당 타입 매개변수를 함수와 본문 내부의 매개변수 타입 애너테이션, 반환 타입 애너테이션, 타입 애너테이션에서 사용할 수 있다.

아래 `identity` 함수는 `input` 매개변수에 대한 타입 매개변수 `T`를 선언한다. 이를 통해 타입스크립트는 함수의 반환 타입이 `T`임을 유추한다. 그러면 타입스크립트는 `identity`가 호출될 때마다 `T`에 대한 다른 타입을 유추할 수 있다.

```tsx
function identity<T>(input: T): T {
  return input;
}

const numeric = identity(1); // 타입은 1
const stringy = identity("hello"); // 타입은 'hello'
```

화살표 함수도 제네릭을 만들 수 있다. 화살표 함수의 제네릭 선언은 매개변수 목록 바로 전인 `(` 앞에 위치한다.

아래 화살표 함수는 앞서 선언했던 것과 기능적으로 동일한 함수 선언식이다.

```tsx
// 생략...

const identityArrow = <T,>(input: T): T => input;

const numericArrow = identityArrow(123); // 타입은 123
const stringyArrow = identityArrow("world"); // 타입은 'world'
```

> 💡 제네릭 화살표 함수 구문은 `.tsx` 파일에서 JSX 구문과 충돌하므로 일부 제한이 있다. JSX 및 리액트 지원 구성과 해결 방법에 대해서는 13장 구성 옵션에서 알아보자

이러한 방식으로 함수에 타입 매개변수를 추가하면 타입 안정성을 유지하고 `any` 타입을 피하면서 다른 입력과 함께 재사용할 수 있다.

## 1.1 명시적 제네릭 호출 타입

제네릭 함수를 호출할 때 대부분의 타입스크립트는 함수가 호출되는 방식에 따라 타입 인수를 유추한다. 예를 들어 이전 예제의 `indentity` 함수에서 타입스크립트의 타입 검사기는 `indentity`에 제공된 인수를 사용해 해당 함수 매개변수의 타입 인수를 유추한다.

하지만 클래스 멤버와 변수 타입과 마찬가지로 때로는 타입 인수를 해석하기 위해 타입스크립트에 알려줘야 하는 함수 호출 정보가 충분하지 않을 수도 있다. 이러한 현상은 타입 인수를 알 수 없는 제네릭 구문이 다른 제네릭 구문에 제공된 경우 주로 발생한다.

예를 들어 아래 `logWrapper` 함수는 매개변수 타입이 `logWrapper`의 타입 매개변수 `Input`으로 설정된 `callback`을 받는다. 이처럼 매개변수 타입이 명시적으로 선언된 `callback`과 `logWrapper`가 함께 호출되는 경우 타입스크립트는 타입 인수를 유추할 수 있다. 그러나 매개변수 타입을 모르는 경우에는 타입스크립트는 `Input`이 무엇이 되어야 하는지 알아낼 방법이 없다.

```tsx
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// 타입은 (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

// 타입은 (input: unknown) => void
logWrapper((input) => {
  console.log(input.length);
  //          ^^^^^ 'input' is of type 'unknown'.
});
```

기본값이 `unknown`으로 설정되는 것을 피하기 위해 타입스크립트에 해당 타입 인수가 무엇인지 명시적으로 알려주는 **명시적 제네릭 타입 인수**를 사용해 함수를 호출할 수 있다. 타입스크립트는 매개변수가 타입 인수로 제공된 것과 일치하는지 확인하기 위해 제네릭 호출에서 타입 검사를 수행한다.

앞서 본 `logWrapper`는 `Input` 제네릭을 위한 명시적 `string`과 함께 제공된다. 그러면 타입스크립트는 제네릭 타입 `Input`의 콜백 `input` 매개변수가 `string` 타입으로 해석된다고 유추한다.

```tsx
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// 타입은 (input: string) => void
logWrapper<string>((input) => {
  console.log(input.length);
});

logWrapper<string>((input: boolean) => {
  //               ^^^^^^^^^^^^^^^^^^^^^ Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
  //                                     Types of parameters 'input' and 'input' are incompatible.
  //                                     Type 'string' is not assignable to type 'boolean'.
});
```

변수에 대한 명시적 타입 애너테이션과 마찬가지로 명시적 타입 인수는 항상 제네릭 함수에 지정할 수 있지만 때로는 필요하지 않다. 많은 타입스크립트 개발자는 필요할 때만 명시적 타입 인수를 지정한다.

아래 `logWrapper`는 타입 인수와 함수 매개변수 타입을 모두 `string`으로 명시적으로 지정한다. 둘 중 하나는 제거할 수 있다.

```tsx
// 타입은 (input: string) => void
logWrapper<string>((input: string) => {
  // ...
});
```

타입 인수를 지정하기 위한 **`이름<Type>`** 구문은 이 장 전체에서 살펴볼 다른 제네릭 구조체에서도 동일하게 사용된다.

## 1.2 다중 함수 타입 매개변수

임의의 수의 타입 매개변수를 쉼표로 구분해 함수를 정의한다. 제네릭 함수의 각 호출은 각 타입 매개변수에 대한 자체 값 집합을 확인할 수 있다.

아래 예제에서 `makeTuple`은 두 개의 타입 매개변수를 선언하고 입력된 값을 읽기 전용 튜플로 반환한다.

```tsx
function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // 타입은 readonly [boolean, string]
```

함수가 여러 개의 타입 매개변수를 선언하면 해당 함수에 대한 호출은 명시적으로 제네릭 타입을 모두 선언하지 않거나 모두 선언해야 한다. 타입스크립트는 아직 제네릭 호출 중 일부 타입만을 유추하지는 못한다.

아래 `makePair`는 두 개의 타입 매개변수를 받으므로 두 개를 모두 명시적으로 지정하거나 지정하지 않아야한다.

```tsx
function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

makePair("abc", 123); // 타입은 { key: string, value: number }

makePair<string, number>("abc", 123); // 타입은 { key: string, value: number }
makePair<"abc", 123>("abc", 123); // 타입은 { key: "abc", value: 123 }

makePair<string>("abc", 123);
//       ^^^^^^ Expected 2 type arguments, but got 1.
```

> 💡 제네릭 구조체에서 두 개보다 많은 타입 매개변수를 사용하지 말자. 런타임 함수 매개변수처럼 많이 사용할수록 코드를 읽고 이해하는 것이 점점 어려워 진다.

# 2. 제네릭 인터페이스

인터페이스도 제네릭으로 선언할 수 있다. 인터페이스는 함수와 유사한 제네릭 규칙을 따르며 인터페이스 이름뒤 `<`과 `>`사이에 선언된 임의의 수의 타입 매개변수를 갖는다. 해당 제네릭 타입은 나중에 멤버 타입과 같이 선언의 다른 곳에서 사용할 수 있다.

아래 `Box` 선언은 속성에 대한 `T` 타입 매개변수가 있다. 타입 인수로 `Box`로 선언된 객체를 생성하면 `inside`의 `T` 속성이 해당 타입 인수와 일치된다.

```tsx
interface Box<T> {
  inside: T;
}

let stringyBox: Box<string> = {
  inside: "abc",
};

let numberBox: Box<number> = {
  inside: 123,
};

let incorrectBox: Box<number> = {
  inside: false,
  //^^^^^^ Type 'boolean' is not assignable to type 'number'.
};
```

재밌는 사실은 타입스크립트에서 내장 `Array` 메서드는 제네릭 인터페이스로 정의된다는 점이다. `Array`는 타입 매개변수 `T`를 사용해서 배열 안에 저장된 데이터의 타입을 나타낸다.

`Array`의 `pop`과 `push` 메서드를 구현하면 대략 아래와 같다.

```tsx
interface Array<T> {
  // ...

  /**
   * 배열에서 마지막 요소를 제거하고 그 요소를 반환
   * 배열이 비어 있는 경우 undefined를 반환하고 배열은 수정되지 않음
   */
  pop(): T | undefined;

  /**
   * 배열의 끝에 새로운 요소를 추가하고 배열의 길이를 반환
   * @param items 배열에 추가된 새로운 요소
   */
  push(...items: T[]): number;

  // ...
}
```

### `Array`의 `filter` 맛보기

```tsx
interface Arr<T> {
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];
}

const filtered = [1, 2, "3"].filter((item) => typeof item === "number");

const realFiltered = [1, 2, "3"].filter(
  (item: string | number): item is number => typeof item === "number"
);
```

## 2.1 유추된 제네릭 인터페이스 타입

제네릭 함수와 마찬가지로 제네릭 인터페이스의 타입 인수는 사용법에서 유추할 수 있다. 타입스크립트는 제네릭 타입을 취하는 것으로 선언된 위치에 제공된 값의 타입에서 타입 인수를 유추한다.

아래 `getLast` 함수는 타입 매개변수 `Value`를 선언한 다음 `Value`를 `node` 매개변수로 사용한다. 그러면 타입스크립트는 인수로 전달된 값의 타입에 따라 `Value`를 유추한다. 유추된 타입 인수가 값의 타입과 일치하지 않으면 타입 오류를 보고한다. `next`를 포함하지 않은 객체 또는 유추된 `Value` 타입 인수가 타입과 동일한 객체를 `getLast`에 제공하는 것은 허용된다. 그러나 제공된 객체의 값과 `next.value`가 일치하지 않으면 타입 오류가 발생한다.

```tsx
interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

// 유추된 value 타입의 인수는 Date
let lastDate = getLast({
  value: new Date("2023-10-20"),
});

// 유추된 value 타입의 인수는 string
let lastFruit = getLast({
  next: {
    value: "banana",
  },
  value: "apple",
});

let lastMismatch = getLast({
  next: {
    value: 123,
  },
  value: false,
  //^^^^^ Type 'boolean' is not assignable to type 'number'.
});
```

인터페이스가 타입 매개변수를 선언하는 경우, 해당 인터페이스를 참조하는 모든 타입 애너테이션은 이에 상응하는 타입 인수를 제공해야 한다.

아래 코드에서 `CrateLike`는 타입 인수를 포함하지 않은 채로 사용했기 때문에 올바르지 않다.

```tsx
interface CrateLike<T> {
  contents: T;
}

let missingGeneric: CrateLike = {
  //                ^^^^^^^^^ Generic type 'CrateLike<T>' requires 1 type argument(s).
  inside: "???",
};
```

# 3. 제네릭 클래스

인터페이스처럼 클래스도 나중에 멤버에서 사용할 임의의 수의 타입 매개변수를 선언할 수 있다. 클래스의 각 인스턴스는 타입 매개변수로 각자 다른 타입 인수 집합을 가진다.

아래 `Secret` 클래스는 `Key`와 `Value` 타입 매개변수를 선언한 다음 이를 멤버 속성, `constructor` 매개변수 타입, 메서드의 매개변수, 반환 타입으로 사용한다.

```tsx
class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

const storage = new Secret(12345, "luggage"); // 타입은 Secret<number, string>

const result = storage.getValue(54321); // 타입은 string | undefined
```

제네릭 인터페이스와 마찬가지로 클래스를 사용하는 타입 애너테이션은 해당 클래스의 제네릭 타입이 무엇인지를 타입스크립트에 나타내야 한다. 이 장 후반부에서 클래스의 요구 사항을 해결하기 위해 타입 매개변수에 기본 값을 제공하는 방법을 살펴보자.

## 3.1 명시적 제네릭 클래스 타입

제네릭 클래스 인스턴스화는 제네릭 함수를 호출하는 것과 동일한 타입 인수 유추 규칙을 따른다. `new Secret(12345, “luggage”)`와 같이 함수 생성자에 전달된 매개변수의 타입으로부터 타입 인수를 유추할 수 있다면 타입스크립트는 유추된 타입을 사용한다. 하지만 생성자에 전달된 인수에서 클래스 타입 인수를 유추할 수 없는 경우에는 타입 인수의 기본값은 `unknown`이 된다

아래 `CurriedCallback` 클래스는 제네릭 함수를 받는 생성자를 선언한다. 제네릭 함수가 명시적 타입 인수의 타입 애너테이션과 같은 알려진 타입을 갖는 경우라면 클래스 인스턴스의 `Input` 타입 인수는 이를 통해 타입을 알아낼 수 있다.

```tsx
class CurriedCallback<Input> {
  #callback: (input: Input) => void;

  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log("Input:", input);
      callback(input);
    };
  }
  call(input: Input) {
    this.#callback(input);
  }
}

// 타입은 CurriedCallback<string>
const resultString = new CurriedCallback((input: string) =>
  console.log(input.length)
);

// 타입은 CurriedCallback<unknown>
const resultUnknown = new CurriedCallback((input) => console.log(input.length)); // unknown
```

클래스 인스턴스는 다른 제네릭 함수 호출과 동일한 방식으로 명시적 타입 인수를 제공해서 기본값 `unknown`이 되는 것을 피할 수 있다.

아래 코드에서 `CurriedCallback`의 `Input` 타입 인수를 `string`으로 명시적으로 제공하므로 타입스크립트는 해당 콜백의 `Input` 타입 매개변수가 `string`으로 해석됨을 유추할 수 있다.

```tsx
class CurriedCallback<Input> {
  #callback: (input: Input) => void;

  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log("Input:", input);
      callback(input);
    };
  }
  call(input: Input) {
    this.#callback(input);
  }
}

// 타입은 CurriedCallback<string>
new CurriedCallback<string>((input) => {
  console.log(input.length);
});

new CurriedCallback<string>((input: boolean) => {});
//                          ^^^^^^^^^^^^^^^^^^^^^ Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
//                                                Types of parameters 'input' and 'input' are incompatible.
//                                                Type 'string' is not assignable to type 'boolean'.
```

## 3.2 제네릭 클래스 확장

제네릭 클래스는 `extends` 키워드 다음에 오는 기본 클래스로 사용할 수 있다. 타입스크립트는 사용법에서 기본 클래스에 대한 타입 인수를 유추하지 않는다. 기본 값이 없는 모든 타입 인수는 명시적 타입 애너테이션을 사용해 지정해야 한다.

아래 `SpokenQuote` 클래스는 기본 클래스 `Quote<T>`에 대한 `T` 타입 인수로 `string`을 제공한다.

```tsx
class Quote<T> {
  lines: T;

  constructor(lines: T) {
    this.lines = lines;
  }
}

class SpokenQuote extends Quote<string[]> {
  speak() {
    console.log(this.lines.join("\n`"));
  }
}

const result1 = new Quote("ABC").lines; // 타입은 string
const result2 = new Quote([1, 2, 3]).lines; // 타입은 number[]

const result3 = new SpokenQuote(["1", "2", "3"]).lines; // 타입은 string[]
const result4 = new SpokenQuote([1, 2, 3]);
//                               ^^^^^^^ Type 'number' is not assignable to type 'string'.
```

제네릭 파생 클래스는 자체 타입 인수를 기본 클래스에 번갈아 전달할 수 있다. 타입 이름은 일치하지 않아도 된다.

아래 `AttributedQuote`는 다른 이름의 `Value` 타입 인수를 기본 클래스 `Quote<T>`에 전달한다.

```tsx
class Quote<T> {
  lines: T;

  constructor(lines: T) {
    this.lines = lines;
  }
}

class AttributeQuote<Value> extends Quote<Value> {
  speaker: string;

  constructor(value: Value, speaker: string) {
    super(value);
    this.speaker = speaker;
  }
}

// 타입은 AttributeQuote<string>, Quote<string>를 확장
const result = new AttributeQuote<string>("Hello", "World");
```

## 3.3 제네릭 인터페이스 구현

제네릭 클래스는 모든 필요한 매개변수를 제공함으로써 제네릭 인터페이스를 구현한다. 제네릭 인터페이스는 제네릭 기본 클래스를 확장하는 것과 유사하게 작동한다. 기본 인터페이스의 모든 타입 매개변수는 클래스에 선언되어야 한다.

아래 `MoviePart` 클래스는 `ActingCredit` 인터페이스의 `Role` 타입 인수를 `string`으로 지정한다. `IncorrectExtension` 클래스는 `ActingCredit`에 타입 인수로 `string`을 제공함에도 불구하고 `role`이 `boolean` 타입이므로 타입 오류가 발생한다.

```tsx
interface ActingCredit<Role> {
  role: Role;
}

class MoviePart implements ActingCredit<string> {
  role: string;
  speaking: boolean;

  constructor(role: string, speaking: boolean) {
    this.role = role;
    this.speaking = speaking;
  }
}

const part = new MoviePart("Hans Gruber", true);
const partRole = part.role; // 타입은 string

class IncorrectExtension implements ActingCredit<string> {
  role: boolean;
  //^^^^ Property 'role' in type 'IncorrectExtension' is not assignable to the same property in base type 'ActingCredit<string>'.
  //     Type 'boolean' is not assignable to type 'string'.

  constructor(role: string) {
    this.role = role;
  }
}
```

## 3.4 메서드 제네릭

클래스 메서드는 클래스 인스턴스와 별개로 자체 제네릭 타입을 선언할 수 있다. 제네릭 클래스 메서드에 대한 각각의 호출은 각 타입 매개변수에 대해 다른 타입 인수를 갖는다.

아래 제네릭 `CreatePairFactory` 클래스는 `Key` 타입을 선언하고 별도의 `Value` 제네릭 타입을 선언하는 `createPair` 메서드를 포함한다. 그러면 `createPair`의 반환 타입은 `{key: Key, value: Value}`로 유추된다.

```tsx
class CreatePairFactory<Key> {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  createPair<Value>(value: Value) {
    return { key: this.key, value };
  }
}

const factory = new CreatePairFactory("role"); // 타입은 CreatePairFactory<string>

const numberPair = factory.createPair(10); // 타입은 { key: string, value: number }

const stringPair = factory.createPair("Sophie"); // 타입은 { key: string, value: string }
```

## 3.5 정적 클래스 제네릭

클래스의 정적static 멤버는 인스턴스 멤버와 구별되고 클래스의 특정 인스턴스와 연결되어 있지 않다. 클래스의 정적 멤버는 클래스 인스턴스에 접근할 수 없거나 타입 정보를 지정할 수 없다. 따라서 정적 클래스 메서드는 자체 타입 매개변수를 선언할 수 있지만 클래스에 선언된 어떤 타입 매개변수에도 접근할 수 없다.

아래 `BothLogger` 클래스는 `instanceLog` 메서드에 대한 `OnInstance` 타입 매개변수와 정적 메서드 `staticLog`에 대한 별도의 `OnStatic` 타입 매개변수를 선언한다. 클래스 인스턴스에 대해 `OnInstance`가 선언되었으므로 `static` 메서드는 `OnInstance` 인스턴스에 접근할 수 없다.

```tsx
class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log(value);
    return value;
  }

  static staticLog<OnStatic>(value: OnStatic) {
    let fromInstance: OnInstance;
    //                ^^^^^^^^^^ Static members cannot reference class type parameters.

    console.log(value);
    return value;
  }
}

// 타입은 number[]
const logger = new BothLogger<number[]>();
logger.instanceLog([1, 2, 3]);

// 유추된 OnStatic 타입 인수 boolean[]
const logger2 = BothLogger.staticLog([false, true]);

// 유추된 OnStatic 타입 인수 string
const logger3 = BothLogger.staticLog<string>("Log me");
```

# 4. 제네릭 타입 별칭

타입 인수를 사용해 제네릭을 만드는 타입스크립트의 마지막 구조체는 타입 별칭이다. 각 타입 별칭에는 `T`를 받는 `Nullish` 타입과 같은 임의의 수의 타입 매개변수가 주어진다.

```tsx
type Nullish<T> = T | null | undefined;
```

제네릭 타입 별칭은 일반적으로 제네릭 함수의 타입을 설명하는 함수와 함께 사용된다.

```tsx
type CreateValue<Input, Output> = (input: Input) => Output;

let creator: CreateValue<string, number>;

creator = (text) => text.length;

creator = (text) => text.toUpperCase();
//                  ^^^^^^^^^^^^^^^^^^ Type 'string' is not assignable to type 'number'.
```

## 4.1 제네릭 판별된 유니언

판별된 유니언 사용법 중 가장 좋은 용도는 데이터의 성공적인 결과 또는 오류로 인한 실패를 나타내는 제네릭 “결과” 타입을 만들기 위해 타입 인수를 추가하는 것이다.

아래 `Result` 제네릭 타입은 성공 또는 실패 여부에 대한 결과를 좁히는 데(내로잉) 사용하는 `succeeded` 판별자를 포함한다. 즉, `Result`를 반환하는 모든 작업은 오류 또는 데이터 결과를 나타내며 이를 사용하는 곳에서는 `result`의 `succeeded`가 `true`인지 `false`인지 여부를 확인해야 한다.

```tsx
interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessResult<Data> {
  data: Data;
  succeeded: true;
}

type Result<Data> = FailureResult | SuccessResult<Data>;

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    console.log(`We did it! ${result.data}`); // result의 타입은 SuccessResult<string>
  } else {
    console.error(`Oh no! ${result.error}`); // result의 타입은 FailureResult
  }

  result.data;
  //     ^^^^ Property 'data' does not exist on type 'Result<string>'.
  //          Property 'data' does not exist on type 'FailureResult'.
}
```

제네릭 타입과 판별된 타입을 함께 사용하면 `Result`와 같은 재사용 가능한 타입을 모델링하는 훌륭한 방법을 제공할 수 있다.

# 5. 제네릭 제한자

타입스크립트는 제네릭 타입 매개변수의 동작을 수정하는 구문도 제공한다.

## 5.1 제네릭 기본값

지금까지 제네릭 타입이 타입 애너테이션에 사용되거나 `extends` 또는 `implements의` 기본 클래스로 사용되는 경우 각 타입 매개변수에 대한 타입 인수를 제공해야 한다고 이야기했다. 타입 매개변수 선언 뒤에 `=`와 기본 타입을 배치해 타입 인수를 명시적으로 제공할 수 있다. 기본값은 타입 인수가 명시적으로 선언되지 않고 유출할 수 없는 모든 후속 타입에 사용된다.

아래 `Quote` 인터페이스는 값이 제공되지 않는 경우 기본값이 `string`인 `T` 타입 매개변수를 받는다. `explicit` 변수는 명시적으로 `T`를 `number`로 설정하는 반면 `implicit`와 `mismatch`의 `T`는 `string`이 된다.

```tsx
interface Quote<T = string> {
  value: T;
}

let explicit: Quote<number> = { value: 123 };

let implicit: Quote = { value: "implicit" };

let mismatch: Quote = { value: 123 };
//                      ^^^^^ Type 'number' is not assignable to type 'string'.
```

타입 매개변수는 동일한 선언 안의 앞선 타입 매개변수를 기본값으로 가질 수 있다. 각 타입 매개변수는 선언에 대한 새로운 타입을 도입하므로 해당 선언 이후 타입 매개변수에 대한 기본값으로 이를 사용할 수 있다.

아래 KeyValuePair 타입은 Key와 Value 제네릭에 대해 다른 타입을 가질 수 있지만 기본적으로 동일한 타입을 유지한다. 그러나 Key는 기본값이 없기 때문에 여전히 유추 가능하거나 제공되어야 한다.

```tsx
interface KeyValuePairs<Key, Value = Key> {
  key: Key;
  value: Value;
}

// 타입은 KeyValuePairs<string, number>
let allExplicit: KeyValuePairs<string, number> = {
  key: "rating",
  value: 10,
};

// 타입은 KeyValuePairs<string>
let oneEfaulting: KeyValuePairs<string> = {
  key: "rating",
  value: "ten",
};

let firstMissing: KeyValuePairs = {
  //              ^^^^^^^^^^^^^ Generic type 'KeyValuePairs<Key, Value>' requires between 1 and 2 type arguments.
  key: "rating",
  value: 10,
};
```

모든 기본 타입 매개변수는 기본 함수 매개변수처럼 선언 목록의 제일 마지막에 와야한다. 기본값이 없는 제네릭 타입은 기본값이 있는 제네릭 타입 뒤에 오면 안된다.

아래 `inTheEnd`는 기본값이 없는 모든 제네릭 타입이 기본값이 있는 제네릭 타입 앞에 있으므로 허용된다. 하지만 `inTheMiddile`은 기본값이 없는 제네릭 타입이 기본값이 있는 타입 다음에 있기 때문에 문제가 발생한다.

```tsx
function inTheEnd<First, Second, Third = number, Fourth = string>() {}

function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {}
//                                                            ^^^^^^ Required type parameters may not follow optional type parameters.
```

# 6. 제한된 제네릭 타입

기본적으로 제네릭 타입에는 클래스, 인터페이스, 원싯값, 유니언, 별칭 등 모든 타입을 제공할 수 있다. 그러나 일부 함수는 제한된 타입에서만 작동해야 한다.

타입스크립트는 타입 매개변수가 타입을확장해야 한다고 선언할 수 있으며 별칭 타입에만 허용되는 작업이다. 타입 매개변수를 제한하는 구문은 매개변수 이름 뒤에 `extends` 키워드를 배치하고 그 뒤에 이를 제한할 타입을 배치한다.

예를 들어 `length: number`를 가진 모든 것을 설명하기 위해 `WithLength` 인터페이스를 생성하면 제네릭 함수가 `T` 제레닉에 대한 `lenght`를 가진 모든 타입을 받아들이도록 구현할 수 있다. 문자열, 배열 그리고 `length: number`를 가진 객체는 허용되지만, `Date`와 같은 타입 형태에는 `length` 멤버가 없으므로 타입 오류가 발생한다.

```tsx
interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}

logWithLength("No one figure out your worth but you."); // 타입은 string
logWithLength([1, 2, 3]); // 타입은 number[]
logWithLength({ length: 10 }); // 타입은 { length: number }

logWithLength(new Date());
//            ^^^^^^^^^^ Argument of type 'Date' is not assignable to parameter of type 'WithLength'.
//                       Property 'length' is missing in type 'Date' but required in type 'WithLength'.
```

## 6.1 `keyof`와 제한된 타입 매개변수

`extends와` `keyof`를 함께 사용하면 타입 매개변수를 이전 타입 매개변수의 키로 제한할 수 있다. 또한 제네릭 타입의 키를 지정하는 유일한 방법이기도 한다.

아래 코드는 인기 있는 라이브러리인 Lodash의 `get` 메서드의 간단한 버전이다. `T`로 입력된 `container` 값과 `container`에서 검색할 수 있는 `T`의 `key` 중 하나의 `key` 이름을 받는다. `key` 타입 매개변수는 `keyof T`로 제한되기 때문에 타입스크립트는 이 함수가 `T[key]`를 반환할 수 있음을 알고 있다.

```tsx
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "True Lies"],
};

const favorite = get(roles, "favorite"); // 타입은 string
const others = get(roles, "others"); // 타입은 string[]

const missing = get(roles, "missing");
//                         ^^^^^^^^^ Argument of type '"missing"' is not assignable to parameter of type '"favorite" | "others"'.
```

`keyof`가 없었다면 제네릭 `key` 매개변수를 올바르게 입력할 방법이 없었을 것이다.

이전 코드에서 `Key` 타입 매개변수의 중요성에 주목해보자. 타입 매개변수로 `T`만 제공되고 `key` 매개변수가 모든 `keyof T`일 수 있는 경우라면 반환 타입은 `Container`에 있는 모든 속성 값에 대한 유니언 타입이 된다. 이렇게 구체적이지 않은 함수 선언은 각 호출이 타입 인수를 통해 특정 `key`를 가질 수 있음을 타입스크립트에 나타낼 수 있다.

```tsx
function get<T>(container: T, key: keyof T) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "True Lies"],
};

const found = get(roles, "favorite"); // 타입은 string | string[]
```

제네릭 함수를 작성할 때 매개변수의 타입이 이전 매개변수 타입에 따라 달라지는 경우르 알아야한다. 이러한 경우 올바른 매개변수 타입을 위해 제한된 타입 매개변수를 자주 사용하게 된다.

# 7. `Promise`

제네릭이 어떻게 작동하는지 살펴봤으니 드디어 최신 자바스크립트의 핵심 기능인 Promise를 이야기할 수 있다.

간단히 말하자면 자바스크립트의 `Promise`는 네트워크 요청과 같이 요청 이후 결과를 받기까지 대기가 필요한 것을 나타낸다. 각 `Promise`는 대기 중인 작업이 `‘resolve(성공적으로 완료)’` 또는 `‘reject(오류 발생)’`하는 경우 콜백을 등록하기 위한 메서드를 제공한다.

임의의 값 타입에 대해 유사한 작업을 나타내는 `Promise`의 기능은 타입스크립트의 제네릭과 자연스럽게 융합된다. `Promise`는 타입스크립트 타입 시스템에서 최종적으로 `resolve`된 값을 나타내는 단일 타입 매개변수를 가진 `Promise` 클래스로 표현된다.

## 7.1 `Promise` 생성

타입스크립트에서 `Promise` 생성자는 단일 매개변수를 받도록 작성된다. 해당 매개변수의 타입은 제네릭 `Promise` 클래스에 선언된 타입 매개변수에 의존한다. 축소된 형식은 대략 아래와 같다.

```tsx


class PromiseLike<Value> {
  constructor(
    executor: (
      resolve: (value: Value) => void,
      reject: (reason: unknown) => void
    ) => void
  ) { ... }
}
```

결과적으로 값을 resolve하려는 Promise를 만들려면 Promise의 타입 인수를 명시적으로 선언해야 한다. 타입스크립트는 명시적 제네릭 타입 인수가 없다면 기본적으로 매개변수 타입을 unknown으로 가정한다. Promise 생성자에 타입 인수를 명시적으로 제공하면 타입스크립트가 결과로서 생기는 Promise 인스턴스의 resolve된 타입을 이해할 수 있다.

```tsx
// 타입은 Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입은 Promise<string>
const resolveString = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});
```

`Promise`의 제네릭 `.then` 메서드는 반횐되는 `Promise`의 `resolve`된 값을 나타내는 새로운 타입 매개변수를 받는다.

예를들어 아래 코드는 1초 후에 `string`을 `resolve`하는 `textEventually`와 `number`를 `resolve`하기 위해 1초를 더 기다리는 `lengthEventually`를 생성한다.

```tsx
// 타입은 Promise<string>
const textEventually = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입은 Promise<number>
const lengthEventually = textEventually.then((text) => text.length);
```

## 7.1 `async` 함수

자바스크립트에서 `async` 키워드를 사용해 선언한 모든 함수는 `Promise`를 반환한다. 자바스크립트에서 `async` 함수에 따라서 반환값이 `Thenable`(`.then()` 메서드가 있는 객체, 실제로는 거의 항상 `Promise`)이 아닌 경우, `Promise.resolve`가 호츨된 것처럼 `Promise`로 래핑wrapping된다.

아래 `lengthAfterSecond`는 `Promise<number>`를 직접적으로 반환하는 반면 `lengthImmediately`는 `async` 함수이고, 직접 `number`를 반환하기 때문에 `Promise<number>`를 반환하는 것으로 간주된다.

```tsx
// 타입은 (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}

// 타입은 (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length;
}
```

그러므로 `Promise`를 명시적으로 언급하지 않더라도 `async` 함수에서 수동으로 선언된 반환 타입은 항상 `Promise` 타입이 된다.

```tsx
async function givesPromiseForString(): Promise<string> {
  return "Hello";
}

async function givesString(): string {
  //                          ^^^^^^ The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<string>'?
  return "Hello";
}
```

# 8. 제네릭 올바르게 사용하기

이 앞에서 살펴본 `Promise<Value>` 구현처럼 제네릭은 코드에서 타입을 설명하는 데 많은 유연성을 제공할 수 있지만, 코드가 빠르게 복잡해질 수 있다. 타입스크립트를 처음 접한 개발자는 이따금 제네릭을 과도하게 사용해 읽기 혼란스럽고 지나치게 복잡한 코드를 만들기도 한다. 타입스크립트의 모범 사례는 필요할 때만 제네릭을 사용하고, 제네릭을 사용할 때는 무엇을 위해 사용하는지 명확히 해야 한다.

> 💡 타입스크립트로 작성하는 대부분의 코드에서는 혼동을 일으킬 정도로 제네릭을 많이 사용해서는 안된다. 그러나 유틸리티 라이브러리에 대한 타입, 특히 범용 모듈은 경우에 따라 제네릭을 많이 사용할 수도 있다. 제네릭을 이해하면 이러한 유틸리티 타입을 효과적으로 사용할 수 있다.

## 8.1 제네릭 황금률

함수에 타입 매개변수가 필요한지 여부를 판단할 수 있는 간단하고 빠른 방법은 타입 매개변수가 최소 두 번 이상 사용되었는지 확인하는 것이다. 제네릭은 타입 간의 관계를 설명하므로 제네릭 타입 매개변수가 한 곳에만 나타나면 여러 타입 간의 관계를 정의할 수 없다. 따라서 각 함수 타입 매개변수는 매개변수에 사용되어야 하고, 그 다음 적어도 하나의 다른 매개변수 또는 함수의 반환 타입에서도 사용되야 한다.

예를 들어 아래 `logInput` 함수는 `input` 매개변수를 선언하기 위해 `Input` 타입 매개변수를 정확히 한 번 사용한다.

```tsx
function logInput<Input extends string>(input: Input) {
  console.log("Hello, wolrd", input);
}
```

이 장의 앞 부분에서 살펴본 `identify` 함수와 달리 `logInput`은 타입 매개변수로 더 많은 매개변수를 반환하거나 선언하는 작업을 하지 않는다. 따라서 `Input` 타입 매개변수를 선언하는 것은 별로 쓸모 없다.

아래와 같이 `Input` 타입 매개변수를 사용하지 않고 `logInput`을 다시 작성할 수 있다.

```tsx
function logInput(input: string) {
  console.log("Hello, wolrd", input);
}
```

## 8.2 제네릭 명명 규칙

타입스크립트를 포함한 많은 언어가 지키는 타입 매개변수에 대한 표준 명명 규칙naming convention은 기본적으로 첫 번째 타입 인수로 `T`를 사용하고, 후속 타입 매개변수가 존재하면 `U`, `V` 등을 사용하는 것이다.

타입 인수가 어떻게 사용되어야 하는지 맥락과 관련된 정보가 알려진 경우 명명 규칙은 경우에 따라 해당 용어의 첫 글자를 사용하는 것으로 확장된다. 예를 들어 상태 관리 라이브러리에서는 제네릭 상태를 `S`로, 데이터 구조의 키와 값은 `K`와 `V`로 나타내기도 한다.

하지만 불행히도 하나의 문자를 사용하는 타입 인수명은 하나의 문자로 함수나 변수의 이름을 사용하는 것만큼 혼란스러울 수도 있다.

```tsx
function labelBox<L, V>(l: L, v: V) {} // L과 V가 무엇인지 알 수 없다.
```

제네릭의 의도가 단일 문자 T에서 명확하지 않은 경우에는 타입이 사용되는 용도를 가리키는 설명적인 제네릭 타입 이름을 사용하는 것이 좋다.

```tsx
// 보다 명확하다
function labelBox2<Label, Value>(label: Label, value: Value) {}
```

구조체가 여러 개의 타입 매개변수를 갖거나 단일 타입 인수의 목적이 명확하지 않을 때마다 단일 문자 약어 대신 가독성을 위해 완전히 작성된 이름을 사용하는 것이 좋다.
