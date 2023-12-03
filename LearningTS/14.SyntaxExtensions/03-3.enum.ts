// 14.SyntaxExtensions/03-3.enum.ts

enum StatusCode {
  InternalServerError = 500,
  NotFound = 404,
  Ok = 200,
  // ...
}

StatusCode.InternalServerError; // 500

let statusCode: StatusCode;
statusCode = StatusCode.Ok;
statusCode = 200;
