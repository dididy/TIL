# Navigate a new screen

HTML을 사용할 떄는 `a` 태그를 사용했고 React에서는 `react-router-dom' React Native에서는 `react-native-router-flux`을 사용해서 라우팅을 했었다.

Flutter에서는 어떤 방식을 사용해서 라우팅을 하는지 궁금하여 해당 내용을 찾아보았다.

## Navigator Class

플러터에서는 Navigator 클래스를 이용해 Stack 구조로 route를 관리 하게 된다. Swift에서와 비슷하게 push와 pop을 이용해서 해당 페이지로 넘어가거나 이전 페이지로 넘어오게 할 수 있다. 

`Navigator.push()`

```dart
Navigator.push(context, 
  MaterialPageRoute<void>(builder: (BuildContext context) {
    return NextPage();
  })
);
```

```dart
Navigator.push(context, MaterialPageRoute<void>(builder: (BuildContext context) => NextPage()));
```

```dart
_showNextPage(BuildContext context) => Navigator.push(context, MaterialPageRoute(builder: (context) => NextPage()));

_showNextPage(context);
```

`Navigator.pop()`

```dart
Navigator.pop(context)
```

## Context, MaterialPageRoute

`context란?`

플러터 내부에 Stateless Widget과 Stateful Widget외에도 다양한 객체가 존재하고 그 중 하나인 BuildContext에 접근할 때 필요하다. BuildContext 객체는 Widget 클래스의 build() 메서드 인자로 넘어온다. 

그냥 간단하게 화면 이동을 위해 BuildContext 객체가 필요하다고 생각하면 된다.

`MaterialPageRoute란?`

Material App의 룩앤필에 맞는 화면 전환을 해주는 클래스이다. 어떤 화면으로 이동할지 구체적은 내용을 정의할 수 있으며 인자로 BuildContext 객체를 받아 새로운 페이지에 해당하는(`NextPage()`) 위젯을 반환한다.

## Navigator routes

`Navigator routes란?`

MaterialApp 수준에서 페이지 경로를 지정하는 것이다. MaterialApp의 routes 속성으로 아래와 같이 지정할 수 있다.

```dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => MainPage(),
    '/next': (context) => NextPage(),
  },
);
```

```dart
Navigator.pushNamed(context, '/');
```

```dart
Navigator.pop(context);
```

## 동적 Routes 활용

`동적 route란?
