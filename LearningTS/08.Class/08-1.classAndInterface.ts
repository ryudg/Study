// 8.Class/08-1.classAndInterface.ts

interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  study(hours: number) {
    for (let i = 0; i < hours; i += 1) {
      console.log("studying...");
    }
  }
}

class Slacker implements Learner {
  //  ^^^^^^^ Class 'Slacker' incorrectly implements interface 'Learner'.
  //          Type 'Slacker' is missing the following properties from type 'Learner': name, study
}
