// 14.SyntaxExtensions/05-1.exportImport.ts

const action = {
  area: "people",
  name: "Bella Abzug",
  role: "politician",
};

type ActivistArea = "nature" | "people";

export { action, ActivistArea };
