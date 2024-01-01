// 14.TypeOperations/04-2.templateLiteral.ts

type Brightness = "dark" | "light";
type Color = "blue" | "red";

type BrightnessAndColor = `${Brightness}-${Color}`; // "dark-blue" | "dark-red" | "light-blue" | "light-red"

let colorOk: BrightnessAndColor = "dark-blue";

let colorNg: BrightnessAndColor = "dark-green";
//  ^^^^^^^ Type '"dark-green"' is not assignable to type '"dark-blue" | "dark-red" | "light-blue" | "light-red"'. Did you mean '"dark-red"'?
