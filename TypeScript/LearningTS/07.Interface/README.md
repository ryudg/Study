인터페이스는 연관된 이름으로 객체 형태를 설명하는 또 다른 방법이다. 인터페이스는 별칭으로 된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메세지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운용성을 위해 선호된다.

# 1. 타입 별칭 vs 인터페이스

아래는 `born: number`와 `name: string`을 가진 객체를 타입 별칭으로 구현하는 방법이다.

```tsx
type Poet = {
  born: number;
  name: string;
};
```

아래는 인터페이스로 구현한 동일한 구문이다.

```tsx
interface Poet {
  born: number;
  name: string;
}
```

두 구문은 거의 같다.

> 💡 세미콜론(`;`)을 선호하는 타입스크립트 개발자들은 대부분 인터페이스 뒤가 아닌 타입 별칭 뒤에 세미콜론을 넣는다. 이 기본 설정은 세미콜론을 사용해 변수를 선언하는 것고 세미콜론 없이 클래스 또는 함수를 선언하는 것의 차이를 반영한다.

인터페이스에 대한 타입스크립트의 할당 가능성 검사와 오류 메세지는 객체 타입에서 실행되는 것과 거의 동일하다. `Poet`이 인터페이스 또는 타입 별칭인 경우 `valueLater` 변수에 할당하는 것에 대한 할당 가능성 오류는 거의 동일하다.

```tsx
interface Poet {
  born: number;
  name: string;
}

let valueLater: Poet;

valueLater = {
  born: 1935,
  name: "Sara Teasdale",
};

valueLater = "Emily Dickinson";
// ^^^^^^^^^^ Type 'string' is not assignable to type 'Poet'.

valueLater = {
  born: true,
  //^^^^ Type 'boolean' is not assignable to type 'number'.

  name: "Sara Teasdale",
};
```

그러나 인터페이스와 타입 별칭 사이에는 주요 차이점이 있다.

- 인터페이스는 속성 증가를 위해 병합merge할 수 있다.
  이 기능은 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 유용하다
- 인터페이스는 클래스가 선언된 구조의 타입을 확인하는데 사용할 수 있지만 타입 별칭은 사용할 수 없다.
- 일반적으로 인터페이스에서 타입스크립트 타입 검사가 더 빨지 작동한다.
  인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기 보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언한다.
- 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는(명명된) 객체로 간주되므로 어려운 특이 케이스에서 나타나는 오류 메세지를 쉽게 읽을 수 있다.

마지막 두 가지 이유와 일관성을 유지하기 위해 기본적으로 별칭 객체 형태에 대한 인터페이스를 사용한다. 가능하면 인터페이스 사용을 권장한다.

즉, 타입 별칭의 유니언 타입과 같은 기능이 필요할 때까지는 인터페이스를 사용하는 것이 좋다.

# 2. 속성 타입

`getter`와 `setter`를 포함해, 가끔 존재하는 속성 또는 임의의 속성 이름을 사용하는 등 자바스크립트 객체를 실제로 사용할 때 낯설고 이상할 수 있다.
타입스크립트는 인터페이스가 이런 이상한 부분을 모델링 할 수 있도록 유용한 타입 시스템 도구를 제공한다.

> 💡 인터페이스의 타입 별칭은 매우 비슷하게 작동하므로 속성 타입은 별칭 객체 타입에도 사용할 수 있다.

## 2.1 선택적 속성

객체 타입과 마찬가지로 모든 객체가 필수적으로 인터페이스 속성을 가질 필요는 없다. 타입 애너테이션 `:` 앞에 `?`를 사용해 인터페이스 속성이 선택적 속성임을 나타낼 수 있다.

아래 `Book` 인터페이스는 필수 속성 `pages`와 선택적 속성 `author`를 갖는다. `Book` 인터페이스를 사용하는 객체에 필수 속성만 제공된다면 선택적 속성은 제공되거나 생략할 수 있다.

```tsx
interface Book {
  author?: string;
  pages: number;
}

const ok: Book = {
  author: "Rita Dove",
  pages: 200,
};

const missing: Book = {
  pages: 300,
};

const ng: Book = {
  //  ^^ Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.
  author: "Rita Dove",
};
```

