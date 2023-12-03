// 14.SyntaxExtensions/03-1.enum.ts

const StatusCodes = {
  InternalServerError: 500,
  NotFound: 404,
  Ok: 200,
  // ...
} as const;

StatusCodes.InternalServerError; // 500
