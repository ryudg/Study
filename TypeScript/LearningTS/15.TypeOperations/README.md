# 1. 매팽된 타입

타입스크립트는 다른 타입의 속성을 기반으로 새로운 타입을 생성하는 구문을 제공한다. 즉, 하나의 타입에서 다른 타입으로 **매핑mapping**한다. 타입스크립트의 **매핑된 타입mapped type**은 다른 타입ㅇ르 가져와서 해당 타입의 각 속성에 대해 일부 작업을 수행하는 타입이다.

매핑된 타입은 키 집합의 각 키에 대한 새로운 속성을 만들어 새로운 타입을 생성한다. 매핑된 타입은 인덱스 시그니처와 유사한 구문을 사용하지만 `[i: string]`과 같이 **`:`** 를 사용한 정적 키 타입을 사용하는 대신 `[K in OriginalType]`과 같이 `in`을 사용해 다른 타입으로부터 계산된 타입을 사용한다.

```tsx
type NewType = {
  [key in OriginalType]: NewProperty;
};
```

매핑된 타입에 대한 일반적인 사용 사례는 유니언 타입에 존재하는 각 문자열 리터럴 키를 가진 객체를 생성하는 것이다. 아래 `AnimalCounts` 타입은 키가 `Animals` 유니언 타입의 각 값이고, 각 값의 타입이 `number`인 새로운 객체 타입을 생성한다.

```tsx
type Animals = "alligator" | "baboon" | "cat";

type AnimalCounts = {
  [K in Animals]: number;
};
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }
```

존재하는 유니언 리터럴을 기반으로 하는 매핑된 타입은 큰 인터페이스를 선언하는 공간을 절약하는 편리한 방법이다. 하지만 매핑된 타입은 다른 타입에 대해 작동하고 멤버에서 제한자를 추가하거나 제거할 수 있을 때 유용하다.

## 1.1 타입에서 매핑된 타입

일반적으로 매핑된 타입은 존재하는 타입에 `keyof` 연산자를 사용해 키를 가져오는 방식으로 작동한다. 존재하는 타입의 키를 매핑하도록 타입에 지시하면 새로운 타입으로 매핑한다.

아래 `AnimalCounts` 타입은 `AnimalVariants` 타입에서 이와 동등한 새로운 타입으로 매핑되고, 결국 이전의 `AniamalCounts` 타입과 동일해진다.

```tsx
interface AnimalVariants {
  alligator: string;
  baboon: string;
  cat: string;
}

type AnimalCounts = {
  [K in keyof AnimalVariants]: number;
};
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }
```

이전 코드에서 `K`로 명명된 `keyof`에 매핑된 새로운 타입 키는 원래 타입의 키로 알려져있다. 즉, 각 매핑된 타입 멤버 값은 동일한 키 아래에서 원래 타입의 해당 멤버 값을 참조할 수 있다.

원본 객체가 `SomeName`이고 매핑이 `[K in keyof SomeName]`인 경우라면 매핑된 타입의 각 멤버는 `SomeName` 멤버의 값을 `SomeName[K]`로 참조할 수 있다.

아래 `NullableBirdVariants` 타입은 원본 `BirdVariants` 타입을 사용해 각 멤버에 `| null`을 추가한다.

```tsx
interface BirdVariants {
  dove: string;
  eagle: string;
}

type NullableBirdVariants = {
  [K in keyof BirdVariants]: BirdVariants[K] | null;
};
// {
//   dove: string | null;
//   eagle: string | null;
// }
```

각 필드를 원본 타입에서 임의의 수의 다른 타입으로 어렵게 복사하는 대신, 매핑된 타입은 멤버 집합을 한 번 정의하고 필요한 만큼 여러 번 새로운 버전을 다시 생성할 수 있다.

### 1.1.1 매핑된 타입과 시그니처

타입스크립트가 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공한다.

- **`member(): void` 같은 메서드 구문:** 인터페이스의 멤버가 객체의 멤버로 호출되도록 의도된 함수임을 선언
- **`member: () ⇒ void` 같은 속성 구문:** 인터페이스의 멤머가 독립 실행형 함수와 같다고 선언

매핑된 타입은 객체 타입의 메서드와 속성 구문을 구분하지 않는다. 매핑된 타입은 메서드를 원래 타입의 속성으로 취급한다.

