// 10.Generic/05-2.genericTypeAlias.ts

type CreateValue<Input, Output> = (input: Input) => Output;

let creator: CreateValue<string, number>;

creator = (text) => text.length;

creator = (text) => text.toUpperCase();
//                  ^^^^^^^^^^^^^^^^^^ Type 'string' is not assignable to type 'number'.
