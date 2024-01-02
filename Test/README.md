# 테스트 코드

테스트 코드는 소프트웨어의 기능과 동작을 테스트하는 데 사용되는 코드이며, 개발자가 작성한 코드를 실행하고 예상된 결과가 정상적으로 나오는지 확인하는 데 사용한다.

우선 테스트 코드의 장단점을 살펴보면,

- 장점

  - 테스트 코드를 작성하면 버그를 사전에 찾아내고 수정할 수 있으며, 변경이나 업데이트 시 기존 기능이 올바르게 작동하는지 확인할 수 있고 이를 통해 의도치 않은 결과나 버그를 빠르게 발견하고 수정할 수 있다.
  - 또한 명확하게 작성된 테스트 코드는 하나의 문서로 작용할 수 있으며 이를 통해 코드의 예상 동작을 파악할 수 있고, 협업 시 다른 개발자가 작성한 코드를 이해하는 데 도움을 준다.
  - 테스트 코드를 리팩토링 전에 작성을 해두면 리팩토링 후 코드의 기능이 변경되었는지 확인할 수 있고, 리팩토링 과정에서 버그가 발생했는지 확인할 수 있는 하나의 안전망이 된다.

- 단점

  - 테스트 코드를 작성하면 개발 시간이 증가할 수 있으며 이는 개발 비용이 증가하는 것을 의미한다.
  - 모든 시나리오를 고려한 테스트 코드 작성은 불가능에 가깝다. 따라서 테스트 코드를 작성하더라도 모든 버그를 찾아내지는 못한다.
  - 테스트 코드를 작성하면 코드의 유연성이 떨어지고, 코드의 변경에 따라 테스트 코드도 변경해야 하는 추가 비용이 발생한다.

등이 있다.

위와 같은 단점이 있음에도, 테스트 코드를 작성하는 것이 좋은 이유는 테스트 코드를 작성하지 않았을 때의 단점이 더 크기 때문이다.

## 테스트 목적

테스트 코드를 작성할 때는 무엇을 테스트할 것인지를 먼저 정해야 하며, 테스트 코드의 목적에 대해 명확하게 정의해야 한다.

테스트 코드의 목적은 **"코드가 올바르게 예상대로 동작하는지 확인하는 것"** 이다.

코드가 올바르게 동작한다는 것은 사용자가 문제 없이 서비스를 이용할 수 있다는 것이다.
이는 사용자가 서비스를 이용하는 흐름(비즈니스 로직)에서 발생할 수 있는 이벤트(버튼 클릭, 사용자의 입력, 외부 API 호출 등)에 대해 예상 한 대로 동작하는지를 확인한다는 것을 의미한다.

## 테스트 종류

프론트엔드에 주로 사용되는 테스트 종류는 크게 3가지로 나눌 수 있다.

1. 유닛 테스트(Unit Test)
2. 통합 테스트(Integration Test)
3. E2E 테스트(End-to-End Test)

### 유닛 테스트

Unit, 말 그대로 코드의 **최소 단위**를 테스트하는 것이다.

리액트에서 유닛은 단일 컴포넌트가 될 수 있다. 로그인을 예로 들어보면,

1. 아이디, 비밀번호 인풋 혹은 버튼 렌더링이 정상적으로 되는지
2. 아이디 인풋에 아이디를 입력하면 아이디가 입력되는지
3. 버튼을 클릭하면 로그인이 되는지

등이 유닛 테스트의 예시가 될 수 있다.

가장 작은 단위를 테스트 하기 때문에 테스트 코드를 작성하기 쉽고 양이 적으며, 테스트 코드의 실행 속도가 빠르고 효율적이다.
또한 TDD 적용시 가장 작은 단위부터 기능대로 동작하는지 확인하며 개발하기에 용이하고, 테스트 코드를 작성하면서 코드의 설계를 잘 할 수 있도록 도와준다.