아래 `ResearcherProperties` 타입은 `Researcher`의 `researchProperty`와 `researchMethod` 멤버를 모두 포함한다.

```tsx
interface Researcher {
  researchMember(): void;
  researchProperty: () => string;
}

type JustProperties<T> = {
  [K in keyof T]: T[K];
};

type ResearcherProperties = JustProperties<Researcher>;
// {
//   researchMember: () => void;
//   researchProperty: () => string;
// }
```

대부분의 실용적인 타입스크립트 코드에서 메서드와 속성의 차이는 잘 나타나지 않는다. 클래스 타입을 갖는 매핑된 타입을 실제로 사용하는 경우는 매우 드물다.

## 1.2 제한자 변경

매핑된 타입은 원래 타입의 멤버에 대해 접근 제어 제한자인 `readonly`와 `?`도 변경 가능하다. 전형적인 인터페이스와 동일한 구문을 사용해 매핑된 타입의 멤버에 `readonly`와 `?`를 배치할 수 있다.

아래 `ReadonlyEnvironmentalist` 타입은 모든 멤버가 `readonly`로 제공된 `Environmentalist` 인터페이스 버전을 만드는 반면, `OptionalReadonlyEnvironmentalist`는 한 단계 더 나아가 모든 `ReadonlyEnvironmentalist` 멤버에 `?`를 추가한 다른 버전을 만든다.

```tsx
interface Environmentalist {
  area: string;
  name: string;
}

type ReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]: Environmentalist[K];
};
// {
//   readonly area: string;
//   readonly name: string;
// }

type OptionalReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]?: Environmentalist[K];
};
// {
//   readonly area?: string;
//   readonly name?: string;
// }
```

> 💡 `OptionalReadonlyEnvironmentalist` 타입은 `readonly [K in Environmentalist]?: Environmentalist[K]`로 대체 가능하다.

새로운 타입의 제한자 앞에 `-`를 추가해 제한자를 제거한다. `readonly`나 `?:`를 작성하는 대신 `-readonly`나 `-?:`을 사용한다.

아래 `Conservationist` 타입은 `WritableConservationist`에서 작성 가능하게 만든 다음 `RequiredWritableConservationist`에서도 필요한 선택적 `?`와 `readonly` 멤버를 포함한다.

```tsx
interface Conservartionist {
  name: string;
  catchphrase?: string;
  readonly born: number;
  readonly died?: number;
}

type WriteableConservartionist = {
  -readonly [K in keyof Conservartionist]: Conservartionist[K];
};
// {
//   name: string;
//   catchphrase?: string | undefined;
//   born: number;
//   died?: number | undefined;
// }

type RequiredWriteableConservartionist = {
  [K in keyof WriteableConservartionist]-?: WriteableConservartionist[K];
};
// {
//   name: string;
//   catchphrase: string;
//   born: number;
//   died: number;
// }
```

> 💡 `RequiredWriteableConservartionist` 타입은 `-readonly [K in keyof Conservartionist]-?: Conservartionist[K];`로 대체 가능하다.

## 1.3 제네릭 매핑된 타입

매핑된 타입의 완전한 힘은 제네릭과 결합해 단일 타입의 매핑을 다른 타입에서 재사용할 수 있도록 하는 것에서 나온다. 매핑된 타입은 매핑된 타입 자체의 타입 매개변수를 포함해 `keyof`로 해당 스코프에 있는 모든 타입 이름에 접근할 수 있다.

제네릭 매핑된 타입은 데이터가 애플리케이션을 통해 흐를 때 데이터가 어떻게 변형되는지 나타낼 때 아주 유용하다. 예를 들어 애플리케이션 영역이 기존 타입의 값을 가져올 수는 있지만 데이터를 수정하는 것은 허용하지 않는 것이 좋다.

아래 `MakeReadonly` 제네릭 타입은 모든 타입을 사용할 수 있고, 모든 멤버에 `readonly` 제한자가 추가된 새로운 버전을 생성한다.

```tsx
type MakeReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Species {
  genus: string;
  name: string;
}

type ReadonlySpecies = MakeReadOnly<Species>;
// {
//   readonly genus: string;
//   readonly name: string;
// }
```

