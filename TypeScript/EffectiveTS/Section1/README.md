# 들어가기 앞서

1장에서는 타입스크립트의 큰 그림을 이해하는 데 도움이 될 내용을 다룬다.

본격적인 내용에 앞서 타입스크립트란 무엇이고, 타입스크립트를 어떻게 여겨야 하는지, 자바스크립트와는 어떤 관계인지, 타입스크립트의 타입들은 `null`이 가능한지, `any`` 타입에서는 어떨지, 덕 타이핑(duck typing)이 가능한지 등을 알아본다.

타입스크립트는 사용 방식 면에서 조금은 독특한 언어이다.
인터프리터(Python이나 Ruby)로 실행되는 것도 아니고, 저수준 언어로 컴파일(Java나 C같은)되는 것도 아니다.
또 다른 고수준 언어인 자바스크립트로 컴파일 되며, 실행 역시 타입스크립트가 아닌 자바스크립트로 이루어진다. 그래서 타입스크립트와 자바스크립트의 관계는 필연적이며, 이 밀접한 관계 때문에 혼란스러운 일이 벌어지기도 한다. 이러한 타입스크립트와 자바스크립트의 관계를 잘 이해한다면 타입스크립트 개발자로서 한 단계 성장할 수 있다.

타입스크립트의 타입 시스템도 조금 독특한 특징을 가지고 있는데, 이 특징들을 자세히 알아둬야 한다.
타입 시스템에 관해서는 2장에서 다시 알아보자.
