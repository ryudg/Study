// 10.Generic/09-1.generic.ts

async function givesPromiseForString(): Promise<string> {
  return "Hello";
}

async function givesString(): string {
  //                          ^^^^^^ The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<string>'?
  return "Hello";
}