개발자들이 일반적으로 표현해야 하는 또 다른 변환은 임의의 수의 인터페이스를 받고, 그 인터페이스의 완전히 채워진 인스턴스를 반환하는 함수이다.

아래 `MakeOptional` 타입과 `createGenusData` 함수는 `GenusData` 인터페이스를 얼마든지 제공하고 기본값이 채워진 객체를 다시 가져올 수 있다.

```tsx
interface GenusData {
  family: string;
  name: string;
}

type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
// {
//   family?: string;
//   name?: string;
// }

/**
 * GenusData의 기본값 위에 모든 {overrides}를 구조 분해 할당합니다.
 */
function createGenusData(overrides?: MakeOptional<GenusData>): GenusData {
  return {
    family: "Felidae",
    name: "Felis",
    ...overrides,
  };
}
```

제네릭 매핑된 타입으로 수행되는 일부 작업은 매우 유용하므로 타입스크립트는 제네릭 매핑된 타입을 즉시 사용할 수 있는 유틸리티 타입을 제공한다. 예를 들어 내장된 `Partial<T>` 타입을 사용해 모든 속성을 선택 사항으로 만들 수 있다.

# 2. 조건부 타입

기존 타입을 다른 타입에 매핑하는 것은 훌륭하지만 아직 타입 시스템에 논리적인 조건이 추가되지 않았다.

타입스크립트의 타입 시스템은 **논리 프로그래밍 언어**의 한 예이다. 타입스크립트의 타입 시스템은 이전 타입에 대한 논리적인 검사를 바탕으로 새로운 구성(타입)을 생성한다. **조건부 타입**의 개념은 기존 타입을 바탕으로 두 가지 가능한 타입 중 하나로 확인되는 타입이다.

조건부 타입 구문은 삼항 연산자 조건문 처럼 보인다.

```tsx
LeftType extends RightType ? IfTrue : IfFalse
```

조건부 타입에서 논리적 검사는 항상 `extends`의 왼쪽 타입이 오른쪽 타입이 되는지 또는 할당 가능한지 여부에 있다.

아래 `CheckStringAgatinstNumber` 조건부 타입은 `string`이 `number`가 되는지 여부를 검사한다. 즉, `string` 타입을 `number` 타입에 할당할 수 있는지 여부이다. 할당할 수 없다면 그 결과 타입은 `false`가 된다.

```tsx
type CheckStringAgatinstNumber<T> = T extends number ? true : false;
```

이 장의 나머지 부분에서는 다른 타입 시스템 기능과 조건부 타입을 결합하는 내용을 살펴본다. 코드 스니펫이 더 복잡해 질수록 각 조건부 타입은 순전히 `boolean` 로직의 일부라는 것을 기억하자. 각각은 어떤 타입을 취하고, 두 가지 가능한 결과 중 하나를 얻는다.

## 2.1 제네릭 조건부 타입

조건부 타입은 조건부 타입 자체의 타입 매개변수를 포함한 해당 스코프에서 모든 타입 이름을 확인할 수 있다. 즉, 모든 다른 타입을 기반으로 새로운 타입을 생성하기 위해 재사용 가능한 제네릭 타입을 작성할 수 있다.

이전 `CheckStringAgatinstNumber` 타입을 제네릭 `CheckAgainstNumber`로 바꾸면 이전 타입이 `number`에 할당 가능한지 여부에 따라 `true` 또는 `false`인 타입이 제공된다. `number`와 `0 | 1`은 둘 다 `true`인 반면 `string`은 여전히 `true`가 아니다.

```tsx
type CheckAgatinstNumber<T> = T extends number ? true : false;

type CheckString1 = CheckAgatinstNumber<"parakeet">; // false

type CheckString2 = CheckAgatinstNumber<1>; // true

type CheckString3 = CheckAgatinstNumber<number>; // true
```

아래 `CallableSetting` 타입이 조금 더 유용하다. 제네릭 `T`를 받고 `T`가 함수인지 아닌지 확인한다. `T`가 `() ⇒ number[]`인 `GetNumbersSetting`처럼 `T`가 함수인 경우 결과 타입은 `T`가 된다. 그렇지 않으면 `T`가 `string`인 `StringSetting`처럼 결과 타입은 `T`를 반환하는 함수이므로 그 결과 타입은 `() ⇒ string`이다.

