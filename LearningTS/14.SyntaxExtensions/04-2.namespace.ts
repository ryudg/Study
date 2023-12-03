// 14.SyntaxExtensions/04-2.namespace.ts

namespace Settings {
  export const name = "My Application";
  export const version = "1.0.0";
  export function describe() {
    return `${name} v${version}`;
  }
  console.log("Initializing", describe());
}

console.log("Initializing", Settings.describe());
