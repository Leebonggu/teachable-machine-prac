# Teachable Machine

## Do you know TWICE?
[https://twicelover.netlify.app](https://twicelover.netlify.app)
![](./demo.gif)

---

## Thinking...

- 머신러닝은 어렵다
- 그러나 만들어진 머신러닝을 사용하는건 다른 문제
- 잘 만들어진 머신러닝을 가쟈와 자유롭게 사용해보자
- 이 페이지는  Teachable 머신으로 만들어진 모델  URL을 붙여넣어볼 수 있는 사이트
- 이 페이지로 내가 학습시킨 모델을 웹으로 보여주는게 어렵지 않음을 '느낄'수 있음`

## Using

- CRA
- react-rotuer-dom
- material-ui
- styled-components
- Teachable-Machine
- react-modal

## 학습

- 각 멤버별 사진은 3장씩 학습시켰다.
- 9명의 멤버와 소속사 대표 JYP를 포함한 총 10명이 결과가 나온다.

## 시행착오

- 일단 기본 예제 코드는 prue.js. 개발은 react로 진행
- 웹캠을 사용하기에 조금 까다로운 작업들이 필요했다. 예를들어 스타트를하고 페이지를 다른 곳으로 넘어갈 경우 브라우저에서 웹캠이 게속 켜있는 문제가 발생.
- 페이지를 이동할때, 즉 페이지가 Umount 될때 웹캠을 종료해줄 필요가 있다.
- useEffect의 return을 사용했다.
- 하지만 또 문제발생. 
- webcam이 아직 로딩안됐는데, 페이지를 이동할경우 unmout에서 진행되는 웹캠종료에 에러가 발생 (webcam is undefined)
- 조건문을 통해 webcam이 있을때만 실행하도록 수정

----

어렵게만 생각했던 머신러닝을 쉽게 해결. 간단한 것들이지만 웹앱을 만들떄 선택지가 늘어난 것은 긍정적인것 같다.

