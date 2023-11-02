// 8.Class/08-2.classAndInterface.ts

interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name;
  //^^^^ Member 'name' implicitly has an 'any' type.

  study(hours) {}
  //    ^^^^^ Parameter 'hours' implicitly has an 'any' type.
}
