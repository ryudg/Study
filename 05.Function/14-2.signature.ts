// 5.Function/14-2.signature.ts

function format(data: string): string;
function format(data: string, needle: string, haystack: string): string;

function format(getData: () => string): string;
//       ^^^^^^ This overload signature is not compatible with its implementation signature.

function format(data: string, needle?: string, haystack?: string): string {
  return needle && haystack ? data.replace(needle, haystack) : data;
}

/*
function format(data: string | (() => string), needle?: string, haystack?: string): string {
  if (typeof data === 'string') {
    return needle && haystack ? data.replace(needle, haystack) : data;
  } else {
    return needle && haystack ? data().replace(needle, haystack) : data();
  }
}
*/
