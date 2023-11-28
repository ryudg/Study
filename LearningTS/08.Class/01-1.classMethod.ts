// 8.Class/01-1.classMethod.ts

class Greeter {
  greet(name: string) {
    console.log(`${name}, do your stuff!`);
  }
}

new Greeter().greet("John");

new Greeter().greet();
//            ^^^^^^^ Expected 1 arguments, but got 0.
