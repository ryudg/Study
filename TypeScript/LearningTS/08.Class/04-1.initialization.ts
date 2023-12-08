// 8.Class/04-1.initialization.ts

class WithValue {
  immediate = 0;
  later: number; // constructor에서 할당
  mayBeUndefined: number | undefined; // undefined가 되는 것이 허용
  unused: number;
  //^^^^^^ Property 'unused' has no initializer and is not definitely assigned in the constructor.
  constructor() {
    this.later = 1;
  }
}
