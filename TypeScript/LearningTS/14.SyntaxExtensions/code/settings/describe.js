// 14.SyntaxExtensions/settings/describe.ts
var Settings;
(function (Settings) {
    function describe() {
        return "".concat(name, " v").concat(version);
    }
    Settings.describe = describe;
})(Settings || (Settings = {}));
