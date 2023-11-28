// 8.Class/09-1.extendsClass.ts

class Teacher {
  teach() {
    console.log("The surest test of discipline is its absence.");
  }
}

class StudentTeacher extends Teacher {
  learn() {
    console.log("I cannot afford the luxury of a closed mind.");
  }
}

const teacher = new StudentTeacher();

teacher.teach();
teacher.learn();

teacher.other();
//      ^^^^^ Property 'other' does not exist on type 'StudentTeacher'.
