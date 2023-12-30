# 5. 이벤트 루프와 비동기 통신의 이해

자바스크립트는 싱글 스레드에서 작동한다. 즉, 자바스크립트는 한 번에 하나의 작업만 처리할 수 있다.

> **동기(synchronous)** 란 직렬 방식으로 작업을 처리하는 것을 의미하며, 요청이 시작된 이후에는 무조건 응답을 받은 이후에 다음 작업을 처리할 수 있다. 그동안 다른 작업은 대기해야 한다.
> **비동기(asynchronous)** 란 병렬 방식으로 작업을 처리하는 것을 의미하며, 요청이 시작된 후 응답이 오건 말건 상관없이 다음 작업을 처리할 수 있다. 즉, 한 번에 여러 작업을 처리할 수 있다.

하지만 싱글 스레드의 동기식으로 작동하는 자바스크립트는 웹 페이지에서 다양한 비동기 작업을 수행하고 있다.

## 5.1 싱글 스레드 자바스크립트

과거에는 프로그램을 실행하는 단위가 프로세스뿐이었다.

> **프로세스(process)** 란 프로그램을 구동해 프로그램의 상태가 메모리상에서 실행되는 작업 단위를 의미한다. 즉, 하나의 프로그램 실행은 하나의 프로세스를 가지고 그 프로세스 내부에서 모든 작업이 처리되는 것을 의미한다.

소프트웨어의 복잡성이 증가함에 따라 하나의 프로그램에서 동시에 여러 개의 복잡한 작업을 수행하기 어려워졌다. 이를 해결하기 위해 **스레드(thread)** 라는 개념이 등장했다.
스레드는 하나의 프로세스 내에서 동작하며, 여러 개의 스레드를 생성하고 메모리를 공유하여 여러 작업을 동시에 처리할 수 있고 이로 인해 하나의 프로세스 내에서 동시 다발적인 작업을 처리할 수 있게 되었다.

멀티 스레드는 여러 이점을 가지고 있지만 내부적으로 처리가 복잡하다는 단점도 있다. 스레드는 같은 자원에 동시에 접근할 수 있기 때문에 동시성 문제가 발생할 수 있으며, 이에 대한 처리가 필요다.
또한, 하나의 스레드에 문제가 발생하면 같은 자원을 공유하는 다른 스레드에도 동시에 문제가 발생할 수 있다.

자바스크립트가 멀티 스레딩을 지원한다면 동시에 여러 스레드가 DOM을 조작할 수 있어 타이밍 이슈나 DOM 표시에 문제가 발생할 수 있다. 이러한 문제와 더불어 멀티 스레딩을 지원하면서 발생하는 다른 여러 문제로 인해 자바스크립트는 싱글 스레드로 동작한다.

싱글스레드인 자바스크립트는 코드의 실행이 하나의 스레드에서 순차적으로 이뤄지며, "Run to completion"이라는 특징을 가지고 있다.
이는 코드를 한 줄 한 줄 실행하고, 한 작업이 끝나기 전까지는 다른 작업을 실행하지 않는다는 의미다. 이러한 특징은 동시성을 고민할 필요가 없다는 장점을 제공하지만, 웹 페이지에서는 사용자가 멈춘 느낌을 받을 수 있는 단점이 될 수도 있다.

자바스크립트에서 비동기 함수를 선언할 때 사용하는 `async`는 "asynchronous"의 약자이며 이는 동시에 일어나지 않는 것을 의미한다.
동기식과 달리 요청한 즉시 결과가 주어지지 않을 수도 있고, 응답이 언제 올지 알 수 없지만 여러 작업을 동시에 처리할 수 있다는 장점이 있다.

<details>
<summary>비동기 예시</summary>

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

setTimeout(() => {
  console.log("3");
}, 100);

