// 14.TypeOperations/04-3.templateLiteral.ts

type ExtolNumber = `much ${number} wow`;

function extol(extolee: ExtolNumber) {
  // ...
}

extol("much 5 wow"); // OK
extol("much -5 wow"); // OK
extol("much 5.5 wow"); // OK

extol("much wow"); // NG
//    ^^^^^^^^^^ Argument of type '"much wow"' is not assignable to parameter of type '`much ${number} wow`'.
