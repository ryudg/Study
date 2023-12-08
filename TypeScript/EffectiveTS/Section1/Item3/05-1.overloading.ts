function add(a: number, b: number): number {
  return a + b;
}
//       ^^^ Duplicate function implementation.
function add(a: string, b: string): string {
  return a + b;
}
//       ^^^ Duplicate function implementation.
