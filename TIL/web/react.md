---
title: 'React'
path: '/web/react'
---
# React

관심사의 분리(SoC : Separation of concerns)

> react가 dom보다 빠른게 아님

- 유지보수가 되는 웹을 만드는것을 도와줌
- react는 성능 최적화를 도와줌
  - reconciliation(재조정)을 잘 고려해야 함
  - 데이터의 분별성
- React의 props와 state 비교 로직은 얕은 비교
- shouldComponentUpdate 작성, 혹은  PureComponent 활용

## [Dom element](https://reactjs.org/docs/dom-elements.html)

HTML과 다르게 작동하는 Attribute

> onChange

- form field가 변경될 때 이벤트가 발생함
- 의도적으로 기존 브라우저의 동작을 사용하지 않음
- React는 기존 브라우저와 별개로 실시간으로 유저 입력을 처리하는 이벤트에 의존함

> value

- `<input>`과 `<textarea>` 컴포넌트에 의해 지원됨
- 컴포넌트의 값을 설정할 수 있음
- 제어 컴포넌트를 만드는데 유용함
- `defaultValue` 비제어 컴포넌트에서 사되는 동등한 의미를 가지는 Attribute
- 처음 마운트될 때 컴포넌트의 값을 설정

> dangerouslySetInnerHTML

- 브라우저 DOM에서 `innerHTML`을 사용하기 위한 방법
- 코드에 HTML을 설정하게 되면 XSS(cross-site-scripting) 쉽게 노출될 수 있음
  - React DOM은 렌더링 되기 전에 jsx 내에 포함된 모든 값을 문자열로 바꾸기 때문에 기본적으로 XSS를 막을 수 있음
- 위험하다는걸 상기시키기 위한 Attribute이고 `__html`키로 객체를 전달해야 함

```javascript
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

---

## [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

타입확인을 통해 bug를 잡을 수 있도록 도와줄 수 있고 Flow나 Typescript와 달리 React에 내장되어 있으므로 바로 사용 가능

> PropTypes

- 아래와 같이 유효성 검사를 할 수 있음

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // prop가 특정 JS 형식임을 선언할 수 있습니다.
  // 이것들은 기본적으로 모두 선택 사항입니다.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 랜더링 될 수 있는 것들은 다음과 같습니다.
  // 숫자(numbers), 문자(strings), 엘리먼트(elements), 또는 이러한 타입들(types)을 포함하고 있는 배열(array) (혹은 배열의 fragment)
  optionalNode: PropTypes.node,

  // React 엘리먼트.
  optionalElement: PropTypes.element,

  // React 엘리먼트 타입 (ie. MyComponent)
  optionalElementType: PropTypes.elementType,

  // prop가 클래스의 인스턴스임을 선언할 수 있습니다.
  // 이 경우 JS's instanceof 연산자를 사용합니다.
  optionalMessage: PropTypes.instanceOf(Message),

  // 열거형(enum)으로 처리하여 prop가 특정 값들로 제한되도록 할 수 있습니다.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 여러 종류중 하나의 종류가 될 수 있는 객체
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 특정 타입의 행렬
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 특정 타입의 프로퍼티 값들을 갖는 객체
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 특정 형태를 갖는 객체
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 위에 있는 것 모두 `isRequired`와 연결하여 prop가 제공되지 않았을 때
  // 경고가 보이도록 할 수 있습니다.
  requiredFunc: PropTypes.func.isRequired,

  // 모든 데이터 타입이 가능한 값
  requiredAny: PropTypes.any.isRequired,

  // 사용자 정의 유효성 검사기를 지정할 수도 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // `oneOfType`안에서는 작동하지 않으므로 `console.warn` 혹은 throw 하지 마세요.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // `arrayOf` 와 `objectOf 에 사용자 정의 유효성 검사기를 적용할 수 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // 유효성 검사기는 배열(array) 혹은 객체의 각 키(key)에 대하여 호출될 것입니다.
  // 유효성 검사기의 첫 두 개의 변수는 배열 혹은 객체 자신과 현재 아이템의 키입니다.

  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```



> PropTypes.elemet

- 컴포넌트의 Children에 단 하나의 Child만 전달될 수 있도록 명시 가능

> defaultProps

- `props`의 초기값을 정의함

## hooks

hooks의 state 또한 immutable임

> useEffect

- useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook
- 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태
- 두번째 파라미터에 따라 달라지는 실행되는 조건
  - 빈 배열을 넣게되면 가장 처음 렌덜이 될 때만 실행됨
  - 배열안에 특정 갚을 넣어주면 그 값이 업데이트 때만 실행됨
- cleanup(뒷정리) 함수
  - 언마운트되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행할 때 사용
  - useEffect 내부에서 `return () => {}`
  - 뒷정리 함수가 호출 될 때에는 업데이트 되기 직전의 값을 보여줌
  - 두번째 파라미터에 빈 배열을 넣게되면 언마운트 될 때만 실행
- 화면에 렌더링된 이후에 비동기로 처리되어야 하는 부수적인 효과들을 흔히 Side Effect라고 함
  - 데이터를 비동기로 가져올 경우 
- useEffect를 사용해서 리액트

> useMemo

- props를 넘겨줄 때 memoization 간편 사용 가능
- 의존성이 변경되었을 때에만 메모이제이션 된 값만 다시 계산

> useCallback

- useMemo()의 핸들러 버전으로 메모이제이션된 함수를 가져옴 - 메모이제이션의 값이 변경되는 시점은 함수인자가 아닌 의존성 배열 형태로 받아서 판단

> useRef

- state의 값이 최신이어야 할 때 사용
- 일종의 인스턴스
- 내용이 변경될 때 그것을 알려주지는 않음

> useSelector

> useReducer

> useContext

### 퓨어 컴포넌트

- 상태를 관리하지 않는 컴포넌트와 관리하는 컴포넌트 

- jsx에서 virtual dom 자체를 업데이트 하는 것 조차도 싫은 경우 
  - virtual dom tree를 바뀌지 않게 해줌
  - export default React.memo(); 이렇게 해주면 됨
  - props가 바뀔때만 재렌더링 아닌면 그냥 cache된 걸 보여줌
    - 커다라고 복잡한거 만들 때 쓰면 퍼포먼스에 좋음
  - Rcview, 
  - ReviewForm, 
    - handlechange, handlesubmit은 RestaurntContainer가 호출될 때 마다 매번 만들어 줌
      - 그래서 useCallback으로 함수 자체를 memoize 해줌
      - useEffect 처럼 인자로 바뀌는 값만 포함 - dispatch가 바뀔 때 마다
  - useMemo
    - 복잡한 계산
  - virtual dom은 브라우저 연산을 거치지 않고 메모리에 dom을 그림

> React.memo()

- 사소한 변경에 모든 컴포넌트가 렌더링 하면 성능저하 발생
  - class형 컴포넌트에서는 shouldComponentUpdate를 사용
  - Pure componenet의 경우 useMemo를 사용
- memo는 기본적으로 shallow comparison을 수행
  - 원시자료형(Primitive Type)의 경우 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상 
- 경우에 따라서 deep comparison을 수행하도록 구현할 수 있음(props이 객체인 경우)

  - 비교함수가 
    - true를 반환하면 이전의 값이 기억되어서 재렌더링을 막아주고
    - false를 반환하면 새로운 상태로 인식하고 해당 컴포넌트를 재렌더링하게 됨

### style

> 스타일 객체를 여러개 적용해야 할 경우

```javscript
style={[<object>], [<another_object>]}
```

### react-router-dom

https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url