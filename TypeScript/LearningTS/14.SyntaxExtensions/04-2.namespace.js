// 14.SyntaxExtensions/04-2.namespace.ts
var Settings;
(function (Settings) {
    Settings.name = "My Application";
    Settings.version = "1.0.0";
    function describe() {
        return "".concat(Settings.name, " v").concat(Settings.version);
    }
    Settings.describe = describe;
    console.log("Initializing", describe());
})(Settings || (Settings = {}));
console.log("Initializing", Settings.describe());