console.log("4");
```

출력의 순서가 1, 4, 2, 3으로 나타난다는 것을 알 수 있다.
하지만 싱글 스레드인 자바스크립트는 "Run to completion"으로 1, 2(100ms 후), 3, 4로 출력되어야 정상이지만, 그렇지 않다. 이를 이해하기 위해서는 "이벤트 루프"를 이해해야 한다.

</details>

## 5.2 이벤트 루프

**이벤트 루프** 는 ECMAScript(자바스크립트 표준)에 나와있는 내용은 아니지만, 자바스크립트 런타임 외부에서 자바스크립트의 비동기 실행을 돕기 위해 만들어진 장치다.

### 5.2.1 호출 스택과 이벤트 루프

**호출 스택(call stack)** 은 자바스크립트에서 수행해야 할 코드나 함수를 순차적으로 담아두는 스택이다.

<details>

<summary>호출 스택 예시</summary>

```js
function bar() {
  console.log("bar");
}

function bazz() {
  console.log("bazz");
}

function foo() {
  console.log("foo");
  bar();
  bazz();
}

foo();
```

위 코드는 아래의 순서로 호출 스택에 쌓이고 비워지게 된다.

1. `foo` 함수가 호출 스택에 들어간다.
2. `foo` 함수 내부에서 `console.log("foo")`가 호출 스택에 들어간다.
3. 2번이 실행되고 다음 코드로 넘어간다. (`foo` 함수는 아직 존재)
4. `bar` 함수가 호출 스택에 들어간다.
5. `bar` 함수 내부의 `console.log("bar")`가 호출 스택에 들어간다.
6. 5번이 실행되고 다음 코드로 넘어간다. (`foo`, `bar` 함수는 아직 존재)
7. `bar` 함수 내부에 남은 것이 없으므로 호출 스택에서 제거된다. (`foo` 함수는 아직 존재)
8. `bazz` 함수가 호출 스택에 들어간다.
9. `bazz` 함수 내부의 `console.log("bazz")`가 호출 스택에 들어간다.
10. 9번이 실행되고 다음 코드로 넘어간다. (`foo`, `bazz` 함수는 아직 존재)
11. `bazz` 함수 내부에 남은 것이 없으므로 호출 스택에서 제거된다. (`foo` 함수는 아직 존재)
12. `foo` 함수 내부에 남은 것이 없으므로 호출 스택에서 제거된다.
13. 호출 스택이 완전히 비워진다.

호출 스택이 비어 있는지 여부를 확인하는 것이 이벤트 루프의 역할이다.
이벤트 루프는 단순히 이벤트 루프만의 단일 스레드 내부에서 호출 스택 내부에 수행해야 할 작업이 있는지 확인하고, 수행할 코드가 있다면 자바스크립트 엔진을 이용해 실행한다.
여기서 알아둘 점은 "코드를 실행하는 것"과 "호출 스택이 비어있는지 확인하는 것" 모두 단일 스레드에서 일어난다는 점이다. 즉, 두 작업은 동시에 일어날 수 없으며 한 스레드에서 순차적으로 일어난다.

```js
function bar() {
  console.log("bar");
}

function bazz() {
  console.log("bazz");
}

function foo() {
  console.log("foo");
  setTimeout(bar(), 0);
  bazz();
}

