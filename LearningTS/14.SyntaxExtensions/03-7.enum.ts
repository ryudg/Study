// 14.SyntaxExtensions/03-7.enum.ts

enum Wat {
  FirstString = "first",
  SomeNumber = 9000,
  ImplicitNumber, // 9001
  AnotherString = "another",

  NotAllowed,
  //^^^^^^^^ Enum member must have initializer.
}
