// 8.Class/08-4.classAndInterface.ts

interface AgeIsNumber {
  age: number;
}

interface AgeIsNotANumber {
  age: () => string;
}

class AsNumber implements AgeIsNumber, AgeIsNotANumber {
  age: 0;
  //^^^ Property 'age' in type 'AsNumber' is not assignable to the same property in base type 'AgeIsNotANumber'.
  //    Type 'number' is not assignable to type '() => string'.
}

class NotAsNumber implements AgeIsNumber, AgeIsNotANumber {
  age() {
    return "";
  }
  //^^^ Property 'age' in type 'NotAsNumber' is not assignable to the same property in base type 'AgeIsNumber'.
  //    Type '() => string' is not assignable to type 'number'.
}
