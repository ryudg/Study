# 원티드 프리온보딩 프론트엔드 챌린지 1월 사전과제

🗓️ 2023.12.18

1. 전역변수를 사용하면 어떤 장점이 있나요?

- 접근성: 전역 변수는 어디서든 접근할 수 있습니다. 따라서 데이터를 반복적으로 인수로 전달할 필요 없이 여러 함수 간에 데이터를 공유할 수 있습니다.
- 재사용성: 전역 변수는 지역 변수와 달리 저장된 값이 가비지 컬렉션의 대상이 되지 않습니다. 따라서 전역 변수에 저장된 데이터는 언제든지 재사용할 수 있습니다.

2. e2e 테스트는 무엇인가요?

- e2e 테스트는 End to End 테스트의 약자로, 사용자의 관점에서 시스템이나 애플리케이션을 테스트하는 것을 말합니다.
  사용자의 관점에서 시스템을 테스트하기 때문에 유닛 테스트로 불가능한 시스템의 실제 동작을 다양한 시나리오로 테스트할 수 있다는 장점이 있지만,
  시스템의 실제 동작을 테스트하기 때문에 테스트 코드 작성에 많은 시간이 소요되며, 테스트 코드의 유지보수 비용이 크다는 단점이 있습니다.

3. 테스트에서 `mocking`이란 무엇인가요?

- mocking은 테스트에서 실제 의존성을 대체하는 가짜 객체mock를 만드는 것을 말합니다.
  테스트에서 실제 의존성을 사용하면 테스트의 결과가 의존성에 영향을 받기 때문에 테스트의 결과가 항상 일정하지 않기 때문에, 가짜 객체를 사용하여 테스트의 결과를 일정하게 만들 수 있습니다.

4. Web Vitals에 대해 설명해주세요

- Web Vitals은 구글이 주요 웹 사이트 품질 지표 중 하나인 사용자 경험을 위해 사이트를 어떻게 측정했는 지 확인할 수 있는 측정 지표입니다.
- 성능에 영향을 미치는 핵심적인 세 가지 측정 항목은 아래와 같습니다.
  1. LCP(Largest Contentful Paint): 페이지 로드 시 가장 큰 요소가 화면에 표시되는 시점을 측정합니다.
  2. FID(First Input Delay): 페이지가 로드된 후 사용자가 페이지와 상호작용할 수 있는 시점을 측정합니다.
  3. CLS(Cumulative Layout Shift): 페이지 로드 시 화면에 표시되는 요소들이 얼마나 불안정한지 측정합니다.