// 5.Function/09-3.void.ts

function returnsVoid() {
  return;
}

let lazyValue: string | undefined;

lazyValue = returnsVoid();
// ^^^^^^^^^ Type 'void' is not assignable to type 'string | undefined'.
