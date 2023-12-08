// 14.SyntaxExtensions/05-3.exportImport.ts

import { ClassOne, type ClassTwo } from "my-example-types";

new ClassOne();

new ClassTwo();
//  ^^^^^^^^ 'ClassTwo' cannot be used as a value because it was imported using 'import type'.