```tsx
type CallableSetting<T> = T extends () => any ? T : () => T;

type GetNumbersSetting = CallableSetting<() => number[]>; // () => number[]

type StringSetting = CallableSetting<string>; // () => string
```

조건부 타입은 객체 멤버 검색 구문을 사용해서 제공된 타입의 멤버에 접근할 수 있고, `extends` 절과 결과 타입에서 그 정보를 사용할 수 있다.

자바스크립트 라이브러리에서 사용하는 패턴 중 조건부 제네릭 타입에도 적합한 한 가지 패턴은 함수에 제공된 옵션 객체를 기반으로 함수의 반환 타입을 변경하는 것이다.

예를 들어 대부분의 데이터베이스 함수나 이와 동등한 함수는 값을 찾을 수 없는 경우 `undefined`를 반환하는 대신 `throwIfNotFound`와 같은 속성을 사용해 함수가 오류를 발생시키도록 변경할 수 있다. 다음 `QueryResult` 타입은 `Options[”throwIfNotFound”]`가 `true`인 것으로 명확하게 알려지만 `string | undefined` 대신 좀 더 좁은 `string`이 되도록 모델링한다.

```tsx
export {};

interface QueryOptions {
  throwIfNotFound: boolean;
}

type QueryResult<Options extends QueryOptions> =
  Options["throwIfNotFound"] extends true ? string : string | undefined;

declare function retrieve<Options extends QueryOptions>(
  key: string,
  options?: Options
): Promise<QueryResult<Options>>;

const result1 = await retrieve("Birutė Galdikas"); // string | undefined
const result2 = await retrieve("Jane Goodal", {
  throwIfNotFound: Math.random() > 0.5,
}); // string | undefined
const result3 = await retrieve("Dian Fossey", { throwIfNotFound: true }); // string
```

조건부 타입을 제네릭 타입 매개변수와 결합하면 `retrieve` 함수는 프로그램의 제어 흐름을 어떻게 변경할 것인지를 타입 시스템에 더 정확히 알릴 수 있다.

## 2.2 타입 분산

조건부 타입은 유니언에 **분산distribut**된다. 결과 타입은 각 구성 요소(유니언 타입 안의 타입들)에 조건부 타입을 적용하는 유니언이 됨을 의미한다. 즉, `ConditionalType<T | U>`는 `ConditionalType<T> | ConditionalType<U>`와 같다.

타입 분산을 설명하기는 쉽지만 조건부 타입이 유니언과 함께 어떻게 작동하는지가 중요하다.

아래 `ArrayifUnlessString` 타입은 타입 매개변수 `T`가 `T extends string`이 아니라면 배열로 변환한다. `ArrayifUnlessString<string | number>`가 `ArrayifUnlessString<string> | ArrayifUnlessString<number>`와 동일하므로 `HalfArrayified`는 `string | number[]`와 동일하다.

```tsx
type ArrayifUnlessString<T> = T extends string ? T : T[];

type HalfArrayified = ArrayifUnlessString<string | number>;
```

타입스크립트의 조건부 타입이 유니언에 분산되지 않는다면 `string | number`는 `string`에 할당할 수 없기 때문에 `HalfArrayified`는 `(string | number)[]`가 된다. 즉, 조건부 타입은 전체 유니언 타입이 아니라 유니언 타입의 각 구성 요소에 로직을 적용한다.

## 2.3 유추된 타입

제공된 타입의 멤버에 접근하는 것은 타입의 멤버로 저장된 정보에 대해서는 잘 작동하지만 함수 매개변수 또는 반환 타입과 같은 다른 정보에 대해서는 알 수 없다. 조건부 타입은 `extends` 절에 `infer` 키워드를 사용해 조건의 임의의 부분에 접근한다. `extends` 절에 타입에 대한 `infer` 키워드와 새 이름을 배치하면 조건부 타입이 `true`인 경우 새로운 타입을 사용할 수 있음을 의미한다.

아래 `ArrayItems` 타입은 타입 매개변수 `T`를 받고 `T`가 새로운 `Item` 타입의 배열인지 확인한다. 새로운 `Item` 타입의 배열인 경우 결과 타입은 `Item`이 되고, 그렇지 않으면 `T`가 된다.

