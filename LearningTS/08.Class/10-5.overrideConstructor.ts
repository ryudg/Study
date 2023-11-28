// 8.Class/10-5.overrideConstructor.ts

class NumericGrade {
  value = 0;
}

class VagueGrade extends NumericGrade {
  value = Math.random() > 0.5 ? 1 : "...";
  //^^^^^ Property 'value' in type 'VagueGrade' is not assignable to the same property in base type 'NumericGrade'.
  //      Type 'string | number' is not assignable to type 'number'.
  //      Type 'string' is not assignable to type 'number'.
}

// const instance: NumericGrade = new VagueGrade();
const instance = new VagueGrade();

instance.value; // 예상한 타입은 number이지만 실제 타입은 number | string이다.
