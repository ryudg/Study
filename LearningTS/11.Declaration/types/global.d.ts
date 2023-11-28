// 11.Declaration/types/global.d.ts

import { Data } from "./data";

declare global {
  const globallyDeclared: Data;
}

declare const locallyDeclared: Data;
