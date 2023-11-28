// 11.Declaration/02-4.index.d.ts

interface Writer {}
declare interface Writer {}

declare const fullName: string;
declare const firstName: "Liz";

const lastName = "Lemon";
//^^^ Top-level declarations in .d.ts files must start with either a 'declare' or 'export' modifier.
