export function log(...data: unknown[]) {
  console.log("[LOG]", ...data);
}

log("hello", "world");
