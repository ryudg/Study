# 3. 클래스

16.8 버전 이전의 리액트에서는 모든 컴포넌트가 클래스로 작성되어 있었다. 함수형 컴포넌트의 역사는 얼마 되지 않았으며, 따라서 개발된지 오래돈 애플리케이션 혹은 라이브러리를 다룰 때 클래스형 컴포넌트를 사용할 때가 있다.

## 3.1 클래스란 무엇인가

자바스크립트의 클래스란 특정 객체를 만들기 위한 일종의 템플릿과 같은 개념이다. 즉, 특정한 형태의 객체를 반복적으로 만들기 위해 사용되는 것이 클래스다.
ES6 이전에는 클래스가 없었기 때문에 객체를 만드는 템플릿 역할은 함수(생성자 함수)가 담당했다. 따라서 클래스로 작성된 모든 것을 함수로도 작성할 수 있다.

```js
class Dog {
  // constructor는 생성자이며 최초에 생성할 때 어떤 인수를 받을지 결정하며, 객체를 초기화한다.
  constructor(name) {
    this.name = name; // property
  }

  // 메서드
  bark() {
    console.log(`${this.name}: 멍멍!`);
  }

  // 정적 메서드
  static info() {
    console.log("개입니다.");
  }

  // setter
  set nickname(nickname) {
    this.nick = nickname;
  }

  // getter
  get nickname() {
    return this.nick;
  }
}

// Dog 클래스를 사용해 dog 객체를 생성한다.
const dog = new Dog("나비");

// dog 객체의 bark 메서드를 호출한다.
dog.bark(); // 나비: 멍멍!

// 정적 메서드는 클래스에서 직접 호출한다.
Dog.info(); // 개입니다.

// 정적 메서드는 클래스로 만든 객체(인스턴스)에서는 호출할 수 없다.
dog.info(); // Uncaught TypeError: dog.info is not a function

// setter를 사용해 nickname을 설정한다.
dog.nickname = "바둑이";

// getter를 사용해 nickname을 조회한다.
console.log(dog.nickname); // 바둑이
```

**`constructor`**
`constructor`는 생성자로, 객체를 생성하는 특수한 메서드다. 단 하나만 존재할 수 있으며, 여러 개의 생성자를 만들면 에러가 발생한다. 생성자에서 수행할 작업이 없다면 생략할 수 있다.

**`property`**
`property`란 클래스로 인스턴스를 생성할 때 내부에 정의할 수 있는 속성값을 의미한다.
인스턴스 생성 시 `constructor` 내부에는 빈 객체가 할당되어 있는데, 이 객체의 `property`의 키와 값을 넣어 사용한다.

**`getter` & `settet`**
`getter`는 클래스에서 값을 가져올 때 사용하며 `getter`을 사용하기 위해서는 `get` 키워드를 붙이고 `getter`의 이름을 선언한다.
반대로 `setter`는 값을 설정할 때 사용하며 `setter`를 사용하기 위해서는 `set` 키워드를 붙이고 `setter`의 이름을 선언한다.

**instance method**
인스턴스 메서드는 클래스 내부에서 선언한 메서드를 의미한다. 실제 자바스크립트의 prototype에 선언되므로 프로토타입 메서드라고도 한다.
위의 `Dog` 예제에서 `bark` 메서드가 이에 해당하며,
`Object.getPrototypeOf(dog)`를 실행하면 `{constructor: ƒ, bark: ƒ}`와 같이 `bark` 메서드가 프로토타입에 선언되어 있는 것을 확인할 수 있고, `{constructor: ƒ, bark: ƒ}`를 반환받아 `Dog`의 `prototype`을 받은 것으로 이해할 수 있다.
또한 이를 확인해보기 위해 `Object.getPrototypeOf(Dog) === Dog.prototype`를 실행하면 `true`를 반환받는다.

**static method**
정적 메서드는 클래스의 인스턴스가 아닌 이름으로 호출할 수 있는 메서드를 의미한다. 클래스 내부에서 `static` 키워드를 붙여 선언한다.
위의 `Dog` 예제에서 `info` 메서드가 이에 해당하며, `Dog.info()`와 같이 호출할 수 있다.