foo();
```

기존의 코드에 `setTimeout`을 추가해 비동기 함수를 호출하면 `foo`, `bazz`, `bar` 순서로 호출 스택에 쌓이고 비워지게 된며 아래의 순서로 실행된다.

1. `foo` 함수가 호출 스택에 들어간다.
2. `foo` 함수 내부에서 `console.log("foo")`가 호출 스택에 들어간다.
3. 2번이 실행되고 다음 코드로 넘어간다. (`foo` 함수는 아직 존재)
4. `setTimeout(bar(), 0)` 함수가 호출 스택에 들어간다.
5. 4번에 대해 타이머 이벤트가 실행되며 태스크 큐로 들어가고, 그 대신 바로 스택에서 제거된다.
6. `bazz` 함수가 호출 스택에 들어간다.
7. `bazz` 함수 내부의 `console.log("bazz")`가 호출 스택에 들어간다.
8. 7번이 실행되고 다음 코드로 넘어간다. (`foo`, `bazz` 함수는 아직 존재)
9. `bazz` 함수 내부에 남은 것이 없으므로 호출 스택에서 제거된다. (`foo` 함수는 아직 존재)
10. `foo` 함수에 남은 것이 없으므로 호출 스택에서 제거된다.
11. 호출 스택이 완전히 비워진다.
12. 이벤트 루프가 호출 스택이 비워져 있음을 확인하고 4번의 태스크 큐에 있는 내용이 있어 `bar` 함수를 호출 스택에 넣는다.
13. `bar` 함수 내부의 `console.log("bar")`가 호출 스택에 들어간다.
14. 13번이 실행되고 다음 코드로 넘어간다. (`bar` 함수는 아직 존재)
15. `bar` 함수 내부에 남은 것이 없으므로 호출 스택에서 제거된다.

위 코드에서 `setTimeout(bar(), 0)`가 정확하게 0초 뒤에 실행된다는 것을 보장하지 못한다는 것이 중요하다.

</details>

이벤트 루프는 **태스크 큐** 를 한 개 이상 가지고 있는데, 태스크 큐란 실행해야 할 태스크의 집합을 의미한다. 그리고 태스크 큐는 자료 구조의 큐가 아니고 set 형태로 구현되어 있다.
그 이유는 선택된 큐 중에서 실행 가능한 가장 오래된 태스크를 가져와야 하기 때문인데, 자료구조인 큐는 무조건 앞에 있는 것을 FIFO(First In First Out)로 꺼내와야 하지만 태스크 큐는 그렇지 않다.
태스크 큐에서 의미하는 "실행해야 할 태스크"라는 것은 비동기 함수의 콜백 함수나 이벤트 핸들러 등을 의미한다.

즉, 이벤트 루프의 역할은 호출 스택에 실행 중인 코드가 있는지, 그리고 태스크 큐에 대기 중인 함수가 있는지 반복해서 확인하는 역할을 한다. 호출 스택이 비어있다면 태스크 큐에 대기 중인 작업이 있는지 확인하고, 이 작업을 실행 가능한 오래된 것부터 순차적으로 꺼내와서 실행하게 된다. 이 작업 또한 마찬가지로 태스크 큐가 빌 때까지 이뤄진다.

비동기 함수는 모두 자바스크립트 코드가 동기식으로 실행되는 메인 스레드가 아닌 태스크 큐가 할당되는 별도의 스레드에서 수행된다. 이 별도의 스레드에서 태스크 큐에 작업을 할당해 처리하는 것은 브라우저나 Node.js의 역할이다.
즉, 자바스크립트 코드 실행은 싱글 스레드에서 이뤄지지만 이러한 외부 Web API 등은 모두 자바스크립트 코드 외부에서 실행되고 콜백이 태스크 큐로 들어가는 것이다.
이벤트 류프는 호출 스택이 비고, 콜백이 실행 가능한 때가 오면 이것을 꺼내서 수행하는 역할을 하는 것이다. 만약 이러한 작업들도 모두 자바스크립트 코드가 실행되는 메인 스레드에서만 이뤄진다면 절대로 비동기 작업을 수행할 수 없다.

## 5.3 태스크 큐와 마이크로 태스크 큐

이벤트 루프는 하나의 **마이크로 태스크 큐** 를 가지고 있는데, 기존의 태스크 쿠와는 다른 태스크를 처리한다. 이 중 대표적인 것이 `Promise`이며, 마이크로 태스크 큐는 기존 태스크 큐보다 우선권을 갖는다. 마이크로 태스크 큐가 빌 때까지는 기존 태스크 큐의 실행은 뒤로 미뤄진다. 즉, `setTimeout`과 `setInterval`은 `Promise`보다 늦게 실행된다는 것을 의미한다.

<details>

<summary>태스크 큐와 마이크로 태스크 큐 </summary>

```js
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

function bazz() {
  console.log("bazz");
}

setTimeout(foo, 0);

