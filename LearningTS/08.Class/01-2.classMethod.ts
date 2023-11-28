// 8.Class/01-2.classMethod.ts

class Greeted {
  constructor(message: string) {
    console.log(`As I always say: ${message}!`);
  }
}

new Greeted("take chances, make mistakes, get messy");

new Greeted();
// ^^^^^^^^^^^^^ Expected 1 arguments, but got 0.
