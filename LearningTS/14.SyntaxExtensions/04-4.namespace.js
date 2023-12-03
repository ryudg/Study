// 14.SyntaxExtensions/04-4.namespace.ts
var Root;
(function (Root) {
    var Nested;
    (function (Nested) {
        Nested.value1 = true;
    })(Nested = Root.Nested || (Root.Nested = {}));
})(Root || (Root = {}));
(function (Root) {
    var Nested;
    (function (Nested) {
        Nested.value2 = true;
    })(Nested = Root.Nested || (Root.Nested = {}));
})(Root || (Root = {}));
