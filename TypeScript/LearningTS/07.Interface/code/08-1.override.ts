// 7.Interface/08-1.override.ts

interface WithNullableName {
  name: string | null;
}

interface WithNonNullableName extends WithNullableName {
  name: string;
}

interface WithNumericName extends WithNullableName {
  //      ^^^^^^^^^^^^^^^ Interface 'WithNumericName' incorrectly extends interface 'WithNullableName'.
  //                      Types of property 'name' are incompatible.
  //                      Type 'string | number' is not assignable to type 'string | null'.
  //                      Type 'number' is not assignable to type 'string'.

  name: number | string;
}
