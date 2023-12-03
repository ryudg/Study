// 14.SyntaxExtensions/02-1.decorator.ts

function myDecorator(target: any) {
  console.log("myDecorator");
}

@myDecorator
class MyClass {
  constructor() {
    console.log("constructor");
  }
}
