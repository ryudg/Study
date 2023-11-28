// 11.Declaration/02-7.index.ts

import { Data } from "./types/data";

function logData(data: Data) {
  console.log(`Data version is: ${data.version}`);
}

logData(globallyDeclared);

logData(locallyDeclared);
//      ^^^^^^^^^^^^^^^ Cannot find name 'locallyDeclared'. Did you mean 'globallyDeclared'?
