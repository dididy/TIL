# Today I Learned

> 2020 06 15 ~

최근 학습을 하다보니 기록해야 할 필요성을 느껴 Wiki 형태의 TIL을 진행하고자 한다. TIL을 Wiki형태로 하는 이유는 날짜기반으로 할 경우 원하는 정보를 찾으려고 할 때 구조화가 되어있지 않아 어려움이 있을 수 있어서 그렇다. 또한 날짜기반으로 관리하지 않더라도 커밋로그가 그 역할을 대신해 줄 수 있기 때문에 굳이 그렇게 해야 할 필요성을 느끼지 못했다.

이러한 Wiki형태의 TIL을 [GitBook](https://app.gitbook.com/@yongjae-lee/s/dididy-til/)으로 관리하고자 한다. [GitHub 리포지토리](https://github.com/dididy/til)만 사용하여 TIL을 관리할 경우 하위챕터에 진입하기 위해서 여러번의 클릭을 해야하는데 README로 하위챕터들을 관리하는방법이 있지만 매우 번거로울 것 같다. GitBook은 별다른 추가작업 없이 사이드바를 통해 하위챕터에 쉽게 접근가능하다는 장점이 있다. 또한 GitHub 리포지토리와 양방향 integration이 가능하고 웹상에서 쉽게 편집할 수 있는 도구를 제공하고 있어 마음에 들었다.



각 문서의 구성은 아래와 같은 Rule을 따르려 한다.

* ~~문서는~~ [~~Github Flavor Markdown~~](https://guides.github.com/features/mastering-markdown/) ~~을 사용하여 작성한다.~~
  * 표준대로 따라가지 않는 것 같다.
* 챕터 이름은 영어로 한다.
* 인출위주의 학습을 위해 질문과 답변 형식으로 문서를 작성한다.
  * 질문만 작성하는 것도 가능하며 이경우 추후에 Answer을 추가한다.
  * ~~접기/펼치기를 활용하며 해당 요소는 아래와 같이 삽입 가능하다.~~

    * GitBook에서 HTML태그를 사용할 수 없는 문제가 있다. Notion으로 옮기는 것을 고려중이다.

    ```markup
    <details>
    <summary>Question</summary>

    Answer

    </details>
    ```
* ~~커밋로그에 add, edit, delete 같은 키워드를 사용하여 각 챕터별로 커밋을 나눈다.~~
  * 써보니 GitBook 문서도구를 사용하는게 훨씬 편하다. 이럴경우 커밋로그를 작성하지 못하는 문제가 있다.

