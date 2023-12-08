// 8.Class/09-2.extendsClass.ts

class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

let lesson: Lesson;
lesson = new Lesson("coding");
lesson = new OnlineLesson("coding", "https://example.com");

let online: OnlineLesson;
online = new OnlineLesson("coding", "https://example.com");

online = new Lesson("coding");
// ^^^^^^ Property 'url' is missing in type 'Lesson' but required in type 'OnlineLesson'.
