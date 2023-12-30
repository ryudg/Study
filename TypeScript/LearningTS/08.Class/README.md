타입스크립트가 탄생되고 릴리스 된 2010년 초반의 자바스크립트 세계는 오늘날과 상당히 달랐다.
ES2015에서 표준화된 화살표 함수와 `let` `const` 변수 같은 기능은 없었으며,
바벨은 첫 번째 커밋 후 몇 년이 지났고 최신 자바스크립트 구문을 오래된 구문으로 변환하는 Traceur와 같은 이전 도구들은 완전한 주류로 채택 받지 못했다.

타입스크립트의 초기 마케팅과 기능들은 이런 자바스크립트 세계에 맞춰져 있었다. 타입스크립트의 타입 검사기 외에도 트랜스파일러가 강조되었고 그 예시로 클래스가 자주 등장했다. 오늘날 타입스크립트의 클래스 지원은 모든 자바스크립트 언어 기능을 지원하는 많은 기능 중 하나에 불과하다. 타입스크립트는 클래스 사용이나 다른 인기 있는 자바스크립트 패턴을 권장하지도 막지도 않는다.

# 1. 클래스 메서드

타입스크립트는 독립 함수standalone function를 이해하는 것과 동일한 방식으로 메서드를 이해한다. 매개변수 타입에 타입이나 기본값을 지정하지 않으면 `any` 타입을 기본으로 갖는다. 메서드를 호출하려면 허용 가능한 수의 인수가 필요하고, 재귀 함수가 아니라면 대부분 반환 타입을 유추할 수 있다.

> 독립 함수란 특정 객체에 속하지 않고 독립적으로 존재하는 함수를 말한다.

아래 `string` 타입의 단일 필수 매개변수를 갖는 `greet` 클래스 메서드를 가진 `Greeter` 클래스를 정의하는 코드이다.

```tsx
class Greeter {
  greet(name: string) {
    console.log(`${name}, do your stuff!`);
  }
}

new Greeter().greet("John");

new Greeter().greet();
//            ^^^^^^^ Expected 1 arguments, but got 0.
```

클래스 생성자cunstructor는 매개변수와 관련하여 전형적인 클래스 메서드처럼 취급된다. 타입스크립트는 메서드 호출 시 올바른 타입의 인수가 올바른 수로 제공되는지 확인하기 위해 타입 검사를 수행한다.

아래 `Greeted` 생성자는 `message: string`으로 매개변수가 제공되어야 한다.

```tsx
class Greeted {
  constructor(message: string) {
    console.log(`As I always say: ${message}!`);
  }
}

new Greeted("take chances, make mistakes, get messy");

new Greeted();
// ^^^^^^^^^^^^^ Expected 1 arguments, but got 0.
```

# 2. 클래스 속성

타입스크립트에서 클래스의 속성을 읽거나 쓰려면 클래스에 명시적으로 선언해야 한다. 클래스 속성은 인터페이스와 동일한 구문을 사용해 선언한다. 클래스 속성 이름 뒤에는 선택적으로 타입 애너테이션이 붙는다.

타입스크립트는 생성자 내의 할당에 대해서 그 멤버가 클래스에 존재하는 멤버인지 추론하려고 시도하지 않는다.

아래 코드에서 `destination`은 `string`으로 명시적으로 선언되어 있어 `FiledTrip` 클래스 인스턴스에 할당되고 접근할 수 있다. 클래스가 `nonexistent` 속성을 선언하지 않았기 때문에 생성자에서 `this.nonexistent` 할당은 적용되지 않는다.

```tsx
class FieldTrip {
  destination: string;

  constructor(destination: string) {
    this.destination = destination;

    console.log(`We're going to ${destination}!`);

    this.nonexistent = destination;
    //   ^^^^^^^^^^^ Property 'nonexistent' does not exist on type 'FieldTrip'.
  }
}
```

클래스 속성을 명시적으로 선언하면 타입스크립트는 클래스 인스턴스에서 무엇이 허용되고, 허용되지 않는지 빠르게 이해할 수 있다. 나중에 클래스 인스턴스가 사용될 때, 코드가 `this.nonexistent`와 같은 클래스 인스턴스에 존재하지 않는 멤버에 접근하려고 시도하면 타입스크립트는 타입 오류를 발생시킨다.

```tsx
class FieldTrip {
  destination: string;

  constructor(destination: string) {
    this.destination = destination;

    console.log(`We're going to ${destination}!`);
  }
}

const trip = new FieldTrip("Seoul");

trip.destination;