`undefined`를 포함한 유니언 타입의 선택적 속성과 일반 속성 사이의 차이점과 관련된 주의 사항은 객체 타입 뿐만아니라 인터페이스에도 적용된다.

## 2.2 읽기 전용 속성

경우에 따라 인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단하고 싶을 수도 있다. 타입스크립트는 속성 이름 앞에 `readyonly` 키워드를 추가해 다른 값으로 설정될 수 없음을 나타낸다.
이러한 `readonly` 속성은 평소대로 읽을 수 있지만 새로운 값으로 재할당하지 못한다.

아래 `Page` 인터페이스의 `text` 속성에 접근하면 `string`을 반환하지만, `text`에 새로운 값을 할당하면 타입 오류가 발생한다.

```tsx
interface Page {
  readonly text: string;
}

function read(page: Page) {
  console.log(page.text); // 값 읽기

  page.text += "!"; // 값 수정
  //   ^^^^ Cannot assign to 'text' because it is a read-only property.
}
```

`readonly` 제한자modifier는 타입 시스템에만 존재하며 인터페이스에서만 사용할 수 있다.
`readonly` 제한자는 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에는 적영되지 않는다.

위 `Page` 코드에서 `text` 속성의 부모 객체는 함수 내부에서 `text`로 명시적으로 사용되지 않았기 때문에 함수 밖에서 속성을 수정할 수 있다. 쓰기 가능한(=writable) 속성을 `readonly` 속성에 할당할 수 있으므로 `pageIsh`는 `Page`로 사용할 수 있다. 가변(쓰기 가능한) 속성은 `readonly` 속성이 필요한 모든 위치에서 읽을 수 있다.

```tsx
// 생략 ...

const pageIsh: Page = {
  text: "Hello, World",
};

pageIsh.text += "!";
//      ^^^^ Cannot assign to 'text' because it is a read-only property.

read(pageIsh);
```

명시적 타입 애너테이션인 `: Page`로 변수 `pageIsh`를 선언한다면 타입스크립트에 `text` 속성이 `readonly`라고 가리키게 된다.

`readonly` 인터페이스 멤버는 코드 영역에서 객체를 의도치 않게 수정하는 것을 막는 편리한 방법이다.
그러나 `readonly`는 타입 시스템 구성 요소일 뿐 컴파일된 자바스크립트 출력 코드에는 존재하지 않는다. `readonly`는 단지 타입스크립트 타입 검사기를 사용해 개발 중에 그 속성이 수정되지 못하도록 보호하는 역할을 한다.

## 2.3 함수와 메서드

자바스크립트에서 객체 멤버가 객체 함수가 되는 것은 매우 일반적이다. 타입스크립트에서도 인터페이스 멤버를 함수 타입으로 선언할 수 있다.
타입스크립트는 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공한다.

- **메서드 구문**: 인터페이스 멤버를 `member() => void`와 같이 객체의 멤버로 호출되는 함수로 선언
- **속성 구문**: 인터페이스 멤버를 `member: () => void`와 같이 독립 함수와 동일하게 선언

두 가지 선언 방법은 자바스크립트에서 객체를 함수로 선언하는 방법과 동일하다.

아래 `method`와 `property` 멤버는 둘 다 매개변수 없이 호출되어 `string`을 반환한다.

```tsx
interface HasBothFunctionTypes {
  property: () => string;
  method(): string;
}

const hasBoth: HasBothFunctionTypes = {
  property: () => "Hello, World",
  method() {
    return "Hello, World";
  },
};

hasBoth.property();
hasBoth.method();
```

두 가지 방법 모두 선택적 속성 키워드 `?`를 사용해 필수로 제공하지 않아도 되는 멤버로 나타낼 수 있다.

```tsx
// 7.Interface/04-2.functionAndMethod.ts

interface OptionalReadonlyFunction {
  readonly optionalProperty?: () => string;
  optionalMethod?(): string;
}
```

메서드와 속성 선언은 대부분 서로 교환하여 사용할 수 있지만 차이점이 존재한다.

