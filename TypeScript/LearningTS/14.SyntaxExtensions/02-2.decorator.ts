// 14.SyntaxExtensions/02-2.decorator.ts

function logOnCall(target: any, key: string, decriptor: PropertyDescriptor) {
  const original = decriptor.value;
  console.log("[logOnCall] I am decorating", target.constructor.name);

  decriptor.value = function (...args: unknown[]) {
    console.log(`[decorator.vlaue] Calling '${key}' with`, ...args);
  };
}

class GreeterClass {
  @logOnCall
  greet(message: string) {
    console.log(`[greet] Hello, ${message}!`);
  }
}

new GreeterClass().greet("You");
// Output log:
// [logOnCall] I am decorating GreeterClass
// [decorator.vlaue] Calling 'greet' with You
// [greet] Hello, You!
