// 14.SyntaxExtensions/01-1.index.ts

class Enginner {
  readonly area: string;

  constructor(area: string) {
    this.area = area;
    console.log(`I Work in ${area} area`);
  }
}

const engineer = new Enginner("Frontend").area; // 타입은 string