정적 메서드 내부의 `this`는 클래스로 생성된 인스턴스가 아닌, 클래스 자신을 가리키기 때문에 다른 메서드에서 일반적으로 사용하는 `this`를 사용할 수 없다.
정적 메서드는 비록 `this`에 접근할 수는 없지만, 인스턴스를 생성하지 않아도 사용할 수 있다는 점과 생성하지 않아도 접근할 수 있기에 객체럴 생성하지 않아도 여러 곳에서 재사용할 수 있다는 장점이 있다.

**상속(Inheritance)**
리액트에서 클래스형 컴포넌트를 만들기 위해 `extends React.Component` 또는 `extends React.PureComponent`를 사용하는데 이 `extends`는 기존 클래스를 상속받아 자식 클래스에서 상속받은 클래스를 확장하는 개념이다.
상속을 사용하면 기존 클래스의 모든 기능을 그대로 사용할 수 있으면서 새로운 기능을 추가할 수 있다.

위의 Dog 클래스를 상속받아 새로운 클래스를 만들어보자.

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(`${this.name}: 멍멍!`);
  }
}

class Cat extends Dog {
  constructor(name) {
    super(name); // super는 부모 클래스의 constructor를 호출한다.
  }

  meow() {
    super.bark(); // super는 부모 클래스의 메서드를 호출한다.
    console.log(`${this.name}: 냐옹?`);
  }
}

const cat = new Cat("나비");

cat.meow(); // 나비: 멍멍! / 나비: 냐옹?
cat.bark(); // 나비: 멍멍!
```

## 3.2 클래스와 함수의 관계

ES6 이전에는 프로토타입을 활용해 클래스의 작동 방식을 동일하게 구현할 수 있으며, 클래스가 작동하는 방식은 자바스크립트의 프로토타입을 활용하는 것이라고 이해할 수 있다.

<details>
<summary>클래스 코드를 바벨에서 트랜스 파일</summary>
<div>

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(`${this.name}가 멍멍`);
  }

  static meow() {
    console.log(`${this.name}가 냐옹`);
  }

  set age(value) {
    this.dogAge = value;
  }

  get age() {
    return this.dogAge;
  }
}
```

```js
"use strict";

// 클래스가 함수처럼 호출되는 것을 방지
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// 프로퍼티를 할당하기 위한 함수
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

// 프로토타입 메서드와 정적 메서드를 선언하기 위한 함수
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Dog = /*#__PURE__*/ (function () {
  function Dog(name) {
    _classCallCheck(this, Dog);

    this.name = name;
  }

  _createClass(
    Dog,
    [
      {
        key: "bark",
        value: function bark() {
          console.log("".concat(this.name, "\uAC00 \uBA54\uBA54"));
        },
      },
    ],
    [
      {
        key: "meow",
        value: function meow() {
          console.log("undefined\uAC00 \uB098\uC57C");
        },
      },
      {
        key: "age",
        set: function set(value) {
          this.dogAge = value;
        },
        get: function get() {
          return this.dogAge;
        },
      },
    ]
  );

  return Dog;
})();
```

</div>
</details>

<details>
<summary>클래스 코드를 생성자 함수로 변환</summary> 
<div>

```js
var Dog = (function () {
  function Dog(name) {
    this.name = name;
  }

  // 프로토타입 메서드, 실제로 프로토타입에 할당해야 프로토타입 메서드가 된다.
  Dog.prototype.bark = function bark() {
    console.log("".concat(this.name, "\uAC00 \uBA54\uBA54"));
  };

  // 정적 메서드, 인스턴스를 생성하지 않아도 호출할 수 있다.
  Dog.meow = function meow() {
    console.log("undefined\uAC00 \uB098\uC57C");
  };

  // Dog 객체에 속성을 직접 정의
  Object.defineProperty(Dog.prototype, "age", {
    // setter
    set: function set(value) {
      this.dogAge = value;
    },
    // getter
    get: function get() {
      return this.dogAge;
    },
  });

  return Dog;
})();
```

</div>
</details>

## 3.3 요약

자바스크립트의 클래스도 객체를 생성하기 위해 도움이 되는 여러 기능을 제공하고 있으며 기능이 지속적으로 추가되고 제안되고 있다.

과거의 리액트 코드들은 클래스형 컴포넌트로 작성되었기 때문에 클래스를 이해해야

1. 클래스형 컴포넌트의 생명주기를 이해할 수 있으며,
2. 메서드가 화살표 함수와 일반 함수일 때 차이점,
3. 클래스형 컴포넌트 생성을 위해 `React.Component`, `React.PureComponent`를 상속받아야 하는 이유를 이해할 수 있다.
