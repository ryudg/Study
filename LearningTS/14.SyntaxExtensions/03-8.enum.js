// 14.SyntaxExtensions/03-8.enum.ts
var DisplayHint;
(function (DisplayHint) {
    DisplayHint[DisplayHint["Opaque"] = 0] = "Opaque";
    DisplayHint[DisplayHint["Semitransparent"] = 1] = "Semitransparent";
    DisplayHint[DisplayHint["Transparent"] = 2] = "Transparent";
})(DisplayHint || (DisplayHint = {}));
var displayHint = 2 /* DisplayHint.Transparent */;
