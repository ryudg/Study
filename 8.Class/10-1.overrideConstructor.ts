// 8.Class/10-1.overrideConstructor.ts

class GradeAnnouncer {
  message: string;

  constructor(grade: number) {
    this.message = grade >= 65 ? "Maybe next time." : "Congratulations!";
  }
}

class PassingAnnouncer extends GradeAnnouncer {
  constructor() {
    super(100);
  }
}

class FailingAnnouncer extends GradeAnnouncer {
  constructor() {}
  //^^^^^^^^^^^^^^^^ Constructors for derived classes must contain a 'super' call.
}
