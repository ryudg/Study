// 8.Class/03-3.funtionProperty.ts

class WithPropertyParameters {
  takesParameters = (input: boolean) => (input ? "Yes" : "No");
}

const instance = new WithPropertyParameters();

instance.takesParameters(true);
instance.takesParameters(false);

instance.takesParameters(123);
//                       ^^^ Argument of type 'number' is not assignable to parameter of type 'boolean'.
