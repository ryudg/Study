// 7.Interface/03-1.readonly.ts

interface Page {
  readonly text: string;
}

function read(page: Page) {
  console.log(page.text); // 값 읽기

  page.text += "!"; // 값 수정
  //   ^^^^ Cannot assign to 'text' because it is a read-only property.
}
