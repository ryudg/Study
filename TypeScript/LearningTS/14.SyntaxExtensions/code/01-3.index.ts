// 14.SyntaxExtensions/01-3.index.ts

class NamedEnginner {
  fullName: string;

  constructor(name: string, public area: string) {
    this.fullName = `${name} ${area} Enginner`;
  }
}