- 메서드는 `readonly`로 선언할 수 없지만 속성은 가능하다.
- 인터페이스 병합은 메서드와 속성을 다르게 처리한다.
- 타입에서 수행되는 일부 작업은 메서드와 속성을 다르게 처리한다. 15장 타입 운영에서 자세히 알아보자

타입스크립트의 향후 버전에서는 메서드와 속성 함수의 차이점에 대해 더 엄격한 옵션을 추가할 수도 있지만,
현재 시점에서 추천하는 스타일 가이드는 아래와 같다.

- 기본 함수가 `this`를 참조할 수 있다는 것을 알고 있다면 메서드 함수를 사용해라.
  가장 일반적으로 클래스의 인스턴스에서 사용된다. 8장 클래스에서 자세히 알아보자
- 반대의 경우는 속성 함수를 사용해라

이 두 가지를 혼동하거나 차이점을 이해하지 못한다고 해도 걱정하지 않아도 된다. `this` 스코프와 선택한 방식을 의도하지 않는 한 코드에 거의 영향을 주지 않는다.

## 2.4 호출 시그니처

인터페이스와 객체 타입은 호출 시그니처call signature로 선언할 수 있다.
호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명이다. 호출시그니처가 선언한 방식으로 호출되는 값만 인터페이스에 할당할 수 있다.
즉, 할당 가능한 매개변수와 반환 타입을 가진 함수다. 호출 시그니처는 함수 타입과 비슷하지만, 콜론 (`:`) 대신 화살표(`⇒`)로 표시한다.

아래 `FunctionAlias`와 `CallSignature` 타입은 모두 동일한 함수 매개변수와 반환 타입을 설명한다.

```tsx
type FunctionAlias = (input: string) => number;
const typedFunctionAlias: FunctionAlias = (input) => input.length;

interface CallSignature {
  (input: string): number;
}
const typedSignature: CallSignature = (input) => input.length;
```

호출 시그니처는 사용자 정의 속성을 추가로 갖는 함수를 설명하는데 사용할 수 있다. 타입스크립트는 함수 선언에 추가된 속성을 해당 함수 선언의 타입에 추가하는 것으로 인식한다.

아래 `keepTrackOfCalls` 함수 선언에는 `number` 타입인 `counter` 속성이 주어져 `FunctionWithCount` 인터페이스에 할당할 수 있다. 따라서 `FunctionWithCount` 타입의 `hasCallCount` 인수에 할당할 수 있다. 아래 코드의 마지막 함수에는 `count` 속성이 주어지지 않는다.

```tsx
interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;

function keepTrackOfCalls() {
  keepTrackOfCalls.count += 1;
  console.log(`I'v been called ${keepTrackOfCalls.count} times!`);
}

keepTrackOfCalls.count = 0;

hasCallCount = keepTrackOfCalls;

function doesNotHaveCount() {
  console.log("No idea!");
}

hasCallCount = doesNotHaveCount;
// ^^^^^^^^^^^^ Property 'count' is missing in type '() => void' but required in type 'FunctionWithCount'.
```

## 2.5 인덱스 시그니처

일부 자바스크립트 프로젝트는 임의의 `string` 키에 값을 저장하기 위한 객체를 생성한다. 이러한 “컨테이너container” 객체의 경우 모든 가능한 키에 대해 필드가 있는 인터페이스를 선언하는 것은 비현실적이거나 불가능하다.

타입스크립트는 인덱스 시그니처index signature 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있음을 나타내난다. 자바스크립트 객체 속성 조회는 암묵적으로 키를 문자열로 변환하기 때문에 인터페이스의 객체는 문자열 키와 함께 가장 일반적으로 사용된다. 인덱스 시그니처는 일반 속성 정의와 유사하지만 키 다음에 타입이 있고 `{[i: string]: ... }`과 같이 배열의 대괄호를 갖는다.

아래 `WordCounts` 인터페이스는 `number` 값을 갖는 모든 `string` 키를 허용하는 것으로 선언되었다. 이런 타입의 객체는 값이 `number`면 `string` 키가 아닌 그 어떤 키도 바인딩할 수 없다.

```tsx
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0;
counts.banana = 0;

