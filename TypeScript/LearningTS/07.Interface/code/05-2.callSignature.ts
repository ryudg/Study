// 7.Interface/05-1.callSignature.ts

type FunctionAlias = (input: string) => number;
const typedFunctionAlias: FunctionAlias = (input) => input.length;

interface CallSignature {
  (input: string): number;
}
const typedSignature: CallSignature = (input) => input.length;
