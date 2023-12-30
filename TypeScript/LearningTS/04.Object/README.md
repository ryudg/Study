# 1. 객체 타입

`{ ... }` 구문을 사용해 객체 리터럴을 생성하면, 타입스크립트는 해당 속성을 기반으로 새로운 객체 타입 또는 타입 형태를 고려한다. 해당 객체 타입은 객체의 값과 동일한 속성명과 원시 타입을 갖는다. 값의 속성에 접근하려면 `**value.멤버`** 또는 `**value['멤버']`\*\* 구문을 사용한다.

```ts
const poet = {
  born: 1935,
  name: "Mary Oliver",
};

poet["born"]; // 타입은 number
poet.name; // 타입은 string

poet.end;
//   ^^^ Property 'end' does not exist on type '{ born: number; name: string; }'.
```

객체 타입은 타입스크립트가 자바스크립트 코드를 이해하는 방법에 대한 핵심 개념이다.
`null`과 `undefined`를 제외한 모든 값은 그 값에 대한 실제 타입의 멤버 집합을 가지므로 타입스크립트는 모든 값의 타입을 확인하기 위해 객체 타입을 이해해야 한다.

## 1.1 객체 타입 선언

기존 객체에서 직접 타입을 유추하는 방법도 굉장히 좋지만, 결국에는 객체의 타입을 명시적으로 선언하고 싶을수 있다. 명시적으로 타입이 선언된 객체와는 별도로 객체의 형태를 설명하는 방법이 필요하다.

객체 타입은 객체 리터럴과 유사하게 보이지만 필드 값 대신 타입을 사용해 설명한다. 타입스크립트가 타입 할당 가능성에 대한 오류 메세지에 표시하는 것과 동일한 구문이다.

## 1.2 별칭 객체 타입

```ts
type Poet = {
  born: number;
  name: string;
};

let poetLater: Poet;

poetLater = {
  born: 1935,
  name: "Sara Teasdale",
};
```

# 2. 구조적 타이핑

타입스크립트의 타입 시스템은 **구조적으로 타입화**structurally typed되어 있다. 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다는 의미이다.

다시말해 매개변수나 변수가 특정 객체의 타입으로 선언되면 타입스크립트에 어떤 객체를 사용하든 해당 속성이 있어야 한다고 말해야한다.

```ts
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

let WithFirstName: WithFirstName = hasBoth; // OK, hasBoth는 'stirng' 타입의 'firstName' 프로퍼티를 가지고 있다.

let WithLastName: WithLastName = hasBoth; // OK, hasBoth는 'stirng' 타입의 'lastName' 프로퍼티를 가지고 있다.
```

별칭 객체 타입인 `WithFirstName`과 `WithLastName`은 오직 `string` 타입의 단일 멤버만 선언한다.
`hasBoth` 변수는 명시적으로 선언되지 않았음에도 두 개의 별칭 객체 타입을 모두 가지므로 두 개의 별칭 객체 타입 내에 선언된 변수를 모두 제공할 수 있다.

구조적 타이핑(Structural typing)은 타입 시스템의 한 접근 방식이며 객체나 값의 형태(structure)에 따라 타입 호환성을 결정하는 방식이다.

구조적 타이핑에서는 두 개의 타입이 서로 같은 구조를 가지면, 즉 동일한 속성과 메서드를 가지면 해당 타입들은 호환 가능하다고 판단된다.