counts.cherry = false;
// ^^^^^^^^^^^^^ Type 'boolean' is not assignable to type 'number'.
```

인덱스시그니처는 객체에 값을 할당할 때 편리하지만 타입 안정성을 완벽하게 보장하지는 않는다. 인덱스 시그니처는 객체가 어떤 속성에 접근하든 간에 값을 반환해야 함을 나타낸다.

아래 `publishDates` 값은 `Date` 타입으로 `Frankenstein`을 안전하게 반환하지만 타입스크립트는 `Beloved`가 정의되지 않았음에도 불구하고 정의되었다고 생각하도록 속인다.

```tsx
interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818"),
};

publishDates.Frankenstein; // 타입은 Date
console.log(publishDates.Frankenstein.toString());

publishDates.Beloved; // 타입은 Date이지만, 런타임 값은 undefined
console.log(publishDates.Beloved.toString()); // 타입 시스템에서는 에러가 발생하지 않지만, 런타임에서는 에러가 발생한다.
```

키/값 쌍을 저장하려고 하는데 키를 미리 알 수 없다면 `Map`([MDN - Map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map))을 사용하는 편이 더 안전하다. `.get` 메서드는 항상 키가 존재하지 않음을 나타내기 위해서 `| undefined` 타입을 반환한다.

### 2.5.1 속성과 인덱스 시그니처 혼합

인터페이스는 명시적으로 명명된 속성과 포괄적인catchall 용도의 `string` 인덱스 시그니처를 한번에 포함할 수 있다. 각각의 명명된 속성의 타입은 포괄적인 용도의 인덱스 시그니처로 할당할 수 있어야 한다. 명명된 속성이 더 구체적인 타입을 제공하고, 다른 모든 속성은 인덱스 시그니처의 타입으로 대체하는 것으로 혼합해서 사용할 수 있다.

아래 `HistoricalNovels`는 모든 속성을 `number` 타입으로 선언했고 추가적으로 `Oroonoko` 속성이 존재해야 한다.

```tsx
interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number;
}

const novels: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 1688,
};

const missingOroonoko: HistoricalNovels = {
  //  ^^^^^^^^^^^^^^^ Property 'Oroonoko' is missing in type '{ Outlander: number; }' but required in type 'HistoricalNovels'.
  Outlander: 1991,
};
```

속성과 인덱스 시그니처를 혼합해서 사용하는 일반적인 타입 시스템 기법 중 하나는 인덱스 시그니처의 원시 속성보다 명명된 속성에 대해 더 구체적인 속성 타입 리터럴을 사용하는 것이다. 명명된 속성의 타입이 인덱스 시그니처에 할당될 수 있는 경우(각각의 리터럴 및 원시 속성에 해당) 타입스크립트는 더 구체적인 속성 타입 리터럴을 사용하는 것을 허용한다.

아래 `ChapterStars`는 `preface` 속성은 `0`으로, 다른 모든 속성은 더 일반적인 `number`를 갖도록 선언한다. 즉, `ChapterStarts`를 사용하는 모든 객체의 `preface` 속성은 반드시 `0`이어야 한다.

```tsx
interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};

const wrongPreface: ChapterStarts = {
  preface: 1,
  //^^^^^^^ Type '1' is not assignable to type '0'.
};
```

### 2.5.2 숫자 인덱스 시그니처

자바스크립트가 암묵적으로 객체 속성 조회 키를 문자열로 변환하지만 때로는 객체의 키로 숫자만 허용하는 것이 바람직할 수 있다. 타입스크립트 인덱스 시그니처는 키로 `string` 대신 `number` 타입을 사용할 수 있지만, 명명된 속성은 그 타입을 포괄적인 용도의 `string` 인덱스 시그니처의 타입으로 할당할 수 있어야 한다.

아래 `MoreNarrowNumbers` 인터페이스는 `string`을 `string | undefined`에 할당할 수 있지만 `MoreNarrowNumbers` 인터페이스는 `string | undefined`를 `string`에 할당할 수 없다.

```tsx
interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}

const mixesNumbersAndStrings: MoreNarrowNumbers = {
  0: "",
  key1: "",
  key2: undefined,
};

