---
title: 'Javascript'
path: '/web/javascript'
---

# Javascript

### This

> [im-D-team 첫주 발표자료](https://docs.google.com/presentation/d/1FJx2acuRHSjQ_9app2IdNt3jVuhAgppq2AqZpDCFqjo/edit?usp=sharing)

### window

> window.open(<url>)

- `const newWindow = window.open(<url>);` 형태로 사용하면 `newWindow` 객체로 새로 띄운 창에대한 조작이 가능
- 두번째 인자로 `"new"`를 주면 새창에서 url 페이지를 보여줌

> onload()

- `newWindow.onload = function something () {};` 형태로 사용하면 해당 객체가 포함된 창의 로딩이 끝난 뒤에 함수 실행 가능

> window.location

window.location : 현재 어디에 있는지 확인 가능

`const { location: { pathname } } = window;`

```
const MyComponent = {
	'/': HomePage,
	'/restaurants': RestaurantsPage,
}[pathname] || NotFoundPage;
```

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
- promise로 .then()하는건 번거로웠던 것을 편리하게 해줌
- try/catch로 에러처리 가능

> [sort, splice, slice / filter, map, reduce](https://github.com/CodeSoom/week2-assignment-2/pull/15#issuecomment-643542178)

- sort, splice, slice는 기존의 배열에 영향을 줌
- fliter, map, reduce는 새로운 배열을 반환
  - 왜 쓰는가? : 함수형 프로그래밍은 가능한 한 상태 변경을 피하고자 하며 함수 간의 데이터 흐름을 사용하기 때문에 새로운 배열을 반환하는 것
  - react에서 원소를 제거 할 때 state 의 배열에 직접 접근하면 안 되고, 배열을 복사한 후 원소 제거 후 기존 값에 덮어씌워져야함
    - state에 push, pop, shite 등의 원본 변형 메소드를 사용하면 안됨(immutable의 중요성) 
      - Vitural DOM에 영향을 주게됨

```javascript
function deleteTodo(passedKey) {
    setState({
      todo:  state.todo.splice(passedKey, 1),
    });
}
function deleteTodo(passedKey) {
  const array = state.todo.filter((i, key) => (key !== passedKey));
  setState({
    todo: array,
  });
}
```

---

> etc

```javsscript
() => {
	return {
	  ...
	}
}

() => ({
  ...
})
```



그외에도 default parameter, template literal, generator

### shallow copy를 deep copy로

`pass by reference`인 경우가 얕은 복사(shallow copy)임

> 그냥 deep copy가 되는 자료형들

- `Boolean`, `null`, `undefined`, `string`, `Number` 같은 primitive 타입은 deep copy(pass by value)

> shallow copy를 deep copy로 만드는 법

- **Objects**: `Array`, `Function`, `Object`
  - 그냥 변수에 객체를 대입하면 주소(reference)가 복사됨
  - ES6 이후 deep copy는 Object.assign() 함수와 spread 연산자({...})를 사용
    - 그런데도 여전히 객체의 프로퍼티로 객체를 가지면 주소를 참조해버림
    - lodash의 `_.cloneDeep` 을 사용하면 객체의 모든 프로퍼티를 deep copy 가능
    - 간단하게는 `let copy = JSON.parse(JSON.stringify(original));` 사용
      - 하지만 string으로 바꿨다가 다시 parse하는 방식은, object내에 function이 value로 있을 경우 적합하지 않음

> shallow comparison

- React에서 성능을 위해 사용
  - state변경, 부모컴포넌트 렌더링 <- 얕은비교로 새로운 값인지 아닌지 판단
- **하지만 상태값이 객체라면 주의** *
  - 객체는 기본적으로 shallow copy를 하므로 주소를 참조함
  - shallow comparison에서 참조 타입은 동일 참조 값이 아니라면 `===` Strict Equal Operator에서 false를 반환
    - 객체나 배열, 함수 등의 props는 상황에 따라 **불필요한 리렌더링이 발생할 수 있음** 혹은 참조값이 같다면 **렌더링이 발생하지 않을 수 있음**
  - deep comparison을 하는 방법 : https://codingbroker.tistory.com/109
- 불변성을 보장하기 위해(shallow comparison이 쓸데없이 발생하는 것을 방지하기 위해)
  - class 컴포넌트의 경우 `shouldComponentUpdate` 사용
  - 함수형(hooks) 컴포넌트의 경우 `React.memo()` 사용
    - 첫번짜 인자 : 컴포넌트에 적용하여 props의 얕은 비교를 하여 render의 실행여부를 결정
    - 두 번째 인자 : 현재 Props와 미래의 Props를 비교하여 `shouldComponentUpdate` 처럼 렌더링을 직접 제어
    - useMemo, useCallback으로 값과 함수에 대한 메모이제이션 가능
      - 첫 번째 인자 : ~
      - 두 번째 인자 : 변경 여부를 평가하는 값들의 배열
      - 만일 불변성이 보장되지 않은 값들이나 children과 같은 ReactElement를 받아와서 사용한다면 **최적화가 의미가 없는 결과가 됨



> Object.assign과 srpead

- Object.assgin

  - 소스 객체의 프로퍼티들을 타겟 객체로 복사하여 반환

  - 파라미터로는 저장될 타켓 객체, 소스가될 객체

    - 소스가 될 객체는 여러개가 되어도 되지만 deep merge가 아닌 shallow merge

      - 일치하는 key가 있으면 해당 key의 value만 바뀜

        ```javascript
        const A1 = {
          B: {
            C: 'A1.B.C'
          }
        };
        
        const A2 = {
          B: {
            D: 'A2.B.D'
          }
        };
        
        console.log(Object.assign(A1, A2));
        /* 실제 결과
        {
          B: {
            D: 'A2.B.D'
          }
        }
        */
        /* 의도했던 결과
        {
          B: {
            C: 'A1.B.C',
            D: 'A2.B.D'
          }
        }
        */
        // spread를 사용해도 같은 결과가 나옴
        // 어떻게 해결할까? 
        // 1. loadash merge 사용
        // 2. npm 라이브러리인 deepmerge 사용
        // 3. https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
        // ref : https://blog.ull.im/engineering/2019/04/01/javascript-object-deep-copy.html
        ```

---

- spread
  - Object.assign과 동일한 효과
  - 객체 앞에 ...을 붙여주면 됨
  - 배열에서도 사용 가능
- 공통점
  - 동일한 기능을 함
  - shallow copy가 됨

> shallow copy와 참조의 차이

- 참조는 `const ref = obj;` 같이 `=` 를 사용하여 함
- shallow copy는 `Object.assign` 혹은 `...` 을 사용
- 참조는 단순한 참조임
  - 메모리 힙에 생성된 객체를 단순히 참조하는 것
- shallow copy는 새로운 객체에 프로퍼티를 복사하는 것 
  - 여전히 해당 객체를 참조하는게 맞지만 프로퍼티가 복사된다는 차이점이 있음



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