trip.nonexistent;
//   ^^^^^^^^^^^ Property 'nonexistent' does not exist on type 'FieldTrip'.
```

## 2.1 함수 속성

자바스크립트 메서드 스코프와 기본 구문에 익숙하지 않다면 당황할 수 있으므로 아래에서는 몇 가지 자바스크립트 메서드 스코프와 기본 구문을 간략히 설명한다.

자바스크립트에는 클래스의 멤버를 호출 가능한 함수로 선언하는 두 가지 구문이 있다.

`myFuntion(){}`과 같이 멤버 이름 뒤에 괄호를 붙이는 메서드 접근 방식을 앞서 살펴보았다.
메서드 접근 방식은 함수를 클래스 프로토타입에 할당하므로 모든 클래스 인스턴스는 동일한 함수 정의를 사용한다.

아래 `WithMethod` 클래스는 모든 인스턴스가 참조할 수 있는 `myMethod` 메서드를 선언한다.

```tsx
class WithMethod {
  myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod; // ture
```

값이 함수인 속성을 선언하는 방식도 있다. 이렇게 하면 클래스의 인스턴스당 새로운 함수가 생성되며, 항상 클래스 인스턴스를 가리켜야 하는 화살표 함수에서 `this` 스코프를 사용하면 클래스 인스턴스당 새로운 함수를 생성하는 시간과 메모리 비용 측면에서 유용할 수 있다.

아래 `WithProperty` 클래스는 이름이 `myProperty`인 단일 속성을 포함하며 각 클래스 인스턴스에 대해 다시 생성되는 `() => void` 타입이다.

```tsx
class WithProperty {
  myProperty: () => {};
}

new WithProperty().myProperty === new WithProperty().myProperty; // false
```

함수 속성에는 클래스 메서드와 독립 함수의 동일한 구문을 사용해 매개변수와 반환 타입을 지정할 수 있다.
결국 함수 속성은 클래스 멤버로 할당된 값이고, 그 값은 함수이다.

아래 `WithPropertyParameters` 클래스는 타입이 `(input: boolean) => string`인 `takesParameters` 속성을 가진다.

```tsx
class WithPropertyParameters {
  takesParameters = (input: boolean) => (input ? "Yes" : "No");
}

const instance = new WithPropertyParameters();

instance.takesParameters(true);
instance.takesParameters(false);

instance.takesParameters(123);
//                       ^^^ Argument of type 'number' is not assignable to parameter of type 'boolean'.
```

## 2.2 초기화 검사

엄격한 컴파일러 설정이 활성화된 상태에서 타입스크립트는 `undefined` 타입으로 선언된 각 속성이 생성자에서 할당되었는지 확인한다. 이와 같은 엄격한 초기화 검사는 클래스 속성에 값을 할당하지 않는 실수를 예방할 수 있어 유용하다.

아래 `WithValue` 클래스는 `unsued` 속성에 값을 할당하지 않았고, 타입스크립트는 이 속성을 타입 오류로 인식한다.

```tsx
class WithValue {
  immediate = 0;
  later: number; // constructor에서 할당
  mayBeUndefined: number | undefined; // undefined가 되는 것이 허용
  unused: number;
  //^^^^^^ Property 'unused' has no initializer and is not definitely assigned in the constructor.
  constructor() {
    this.later = 1;
  }
}
```

엄격한 초기화 검사가 없다면, 비록 타입 시스템이 `undefined` 값에 접근할 수 없다고 말할지라도 클래스 인스턴스는 `undefined` 값에 접근할 수 있다.

아래 코드는 엄격한 초기화 검사가 수행되지 않으면 올바르게 컴파일 되지만, 결과 자바스크립트는 런타임 시 문제가 발생한다.

```tsx
class MissingInitializer {
  property: string;
}

new MissingInitializer().property.length;
```

### 2.2.1 확실하게 할당된 속성

엄격한 초기화 검사가 유용한 경우가 대부분이지만 클래스 생성자 다음에 클래스 속성을 의도적으로 할당하지 않는 경우가 있을 수도 있다. 엄격한 초기화 검사를 적용하면 안되는 속성인 경우에는 이름 뒤에 `!`를 추가해 검사를 비활성화하도록 설정한다. 이렇게 하면 타입스크립트에 속성이 처음 사용되기 전에 `undefined` 값이 할당된다.

아래 `ActivitieQueue` 클래스는 생성자와는 별도로 여러 번 다시 초기화될 수 있으므로 `pendding` 속성은 `!`와 함께 할당되어야 한다.

```tsx
class ActivitiesQueue {
  pending!: string[];

  initialize(pending: string[]) {
    this.pending = pending;
  }

