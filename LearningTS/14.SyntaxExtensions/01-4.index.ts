// 14.SyntaxExtensions/01-4.index.ts

class NamedEnginner {
  fullName: string;
  area: string;

  constructor(name: string, area: string) {
    this.area = area;
    this.fullName = `${name} ${area} Enginner`;
  }
}
