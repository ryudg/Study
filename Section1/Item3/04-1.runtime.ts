function setLightSwitch(value: boolean) {
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

// setLightSwitch("on");
//             ^^^^ Argument of type 'string' is not assignable to parameter of type 'boolean'.