  next() {
    return this.pending.pop();
  }
}

const activitites = new ActivitiesQueue();

activitites.initialize(["wake up", "eat", "sleep"]);
activitites.next();
```

> 💡 클래스 속성에 대해 엄격한 초기화 검사를 비활성화 하는 것은 종종 타입 검사에는 적합하지 않은 방식으로 코드가 설정된다는 신호이다. `!` 어서션을 추가하고 속성에 대한 타입 안정성을 줄이는 대신 클래스를 리팩토링해서 어서션이 더이상 필요하지 않도록 하자

## 2.3 선택적 속성

인터페이스와 마찬가지로 클래스는 선언된 속성 이름 뒤에 `?`를 추가해 속성을 옵션으로 선언한다. 선택적 속성은 `| undefined`를 포함하는 유니언 타입과 거의 동일하기 작동한다.
엄격한 초기화 검사는 생성자에서 선택적 속성을 명시적으로 설정하지 않아도 문제가 되지 않는다.

아래 `MissingInitializer` 클래스는 `property`를 옵션으로 정의했으므로 엄격한 속성 초기화 검사와 관계 없이 클래스 생성자에서 할당하지 않아도 된다.

```tsx
class MissingInitializer {
  property?: string;
}

new MissingInitializer().property?.length;

new MissingInitializer().property.length;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Object is possibly 'undefined'.
```

## 2.4 읽기 전용 속성

인터페이스와 마찬가지로 클래스도 선언된 속성 이름 앞에 `readonly` 키워드를 추가해 속성을 읽기 전용으로 선언한다. `readonly` 키워드는 타입 시스템에만 존재하며 자바스크립트로 컴파일 할 때 삭제된다.

`readonly`로 선언된 속성은 선언된 위치 또는 생성자에서 초깃값만 할당할 수 있다. 클래스 내의 메서드를 포함한 다른 모든 위치에서 속성은 읽을 수만 있고, 쓸 수는 없다.

아래 `Quote` 클래스의 `text` 속성은 생성자에서는 값이 지정되지만 다른 곳에서 값을 지정하려고 하면 타입 오류가 발생한다.

```tsx
class Quote {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  emphasize() {
    return (this.text += "!");
    //          ^^^^ Cannot assign to 'text' because it is a read-only property.
  }
}

const quote = new Quote("Hello");

quote.text = "World";
//    ^^^^ Cannot assign to 'text' because it is a read-only property.
```

> 💡 npm 패키지로 게시한 코드를 사용하는 외부인이 `readonly` 제한자를 존중하지 않을 수 있다.
> 특히, 자바스크립트를 작성 중이고 타입 검사를 하지 않는 사용자라면 더욱 그럴 수 있다.
> 진정한 읽기 전용 보호가 필요하다면 `# private` 필드나 `get()` 함수를 사용하자.

원시 타입의 초깃값을 갖는 `readonly`로 선언된 속성은 다른 속성과 조금 다르다. 이런 속성은 더 넓은 원시값이 아니라 값의 타입이 가능한 한 좁혀진 리터럴 타입으로 유추된다. 타입스크립트는 값이 나중에 변경되지 않는다는 것을 알기 때문에 더 공격적인 초기 타입 내로잉을 편하게 느낀다. `const` 변수가 `let` 변수보다 더 좁은 타입을 갖는 것과 유사하다.

아래 코드에서 클래스 속성은 처음에는 모두 문자열 리터럴로 선언되므로 둘 중 하나를 `string`으로 확장하기 위해서는 타입 애너테이션이 필요하다.

```tsx
class RandomQuote {
  readonly explicit: string = "Hello";
  readonly implicit = "TypeScript";

  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "안녕하세요";

      this.implicit = "타입스크립트";
      //^^^^^^^^^^^^^ Type '"타입스크립트"' is not assignable to type '"TypeScript"'.
    }
  }
}

const quote = new RandomQuote();

quote.explicit; // 타입은 string
quote.implicit; // 타입은 "TypeScript"
```

속성의 타입을 명시적으로 확장하는 작업이 자주 필요하지는 않다. 그럼에도 불구하고 `RandomQuote`에서 등장하는 생성자의 조건부 로직처럼 경우에 따라 유용할 수 있다.

# 3. 타입으로서의 클래스

타입 시스템에서의 클래스는 클래스 선언이 런타임 값(클래스 자체)과 타입 애너테이션에서 사용할 수 있는 타입을 모두 생성한다는 점에서 상대적으로 독특하다.

`Teacher` 클래스의 이름은 `teacher` 변수에 주석을 다는 데 사용된다. `teacher` 변수에는 `Teacher` 클래스의 자체 인스턴스처럼 `Teacher` 클래스에 할당할 수 있는 값만 할당해야 함을 타입스크립트에 알려준다.

```tsx
class Teacher {
  sayHello() {
    console.log("Take chances, make mistakes, get messy!");
  }
}

let teacher: Teacher;
teacher = new Teacher();

teacher = "Wahoo!";
// ^^^^^^^ Type 'string' is not assignable to type 'Teacher'.
```

흥미롭게도 타입스크립트는 클래스의 동일한 멤버를 모두 포함하는 모든 객체 타입을 클래스에 할당할 수 있는 것으로 간주한다. 타입스크립트의 구조적 타이핑이 선언되는 방식이 아니라 객체의 형태만 고려하기 때문이다.

아래 `withSchoolBus`는 `SchoolBus` 타입의 매개변수를 받는다. 매개변수로 `SchoolBus` 클래스 인스턴스처럼 타입이 `() => string[]`인 `getAbilities` 속성을 가진 모든 객체를 할당할 수 있다.

```tsx
class SchoolBus {
  getAbilities() {
    return ["magic", "shapeshifting"];
  }
}

function withSchoolBus(bus: SchoolBus) {
  console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus());

withSchoolBus({
  getAbilities: () => ["transmorgrification"],
});

withSchoolBus({
  getAbilities: () => 123,
  //                  ^^^ Type 'number' is not assignable to type 'string[]'.
});
```

> 💡 대부분의 실제 코드에서 개발자는 클래스 타입을 요청하는 위치에 객체의 값을 전달하지 않는다.
> 이러한 구조적인 확인 동작은 예상하지 못한 것처럼 보일 수 있지만 자주 나타나지는 않는다.

# 4. 클래스와 인터페이스

타입스크립트는 클래스 이름 뒤에 implements 키워드와 인터페이스 이름을 추가함으로써 클래스의 해당 인스턴스가 인터페이스를 준수한다고 선언할 수 있다. 이렇게 하면 클래스를 각 인터페이스에 할당할 수 있어야 함을 타입스크립트에 나타낸다. 타입 검사기에 의해 모든 불일치에 대해 타입 오류가 발생한다.
아래 코드에서 `Student` 클래스는 `name` 속성과 `study` 메서드를 포함해 `Learner` 인터페이스를 올바르게 구현했지만 `Slacker`에는 `study`가 누락되어 타입 오류가 발생한다.

```tsx
interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  study(hours: number) {
    for (let i = 0; i < hours; i += 1) {
      console.log("studying...");
    }
  }
}

class Slacker implements Learner {
  //  ^^^^^^^ Class 'Slacker' incorrectly implements interface 'Learner'.
  //          Type 'Slacker' is missing the following properties from type 'Learner': name, study
}
```

> 💡 클래스에 의해 구현되는 인터페이스는 `Learner` 인터페이스에서 사용된 것처럼 인터페이스 멤버를 함수로 선언하기 위해 메서드 구문을 사용한다.

인터페이스를 구현하는 것으로 클래스를 만들어도 클래스가 사용되는 방식은 변경되지 않는다. 클래스가 이미 인터페이스와 일치하는 경우 타입스크립트의 타입 검사기는 인터페이스의 인스턴스가 필요한 곳에서 해당 인스턴스를 사용할 수 있도록 허용한다. 타입스크립트는 인터페이스에서 클래스의 메서드 또는 속성 타입을 유추하지 않는다. `Slacker` 코드에서 `study(hours){}` 메서드를 추가했다면 타입스크립트는 타입 애너테이션을 지정하지 않는 한 `hours` 매개변수를 암시적 `any`로 간주한다.

아래의 다른 형태로 구현한 `Student` 클래스는 멤버에 타입 애너테이션을 제공하지 않기 때문에 암시적인 `any` 타입 오류가 발생한다.

```tsx
interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name;
  //^^^^ Member 'name' implicitly has an 'any' type.

  study(hours) {}
  //    ^^^^^ Parameter 'hours' implicitly has an 'any' type.
}
```

인터페이스를 구현하는 것은 순전히 안정성 검사를 위한것이다. 모든 인터페이스 멤버를 클래스 정의로 복사하지 않는다. 대신 인터페이스를 구현하면 클래스 인스턴스가 사용되는 곳에서 나중에 타입 검사기로 신호를 보내고 클래스 정의에서 표면적인 타입 오류가 발생한다. 변수에 초깃값이 있더라도 타입 애너테이션을 추가하는 것과 용도가 비슷하다.

## 4.1 다중 인터페이스 구현

타입스크립트의 클래스는 다중 인터페이스를 구현해 선언할 수 있다. 클래스에 구현된 인터페이스 목록은 인터페이스 이름 사이에 쉼표를 넣고, 개수 제한 없이 인터페이스를 사용할 수 있다.

아래 두 클래스에서 모두 `Graded`를 구현하려면 `grages` 속성을 가져야하고, `Reporter`를 구현하려면 `report` 속성을 가져야 한다. `Empty` 클래스에는 `Graded`와 `Reporter` 인터페이스를 제대로 구현하지 못했으므로 두 가지 타입 오류가 발생한다.

```tsx
interface Graded {
  grades: number[];
}

interface Reporter {
  report: () => string;
}

class ReportCard implements Graded, Reporter {
  grades: number[];

  constructor(grades: number[]) {
    this.grades = grades;
  }

  report() {
    return this.grades.join(", ");
  }
}

class Empty implements Graded, Reporter {
  //  ^^^^^ Class 'Empty' incorrectly implements interface 'Graded'.
  //        Property 'grades' is missing in type 'Empty' but required in type 'Graded'.
  //        Class 'Empty' incorrectly implements interface 'Reporter'.
  //        Property 'report' is missing in type 'Empty' but required in type 'Reporter'.
}
```

실제로 클래스가 한 번에 두 인터페이스를 구현할 수 없도록 정의하는 인터페이스가 있을 수 있다. 두 개의 충돌하는 인터페이스를 구현하는 클래스를 선언하려고 하면 클래스에 하나 이상의 타입 오류가 발생한다.

아래 `AgeIsNumber`와 `AgeIsNotANumber` 인터페이스는 `age` 속성을 서로 다른 타입으로 선언한다. `AsNumber` 클래스와 `NotAsNumber` 클래스 모두 두 인터페이스를 제대로 구현하지 못했다.

```tsx
interface AgeIsNumber {
  age: number;
}

interface AgeIsNotANumber {
  age: () => string;
}

class AsNumber implements AgeIsNumber, AgeIsNotANumber {
  age: 0;
  //^^^ Property 'age' in type 'AsNumber' is not assignable to the same property in base type 'AgeIsNotANumber'.
  //    Type 'number' is not assignable to type '() => string'.
}

class NotAsNumber implements AgeIsNumber, AgeIsNotANumber {
  age() {
    return "";
  }
  //^^^ Property 'age' in type 'NotAsNumber' is not assignable to the same property in base type 'AgeIsNumber'.
  //    Type '() => string' is not assignable to type 'number'.
}
```

두 인터페이스가 매우 다른 객체 형태를 표현하는 경우에는 동일한 클래스로 구현하지 않아야 한다.

# 5. 클래스 확장

타입스크립트는 다른 클래스를 확장하거나 하위 클래스를 만드는 자바스크립트 개념에 타입 검사를 추가한다. 먼저 기본 클래스에 선언된 메서드나 속성은 파생 클래스라고도 하는 하위 클래스에서 사용할 수 있다.

아래 코드에서 `Teacher`는 `StudentTeacher` 하위 클래스의 인스턴스에서 사용할 수 있는 `teach` 메서드를 선언한다.

```tsx
class Teacher {
  teach() {
    console.log("The surest test of discipline is its absence.");
  }
}

class StudentTeacher extends Teacher {
  learn() {
    console.log("I cannot afford the luxury of a closed mind.");
  }
}

const teacher = new StudentTeacher();

teacher.teach();
teacher.learn();

teacher.other();
//      ^^^^^ Property 'other' does not exist on type 'StudentTeacher'.
```

## 5.1 할당 가능성 확장

파생 인터페이스가 기본 인터페이스를 확장하는 것과 마찬가지로 하위 클래스도 기본 클래스의 멤버를 상속한다. 하위 클래스의 인스턴스는 기본 클래스의 모든 멤버를 가지므로 기본 클래스의 인스턴스가 필요한 모든 곳에서 사용할 수 있다. 만약 기본 클래스에 하위 클래스가 가지고 있는 모든 멤버가 없으면 더 구체적인 하위 클래스가 필요할 때 사용할 수 없다.

아래 `Lesson` 클래스의 인스턴스는 파생된 `OnlineLesson` 인스턴스가 필요한 곳에서 사용할 수 없지만, 파생된 인스턴스는 기본 클래스 또는 하위 클래스를 충족하는데 사용할 수 있다.

```tsx
class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

let lesson: Lesson;
lesson = new Lesson("coding");
lesson = new OnlineLesson("coding", "https://example.com");

let online: OnlineLesson;
online = new OnlineLesson("coding", "https://example.com");

online = new Lesson("coding");
// ^^^^^^ Property 'url' is missing in type 'Lesson' but required in type 'OnlineLesson'.
```

타입스크립트의 구조적 타입에 따라 하위 클래스의 모든 멤버가 동일한 타입의 기본 클래스에 이미 존재하는 경우 기본 클래스의 인스턴스를 하위 클래스 대신 사용할 수 있다.

아래 코드의 `LabeledPastGrades`는 선택적 속성인 `PastGrades`만 추가하므로 하위 클래스 대신 기본 클래스의 인스턴스를 사용할 수 있다.

```tsx
class PastGrades {
  grades: number[];
}

class LabeledPastGrades extends PastGrades {
  label?: string;
}

let subClass: LabeledPastGrades;
subClass = new LabeledPastGrades();
subClass = new PastGrades();
```

> 💡 대부분의 실제 코드에서 하위 클래스는 일반적으로 기본 클래스 위에 새로운 필수 타입 정보를 추가한다.
> 이러한 구조적 검사 동작은 예상치 못한 것처럼 보일 수 있지만 자주 발생하지는 않는다.

## 5.2 재정의된 생성자

바닐라 자바스크립트와 마찬가지로 타입스크립트에서 하위 클래스는 자체 생성자를 정의할 필요가 없다. 자체 생성자가 없는 하위 클래스는 암묵적으로 기본 클래스의 생성자를 사용한다.

자바스크립트에서 하위 클래스가 자체 생성자를 선언하면 `super` 키워드를 통해 기본 클래스 생성자를 호출해야한다. 하위 클래스 생성자는 기본 클래스에서의 필요 여부와 상관없이 모든 매개변수를 선언할 수 있다. 타입스크립트의 타입 검사기는 기본 클래스 생성자를 호출할 때 올바를 매개변수를 사용하는지 확인한다.

아래 코드에서 `PassingAnnouncer`의 생성자는 `number` 인수를 사용해 기본 클래스인 `GradeAnnouncer`의 생성자를 올바르게 호출하는 반면, `FailingAnnouncer`는 기본 생성자를 올바르게 호출하지 않아 타입 오류가 발생한다.

```tsx
class GradeAnnouncer {
  message: string;

  constructor(grade: number) {
    this.message = grade >= 65 ? "Maybe next time." : "Congratulations!";
  }
}

class PassingAnnouncer extends GradeAnnouncer {
  constructor() {
    super(100);
  }
}

class FailingAnnouncer extends GradeAnnouncer {
  constructor() {}
  //^^^^^^^^^^^^^^^^ Constructors for derived classes must contain a 'super' call.
}
```

자바스크립트 규칙에 따르면 하위 클래스의 생성자는 `this` 또는 `super`에 접근하기 전에 반드시 기본 클래스의 생성자를 호출해야 한다. 타입스크립트는 `super()`를 호출하기 전에 `this` 또는 `super`에 접근하려고 하는 경우 타입 오류를 보고한다.

아래 `ContinueGradesTally` 클래스는 `super()`를 호출하기 전에 생성자에서 `this.grades`를 잘못 참조한다.

```tsx
class GradesTally {
  grades: number[] = [];

  addGrades(...grades: number[]) {
    this.grades.push(...grades);
    return this.grades.length;
  }
}

class ContinueGradeTally extends GradesTally {
  constructor(previousGrades: number[]) {
    this.grades = [...previousGrades];
    //^^^^ 'super' must be called before accessing 'this' in the constructor of a derived class.

    super();

    console.log("Starting with length", this.grades.length);
  }
}
```

## 5.3 재정의된 메서드

하위 클래스의 메서드가 기본 클래스의 메서드에 할당될 수 있는 한 하위 클래스는 기본 클래스와 동일한 이름으로 새 메서드를 다시 선언할 수 있다. 기본 클래스를 사용하는 모든 곳에 하위 클래스를 사용할 수 있으므로 새 메서드의 타입도 기본 메서드 대신 사용할 수 있어야 한다.

아래 코드의 `FailureCounter`의 `countGrades` 메서드는 기본 `GradeCounter`의 `countGrades` 메서드의 반환 타입과 첫 번째 매개변수가 동일하기 때문에 허용된다. `AnyFailureChecker`의 `countGrades`는 잘못된 반환 타입을 가지므로 타입 오류가 발생한다.

```tsx
class GradeCounter {
  countGrades(grades: string[], letter: string) {
    return grades.filter((grade) => grade === letter).length;
  }
}

class FailureCounter extends GradeCounter {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
  }
}

class AnyFailureChecker extends GradeCounter {
  countGrades(grades: string[]) {
    //^^^^^^^^^^^ Property 'countGrades' in type 'AnyFailureChecker' is not assignable to the same property in base type 'GradeCounter'.
    //            Type '(grades: string[]) => boolean' is not assignable to type '(grades: string[], letter: string) => number'.
    //            Type 'boolean' is not assignable to type 'number'.
    return super.countGrades(grades, "F") !== 0;
  }
}

// const counter: GradeCounter = new AnyFailureChecker();
const counter = new AnyFailureChecker();

const count = counter.countGrades(["A", "C", "F"]);
// 예상한 타입은 number이지만, boolean이 나온다.
```

## 5.4 재정의된 속성

하위 클래스는 새 타입을 기본 클래스의 타입에 할당할 수 있는 한 동일한 이름으로 기본 클래스의 속성을 명시적으로 다시 선언할 수 있다. 재정의된 메서드와 마찬가지로 하위 클래스는 기본 클래스와 구조적으로 일치해야 한다.

속성을 다시 선언하는 대부분의 하위 클래스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 기본 클래스 속성 타입에서 확장되는 타입으로 만든다.

아래 코드에서 기본 클래스 `Assignment`는 `grade`를 `number | undefined`로 선언하고 하위 클래스 `GradedAssignment`는 `grade`를 항상 존재하는 `number` 타입으로 선언한다.

```tsx
class Assignment {
  grade?: number;
}

class GradedAssignment extends Assignment {
  grade: number;

  constructor(grage: number) {
    super();
    this.grade = grage;
  }
}
```

속성의 유니언 타입의 허용된 값 집합을 확장할 수는 없다. 만약 확장한다면 하위 클래스 속성은 더 이상 기본 클래스 속성 타입에 할당할 수 없다.

아래 코드에서 `VagueGrade`의 `value`는 기본 클래스 `NumericGrade`의 `number` 타입에 `| string`을 추가하려고 하므로 타입 오류가 발생한다.

```tsx
class NumericGrade {
  value = 0;
}

class VagueGrade extends NumericGrade {
  value = Math.random() > 0.5 ? 1 : "...";
  //^^^^^ Property 'value' in type 'VagueGrade' is not assignable to the same property in base type 'NumericGrade'.
  //      Type 'string | number' is not assignable to type 'number'.
  //      Type 'string' is not assignable to type 'number'.
}

// const instance: NumericGrade = new VagueGrade();
const instance = new VagueGrade();

instance.value; // 예상한 타입은 number이지만 실제 타입은 number | string이다.
```

# 6. 추상 클래스

때로는 일부 메서드의 구현을 선언하지 않고, 대신 하위 클래스가 해당 메서드를 제공할 것을 예상하고 기본 클래스를 만드는 방법이 유용할 수 있다. 추상화하려는 클래스 이름과 메서드 앞에 타입스크립트의 `abstract` 키워드를 추가한다. 이러한 추상화 메서드 선언은 추상화 기본 클래스에서 메서드의 본문을 제공하는 것을 건너뛰고, 대신 인터페이스와 동일한 방식으로 선언된다.

아래 코드에서 `School` 클래스와 `getStudentTypes` 메서드는 `abstract`로 표시된다. 그러므로 하위 클래스인 `Preschool`과 `Absence`는 `getStudentTypes`를 구현해야 한다.

```tsx
abstract class School {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract getStudentTypes(): string[];
}

class Preschool extends School {
  getStudentTypes() {
    return ["preschooler"];
  }
}

class Absence extends School {}
//    ^^^^^^^ Non-abstract class 'Absence' does not implement all abstract members of 'School'
```

구현이 존재한다고 가정할 수 있는 일부 메서드에 대한 정의가 없기 때문에 추상 클래스를 직접 인스턴스화할 수 없다. 추상 클래스가 아닌 클래스만 인스턴스화할 수 있다.

위 코드에 추가해서 `new School`을 호출하려고 하면 타입스크립트 오류가 발생한다.

```tsx
// ... 생략

let school: School;
school = new Preschool("Happy Kids");

school = new School("somewhere else");
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot create an instance of an abstract class.
```

추상 클래스는 클래스의 세부 사항이 채워질 거라 예상되는 프레임워크에서 자주 사용된다.
클래스는 앞에서 살펴본 `school : School` 예제에서처럼 값이 클래스를 준수해야 함을 나타내는 타입 애너테이션으로 사용할 수 있다. 그러나 새 인스턴스를 생성하려면 하위 클래스를 사용해야 한다.

# 7. 멤버 접근성

자바스크립트에서는 클래스 멤버 이름 앞에 `#`을 추가해 `private` 클래스 멤버임을 나타낸다. `private` 클래스 멤버는 해당 클래스 인스턴스에서만 접근할 수 있다. 자바스크립트 런타임은 클래스 외부 코드 영역에서 `private` 메서드나 속성에 접근하려고 하면 오류를 발생시킴으로써 프라이버시를 강화시킨다.

타입스크립트의 클래스 지원은 자바스크립트의 `#` 프라이버시보다 먼저 만들어졌다. 또한 타입스크립트는 `private` 클래스 멤버를 지원하지만, 타입 시스템에만 존재하는 클래스 메서드와 속성에 대해 조금 더 미묘한 프라이버시 정의 집합을 허용한다. 타입스크립트의 멤버 접근성(가시성visibility)은 클래스 멤버의 선언 이름 앞에 아래 키워드 중 하나를 추가해 만든다.

- `public` (기본값): 모든 곳에서 누구나 접근 가능
- `protected` : 클래스 내부 또는 하위 클래스에서만 접근 가능
- `private` : 클래스 내부에서만 접근 가능

이러한 키워드는 순수하게 타입 시스템 내에 존재한다. 코드가 자바스크립트로 컴파일되면 다른 모든 타입 시스템 구문과 함께 키워드도 제거 된다.

아래 `Base` 클래스는 두 개의 `public` 멤버와 한 개의 `protected`, 한 개의 `private`, 그리고 `#truePrivate`을 사용해 한 개의 `private`을 선언한다. `Subclass`는 `public`과 `protected` 멤버는 접근할 수 있지만 `private`와 `#truePrivate`은 접근할 수 없다.

```tsx
class Base {
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2;
  private isPrivate = 3;
  #truePrivate = 4;
}

class Subclass extends Base {
  exmaple() {
    this.isPublicImplicit;
    this.isPublicExplicit;
    this.isProtected;

    this.isPrivate;
    //   ^^^^^^^^^ Property 'isPrivate' is private and only accessible within class 'Base'.
    this.#truePrivate;
    //   ^^^^^^^^^^^^ Property '#truePrivate' is not accessible outside class 'Base' because it has a private identifier.
  }
}

new Subclass().isPublicImplicit;
new Subclass().isPublicExplicit;

new Subclass().isProtected;
//             ^^^^^^^^^^^ Property 'isProtected' is protected and only accessible within class 'Base' and its subclasses.

new Subclass().isPrivate;
//             ^^^^^^^^^ Property 'isPrivate' is private and only accessible within class 'Base'.
```

타입스크립트의 멤버 접근성은 타입 시스템에서만 존재하는 반면 자바스크립트의 `private` 선언은 런타임에도 존재한다는 점이 주요 차이점이다. `protected` 또는 `private`으로 선언된 타입스크립트 클래스 멤버는 명시적으로 또는 암묵적으로 `public`으로 선언된 것처럼 동일한 자바스크립트 코드로 컴파일된다. 인터페이스와 타입 애너테이션처럼 접근성 키워드는 자바스크립트로 컴파일될 때 제거된다. 자바스크립트 런타임에서는 `# private` 필드만 진정한 `private`이다.

접근성 제한자는 `readonly`와 함께 표시할 수 있다. `readonly`와 명시적으로 접근성 키워드로 멤버를 선언하려면 접근성 키워드를 먼저 적어야 한다.

아래 `TwoKeywords` 클래스는 `name` 멤버를 `private`와 `readonly`로 선언한다.

```tsx
class TwoKeywords {
  private readonly name: string;

  constructor() {
    this.name = "Mark";
  }

  log() {
    console.log(this.name);
  }
}

const two = new TwoKeywords();

two.name = "Nana";
//  ^^^^ Property 'name' is private and only accessible within class 'TwoKeywords'.
//       Cannot assign to 'name' because it is a read-only property.
```

타입스크립트의 이전 멤버 접근성 키워드를 자바스크립트의 `# private` 필드와 함께 사용할 수 없다는 점을 기억해야한다. `private` 필드는 기본적으로 항상 `private`이므로 `private` 키워드를 추가로 표시할 필요가 없다.

## 7.1 정적 필드 제한자

자바스크립트는 `static` 키워드를 사용해 클래스 자체에서 멤버를 선언한다. 타입스크립트는 `static` 키워드를 단독으로 사용하거나 `readonly`와 접근성 키워드를 함께 사용할 수 있도록 지원한다. 함께 사용할 경우 접근성 키워드를 먼저 작성하고, 그 다음 `static`, `readonly` 키워드가 온다.

아래 `Question` 클래스는 `protected`, `static`, `readonly`를 모두 사용해 `prompt`와 `answer` 속성을 만든다.

```tsx
class Question {
  protected static readonly answer: "bash";
  protected static readonly prompt = "What's an ogre's favorite food?";

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt);

    if (answer === Question.answer) {
      console.log("Correct!");
    } else {
      console.log("Wrong, try again.");
    }
  }
}

Question.answer;
//       ^^^^^^ Property 'answer' is protected and only accessible within class 'Question' and its subclasses.
```

`static` 클래스 필드에 대해 `readonly`와 접근성 제한자를 사용하면 해당 필드가 해당 클래스 외부에서 접근되거나 수정되는 것을 제한하는데 유용하다.