구조적 타이핑은 **[덕 타이핑](https://www.notion.so/4-1e4c8df36152436d8e503bb89e794138?pvs=21)** 과는 다르다.

- 타입스크립트의 타입 검사기에서 구조적 타이핑은 정적 시스템이 타입을 검사하는 경우다.
- 덕 타이핑은 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것을 말한다.

요약하자면 자바스크립트는 **덕 타입**인 반면 타입스크립트는 **구조적으로 타입화**된다.

## 2.1 사용 검사

객체 타입으로 애너테이션된 위치에 값을 제공할 때 타입스크립트는 값을 해당 객체 타입에 할당할 수 있는지 확인한다. 할당하는 값에는 객체 타입의 필수 속성이 있어야 한다. 객체 타입에 필요한 멤버가 객체에 없다면 타입스크립트는 타입 오류를 발생시킨다.

아래 별칭 객체 타입인 `FirstAndLastNames`는 `firs`와 `last` 속성이 모두 있어야 한다. 두 가지 속성을 모두 포함한 객체는 `FirstAndLastNames` 타입으로 선언된 변수에 사용할 수 있지만, 두 가지 속성이 모두 없는 객체는 사용할 수 없다.

```ts
type FisrtAndNames = {
  fisrt: string;
  last: string;
};

const hasBoth: FisrtAndNames = {
  fisrt: "Sarojini",
  last: "Naidu",
};

const hasOnlyOne: FisrtAndNames = {
  //  ^^^^^^^^^^ Property 'last' is missing in type '{ fisrt: string; }' but required in type 'FisrtAndNames'.
  //             02-2.structural.ts(5, 3): 'last' is declared here.
  fisrt: "Sappho",
};
```

둘 사이에 일치하지 않는 타입도 허용되지 않는다. 객체 타입은 필수 속성 이름과 해당 속성이 예상되는 타입을 모두 지정한다. 객체의 속성이 일치하지 않으면 타입스크립트는 타입 오류를 발생시킨다.

## 2.2 초과 속성 검사

변수가 객체 타입으로 선언되고, 초깃값에 객체 타입에서 정의된 것보다 많은 필드가 있다면 타입스크립트에서 타입 오류가 발생한다. 따라서 변수를 객체 타입으로 선언하는 것은 타입 검사기가 해당 타입에 예상되는 필드만 있는지 확인하는 방법이기도 하다.

아래 `poeMatch` 변수는 별칭 객체 타입에 정의된 필드가 `Poet`에 정확히 있지만, 초과 속성이 있는 `extraProperty`는 타입 오류를 발생시킨다.

```ts
type Poet = {
  born: number;
  name: string;
};

const poetMatch: Poet = {
  born: 1928,
  name: "Maya Angelou",
};

const extraProperty: Poet = {
  activity: "walking",
  //^^^^^^^^ Type '{ activity: string; }' is not assignable to type 'Poet'.
  //         Object literal may only specify known properties, and 'activity' does not exist in type 'Poet'.
  born: 1935,
  name: "Mary Oliver",
};
```

**초과 속성 검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어난다.** 기존 객체 리터럴을 제공하면 초과 속성 검사를 우회한다.

아래 `extraPropertyButOk` 변수는 초깃값이 구조적으로 `Poet`와 일치하기 때문에 이전 예제의 `Poet` 타입처럼 타입 오류가 발생하지 않는다.

```ts
type Poet = {
  born: number;
  name: string;
};

const extraProperty = {
  activity: "walking",
  born: 1935,
  name: "Mary Oliver",
};

const extraPropertyButOK: Poet = extraProperty;
```

## 2.3 중첩된 객체 타입

자바스크립트 객체는 다른 객체의 멤버로 중첩될 수 있으므로 타입스크립트의 객체 타입도 타입 시스템에서 중첩된 객체 타입을 나타낼 수 있어야 한다. 이를 구현하는 구문은 이전과 동일하지만 기본 이름 대신 `{ ... }` 객체 타입을 사용한다.

`Poem` 타입은 `author` 속성이 `firstName: string`과 `lastName: string`인 객체로 선언되었다. `poemMatch` 변수는 구조가 `Poem`과 일치하기 때문에 `Poem`을 할당할 수 있는 반면, `poemMismatch`는 `author` 속성에 `firstName`과 `lastName` 대신 `name`을 포함하므로 할당할 수 없다.

```ts
type Poem = {
  author: {
    firstName: string;
    lastName: string;
  };
  name: string;
};

const poemMatch: Poem = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath",
  },
  name: "Lady Lazarus",
};

const poemMismatch: Poem = {
  author: {
    name: "Sylvia Plath",
    //  ^^^^ Type '{ name: string; }' is not assignable to type '{ firstName: string; lastName: string; }'.
    //       Object literal may only specify known properties, and 'name' does not exist in type '{ firstName: string; lastName: string; }'.
    //       04-1.nastedObject.ts(2, 3): The expected type comes from property 'author' which is declared here on type 'Poem'
  },
  name: "Tulips",
};
```

## 2.4 선택적 속성

모든 객체에 객체 타입 속성이 필요한 건 아니다. 타입의 속성 애너테이션에서 `:` 앞에 `?`를 추가하면 선택적 속성임을 나타낼 수 있다.
아래 `Book` 타입은 `pages` 속성만 필요하고 `author` 속성은 선택적으로 허용한다. 객체가 `pages` 속성을 제공하기만 하면 `author` 속성은 제공하거나 생략할 수 있다.

```ts
type Book = {
  author?: string;
  pages: number;
};

const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

const missing: Book = {
  //    ^^^^^^^ Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.ts(2741)
  //            05-1.optionalType.ts(5, 3): 'pages' is declared here.
  author: "Rita Dove",
};
```

선택적 속성과 `undefined`를 포함한 유니언 타입의 속성 사이에는 차이가 있음을 알아야한다.
`?`를 사용해 선택적으로 선언된 속성은 존재하지 않아도 된다. 필수로 선언된 속성과 `| undefined`는 그 값이 `undefined`일지라도 반드시 존재해야 한다.

# 3. 객체 타입 유니언

타입스크립트 코드에서는 속성이 조금 다른, 하나 이상의 서로 다른 객체 타입이 될 수 있는 타입을 설명할 수 있어야 한다. 또한 속성값을 기반으로 해당 객체 타입 간에 타입을 좁혀야 할 수도 있다.

## 3.1 유추된 객체 타입 유니언

변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추한다. 유니언 타입은 가능한 각 객체 타입을구성하고 있는 요소를 모두 가질 수 있다. 객체 타입에 정의된 각각의 가능한 속성은 비록 초깃값이 없는 선택적`?` 타입이지만 각 객체 타입의 구성 요소로 주어진다.

아래 `poem` 값은 항상 `string` 타입인 `name` 속성을 가지며 `pages`와 `rhymes`는 있을 수도 있고, 없을 수도 있다.

```ts
const poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhyme: true };

poem.name; // 타입은 string
poem.pages; // 타입은 number | undefined
poem.rhyme; // 타입은 boolean | undefined
```

## 3.2 명시된 객체 타입 유니언

객체 타입의 조합을 명시하면 객체 타입을 더 명확히 정의할 수 있다. 코드를 조금 더 작성해야 하지만 객체 타입을 더 많이 제어할 수 있다는 이점이 있다. 특히 값의 타입이 객체 타입으로 구성된 유니언이라면 타입스크립트의 타입 시스템은 이런 모든 유니언 타입에 존재하는 속성에 대한 접근만 허용한다.

앞서 본 `poem` 변수는 `pages` 또는 `rhymes`와 함께 필수 속성인 `name`을 항상 갖는 유니언 타입으로 명시적으로 작성되었다. 속성 `name`에 접근하는 것은 `name` 속성이 항상 존재하기 때문에 허용되지만 `pages`와 `rhymes`는 항상 존재한다는 보장이 없다.

```ts
type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhyme = {
  name: string;
  rhyme: boolean;
};

type Poem = PoemWithPages | PoemWithRhyme;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhyme: true };

poem.name; // OK

poem.pages;
//   ^^^^^ Property 'pages' does not exist on type 'Poem'.
//         Property 'pages' does not exist on type 'PoemWithRhyme'.

poem.rhyme;
//   ^^^^^ Property 'rhyme' does not exist on type 'Poem'.
//         Property 'rhyme' does not exist on type 'PoemWithPages'.
```

잠재적으로 존재하지 않는 객체의 멤버에 대한 접근을 제한하면 코드의 안전을 지킬 수 있다. 값이 여러 타입 중 하나일 경우, 모든 타입에 존재하지 않는 속성이 객체에 존재할 거라 보장할 수 없다.

리털럴 타입이나 원시 타입 모두, 혹은 둘 중 하나로 이뤄진 유니언 타입에서 모든 타입에 존재하지 않은 속성에 접근하기 위해 타입을 좁혀야 하는 것처럼 객체 타입 유니언도 타입을 좁혀야 한다.

## 3.3 객체 타입 내로잉

타입 검사기가 유니언 타입 값에 특정 속성이 포함된 경우에만 코드 영역을 실행할 수 있음을 알게 되면, 값의 타입을 해당 속성을 포함하는 구성 요소로만 좁힌다. 즉, 코드에서 객체의 형태를 확인하고 타입 내로잉이 객체에 적용된다.

명시적으로 입력된 `peom` 예제를 계속 살펴보면 `poem`의 `pages`가 타입스크립트의 타입 가드 역할을 해 `PoemWithPages`임을 나타내는지 확인한다. 만약 `Poem`이 `PoemWithPages`가 아니라면 `PoemWithRhymes`여야한다.

```ts
type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhyme = {
  name: string;
  rhyme: boolean;
};

type Poem = PoemWithPages | PoemWithRhyme;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhyme: true };

if ("pages" in poem) {
  poem.pages; // OK, poem은 PoemWithPages로 좁혀짐
} else {
  poem.rhyme; // OK, poem은 PoemWithRhyme으로 좁혀짐
}
```

**타입스크립트는 `if (poem.pages)`와 같은 형식으로 참 여부를 확인하는 것을 허용하지 않는다.**

존재하지 않는 객체의 속성에 접근하려고 시도하면 타입 가드처럼 작동하는 방식으로 사용되더라도 오류로 간주된다.

```ts
if (poem.pages) {
  //     ^^^^^ Property 'pages' does not exist on type 'Poem'.
  //           Property 'pages' does not exist on type 'PoemWithRhyme'.
  // ...
}
```

## 3.4 판별된 유니언

자바스크립트와 타입스크립트에서 유니언 타입으로 된 객체의 또 다른 인기 있는 형태는 객체의 속성이 객체의 형태를 나타내도록 하는 것이다. 이러한 타입 형태를 **판별된 유니언discriminated union**이라고 부르고, 객체의 타입을 가리키는 속성이 **판별값**이다. 타입스크립트는 코드에서 판별 속성을 사용해 타입 내로잉을 수행한다.

아래 `Poem` 타입은 `PoemWithPages` 타입 또는 `PoemWithRhymes` 타입 둘 다 될 수 있는 객체를 설명하고 `type` 속성으로 어느 타입인지를 나타낸다. 만일 `poem.type`이 `pages`이면, 타입스크립트는 `poem`을 `PoemWithPages`로 유추한다. 타입 내로잉이 없이는 값에 존재하는 속성을 보장할 수 없다.

```tsx
type PoemWithPages = {
  name: string;
  pages: number;
  type: "pages";
};

type PoemWithRhyme = {
  name: string;
  rhyme: boolean;
  type: "rhyme";
};

type Poem = PoemWithPages | PoemWithRhyme;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7, type: "pages" }
    : { name: "Her Kind", rhyme: true, type: "rhyme" };

if (poem.type === "pages") {
  console.log(`It's got pages: ${poem.pages}`);
} else {
  console.log(`It rhyme: ${poem.rhyme}`);
}

