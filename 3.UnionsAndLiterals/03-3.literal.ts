let specificallyAda: "Ada";

specificallyAda = "Ada";

specificallyAda = "Grace";
// ^^^^^^^^^^^^^^^ Type '"Grace"' is not assignable to type '"Ada"'.

let someString = "";

specificallyAda = someString;
// ^^^^^^^^^^^^^^^ Type 'string' is not assignable to type '"Ada"'.
