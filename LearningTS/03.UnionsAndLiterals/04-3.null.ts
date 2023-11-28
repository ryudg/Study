export {};
let nameMaybe = Math.random() < 0.5 ? "John" : undefined;

nameMaybe.toLowerCase();
// ^^^^^^^^^ 'nameMaybe' is possibly 'undefined'.