interface MoreNarrowStrings {
  [i: number]: string | undefined;
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 'number' index type 'string | undefined' is not assignable to 'string' index type 'string'.

  [i: string]: string;
}
```

## 2.6 중첩 인터페이스

객체 타입이 다른 객체 타입의 속성으로 중첩될 수 있는 것처럼 타입스크립트 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있다.

아래 `Novel` 인터페이스는 인라인 객체 타입인 `author` 속성과 `Setting` 인터페이스인 `setting` 속성을 포함한다.

```tsx
interface Setting {
  place: string;
  year: number;
}

interface Novel {
  author: {
    name: string;
  };

  setting: Setting;
}

let myNovel: Novel;

myNovel = {
  author: {
    name: "Jane Austen",
  },
  setting: {
    place: "England",
    year: 1815,
  },
};

myNovel = {
  author: {
    name: "Charlotte Brontë",
  },
  setting: {
    //^^^^^^^ Property 'year' is missing in type '{ place: string; }' but required in type 'Setting'.
    place: "England",
  },
};
```

# 3. 인터페이스 확장

때로는 서로 형태가 비슷한 여러 개의 인터페이스를 갖게 된다. 예를 들면 다른 인터페이스의 모든 멤버를 포함하고, 거기에 몇 개의 멤버가 추가된 인터페이스인 경우다.

타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 **확장된**extend 인터페이스를 허용한다. 확장할 인터페이스의 이름 뒤에 `extends` 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시한다. 이렇게 하면 파생 인터페이스derived interface를 준수하는 모든 객체가 기본 인터페이스basic interface의 모든 멤버도 가져야 한다는 것을 타입스크립트에 알려준다.

아래 예제에서 `Nobella` 인터페이스는 `Writing`을 확장하므로 객체는 최소한 `Novella`의 `pages`와 `Writing`의 `title` 멤버가 모두 있어야 한다.

```tsx
interface Writing {
  title: string;
}

interface Novella extends Writing {
  pages: number;
}

let myNovella: Novella = {
  pages: 195,
  title: "Ethan Frome",
};

let missingPages: Novella = {
  //^^^^^^^^^^^ Property 'pages' is missing in type '{ title: string; }' but required in type 'Novella'.
  title: "The Turn of the Screw",
};

let extraProperty: Novella = {
  pages: 300,
  style: "Naturalism",
  //^^^^^ Type '{ pages: number; style: string; startegy: string; }' is not assignable to type 'Novella'.
  //      Object literal may only specify known properties, and 'style' does not exist in type 'Novella'.
  startegy: "basline",
  //^^^^^^^^ Type '{ pages: number; startegy: string; style: string; }' is not assignable to type 'Novella'.
  //         Object literal may only specify known properties, and 'startegy' does not exist in type 'Novella'.
};
```

인터페이스 확장은 프로젝트의 한 엔티티entity 타입이 다른 엔티티의 모든 멤버를 포함하는 상위 집합superset을 나타내는 실용적인 방법이다. 인터페이스 확장 덕분에 여러 인터페이스에 관계를 나타내기 위해 동일한 코드를 반복 입력하는 것을 피할 수 있다.

## 3.1 재정의된 속성

파생 인터페이스는 다른 타입으로 속성을 다시 선언해 기본 인터페이스의 속성을 재정의override하거나 대체할 수 있다. 타입스크립트의 타입 검사기는 재정의된 속성이 기본 속성에 할당되어 있도록 강요한다. 이렇게 하면 파생 인터페이스 타입의 인스턴스를기본 인터페이스 타입에 할당할 수 있다.

속성을 재선언하는 대부분의 파생 인터페이스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 속성을 기본 인터페이스의 타입에서 확장된 타입으로 만들기 위해 사용한다.

아래 `WithNullableName` 타입은 `WithNonNullableName`에서 `null`을 허용하지 않도록 적절하게 다시 설정된다. 그러나 `WithNullableName`의 `name`에는 `number | string`이 허용되지 않는다. `number | string`은 `string | null`에 할당할 수 없기 때문이다.

```tsx
interface WithNullableName {
  name: string | null;
}

