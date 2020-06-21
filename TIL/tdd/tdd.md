---
title: '테스트 코드 작성 팁'
path: '/tdd'
---

# TDD

## Test 작성

> 어떻게? 

- 구현 전에 이런 요청을 하면 이런 결과가 나왔으면 하는 소망을 코드로 작성
- 작업을 하나씩 나눠서 각 작업이 잘 이뤄지는지를 확인

1. 내 코드를 읽는 사람이 꼼꼼하지 않아도 이해하기 쉽게 작성이 된 인까? 또는 관례를 따르고 있는 걸까?
2. 내가 다른 경우를 추가하고 싶을 때 손쉬울까? 또는 뭔가를 추가하고 싶다는 생각이 들 정도로 간단한가?

> 컴포넌트 테스트

- 특정 props 에 따라 컴포넌트가 크래쉬 없이 잘 렌더링이 되는지 확인
- 이전에 렌더링했던 결과와, 지금 렌더링한 결과가 일치하는지 확인
- 특정 DOM 이벤트를 시뮬레이트 하여, 원하는 변화가 제대로 발생하는지 확인
- 렌더링된 결과물을 *이미지* 로 저장을 하여 픽셀을 하나하나 확인해서 모두 일치하는지 확인
  - 이 경우 스토리북 사용

## React Testing Library

> [Setup](https://testing-library.com/docs/react-testing-library/setup)


- npm 

```shell
npm i -D jest babel-jest @types/jest @testing-library/react @testing-library/jest-dom
```

- `.eslintrc.js`의 `env` 객체에 `jest: true` 추가해야 jest에 대한 린트 옵션 동작

- execute

```shell
npx jest --watchAll --coverage
```

- `jest.config.js`를 만들어서 테스트할 때 마다 필요한 `import '@testing-library/jest-dom';`을 안써줘도 됨

> [Enzyme vs React Testing Library](https://blog.logrocket.com/enzyme-vs-react-testing-library-a-mindset-shift/)

- Enzyme은 Implementation Driven Test 방법론을 따르는 테스트 작성에 용이
  - 실제 DOM이 아닌 React의 가상 DOM 기준으로 테스트 작성
  - 테스트 대상 React 컴포넌트에 어떤 prop이 넘어가고, 현재 state가 어떻게 되는지 검증 용이

- React Testing Library는 Behavior Driven Test 방법론을 따르는 테스트 작성에 용이
  - jsdom이라는 라이브러리를 이용해 실제 브라우저 DOM 기준으로 테스트 작성
  - 어떤 React 컴포넌트를 사용하는지는 의미가 없고 사용자 브라우저에서 렌더링하는 실제 HTML마크업의 모습에 대한 테스트 용이

> [API](https://testing-library.com/docs/react-testing-library/api)

- fireEvent 
  - 쿼리 함수로 선택된 영역을 대상으로로 특정 이벤트를 발생시키기 위한 이벤트 함수들을 담고 있음 

- render 
  - 인자로 렌더링할 React 컴포넌트를 넘겨 라이브러리가 제공하는 모든 쿼리 함수와 기타 유틸리티 함수를 담고있는 객체를 리턴함

- cleanup
  - Unmounts the component from the container and destroys the container.

- act
  - All renders and events being fired are wrapped in `act`.

> [Queries](https://testing-library.com/docs/react-testing-library/cheatsheet)

- getByText
- getByLabelText
- getByPlaceholderText

## Jest

> [Mock Functions](https://jestjs.io/docs/en/mock-functions)]

- jest.fn()
  - 단위 테스트를 작성할 때, 해당 코드가 의존하는 부분을 가짜로 대체하는 기법
  - 가짜 함수는 자신이 어떻게 호출되었는지를 모두 기억함
  - mockReturnValue : 가짜 함수가 어떤 값을 리턴해야할지 설정
  - mockResolvedValue : 가짜 비동기 함수를 만들 수 있음
  - mockImplementation : 해당 함수를 통째로 재구현할 수 있음

- jest.spyOn()
  - 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고, 해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아내야 할 경우

> [Using Matchers](https://jestjs.io/docs/en/using-matchers)]

- mocking
  - toBeCalled
  - toBeCalledTimes : 몇번 호출되었는가
  - toBeCalledWith : 인자로 무엇이 넘어왔는가

- true/false
  - toBeFalthy : 검증 대상이 False인지 검증
  - toBeTruthy : 검증 대상이 True인지 검증

- array
  - toContain : 배열에 특정 원소가 들어있는지 체크
  - toContainEqual : 객체가 같은지 체크?
  - toHaveLength : 배열의 길이 체크

- enabled/disabled
  - toBeEnabled : 활성화 되었는지 검증
  - toBeDisabled : 비활성화 되었는지 검증

- string
  - toBe : 문자열이 정확하게 일치하는가?
  - toMatch : 정규식 기반의 문자열 텐스트

- toBeInTheDocument : 화면에 존재하는지 검증
- toThrow : 예외 발생 여부 테스트 인자로 문자열을 넘기면 예외메시지, 정규식을 넘기면 정규식 체크
- toEqual
- ToHaveProperty

> [Setup and teardown](https://jestjs.io/docs/en/setup-teardown)

- 반복작업 
  - beforeEach : 테스트 함수가 실행되기 전에 매번 실행
  - afterEach : 테스트 함수가 실행된 후에 매번 실행

- 오직 한번만 
  - beforeAll : 맨 처음에 한번 실행
  - after All : 맨 끝에 한번 실행

- only : 테스트 실행시 only만 실행
- skip : 테스트 실행시 skip은 실행 안함

> [BDD Style](https://github.com/ahastudio/til/blob/master/blog/2018/12-08-given-when-then.md)

- describe : 여러개의 테스트 함수를 묶어줌 - given에 해당하는 것
- context : when에 해당하는 것
- it : then에 해당하는 것