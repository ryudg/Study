// 8.Class/10-2.overrideConstructor.ts

class GradesTally {
  grades: number[] = [];

  addGrades(...grades: number[]) {
    this.grades.push(...grades);
    return this.grades.length;
  }
}

class ContinueGradeTally extends GradesTally {
  constructor(previousGrades: number[]) {
    this.grades = [...previousGrades];
    //^^^^ 'super' must be called before accessing 'this' in the constructor of a derived class.

    super();

    console.log("Starting with length", this.grades.length);
  }
}
