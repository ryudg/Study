// 7.Interface/11-1.nameCollision.ts

interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: number) => string;
  //^^^^^^^^^ Subsequent property declarations must have the same type.  Property 'different' must be of type '(input: string) => string', but here has type '(input: number) => string'.
}
