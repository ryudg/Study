// 8.Class/12-2.accessibility.ts

class TwoKeywords {
  private readonly name: string;

  constructor() {
    this.name = "Mark";
  }

  log() {
    console.log(this.name);
  }
}

const two = new TwoKeywords();

two.name = "Nana";
//  ^^^^ Property 'name' is private and only accessible within class 'TwoKeywords'.
//       Cannot assign to 'name' because it is a read-only property.
