// 8.Class/10-3.overrideConstructor.ts

class GradeCounter {
  countGrades(grades: string[], letter: string) {
    return grades.filter((grade) => grade === letter).length;
  }
}

class FailureCounter extends GradeCounter {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
  }
}

class AnyFailureChecker extends GradeCounter {
  countGrades(grades: string[]) {
    //^^^^^^^^^^^ Property 'countGrades' in type 'AnyFailureChecker' is not assignable to the same property in base type 'GradeCounter'.
    //            Type '(grades: string[]) => boolean' is not assignable to type '(grades: string[], letter: string) => number'.
    //            Type 'boolean' is not assignable to type 'number'.
    return super.countGrades(grades, "F") !== 0;
  }
}

// const counter: GradeCounter = new AnyFailureChecker();
const counter = new AnyFailureChecker();

const count = counter.countGrades(["A", "C", "F"]);
// 예상한 타입은 number이지만, boolean이 나온다.