```tsx
type ArrayItems<T> = T extends (infer Item)[] ? Item : T;

type StringItem = ArrayItems<string>; // string

type StringArrayItem = ArrayItems<string[]>; // string

type String2DItem = ArrayItems<string[][]>; // string[]
```

유추된 타입은 재귀적 조건부 타입을 생성하는 데에도 사용할 수 있다. 아래 코드는 이전 `ArrayItems` 타입이 모든 차원 배열의 `item` 타입을 재귀적으로 검색하도록 확장했다.

```tsx
type ArrayItemsRecursive<T> = T extends (infer Item)[]
  ? ArrayItemsRecursive<Item>
  : T;

type StringItem = ArrayItemsRecursive<string>; // string

type StringArrayItem = ArrayItemsRecursive<string[]>; // string

type String2DItem = ArrayItemsRecursive<string[][]>; // string
```

`ArrayItems<string[][]>`은 `string[]`이 되지만 `ArrayItemsRecursive<string[][]>`은 `string`이 된다. 제네릭 타입이 재귀적일 수 있는 기능을 통해 여기에서 배열의 요소 타입을 검색하는 것과 같은 변경 사항을 계속 적용할 수 있도록 한다.

## 2.4 매핑된 조건부 타입

매핑된 타입은 기존 타입의 모든 멤버에 변경 사항을 적용하고 조건부 타입은 하나의 기존 타입에 변경 사항을 적용한다. 이 둘을 함께 사용하면 제네릭 템플릿 타입의 각 멤버에 조건부 로직을 적용할 수 있다.

아래 `MakeAllMembersFunctions` 타입은 타입의 함수가 아닌 각 멤버를 함수로 바꾼다.

```tsx
type MakeAllMembersFunction<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : () => T[K];
};

type MemberFunctions = MakeAllMembersFunction<{
  alreadyFunction: () => string;
  notYetFunction: number;
}>;
// {
//   alreadyFunction: () => string;
//   notYetFunction: () => number;
// }
```

매핑된 조건부 타입은 일부 논리적 검사를 사용해 기존 타입의 모든 속성을 수정하는 편리한 방법이다.

# 3. `never`

이들은 가능한 값을 가질 수 없고 접근할 수 없음을 의미한다. 올바른 위치에 `never` 타입 애너테이션을 추가하면 타입스크립트가 이전 런타임 예제 코드 뿐만아니라 타입 시스템에서 맞지 않는 코드 경로를 더 공격적으로 탐지한다.

## 3.1 `never`와 교차, 유니언 타입

`bottom` 타입인 `never`는 존재할 수 없는 타입이라는 의미를 가지고 있다. `never`가 교차 타입`&`과 유니언 타입`|`을 함께 사용하면 다음과 같이 작동한다.

- 교차 타입`&`에 있는 `never`는 교차 타입을 `never`로 만든다.
- 유니언 타입`|`에있는 `never`는 무시된다.

아래 `NeverIntersection`과 `NeverUnion` 타입은 아래와 같이 동작한다.

```tsx
type NeverIntersection = never & string; // never
type NeverUnion = never | string; // string
```

특히 유니언 타입에서 never가 무시되는 동작은 조건부 타입과 매핑된 타입에서 값을 필터링 하는데 유용하다.

## 3.2 never와 조건부 타입

제네릭 조건부 타입은 일반적으로 유니언에서 타입을 필터링하기 위해 `never`를 사용한다. `never`는 유니언에서 무시되기 때문에 유니언 타입에서 제네릭 조건부의 결과는 `never`가 아닌 것이 된다.

아래 `OnlyStrings` 제네릭 조건부 타입은 문자열이 아닌 타입을 필터링 하므로 `RedOrBlue` 타입은 유니언에서 `0`과 `false`를 필터링한다.

```tsx
type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>; // "red" | "blue"
```

`never`는 또한 제네릭 타입에 대한 타입 유틸리티를 만들 때 유추된 조건부 타입과 결합된다. `infer`가 있는 타입 추론은 조건부 타입이 `true`가 되어야 하므로 `false`인 경우를 절대 사용하지 않아야 한다. 바로 이때 `never`를 사용하면 적합하다.

