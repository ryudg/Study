// Section2/Item10/01-2.String.ts

function getStringLen(foo: String) {
  return foo.length;
}

getStringLen("Hello"); // 5
getStringLen(new String("Hello")); // 5
