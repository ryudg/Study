// 8.Class/11-1.abstractClass.ts

abstract class School {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract getStudentTypes(): string[];
}

class Preschool extends School {
  getStudentTypes() {
    return ["preschooler"];
  }
}

class Absence extends School {}
//    ^^^^^^^ Non-abstract class 'Absence' does not implement all abstract members of 'School'

let school: School;
school = new Preschool("Happy Kids");

school = new School("somewhere else");
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot create an instance of an abstract class.
