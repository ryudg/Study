// 8.Class/07-1.classAsType.ts

class Teacher {
  sayHello() {
    console.log("Take chances, make mistakes, get messy!");
  }
}

let teacher: Teacher;
teacher = new Teacher();

teacher = "Wahoo!";
// ^^^^^^^ Type 'string' is not assignable to type 'Teacher'.
