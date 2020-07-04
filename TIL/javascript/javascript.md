---
title: 'Javascript'
path: '/javascript/concept'
---

# Javascript

let을 하면 변수 영역이 코드 블록 안으로 한정됨

# Axios vs Promise
Axios

- Promise based

Fetch

- Promise based
- Request Aborting에 대해서 표준적인 방법을 제공 못함
- response timeout API is not exist
- Some browser is not support
- Error handling
  - Catch에 걸렸을 때 .then(~)을 실행
  - Axios의 경우는 .tehn(~) 실행하지 않고, console창에 해당 에러로그 보여줌

프로리엑트 읽으면서 느꼈던 것 - 규칙에 대한 혼란, 읽는것과 해보는것은 다르다.





JSON.stringify(tasks)



구조분해 할당 한층 더(destructuring)

spread





splice 함수의 스펙 학습이 필요합니다.

자주 실수하는 부분인데 sort, splice, slice 와 filter, map, reduce 이 두 묶음을 나눠서 살펴보시면
결정적인 차이를 아실 수 있습니다.