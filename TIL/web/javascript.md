---
title: 'Javascript'
path: '/web/javascript'
---

# Javascript



### Modern Javascript

> let, const

- let을 하면 변수 영역이 코드 블록 안으로 한정됨

> 구조분해할당

- 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 푤현식

> rest parameter

- 먼저 선언된 parameter에 할당된 argument를 제외한 나머지 argument들이 모두 배열에 담겨 할당
  - 따라서 마지막 파라미터여야 함

> spread operator

- 배열, 문자열 등의 이터러블을 분해해서 개별요소로 만들 수 있음

> arrow function

- 익명함수
- 더 간결하게 표현 가능
- 매개변수 1개라면 괄호() 생략 가능
- 중괄호와 return 문을 생략 가능
- this가 정적으로 묶임

> promise

- callback
  - 비동기 작업은 callback queue에 쌓이고 event loop에 의해 callstack으로 이동
  - callback의 예로는 ajax, setTimeout 등이 있음

- 자바스크립트 비동기 처리를 위한 객체
- 3가지 상태
  - 대기 : pending(new)
  - 이행 : fulfilled(resolve-then)
    - .then 메소드는 Promise 객체에 붙여서 사용함
      - Promise 객체를 리턴하고 두개의 콜백 함수를 파라미터로 받음
      - callback 지옥을 벗어날 수 있도록 해줌
        - callback도 코딩 패턴으로 해결할 수 있기는 함
    - promise.then(successCallback, failureCallback)
  - 거부 : rejected(reject-catch)

> ES8 - async/await

- 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await이 의도한 대로 동작함
- try/catch로 에러처리 가능

그외에도 default parameter, template literal, generator

### shallow copy

`pass by reference`인 경우가 얕은 복사임

> 얕은복사 자료형

- **Objects**: `Array`, `Function`, `Object`
  - ES6 이후 deep copy는 Object.assign() 함수와 spread 연산자({...})를 사용
    - 그런데도 여전히 객체의 프로퍼티로 객체를 가지면 주소를 참조해버림
    - lodash의 `_.cloneDeep` 을 사용하면 객체의 모든 프로퍼티를 deep copy 가능
  - 그냥 객체를 대입하면 주소가 복사됨 - shallow copy
- 나머지 `Boolean`, `null`, `undefined`, `string`, `Number` 같은 primitive 타입은 deep copy(pass by value)

### Axios vs Fetch

> Axios

- Promise based

> Fetch

- Promise based
- Request Aborting에 대해서 표준적인 방법을 제공 못함
- response timeout API is not exist
- Some browser is not support
- Error handling
  - Catch에 걸렸을 때 .then(~)을 실행
  - Axios의 경우는 .tehn(~) 실행하지 않고, console창에 해당 에러로그 보여줌

### Convention

- error first

### Babel

- Javascript 엔진은 브라우저마다 다르고 ES6 조차 지원하지 않는 브라우들이 있기 때문에 그러한 구형 브라우저에서 돌아갈 수 있도록 코드 자체를 변환함