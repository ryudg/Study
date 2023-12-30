// 8.Class/12-1.accessibility.ts

class Base {
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2;
  private isPrivate = 3;
  #truePrivate = 4;
}

class Subclass extends Base {
  exmaple() {
    this.isPublicImplicit;
    this.isPublicExplicit;
    this.isProtected;

    this.isPrivate;
    //   ^^^^^^^^^ Property 'isPrivate' is private and only accessible within class 'Base'.
    this.#truePrivate;
    //   ^^^^^^^^^^^^ Property '#truePrivate' is not accessible outside class 'Base' because it has a private identifier.
  }
}

new Subclass().isPublicImplicit;
new Subclass().isPublicExplicit;

new Subclass().isProtected;
//             ^^^^^^^^^^^ Property 'isProtected' is protected and only accessible within class 'Base' and its subclasses.

new Subclass().isPrivate;
//             ^^^^^^^^^ Property 'isPrivate' is private and only accessible within class 'Base'.
