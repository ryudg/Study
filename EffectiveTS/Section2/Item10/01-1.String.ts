// Section2/Item10/01-1.String.ts

const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function (pos) {
  console.log(this, typeof pos);
  return originalCharAt.call(this, pos);
};
console.log("primitive".charAt(3));

// [String: 'primitive'] 'object' 3
// m
