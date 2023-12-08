// 8.Class/10-4.overrideConstructor.ts

class Assignment {
  grade?: number;
}

class GradedAssignment extends Assignment {
  grade: number;

  constructor(grage: number) {
    super();
    this.grade = grage;
  }
}