하지만, 서비스의 구조가 명확하지 않고 단일 유닛의 기능이 자주 변경될 경우 테스트 또한 자주 변경되어야 하기 때문에 유지보수가 어려울 수 있다.

### 통합 테스트

통합된 기능들을 테스트 한다. 즉, 유닛 테스트가 단일 컴포넌트를 기준으로 테스트를 했다면 통합 테스트는 **여러 유닛들의 상호작용을 테스트** 한다.

유닛 테스트와 동일하게 로그인을 예로 들어보면,

1. 로그인 버튼을 클릭하고, 로그인이 성공했을 때 원하는 페이지로 이동하는지
2. 혹은 로그인이 실패했을 때 별도의 알림이 뜨는지

등을 통합 테스트의 예시로 들 수 있다.

유닛 테스트보다는 테스트 코드의 양이 많아지고, 여러 유닛들을 통합해 테스트 하기 때문에 신뢰성이 떨어질 수도 있다.

### E2E 테스트

E2E 테스트는 **사용자의 관점에서 테스트** 한다. 즉, 유닛 테스트와 통합 테스트를 포함해 사용자가 서비스를 이용함에 있어 발생할 수 있는 모든 시나리오를 테스트 한다.
따라서 백엔드와의 통신이 필요하거나, 외부 API를 호출하는 경우에도 테스트가 가능하다.

다른 테스트와 달리 전체 시나리오를 테스트하기 때문에 서비스의 무결성을 보장할 수 있지만 수많은 테스트 코드가 필요하며 테스트 코드의 실행 속도가 느리고, 자주 테스트를 할 수 없다는 단점이 있다.

> 일반적으로 유닛, 통합 테스트는 Jest를 E2E 테스트는 Cypress를 사용하지만, Cypress로도 유닛, 통합 테스트를 할 수 있다.

> ✨ E2E 테스트가 가장 우선이 되어야한다. 결국 사용자가 서비스를 이용하는 것이 목적이기 때문에 사용자의 관점에서 테스트가 우선이다.

### TDD란?

TDD는 Test-Driven Development의 약자로 자동화된 테스트 코드를 미리 짜두고 이를 통과시키는 코드를 반복하여 구현하는 소프트웨어 방법론이다.
에자일 방법론 중 하나인 eXtream Programming(XP)에 기반을 두었기 때문에 예측보다는 경험을 통해 지속적으로 프로토타입을 완성해가는 방식이다.

TDD는 짧은 개발 주기의 반복에 의존하는 개발 프로세스로, 아래의 3가지 단계로 이루어진다.

1. 실패하는 테스트 코드 작성
2. 테스트 코드를 통과하는 코드 작성
3. 코드 리팩토링

이 과정에서 중요한 점은, 먼저 실패하는 테스트 코드를 작성하는 것과 실패하는 테스트 코드를 통과하는 코드만 작성하는 것이다.

- 장점
  - 객체지향적인 코드 설계를 할 수 있도록 도와준다.
    - 기능 별 모듈화가 잘 되어있는 코드를 작성할 수 있고, 이를 통해 코드의 재사용성이 높아진다.
    - 이를 통해 종속성과 의존성이 낮은 모듈로 조합된 개발이 가능해진다.
  - 재설계 시간 단축
    - 테스트 코드를 먼저 작성하기 때문에 무엇을 해야 하는지 명확하게 정의할 수 있고, 이를 통해 개발 시간을 단축할 수 있다.
    - 테스트 시나리오를 작성하면서 예외사항을 미리 파악해 전반적인 설계가 변경되는 경우가 적어진다.
  - 디버깅 시간 단축
    - 자동화 유닛 테스트를 전제로 하기 때문에 디버깅 시간이 단축된다.
- 단점
  - 생산성 저히
    - 테스트 코드를 작성하는 시간이 추가되기 때문에 생산성이 저하될 수 있다.
  - 러닝 커브
    - TDD를 처음 접하는 개발자는 테스트 코드를 작성하는 데 시간이 오래 걸릴 수 있다.