아래 `FirtParameter` 타입은 함수 타입 `T`를 받고, `arg: infer Arg`가 함수인지 확인하고, 함수가 맞다면 `Arg`를 반환한다.

```tsx
type FisrParameter<T extends (...args: any[]) => any> = T extends (
  arg: infer Arg
) => any
  ? Arg
  : never;

type GetsString = FisrParameter<(arg0: string) => void>; // string
```

조건부 타입의 `false`에 `never`를 사용하면 `FirstParameter`가 함수의 첫 번째 매개변수의 타입을 추출할 수 있다.

## 3.3 `never`와 매핑된 타입

유니언에서 `never`의 동작은 매핑된 타입에서 멤버를 필터링할 때도 유용하다. 아래 세 가지 타입 시스템 기능을 사용해 객체의 키를 필터링한다.

- 유니언에서 `never`는 무시된다.
- 매핑된 타입은 타입의 멤버를 매핑할 수 있다.
- 조건부 타입은 조건이 충족되는 경우 타입을 `never`로 변환하는 데 사용할 수 있다.

세 가지 기능을 함께 사용하면 원래 타입의 각 멤버를 원래 키 또는 `never`로 변경하는 매핑된 타입을 만들 수 있다. `[keyof T]`로 해당 타입의 멤버를 요청하면 모든 매핑된 타입의 결과 유니언이 생성되고 `never`는 필터링 된다.

아래 `OnlyStringProperties` 타입은 각 `T[K]` 멤버가 `string`인 경우 `K` 키로 변경하고, `string`이 아닌 경우 `never`로 변경한다.

```tsx
type OnlyStringPropperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface AllEventData {
  participants: string[];
  location: string;
  name: string;
  year: number;
}

type OnltStringEventData = OnlyStringPropperties<AllEventData>; // "location" | "name"
```

`OnlyStringPropperties<T>` 타입을 읽는 또 다른 방법은 string이 아닌 모든 속성을 필터링 한 다음 나머지 모든 키(`[keyof T]`)를 반환하는 것이다.

# 4. 템플릿 리터럴 타입

지금까지 문자열 값을 입력하기 위한 두 가지 전략을 제시했다.

- **원시 string 타입**: 값이 세상의 모든 문자열이 될 수 있는 경우
- **“”와 “abc” 같은 리터럴 타입**: 값이 오직 한 가지 타입만 될 수 있는 경우

그러나 경우에 따라 문자열이 일부 문자열 패턴과 일치함을 나타내고 싶을 수 있다. 문자열의 일부는 알려져 있지만 일부는 알려져 있지 않다.

문자열 타입이 패턴에 맞는지를 나타내는 타입스크립트 구문인 **템플릿 리터럴 타입**을 입력해보자. 템플릿 리터럴 타입은 템플릿 리터럴 문자열처럼 보이지만 추정할 수 있는 원시 타입 또는 원시 타입 유니언이다.

다음 템플릿 리터럴 타입은 문자열이 `Hello`로 시작해야 하지만 그 이후에 나오는 나머지 문자열에는 모든 문자열(`string`)을 사용할 수 있다. `“Hello, world!”`와 같이 `Hello`로 시작하는 이름은 일치하지만 `“World! Hello!”` 또는 `“hi”`는 일치하지 않는다.

```tsx
type Greeting = `Hello${string}`;

let matches: Greeting = "Hello World";

let outOfOreder: Greeting = "World! Hello!";
//  ^^^^^^^^^^^ Type '"World! Hello!"' is not assignable to type '`Hello${string}`'.

let missingAltogehther: Greeting = "Hi";
//  ^^^^^^^^^^^^^^^^^^ Type '"Hi"' is not assignable to type '`Hello${string}`'.
```

템플릿 리터럴 타입을 좀 더 좁은 문자열 패턴으로 제한하기 위해 포괄적인 `string` 원시 타입 대신 문자열 리터럴 타입과 그 유니언을 타입 보간법type interpolation에 사용할 수 있다. 템플릿 리터럴 타입은 제한된 허용 문자열 집합과 일치해야 하는 문자열을 설명하는 데 매우 유용하다.