Promise.resolve().then(bar).then(bazz);
```

위 코드는 `bar`, `baz`, `foo` 순서로 실행된다. 이는 `Promise`가 마이크로 태스크 큐에 들어가고, `setTimeout`이 태스크 큐에 들어가기 때문이다.

</details>

각 태스크 큐의 대표적인 예시는

- 태스크 큐 : `setTimeout`, `setInterval`, `setImmediate`
- 마이크로 태스크 큐 : `Promise`, `process.nextTick`, `queueMicrotask`, `MutationObserver`

렌더링은 태스크 큐를 실행하기 앞서 먼저 마이크로 태스크 큐를 실행하고, 이 마이크로 태스크 큐를 실행한 뒤 일어난다. 각 마이크로 태스크 큐 작업이 끝날 때마다 한 번씩 렌더링 할 기회를 가지게 된다.

> - [MDN - setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)
> - [MDN - queueMicrotask](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask)
> - [MDN - MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

<details>

<summary>렌더링 태스크 큐</summary>

```html
<html>
  <body>
    <ul>
      <li>동기 코드: <button id="sync">0</button></li>
      <li>태스크: <button id="macrotask">0</button></li>
      <li>마이크로 태스크: <button id="microtask">0</button></li>
    </ul>

    <button id="macro_micro">모두 동시 실행</button>
  </body>

  <script>
    const sync = document.getElementById("sync");
    const macrotask = document.getElementById("macrotask");
    const microtask = document.getElementById("microtask");

    const macro_micro = document.getElementById("macro_micro");

    // 동기 코드로 버튼에 1부터 렌더링
    sync.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        sync.innerHTML = i;
      }
    });

    // setTimeout으로 태스크 큐에 작업을 넣어 1부터 렌더링
    macrotask.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        setTimeout(() => {
          macrotask.innerHTML = i;
        }, 0);
      }
    });

    // queueMicrotask로 마이크로 태스크 큐에 작업을 넣어 1부터 렌더링
    microtask.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        queueMicrotask(() => {
          microtask.innerHTML = i;
        });
      }
    });

    // 동기 코드, 태스크, 마이크로 태스크를 모두 동시에 실행
    macro_micro.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        sync.innerHTML = i;

        setTimeout(() => {
          macrotask.innerHTML = i;
        }, 0);

        queueMicrotask(() => {
          microtask.innerHTML = i;
        });
      }
    });
  </script>
</html>
```

- 동기 코드는 예상했던 것처럼 해당 연산, 즉 100,000까지 숫자가 올라가기 전까지는 렌더링이 일어나지 않다가 `for` 문이 끝나야 비로소 렌더링 기회를 얻으며 100,000라는 숫자가 한 번에 나타난다.
- 태스크 큐(`setTimeout`)는 모든 `setTimeout` 콜백이 큐에 들어가기 전까지 잠깐의 대기 시간을 갖다가 1부터 100,000까지 순차적으로 렌더링 된다.
- 마이크로 태스크 큐(`queueMicrotask`)는 동기 코드와 마찬가지로 렌더링이 전혀 일어나지 않다가 100,000까지 다 끝난 이후에 한 번에 렌더링 된다.
- 모든 것을 동시에 실행했을 경우 동기 코드와 마이크로 태스크 큐만 한번에 100,000까지 올라가고, 태스크 큐만 순차적으로 렌더링된다.

이러한 작업 순서는 브라우저에 리페인트 전에 콜백 함수 호출을 가능하게 하는 `requestAnimationFrame`과 같은 API에서도 동일하게 적용된다.

```js
consolo.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => console.log("3"));

window.requestAnimationFrame(() => console.log("4"));
```

위 코드를 실행하면 1, 3, 4, 2 순서로 출력된다. 즉, 브라우저에 렌더링 하는 작업은 마이크로 태스크 큐와 태스크 큐 사이에서 일어난다는 것을 알 수 있다.

</details>

즉, 동기 코드는 물론이고 마이크로 태스크 또한 렌더링에 영향을 미칠 수 있기에 특정 렌더링이 자바스크립트 내 무거운 작업과 연관이 있다면 이를 어떤식으로 분리할 지 고민해야 한다.

## 5.4 요약

자바스크립트 코드를 실행하는 것 자체는 싱글 스레드로 이뤄져 있어 비동기를 처리하기 어렵지만,
자바스크립트 코드를 실행하는 것 이외에 태스크 큐, 이벤트 루프, 마이크로 태스크 큐, 브라우저 & Node.js API 등이 존재해 싱글 스레드로는 불가능한 비동기 이벤트 처리가 가능하다.
