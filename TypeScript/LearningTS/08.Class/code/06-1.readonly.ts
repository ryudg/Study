// 8.Class/06-1.readonly.ts

class Quote {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  emphasize() {
    return (this.text += "!");
    //          ^^^^ Cannot assign to 'text' because it is a read-only property.
  }
}

const quote = new Quote("Hello");

quote.text = "World";
//    ^^^^ Cannot assign to 'text' because it is a read-only property.
