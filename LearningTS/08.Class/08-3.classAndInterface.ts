// 8.Class/08-3.classAndInterface.ts

interface Graded {
  grades: number[];
}

interface Reporter {
  report: () => string;
}

class ReportCard implements Graded, Reporter {
  grades: number[];

  constructor(grades: number[]) {
    this.grades = grades;
  }

  report() {
    return this.grades.join(", ");
  }
}

class Empty implements Graded, Reporter {
  //  ^^^^^ Class 'Empty' incorrectly implements interface 'Graded'.
  //        Property 'grades' is missing in type 'Empty' but required in type 'Graded'.
  //        Class 'Empty' incorrectly implements interface 'Reporter'.
  //        Property 'report' is missing in type 'Empty' but required in type 'Reporter'.
}
