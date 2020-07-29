---
title: 'Git'
path: '/git'
---

# Git

### [merge안된 PR을 pull 받고 싶은 경우](https://www.notion.so/TIL_20200715-84bbe0a9dd2d4664b5a1a36b10c5b1b8)

```bash
git pull origin pull/<number>/head:pr-<number>
```

### [issue label 등록 자동화](https://douglascayers.com/2019/08/01/how-to-export-and-import-github-issue-labels-between-projects/)

- 등록하고싶은 issue label이 있는 페이지에서 개발자 도구로 아래의 코드를 실행
- name, description, color의 key로 구성된 객체형태로 생성함
- 해당 객체를 이용해 TARGET_URL 리포지토리에 issue label 자동으로 등록해줌

```javascript
const TARGET_URL = "https://github.com/<repository>/labels";

var labels = [];
[].slice.call(document.querySelectorAll(".js-label-link"))
.forEach(function(element) {
  labels.push({
    name: element.textContent.trim(),
    description: element.getAttribute("title"),
    // using style.backgroundColor might returns "rgb(...)"
    color: element.getAttribute("style")
      .replace("background-color:", "")
      .replace(/color:.*/,"")
      .trim()
      // github wants hex code only without # or ;
      .replace(/^#/, "")
      .replace(/;$/, "")
      .trim(),
  })
})

// console.log(JSON.stringify(labels, null, 2))

function createLabel(label) {
  newWindow.document.querySelector(".js-new-label-name-input").value = label.name;
  newWindow.document.querySelector(".js-new-label-description-input").value =
    label.description;
    newWindow.document.querySelector(".js-details-target ~ .btn-primary").disabled = false;
    newWindow.document.querySelector(".js-details-target ~ .btn-primary").click();
}

function updateLabel(label) {
  let updatedLabel = false;
  [].slice
    .call(newWindow.document.querySelectorAll(".js-labels-list-item"))
    .forEach((element) => {
      if (
        element.querySelector(".js-label-link").textContent.trim() ===
        label.name
      ) {
        updatedLabel = true;
        element.querySelector(".js-edit-label").click();
        element.querySelector(".js-new-label-name-input").value = label.name;
        element.querySelector(".js-new-label-description-input").value =
          label.description;
          element.querySelector(".js-new-label-color-input").value =
          "#" + label.color;
          element.querySelector(".js-edit-label-cancel ~ .btn-primary").click();
      }
    });
  return updatedLabel;
}
function createOrUpdate(label) {
  console.log(label)
  if (!updateLabel(label)) {
    createLabel(label);
  }
}

newWindow = window.open(TARGET_URL,"new");

newWindow.onload = function something() {
  labels.forEach((label) => createOrUpdate(label));
}
```

