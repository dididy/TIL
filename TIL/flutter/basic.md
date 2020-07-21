---
title: "Flutter basic"
path: "/flutter/basic"
published: false
---
- router
  - Start
    - Login
      - Main
        - Lawyer
          - 진행중인 상담
          - 상담 신청 목록
            - List view
          - 완료된 케이스
        - Counselor
          - 상담 신청
          - 진행 중인 상담
          - 완료된 상담
    - Sign up
      - Lawyer
      - Counselor
- state management
- rest and json
  - convert 패키지 : 
- modal

- model - db
- screen - 화면
- widget - 여러번 반복되거나 자주 사용되는 widget
- osx system

```
$ brew tap probablykasper/tap
$ brew cask install flutter
$ flutter upgrade
$ flutter doctor //to check the installtion
```



- shortcut
  - auto completion
    - command + .
  - dart formatting
    - alt + shift + F

- Need to study
  - styleling
  - state management
    - Bloc(rxdart)
    - Provider
  - widget tree
  - db
    - firestore
    - sqlflite
  - unittest
    - mockito
  - real-time db < firebase
  - page navigation
  - design 
  - bluetooth
  - graphql
  - flutter_mobile_vision
    - 서버측 ocr - python



- 모든 것이 widget

- Dart는 OOP 디자인의 언어이며 유연하며 강함

- Java와 ES6 이상의 JS와 비슷

  - JSX나 마크업 언어가 없음

  - JIT와 AOT가 필요

- Flutter

  - ARM 코드로 즉시 컴파일
  - 자체 렌더링 엔진(Skia) 제공
  - JS기반의 bridge가 없고 직접 앱과 대화하며 화면의 모든 픽셀 제어

  

- rxDart

  - `Reactive programming is programming with asynchronous data streams.`

    - 모든 것을 비동기적 데이터의 Stream으로 간주하고, Observer 디자인 패턴을 활용해서 비동기 이벤트를 처리
    - 실시간화 : 사용자 입장에서 실시간으로 반응하는 프로그래밍
    - 명령어 프로그래밍을 뜻하는 Imperative Programming과 대비되는 개념
    - Data Binding을 통해 Model과 View, Input과 Output이 업데이트 상황을 실시간으로 고융받고 업데이트 하는 프로그래밍

  - Event-Driven, Asynchronous, Nonblocking

  - rx = Observable + Observer + Scvhedulers

    - 비동기적 데이터 흐름을 다루는 프로그래밍
      - 실시간 반응 - Observer 패턴 + Asynchronous
      - 언제 도착할지 모르는 http 호출, UI 클릭, 데이터 저장, 에러 처리 등을 할 때 사용
    - 함수형 프로그래밍은 상태를 저장하지 않고 순수 함수를 사용해 로직 구성
      - 상태를 변경하여 결과가 달라지는 side effect 최소화

    - Observable : 데이터 스트림(전달 할 데이터 압축)
      - 주기적으로 또는 설정에 따라 생애주기동안 한번만 데이터를 방출
      - 공급자로서 데이터를 처리하고 다른 구성요소에 전달
    - Oberservers : Observable에 의해 방출된 데이터 스트림 소비
      - subscribeOn() 메서드 사용해서  Observable 구독하고 그것이 방출하는 데이터 수신
      - Observable이 데이터를 방출할 때 마다 등록된 모든 observer는 onNext() 콜백으로 데이터를 수신
        - Json 응답 파싱이나 UI 업데이트와 같은 다양한 작업 수행 가능
      - Observable에서 에러가 발생하면 observer는 onError()에서 에러를 수신
    - Schedulers : Observable과 Observer에게 그들이 실행되어야 할 스레드를 알려주는 Rx의 구성요소
      - observeOn() 메서드로 observers에게 관찰해야 할 스레드를 알려줄 수 있음
      - scheduleOn() 메서드로 Observable이 실행해야 할 스레드를 알려줄 수 있음
      - Schedulers.newThread()와 같이 RxJava에서 제공 된 메인 기본 스레드는 새로운 백그라운드를 생성
      - Schedulers.io()는 스레드에서 코드를 실행

  - 3단계

    - 데이터를 방출하는 observable 생성
    - 데이터를 소비하는 observer 생성
    - 동시성 관리

  - Reactive Programming

    - Easy thraead maangement
    - Easily composable