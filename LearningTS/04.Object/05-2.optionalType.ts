// 04.Object/05-2.optionalType.ts

type Writers = {
  author: string | undefined;
  editor?: string;
};

const hasRequired: Writers = {
  author: undefined,
};

const missingRequired: Writers = {};
//    ^^^^^^^^^^^^^^^ Property 'author' is missing in type '{}' but required in type 'Writers'.ts(2741)
//                    05-2.optionalType.ts(4, 3): 'author' is declared here.
