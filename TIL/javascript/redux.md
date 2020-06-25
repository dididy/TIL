---
title: "Redux"
path: "/javascript/redux"
---
# Redux

## Concept

> [Flux Architecture의 구현채]((https://haruair.github.io/flux/docs/overview.html))

- 단방향 데이터 Flow란 점과 Action이 Dispatcher를 통해 Store에 전달되는 흐름이 핵심
- 상태 관리는 사실 리액트의 관심사가 아니다.
- App은 상태가 어떻게 처리되는지 모르게 한다.
- App은 View가 어떻게 그려지는지만 **관심**을 갖게 한다.
- App은 상태 관리(store)와 View를 연결만 해준다.
- App은 상태 관리 로직이 어떻게 구현됐는지는 모른다.
- 상태 관리 로직 변경의 영향이 View로 전파되지 않는다.

> [3가지 원치](https://redux.js.org/introduction/three-principles)

- 전체 상태값을 하나의 객체에 저장한다.
- 상태값은 불변 객체다.
- 상태값은 순수 함수에 의해서만 변경되어야 한다.

> [Action](https://redux.js.org/basics/actions)

- 상태값은 오직 액션 객체에 의해서만 변경되어야 함
- 액션 객체에는 type, payload 속성으로 구성되는데 type은 어떤 액션인지 구별할 수 있는 문자열 값이며 payload 안에는 변경할 상태값(불변 객체)이 전달

> [Reducer](https://redux.js.org/basics/actions)

- 상태를 다른 상태로 바꿔주는 것

- reducer는 이전 상태값과 액션 객체를 입력으로 받아서 새로운 상태값을 만드는 [순수 함수](https://en.wikipedia.org/wiki/Pure_function)
- 순수 함수는 부수 효과(함수 외부의 상태를 변경시키는 것)를 발생시키지 않아야 함
-  순수 함수는 같은 입력값에 대해 항상 같은 값을 반환

> [Store](https://redux.js.org/basics/store)

- store는 리덕스의 상태값을 갖는 객체
- 액션의 발생은 store의 dispatch 메서드로 시작됨
- 스토어는 액션이 발생하면 미들웨어 함수(이번 주엔 등장하지 않음)를 실행
- reducer를 실행해서 상태값을 새로운 값으로 변경
- 첫 번째 원칙에서 말한 애플리케이션의 전체 상태값을 저장하는 하나의 객체가 바로 store

> [Provider](https://react-redux.js.org/api/provider)

- React로 작성된 컴포넌트들을 Provider안에 넣으면 하위 컴포넌트들이 Provider를 통해 redux store에 접근이 가능하도록 함

---

## [react-redux hook]([https://medium.com/@pks2974/redux-hook-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-3b92b4d75466](https://medium.com/@pks2974/redux-hook-살펴보기-3b92b4d75466))

> useDispatch

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