interface WithNonNullableName extends WithNullableName {
  name: string;
}

interface WithNumericName extends WithNullableName {
  //      ^^^^^^^^^^^^^^^ Interface 'WithNumericName' incorrectly extends interface 'WithNullableName'.
  //                      Types of property 'name' are incompatible.
  //                      Type 'string | number' is not assignable to type 'string | null'.
  //                      Type 'number' is not assignable to type 'string'.

  name: number | string;
}
```

## 3.2 다중 인터페이스 확장

타입스크립트의 인터페이스는 여러개의 다른 인터페이스를 확장해서 선언할 수 있다. 파생 인터페이스 이름에 있는 `extends` 키워드 뒤에 쉼표로 인터페이스 이름을 구분해 사용하면 된다. 파생 인터페이스는 모든 기본 인터페이스의 모든 멤버를 받는다.

아래 `GivesBothAndEither`는 세 개의 메서드를 가진다. 하나는 자체 메서드이고, 하나느 `GivesNumber`에서, 나머지 하나는 `GivesString`에서 왔다.

```tsx
interface GivesNumber {
  giveNumber(): number;
}

interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
  instance.giveNumber(); // 타입은 number
  instance.giveString(); // 타입은 string
  instance.giveEither(); // 타입은 number | string
}
```

여러 인터페이스를 확장하는 방식으로 인터페이스를 사용하면 코드 중복을 줄이고 다른 코드 영역에서 객체의 형태를 더 쉽게 재사용할 수 있다.

# 4. 인터페이스 병합

인터페이스의 중요한 특징 중 하나는 서로 병합하는 능력이다. 두 개의 인터페이스가 동일한 이름으로 동일한 스코프에 선언된 경우, 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가된다.

아래 `formFirst`와 `formSecond`라는 두 개의 속성을 갖는 `Merged` 인터페이스를 선언한다.

```tsx
interface Merged {
  formFirst: string;
}

interface Merged {
  fromSecond: number;
}

/*
병합된 인터페이스는 다음과 같이 동작한다.

interface Merged {
  formFirst: string;
  fromSecond: number;
}

*/
```

일반적인 타입스크립트 개발에서는 인터페이스 병합을 자주 사용하지 않는다. 인터페이스가 여러 곳에 선언되면 코드를 이해하기 어려워지므로 가능하면 인터페이스 병합을 사용하지 않는 것이 좋다.

그러나 인터페이스 병합은 외부 패키지 또는 `Window` 같은 내장 전역 인터페이스를 보강하는데 특히 유용하다. 예를 들어 기본 타입스크립트 컴파일러 옵션을 사용할 때, 파일에서 `myEnvironmentVariable` 속성이 있는 `Window` 인터페이스를 선언하면 `window.myEnvironmentVariable`을 사용할 수 있다.

```tsx
interface Window {
  myEnvironmentVariable: string;
}

window.myEnvironmentVariable; // 타입은 string
```

## 4.1 이름이 충돌되는 멤버

병합된 인터페이스는 타입이 다른 동일한 이름의 속성을 여러 번 선언할 수 없다. 속성이 이미 인터페이스에 선언되어 있다면 나중에 병합된 인터페이스에서도 동일한 타입을 사용해야 한다.

아래 두 개의 `mergedProperties` 인터페이스 선언에서는 `same` 속성이 모두 동일하므로 문제 없지만 `different` 속성은 타입이 서로 다르기 때문에 오류가 발생한다.

```tsx
interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: number) => string;
  //^^^^^^^^^ Subsequent property declarations must have the same type.  Property 'different' must be of type '(input: string) => string', but here has type '(input: number) => string'.
}
```

그러나 병합된 인터페이스는 동일한 이름과 다른 시그니처를 가진 메서드는 정의할 수 있다.
아래와 같이 메서드에 대한 함수 오버로드가 발생한다. `MergedMethods` 인터페이스는 두 가지 오버로드가 있는 `different` 메서드를 생성한다.

```tsx
interface MergedMethods {
  differnt(input: string): string;
}

interface MergedMethods {
  differnt(input: number): string;
}
```
