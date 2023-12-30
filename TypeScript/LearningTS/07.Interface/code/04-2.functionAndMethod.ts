// 7.Interface/04-2.functionAndMethod.ts

interface OptionalReadonlyFunction {
  readonly optionalProperty?: () => string;
  optionalMethod?(): string;
}
