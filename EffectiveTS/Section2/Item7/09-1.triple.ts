// Section2/Item7/09-1.triple.ts

const triple: [number, number, number] = [1, 2, 3];

const double: [number, number] = triple;
//    ^^^^^^ Type '[number, number, number]' is not assignable to type '[number, number]'.
//           Source has 3 element(s) but target allows only 2.
