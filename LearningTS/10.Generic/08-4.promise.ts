// 10.Generic/08-4.promise.ts

// 타입은 (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}

// 타입은 (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length;
}
