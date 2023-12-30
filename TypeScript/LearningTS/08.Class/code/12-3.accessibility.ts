// 8.Class/12-3.accessibility.ts

class Question {
  protected static readonly answer: "bash";
  protected static readonly prompt = "What's an ogre's favorite food?";

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt);

    if (answer === Question.answer) {
      console.log("Correct!");
    } else {
      console.log("Wrong, try again.");
    }
  }
}

Question.answer;
//       ^^^^^^ Property 'answer' is protected and only accessible within class 'Question' and its subclasses.
