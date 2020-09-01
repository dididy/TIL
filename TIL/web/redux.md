---
title: "Redux"
path: "/web/redux"
---

# Redux

![](https://miro.medium.com/max/3200/1*XEVxovodur9doQW-GJ6MLA.gif)

react + redux는 store로 상태를 관리하고 react는 상태를 보여주기 위한 용도로 사용 즉 상태 관리를 밖에서 함

상태 관리를 위한 거대한 event loop

## Concept

> [Flux Architecture의 구현채]((https://haruair.github.io/flux/docs/overview.html))

- 단방향 데이터 Flow란 점과 Action이 Dispatcher를 통해 Store에 전달되는 흐름이 핵심
- 상태 관리는 사실 리엑트의 관심사가 아님
- App은 상태가 어떻게 처리되는지 모르게 함
- App은 View가 어떻게 그려지는지만 **관심**을 갖게 함
- App은 상태 관리(store)와 View를 연결만 해줌
- App은 상태 관리 로직이 어떻게 구현됐는지는 모름
- 상태 관리 로직 변경의 영향이 View로 전파되지 않음

> [3가지 원칙](https://redux.js.org/introduction/three-principles)

- 전체 상태값을 하나의 객체에 저장
- 상태값(state)은 불변 객체(읽기 전용)
- 변화를 일으키는 함수인 리듀서는 순수 함수여야

> [Action](https://redux.js.org/basics/actions) : event

```javascript 
// 일반적으로 이런 형태의 object
{
    type: "액션의 종류를 한번에 식별할 수 있는 문자열 혹은 심볼 - 대문자와 밑줄 조합",
    payload: "액션의 실행에 필요한 임의의 데이터",
}

// 조금 편하게 샤용하려면 아래와 같이 상수와 함수로 준비
export const ADD_VALUE = '@@myapp/ADD_VALUE';
export const addValue = amount => ({type: ADD_VALUE, payload: amount});

```

- 상태에 어떤 변화가 필요하게 될 때 애플리케이션의 상태를 어떻게 변경시킬지 추상화한 표현
  - 객체 형태로 되어있음
- React 컴포넌트에서 Store 및 Store의 state에 접근하기 위해서는 Action을 거쳐야야만 함 - Event Driven
  - Store에 대해 뭔가 하고 싶은 경우엔 Action 을 발행
  - Store의 문지기가 Action의 발생을 감지하면, State가 갱신
- 상태값은 오직 액션 객체에 의해서만 변경되어야 함
- 액션 객체에는 type, payload 속성으로 구성되는데 type은 어떤 액션인지 구별할 수 있는 문자열 값이며 payload 안에는 변경할 상태값(불변 객체)이 전달
  - type 필드는 필수적으로 가지고 있어야하고 그 외의 값들은 개발자 마음대로 넣어줄 수 있음
- `Action Creator`(Action 생성 함수)
  - 액션을 만드는 함수, 단순히 파라미터를 받아와서 액션 객체 형태로 만들어줌
  - Action을 반환함
  - 컴포넌트에서 더욱 쉽게 액션을 발생시키기 위해서 사용


> [Reducer](https://redux.js.org/basics/actions) : event에 대한 반응 - 변화를 일으키는 함수

- 액션 객체를 받으면 전달받은 액션의 타입에 따라 어떻게 상태를 업데이트 해야 할지 정의를 해줘야 할 때 업데이트 로직을 정의하는 함수
- 파라미터로 state와 action을 받음
- 함수형 프로그래밍에서의 Reducer는 합성곱을 의미
  - Redux에 한해서는 아래와 같이 이전 상태와 Action을 합쳐, 새로운 state를 만드는 조작
    - 초기상태는 Reducer의 디폴트 인수에서 정의
- 상태를 다른 상태로 바꿔주는 것
- reducer는 이전 상태값과 액션 객체를 입력으로 받아서 새로운 상태값을 만드는 [순수 함수](https://en.wikipedia.org/wiki/Pure_function)
- 순수 함수는 부수 효과(함수 외부의 상태를 변경시키는 것)를 발생시키지 않아야 함
- 순수 함수의 조건
  - 리듀서 함수는 이전 상태와 액션 객체를 매개변수로 받는다.
  - 매개변수 외의 값에는 의존하면 안된다.
  - 이전 상태는 건드리지 않고 변화를 준 새로운 상태 객체를 만들어서 반환한다.
  - 똑같은 매개변수로 호출된 리듀서 함수는 언제나 같은 결과 값을 반환해야 한
  - 순수 함수가 아니게 될 수 있는 것들은 함수 밖에서 처리해줘야 함
- reducer에 테스트를 만드는 이유


> [Store](https://redux.js.org/basics/store)

- 단일 객체 저장소이며 action을 가지고 dispatch를 가지고 reducer로 넘겨줌

- 애플리케이션의 상태를 저장하고 읽을 수 있게 하며 액션을 보내거나 상태의 변화를 감지할 수 있도록 API를 제공하는 객체
- state와 reducer, 내장 함수들이 들어있음
- 상태는 기본적으로 전부 여기서 집중관리 됨, 커다란 json의 결정체
- 규모가 클 경우 상태를 카테고리별로 분류
- store는 리덕스의 상태값을 갖는 객체
- 현재의 앱 상태와, 리듀서가 들어가있고 추가적으로 몇가지 내장 함수 존재(`dispatch`, `subscribe`)
  - `subscribe` 함수는 함수 형태의 값을 파라미터로 받음 
    - 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출
    - subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해주면 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출
    - react-redux가 `subscribe`함
      - `connect` 혹은 `useSelector` Hook을 사용하여 리덕스 스토어 상태에 구독
  - 액션의 발생은 store의 `dispatch` 메서드로 시작됨
    - 액션을 `dispatch`의 파라미터로 전달하고 스토어는 리듀서 함수를 실행시켜 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어줌
- 스토어는 액션이 발생하면 미들웨어 함수(이번 주엔 등장하지 않음)를 실행
- reducer를 실행해서 상태값을 새로운 값으로 변경
- 첫 번째 원칙에서 말한 애플리케이션의 전체 상태값을 저장하는 하나의 객체가 바로 store


> [Provider](https://react-redux.js.org/api/provider)

- React로 작성된 컴포넌트들을 Provider안에 넣으면 하위 컴포넌트들이 Provider를 통해 redux store에 접근이 가능하도록 함

---

## [react-redux hook]([https://medium.com/@pks2974/redux-hook-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-3b92b4d75466](https://medium.com/@pks2974/redux-hook-살펴보기-3b92b4d75466))

> useDispatch

- 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook

- React.useContext 으로 Provider 에서 정의한 contextValue 를 가져와 store.dispatch 를 반환
  - Context 에 포함된 dispatch 를 가져올 수 있음
  - 이 dispatch 를 이용해 action 을 발생

> useSelector

- selector Callback 을 전달하여, 필요한 상태를 가져올 수 있음
- 과정
  - useSelector(selector) 에 Selector 를 전달한다.
  - Store 에서 상태를 가져와서 Selector 로 필요한 상태를 추출하여, Component 에게 전달한다.
  - 이때 내부 subscription 을 만들어 Store 의 State 변경사항을 구독한다.
  - 만약 State 변경이 일어나면, checkForUpdates 를 호출하여, 현재 상태와 이전상태를 비교한다.
  - 이때 비교는 전달 받은 것이 없다면, a === b 로 참조객체가 같은지 비교한다.
  - 상태가 다르다면, 새로운 상태를 세팅하고, useReducer 로 정의한 forceRender() 를 호출하여, 상태 변경을 발생시킨다.
  - 이전 과정을 다시 거쳐 새로운 상태를 Component 에게 전달한다.

---

## [React에서 Redux 사용하기](https://redux.js.org/basics/usage-with-react)

- Presentational Components
  - redux를 알지 못함
  - 보이는 것(View)에만 집중
- Container Components
  - redux를 알고 있음
  - 데이터를 가져오고 상태를 업데이트
- 기존에는 상태를 한 곳에서 관리했다면 이제는 Redux에서 모든 상태를 관리함
- 상태를 관리하는 부분과 화면에 그려주는 부분이 완벽하게 분리됨

---

## Redux hooks

> useSelector

- 리덕스 스토어의 state에 접근할 수 있게하는 hook
```javascript
const 결과 = useSelector(상태 선택 함수);
```

- useSelector에서 (state => {loginFields: state.loginFields})가 (get('loginFields')) 이렇게 변할 수 있음

```javascript
export function get(key) {
	return (objc) => obj[key];
}
```

---

> useDispatch

- dispatch 함수의 참조를 리턴하는 hook
- redux store의 dispatch를 함수에서 사용 할 수 있게 해줌
- 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해줌

### Middleware

action이 dispatch 되어서 reducer에서 이를 처리하기 전에 미리 지정된 작업들 설정 즉 action와 reducer 사이의 중간자 주로 비동기 작업에 쓰임

1. 특정 조건에 따라 액션이 무시되게 만들 수 있음

2. 액션을 콘솔에 출력하거나 서버쪽에 로깅을 할 수 있음

3. 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있음

4. 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있음

5. 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있음

> Redux Thunk Middleware

- Action creator가 액션을 반환하는 대신 함수를 dispatch 함
- 특정 액션이 실행되는 것을 지연시키거나 특정한 조건이 충족될  때만 액션이 실행될 수 있음

- 스토어를 세팅 할 때 미들웨어를 쓸 수 있음
- createStore할 때 미들웨어를 넣는 방식
- useEffect에서 바로 dispatch
- action을 넣어주면 리듀서가 기존상태에서 새로운 상태로 바뀌는데
- 알아서 dispatch가 비동기 처리를 해주고 상태를 업데이트 해주는게 redux thunk
- 비동기 action을 만들 수 있는데 비동기 함수를 주면 됨
  - 객체가 아닌 함수를 돌려 줌
  - actions에 함수를 만드는데 함수의 인자에 dispatch를 던져줘서 사용 가능
- `__fixture__` : 반복되는 변수은 fixture를 씀

### Redux tookit

> slice

- slice를 사용하면 엄청나게 단순하게 만들 수 있음

- slice에 action creator와 reducer 및 action의 정의까지 한번에 할 수 있음

- slice엔 actions와 reducer가 있음

- `import { createSlice } from '@reduxjs/toolkit';`

- initialState와 reducer 가져오기

- reducer.js에서 import { reducer } from './slice'

- export default reducer 남기기

- action도 비동기로 처리하는 외에 것들은 다 빼줌

- `import {actions} from './slice';`

- `export const { setRegions, setCategory, setRestaurant, ... }`

- 여러개 잡힐 수 있기 때문에 name/setAccessToken

- payload 안에서 꺼내 쓸 수 있게

- regions를 넣음

> [dcuks pattern](https://github.com/JisuPark/ducks-modular-redux)

- 파일 하나에서 모든것을 관리
