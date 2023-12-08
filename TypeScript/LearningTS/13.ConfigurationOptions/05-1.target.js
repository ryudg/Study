// 13.ConfigurationOptions/05-1.target.ts
function defaultNameAndLog(nameMaybe) {
    var name = nameMaybe !== null && nameMaybe !== void 0 ? nameMaybe : "anonymous";
    console.log("From", nameMaybe, "to", name);
    return name;
}
