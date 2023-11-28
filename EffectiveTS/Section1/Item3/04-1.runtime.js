function setLightSwitch(value) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log("이 코드는 실행이 될까요?");
  }
}
function turnLightOn() {
  console.log("불을 켭니다.");
}
function turnLightOff() {
  console.log("불을 끕니다.");
}

setLightSwitch("false"); // 불을 끕니다.