아래 `BrightnessAndColor`는 `Brightness`로 시작하고 `Color`로 끝나며 그 사이에 하이픈이 있는 문자열만 일치한다.

```tsx
type Brightness = "dark" | "light";
type Color = "blue" | "red";

type BrightnessAndColor = `${Brightness}-${Color}`; // "dark-blue" | "dark-red" | "light-blue" | "light-red"

let colorOk: BrightnessAndColor = "dark-blue";

let colorNg: BrightnessAndColor = "dark-green";
//  ^^^^^^^ Type '"dark-green"' is not assignable to type '"dark-blue" | "dark-red" | "light-blue" | "light-red"'. Did you mean '"dark-red"'?
```

템플릿 리터럴 타입이 없었다면 `Brightness`와 `Color`의 네 가지 조합을 모두 힘들게 작성해야 했을 것이다. `Brightness`와 `Color` 중 하나에 더 많은 문자열 리터럴을 추가하면 작성하는데 매우 번거로울 것이다.

타입스크립트는 템플릿 리터럴 타입이 `string`, `number`, `bigint`, `boolean`, `null`, `undefined`와 같은 모든 원시 타입(`symbol` 제외) 또는 그 조합을 포함하도록 허용한다.

아래 `ExtolNumber` 타입은 `much`로 시작해서 숫자 형태(`number`)의 문자열을 포함하고 `wow`로 끝나는 모든 문자열을 허용한다.

```tsx
type ExtolNumber = `much ${number} wow`;

function extol(extolee: ExtolNumber) {
  // ...
}

extol("much 5 wow"); // OK
extol("much -5 wow"); // OK
extol("much 5.5 wow"); // OK

extol("much wow"); // NG
//    ^^^^^^^^^^ Argument of type '"much wow"' is not assignable to parameter of type '`much ${number} wow`'.
```

## 4.1 고유 문자열 조작 타입

문자열 타입 작업을 지원하기 위해 타입스크립트는 문자열을 가져와 문자열에 일부 조작을 적용하는 고유(타입스크립트에 내장된) 제네릭 유틸리티 타입을 제공한다. 타입스크립트 4.7.2에는 아래 네 가지가 있다.

- **Uppercase**: 문자열 리터럴 타입을 대문자로 변환한다.
- **Lowercase**: 문자열 리터럴 타입을 소문자로 변환한다.
- **Capitalize**: 문자열 리터럴 타입의 첫 번째 문자를 대문자로 변환한다.
- **Uncapitalize**: 문자열 리터럴 타입의 첫 번째 문자를 소문자로 변환한다.

각각은 문자열을 갖는 제네릭 타입으로 사용할 수 있다. 예를 들어 Caplitalize를 사용해 문자열의 첫 번째 문자를 대문자로 표시한다.

```tsx
type ForamlGreeting = Capitalize<"hello">; // 타입은 "Hello"
```

이러한 고유 문자열 조작 타입은 객체 타입의 속성 키를 조작하는 데 매우 유용하다.

## 4.2 템플릿 리터럴 키

템플릿 리터럴 타입은 원시 문자열 타입과 문자열 리터럴 사이의 중간 지점이므로 여전히 문자열이다. 템플릿 리터럴 타입은 문자열 리터럴을 사용할 수 있는 모든 위치에서 사용 가능하다.

예를 들어 매핑된 타입의 인덱스 시그니처로 사용할 수 있다. 다음 `ExistenceChecks` 타입에는 `check${Capitalize<DataKey>}`로 매핑된 `DataKey`에 있는 모든 문자열에 대한 키가 있다.

```tsx
type DataKey = "location" | "name" | "year";

type ExistenceChecks = {
  [key in `check${Capitalize<DataKey>}`]: () => boolean;
};
// {
//   checkLocation: () => boolean;
//   checkName: () => boolean;
//   checkYear: () => boolean;
// }

function checkExistence(checks: ExistenceChecks) {
  checks.checkLocation();
  checks.checkName();
  checks.checkYear();

  checks.checkWrong();
  //     ^^^^^^^^^^ Property 'checkWrong' does not exist on type 'ExistenceChecks'.
}
```

## 4.3 매핑된 타입 키 다시 매핑하기

