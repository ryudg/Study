// 13.ConfigurationOptions/06-8.JSDoc.ts

/**
 * @param {string} text
 */
function sentenceCase(text) {
  return `${text[0].toUpperCase()} ${text.slice(1)}`;
}

sentenceCase("hello world");

sentenceCase(["hello", "world"]);
//           ^^^^^^^^^^^^^^^^^^ Argument of type 'string[]' is not assignable to parameter of type 'string'.
