---
title: 'eslint-plugin-react #2586 Issue 해결'
path: '/retrospect/2020-08-contributhon'
---

# eslint-plugin-react [#2586](https://github.com/yannickcr/eslint-plugin-react/issues/2586) Issue 해결
## > Issue 내용

eslint-plugin-react의 jsx-handler-name 규칙에서 arrow function이 사용되는 경우가 고려되지 않았다. 따라서 arrow function을 사용하는 경우 jsx-handler-name 규칙에 맞는 상황에서도 에러가 발생하게된다.

아래와 같은 설정이 주어지고:

```yaml
react/jsx-handler-names:
  - error
  - eventHandlerPrefix: '(handle|on|set)'
    checkLocalVariables: true
```

다음과 같은 코드 사용시:

```javascript
<Button onClick={() => setVisible(!visible)}>
  {visible ? 'Hide' : 'Show'}
</Button>
```

linting 이 실패하여 아래와 같은 에러 메시지가 출력됨:

```
Handler function for onClick prop key must begin with '(handle|on|set)'  react/jsx-handler-names
```
### 이슈 작성자 의견
- `react/jsx-handler-names`가 arrow function에 적용되지 않는 문제점을 가지고 있다.

- 변수나 유사한 것(유효하지만, 이는 다른 규칙/문제임)으로 리팩터링하지 않고는 핸들러 네이밍 위반을 해결할 방법이 없기 때문이다.

### 메인테이너 의견
- 이것은 추가하면 의미있는 option으로 보인다.

- 이 문제가 해결되면 react hooks로 작업하는데 많은 도움을 줄 수 있을 것이다.

---

## > 어떻게 해결했는가?
### 1. 옵션 인터페이스 설정
먼저 규칙에 추가할 옵션 인터페이스를 생각했다. 멘토님이 `<button onClick={() => foo()}/>`  와 같은 형태로 사용되는 핸들러를 inline function이라고 부른다고 하여 기존 옵션 네이밍컨벤션에 맞춰 이름은 checkInlineFunction으로, 설정 형태는 Boolean으로 결정하였다.

### 2.  기존 옵션에 대한 이해
#### Rule Options : [react/jsx-handler-names](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)

```javascript
"react/jsx-handler-names": [<enabled>, {
  "eventHandlerPrefix": <eventHandlerPrefix>,
  "eventHandlerPropPrefix": <eventHandlerPropPrefix>,
  "checkLocalVariables": <boolean>
}]
```

#### `eventHandlerPrefix`
- event handlers로서 사용되는 component method의 prefix. handle이 기본값이다.
- `props={<something>}`에서 `<something>`에 해당하는 부분 즉, propValue의 prefix를 판별한다.
 
#### `eventHandlerPropPrefix`
- event handlers로서 사용되는 props의 prefix. on이 기본값이다.
- `props={<something>}`에서 `props`에 해당하는 부분 즉, propKey의 prefix를 판별한다.

#### `checkLocalVariables`
- 로컬 변수로 저장된 event handlers의 확인 여부 결정. false가 기본값이다.
- member expression이 존재하지 않아도 되는 상황 즉, local variable을 사용해도 되는지 판별한다.
- jsx-handler-name 규칙과 직접적인 연관이 없으므로 에러메시지가 존재하지 않는다.

새로운 옵션인 **checkInlineFunction**은 checkLocalVariable옵션과 같은 이유로 에러메시지가 존재하지 않아야 한다. 또한 해당 옵션을 통해 arrow function이 사용 가능할지 여부를 결정할 수 있게끔 코드를 구현하면 된다.

### 3.  코드 분석
이슈를 해결하기위해 아래의 3가지 파일을 수정해야했다.

