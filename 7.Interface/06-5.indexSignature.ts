// 7.Interface/06-5.indexSignature.ts

interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}

const mixesNumbersAndStrings: MoreNarrowNumbers = {
  0: "",
  key1: "",
  key2: undefined,
};

interface MoreNarrowStrings {
  [i: number]: string | undefined;
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 'number' index type 'string | undefined' is not assignable to 'string' index type 'string'.

  [i: string]: string;
}
