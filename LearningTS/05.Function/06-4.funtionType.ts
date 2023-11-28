// 5.Function/06-4.funtionType.ts

let returnsStringOrUndefined: () => string | undefined;
returnsStringOrUndefined = () => "hi";
returnsStringOrUndefined = () => undefined;
returnsStringOrUndefined = undefined;
//^^^^^^^^^^^^^^^^^^^^^^ Type 'undefined' is not assignable to type '() => string | undefined'.

let maybeReturnsString: (() => string) | undefined;
maybeReturnsString = () => "hi";
maybeReturnsString = undefined;

maybeReturnsString = () => undefined;
//                   ^^^^^^^^^^^^^^^ Type '() => undefined' is not assignable to type '() => string'.
//                                   Type 'undefined' is not assignable to type 'string'.
