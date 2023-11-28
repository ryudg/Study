// 05.Function/01-2.parameter.ts

function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

singTwo("Ball and Chain"); // 결과값: "Ball and Chain / undefined"
// ^^^^^^^^^^^^^^^^^^^^^^^^^  Expected 2 arguments, but got 1.ts(2554)

singTwo("I Will Survive", "Higher Love"); // 결과값: "I Will Survive / Higher Love"

singTwo("Go Your Own Way", "The Chain", "Dream"); // 결과값: "Go Your Own Way / The Chain"
//                                         ^^^^^^^ Expected 2 arguments, but got 3.
