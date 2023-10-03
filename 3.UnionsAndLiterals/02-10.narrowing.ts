interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // 'null'과 'undefined'를 모두 제거
  if (container.value != null) {
    console.log(container.value);

    container.value *= factor;
  }
}