1. [`lib/rules/jsx-handler-names.js`](https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-handler-names.js)
    - 규칙이 동작하는 로직이 포함된 구현체이다.
    - 아래와 같이 3가지 동작을 한다.
      1. 사용자가 설정한 option을 받아온다.
      2. option에 따라 규칙을 위반 했는지 검사한다.
      3. 규칙을 위반했다면 위반했다고 report한다.

 2. [`tests/lib/rules/jsx-handler-names.js`](https://github.com/yannickcr/eslint-plugin-react/blob/master/tests/lib/rules/jsx-handler-names.js)
    - 규칙이 실제로 동작하는지 확인하는 테스트코드이다.
    - valid는 린트 에러가 발생하지 않는 올바른 코드에 대한 테스트 케이스이다.
    - invalid는 린트 에러가 발생해야하는 잘못된 코드에 대한 테스트 케이스이다.

 3. [`docs/rules/jsx-handler-names`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)
    - 새로 만들 옵션에 대한 설명을 [Rule Options](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md#rule-options)에 추가해야 한다.

### 4. checkInlineFunction 옵션을 위한 코드 작성
```
** 작업 순서 **
1) 옵션 스키마 수정
2) 옵션 받아오기
3) 옵션에 따른 로직 수정: AST 구조확인 -> 코드 구조 확인 -> 코드 수정
4) 테스트코드 추가
5) 문서 추가
6) PR
```
<img width="1513" alt="Screen Shot 2020-09-01 at 5 46 05 AM" src="https://user-images.githubusercontent.com/16266103/91767023-78e60e80-ec16-11ea-935a-71b5fe77bf58.png">

> checkLocalVariable옵션을 참고해서 checkInlineFunction의 옵션 스키마를 추가하였다.

<img width="1521" alt="Screen Shot 2020-09-01 at 5 50 26 AM" src="https://user-images.githubusercontent.com/16266103/91767420-13465200-ec17-11ea-9bd2-830b6b340124.png">

> checkInlineFunction의 옵션 설정값을 가져오도록 하는 코드를 추가하였다.

<img width="1520" alt="Screen Shot 2020-09-01 at 5 53 46 AM" src="https://user-images.githubusercontent.com/16266103/91767719-8f409a00-ec17-11ea-8620-e6ae2c86959e.png">

> 코드 중복을 피하기 위해 AST를 활용해 arrow function인지 판별하는 함수를 만들었다.

<img width="1519" alt="Screen Shot 2020-09-01 at 5 53 07 AM" src="https://user-images.githubusercontent.com/16266103/91767652-73d58f00-ec17-11ea-9752-573dd28f8ee1.png">

> checkLocalVariable옵션에 따라 member expression인지 local variable인지 확인하는 부분인데 arrow function의 경우 이를 확인하는 AST 구조가 달라 삼항연산자로 판별할 수 있도록 하는 코드를 추가하였다.

<img width="1520" alt="Screen Shot 2020-09-01 at 6 01 06 AM" src="https://user-images.githubusercontent.com/16266103/91768458-961bdc80-ec18-11ea-85ce-f4c59a5ce3a1.png">

> checkLocalVariable옵션이 커져있고 arrow function인 경우 arrow function 구조에 맞는 AST를 사용하게끔 하는 삼항연산자를 추가하였고 중복을 피하도록 expression 변수를 생성하였다.

[테스트코드](https://github.com/yannickcr/eslint-plugin-react/pull/2761/commits/9eb81bc121d3ebe2709f9b2595424b996fb18326#diff-f64bbbbda77b9ea03a7f46dd9319e497)는 [checkLocalVariable옵션이 추가된 PR](https://github.com/yannickcr/eslint-plugin-react/pull/2474)을 참고하여 케이스를 나눠 작성하였다. 이슈를 다 해결했다고 생각할 때 쯤 다른 테스트코드를 살펴보며 불가능한 케이스가 있다는걸 알게되었고 [잘못된 부분](https://github.com/yannickcr/eslint-plugin-react/commit/cde22634e8bc1dc0a00fbc22c45e156ec227f011#diff-ccf82a24ec6f364517e4d1f4aed7a0a8R84)을 바로잡을 수 있었다. `.replace(/^this\.|.*::/, '');`와 AST를 활용해 간결하게 해결할 수 있었는데 케이스를 일일이 나눠서 생각하려고 해서 생긴 문제였다. 문제를 해결한 뒤 기존에 불가능했던 케이스에 대한 테스트코드도 추가하였다.

작업 중간에 코드가 완성되지 않은 상태에서 멘토님에게 코드리뷰를 부탁하기 위해 origin에 PR을 하려고 하였으나.. 실수로 upstream에 PR을 하는 상황이 발생했다. 바로 close를 했는데 메인테이너분께서 이슈가 해결되면 새로 PR을 열기보다는 해당 PR을 open해서 진행해달라는 comment를 주셨다. commit log가 `wip`로 되어있는 상황이라 어떻게 할지 고민했다. `git commit --amend`를 이용해 해결할 수 있긴 하지만 force push를 해도 되는건지 궁금했는데 merge된 PR들을 훑어보니 force push를 일반적으로 사용하고 있었고, 메인테이너가 [force push를 권장](https://github.com/yannickcr/eslint-plugin-react/pull/2474#issuecomment-546660629)하고있는 comment 발견하여 안심하고 force push를 이용해 문제를 해결했다.

커밋 로그와 PR 제목, 내용은 [CONTRIBUTING.md](https://github.com/yannickcr/eslint-plugin-react/blob/master/CONTRIBUTING.md)의 내용이 불충분했기 때문에 이전 PR들의 컨벤션들을 참고해서 결정하였다.

Merged [#2761](https://github.com/yannickcr/eslint-plugin-react/pull/2761)

---

## > 배우게 된 것
나는 주로 프레임워크(React, Vue)를 이용해서 개발을 해왔었다. eslint-plugin-react 소스코드가 바닐라 자바스크립트로 되어있었고 논리연산자에 대한 부분조차 낯설어서 차근차근 공부해가면서 코드를 분석했다. - [논리연산자에 대해 정리한 글](https://github.com/im-d-team/Dev-Docs/blob/20200830/dididy/Javascript/%EB%85%BC%EB%A6%AC%EC%97%B0%EC%82%B0%EC%9E%90.md)

오프라인 스터디에서 eslint의 동작 원리, AST의 개념과 Node.js inspector를 이용해 chrome으로 디버깅 하는 것을 배웠는데 이슈를 해결하는데 큰 도움이 되었다. [AST explorer](https://astexplorer.net/)에서 AST 구조를 확인할 수 있는데 이슈 해결하면서 없으면 안된다고 생각될만큼 유용하게 사용했다.

### eslint의 동작 원리

eslint는 소스코드를 parser(eslint의 경우 acorn)를 통해 파싱하고 AST를 활용해 규칙에따라 Linting을 하는 순서로 동작한다. parser의 역할은 소스코드를 AST로 만든다. 만약 AST 이후 transpiling을 하면 `babel`이고 linting을 하면 `lint`이다. 웹팩도 비슷한 형태로 AST를 활용하고 있다. (generator listener 패턴에 대해서도 언급하셨는데 이부분은 내가 정확하게 이해하지 못했다)

### Node.js inspector를 이용하는 방법

```bash
npx mocha ./tests/lib/rules/jsx-handler-names.js --inpect-brk
```

1. 디버깅을 하고 싶은 코드 라인 상단에 `debugger;` 를 추가한다.
2. 위와같이 `--inpect-brk` 옵션을 붙여서 해당 테스트코드를 실행한다.
3. 크롬브라우저 URL에 `chrome://inspect`로 접속하여  Target에 inspect를 클릭한다.
4. chrome devtools를 이용해 step을 사용한 디버깅을 할 수 있다.

이렇게하면 chrome을 활용해 step별로 디버깅을 할 수 있어 console.log로 일일이 확인하는 것 보다 훨씬 편리하다.

### function의 bind를 위한 syntax

```javascript
<TestComponent onChange={props::onChange} />
```

테스트코드를 확인하다가 위와같이 handler의 function 이름에 `::`이 붙는 경우를 접하게 되었다. 처음보는 문법이라 당황했는데 ES7에 추가된 [function의 bind를 위한 syntax](http://blog.jeremyfairbank.com/javascript/javascript-es7-function-bind-syntax/)라는 사실을 알게되었다. 해당 syntax에 대해 [AST explorer](https://astexplorer.net/)로 구조를 확인하려면 parser를 @babel/parser로 설정해야만 한다.

### Code Review
오픈소스이기 때문에 근본적으로 많은 사람들과 협업을 위한 좋은 코드를 작성해야 한다. eslint-plugin-react의 코드들을 살펴보면서 명확하지 않은 부분들에 대해 컨벤션을 참고해가면서 작업을 진행하였다. 멘토님께서 중복을 피하도록 중복되는 부분을 함수화 시키면 좋을 것 같다는 의견을 주셨고 이를 적용하였다. 메인테이너 분께서는 삼항연산자에 대한 부분의 코딩 스타일에 대한 부분과 member expression이 겹치는 것을 변수로 빼서 중복을 줄이도록 코드를 수정해주셨다.

---

## > 회고
급한 마음에 eslint-plugin-react와 jsx-handler-name 규칙에 대해 명확하게 파악하지을못한채 진행하려고 해서 실수도 하고 멘토님에게 필요 이상으로 질문을 드렸었다. 지나고보니 스스로 판단할 수 있는 부분이 많았던 것 같다. 차분하게 스스로 고민하는 능력을 키워야겠다고 느꼈다.

질문에 내 의도를 명확하게 담는것이 꽤 어려웠다. 특정 상황에 대한 용어를 모르는 경우(예를들어 member expression을 객체라고 표현했다) 혹은 맥락을 명확하게 전달하는 부분이 어려웠던 것 같다. 앞으로 개발을 하면서 지속적으로 커뮤니케이션을 해야 할 텐데 이 능력은 어떻게 키울 수 있을까 고민해보아야겠다.

멘토님이 방향 제시를 적극적으로 해주시고 귀찮을 수 있는 질문에도 친절하게 답변해주신 덕에 효율적이고 정확하게 이슈를 해결할 수 있었다. 진행상황을 물어봐주시거나 중간중간 코드를 검토하는 것이 쉽지않은 일일텐데 코칭을 해주셔서 정말 진심으로 감사했다.

도큐먼트에 기여한 것들을 제외하면 처음으로 오픈소스의 이슈를 해결한 코드가 merge된 것이다. 기분이 너무 좋았다.

다음 목표는 새로 찾아놓은 issue를 컨트리뷰톤 기간 내에 해결하는것이다. 회고할 때 스스로에게 느꼈던 문제점을 개선하면서 컨트리뷰션에 임할 생각이다.
