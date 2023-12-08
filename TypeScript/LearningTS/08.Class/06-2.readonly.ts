// 8.Class/06-2.readonly.ts

class RandomQuote {
  readonly explicit: string = "Hello";
  readonly implicit = "TypeScript";

  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "안녕하세요";

      this.implicit = "타입스크립트";
      //^^^^^^^^^^^^^ Type '"타입스크립트"' is not assignable to type '"TypeScript"'.
    }
  }
}

const quote = new RandomQuote();

quote.explicit; // 타입은 string
quote.implicit; // 타입은 "TypeScript"
