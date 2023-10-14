// 7.Interface/03-2.readonly.ts

interface Page {
  readonly text: string;
}
function read(page: Page) {
  console.log(page.text); // 값 읽기

  page.text += "!"; // 값 수정
}

const pageIsh = {
  text: "Hello, World",
};

pageIsh.text += "!";

read(pageIsh);
