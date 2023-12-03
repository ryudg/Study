// 14.SyntaxExtensions/01-2.index.ts

class Enginner {
  constructor(readonly area: string) {
    this.area = area;
    console.log(`I Work in ${area} area`);
  }
}

const engineer = new Enginner("Backend").area; // 타입은 string
