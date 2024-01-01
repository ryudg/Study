// 14.SyntaxExtensions/03-2.enum.ts

const StatusCodes = {
  InternalServerError: 500,
  NotFound: 404,
  Ok: 200,
  // ...
} as const;

type StatusCodeValue = (typeof StatusCodes)[keyof typeof StatusCodes]; // 500 | 404 | 200

let statusCodeValue: StatusCodeValue;
statusCodeValue = 200;
statusCodeValue = 404;
statusCodeValue = 500;

statusCodeValue = 400;
//^^^^^^^^^^^^^ Type '400' is not assignable to type 'StatusCodeValue'.