poem.type; // 타입은 "pages" | "rhyme

poem.pages;
//   ^^^^^ Property 'pages' does not exist on type 'Poem'.
//         Property 'pages' does not exist on type 'PoemWithRhyme'.
```

# 4. 교차 타입

타입스크립트 유니언 타입은 둘 이상의 다른 타입 중 하나의 타입이 될 수 있음을 나타낸다. 자바스크립트의 런타임 `|` 연산자가 `&` 연산자에 대응하는 역할을 하는 것처럼, 타입스크립트에서도 `**&` 교차 타입(=\*\*intersection type)을 사용해 여러 타입을 동시에 나타낸다. 교차 타입은 일반적으로 여러 기존 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성한다.

아래 `Artwork`와 `Writing` 타입은 `genre`, `name`, `pages` 속성을 결합한 `WrittenArt` 타입을 형성하는데 사용한다.

```tsx
type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = Artwork & Writing; // 타입은 { genre: string; name: string; pages: number; }
```

## 4.1 교차 타입의 위험성

교차 타입은 유용한 개념이지만, 타입스크립트 컴파일러를 혼동시키는 방식으로 사용하기 쉽다.
교차 타입을 사용할 때는 가능한 한 코드를 간결하게 유지해야 한다.

### 4.1.1 긴 할당 가능성 오류

유니언 타입과 결합하는 것처럼 복잡한 교차 타입을 만들게 되면 할당 가능성 오류 메세지는 읽기 어려워진다.
다시말해 복잡하면 복잡할수록 타입 검사기의 메세지도 이해하기 더 어려워진다는 의미다.

이 현상은 타입스클립트의 타입 시스템, 그리고 타입을 지정하는 프로그래밍 언어에서 공통적으로 관측된다.

### 4.1.2 never

교차 타입은 잘못 사용하기 쉽고 불가능한 타입을 생성한다. 원시 타입의 값은 동시에 여러 타입이 될 수 없기 때문에 교차 타입의 구성 요소로 함께 결합할 수 없다. 두 개의 원시 타입을 함께 시도하면 `never` 키워드로 표시되는 `never` 타입이 된다.

```tsx
type NotPossible = number & string; // 타입은 never
```

`never` 키워드와 `never` 타입은 프로그래밍 언어에서 **`bottom`** 타입 또는 `empty` 타입을 뜻한다. `never` 타입은 값을 가질 수 없고 참조할 수 없는 타입이므로 `never` 타입에 그 어떠한 타입도 제공할 수 없다.

```tsx
type NotPossible = number & string; // 타입은 never

let notNumber: NotPossible = 0;
//  ^^^^^^^^^ Type 'number' is not assignable to type 'never'.

let notString: never = "";
//  ^^^^^^^^^ Type 'string' is not assignable to type 'never'.
```

대부분의 타입스크립트 프로젝트는 `never` 타입을 거의 사용하지 않지만 코드에서 불가능한 상태를 나타내기 위해 가끔 등장한다. 하지만 대부분 교차 타입을 잘못 사용해 발생한 실수일 가능성이 높다.
