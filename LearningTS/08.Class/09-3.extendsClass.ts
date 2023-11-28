// 8.Class/09-3.extendsClass.ts

class PastGrades {
  grades: number[];
}

class LabeledPastGrades extends PastGrades {
  label?: string;
}

let subClass: LabeledPastGrades;
subClass = new LabeledPastGrades();
subClass = new PastGrades();
