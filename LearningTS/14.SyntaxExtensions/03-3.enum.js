// 14.SyntaxExtensions/03-3.enum.ts
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["Ok"] = 200] = "Ok";
    // ...
})(StatusCode || (StatusCode = {}));
StatusCode.InternalServerError; // 500
var statusCode;
statusCode = StatusCode.Ok;
statusCode = 200;
