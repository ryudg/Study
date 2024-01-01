// 14.SyntaxExtensions/settings/describe.ts

import { name, version } from "./constants";

export function describe() {
  return `${name} v${version}`;
}

console.log("Initializing", describe());