타입스크립트는 템플릿 리터럴 타입을 사용해 원래 멤버를 기반으로 매핑된 타입의 멤버에 대한 새로운 키를 생성할 수 있다. 매핑된 타입에서 인덱스 시그니처에 대한 템플릿 리터럴 타입에 다음 `as` 키워드를 배치하면 결과 타입의 키는 템플릿 리터럴 타입과 일치하도록 변경된다. 이렇게 하면 매핑된 타입은 원래 값을 계속 참조하면서 각 매핑된 타입 속성에 대한 다른 키를 가질 수 있다.

다음 `DataEntryGetters`는 키가 `getLocation`, `getName`, `getYear`인 매핑된 타입이다. 각 키는 템플릿 리터럴 타입을 사용해 새로운 키로 매핑된다. 매핑된 각 값은 원래의 `K` 키를 타입 인수로 사용하는 `DataEntry`를 반환 타입으로 갖는 함수다.

```tsx
interface DataEntry<T> {
  ket: T;
  value: string;
}

type Datakey = "location" | "name" | "year";

type DataEntryGetters = {
  [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
};
// {
//   getLocation: () => DataEntry<"location">;
//   getName: () => DataEntry<"name">;
//   getYear: () => DataEntry<"year">;
// }
```

키를 다시 매핑하는 작업과 다른 타입 운영을 결합해 기존 타입 형태를 기반으로 하는 매핑된 타입을 생성할 수 있다. 한 가지 재미있는 조합은 기존 객체에 `keyof typeof`를 사용해 해당 객체의 타이에서 매핑된 타입을 만드는 것이다.

아래 `configGetter` 타입은 `config` 타입을 기반으로 하지만 각 필드는 원래 `config`를 반환하는 함수이고 키는 원래 키에서 수정된다.

```tsx
const config = {
  location: "unknown",
  name: "anonymous",
  year: 0,
};

type LazyValues = {
  [K in keyof typeof config as `${K}Lazy`]: () => Promise<(typeof config)[K]>;
};
// {
//   locationLazy: () => Promise<string>;
//   nameLazy: () => Promise<string>;
//   yearLazy: () => Promise<number>;
// }

async function withLazyValues(configGetter: LazyValues) {
  await configGetter.locationLazy(); // 결과 타입은 string
  await configGetter.nameLazy(); // 결과 타입은 string
  await configGetter.yearLazy(); // 결과 타입은 number

  await configGetter.missingLazy();
  //                 ^^^^^^^^^^^ Property 'missingLazy' does not exist on type 'LazyValues'.
}
```

자바스크립트에서 객체 키는 `string` 또는 `Symbol`이 될 수 있고, `Symbol` 키는 원시 타입이 아니므로 템플릿 리터럴 타입으로 사용할 수 없다. 제네릭 타입에서 다시 매핑된 템플릿 리터럴 타입 키를 사용하려고 하면 타입스크립트는 템플릿 리터럴 타입에서 `symbol`을 사용할 수 없다는 오류를 발생시킨다.

```tsx
type TurnIntoGetterDirect<T> = {
  [K in keyof T as `get${Capitalize<K>}`]: () => T[K];
  //                                ^ Type 'K' does not satisfy the constraint 'string'.
  //                                  Type 'keyof T' is not assignable to type 'string'.
  //                                  Type 'string | number | symbol' is not assignable to type 'string'.
  //                                  Type 'number' is not assignable to type 'string'.
};
```

이러한 제한 사항을 피하기 위해 `string`과 교차 타입`&`을 사용하여 문자열이 될 수 있는 타입만 사용하도록 강제한다. `string & symbol`은 `never`가 되므로 전체 템플릿 문자열은 `never`가 되고 타입스크립트는 이를 무시하게 된다.

```tsx
const someSymbol = Symbol("");

interface HasStringAndSymbol {
  StringKey: string;
  [someSymbol]: number;
}

type TurnIntoGetters<T> = {
  [K in keyof T as `get${string & K}`]: () => T[K];
};

type GettersJustString = TurnIntoGetters<HasStringAndSymbol>;
// {
//   getStringKey: () => string;
// }
```

유니언에서 `never` 타입을 필터링하는 타입스크립트의 동작이 유용하다는 것을 다시 한번 입증했다.
