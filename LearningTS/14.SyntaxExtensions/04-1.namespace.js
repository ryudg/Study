// 14.SyntaxExtensions/04-1.namespace.ts
var Randomized;
(function (Randomized) {
    var value = Math.random();
    console.log("My value is ".concat(value));
})(Randomized || (Randomized = {}));
