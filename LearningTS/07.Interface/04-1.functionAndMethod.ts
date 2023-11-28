// 7.Interface/04-1.functionAndMethod.ts

interface HasBothFunctionTypes {
  property: () => string;
  method(): string;
}

const hasBoth: HasBothFunctionTypes = {
  property: () => "Hello, World",
  method() {
    return "Hello, World";
  },
};

hasBoth.property();
hasBoth.method();
