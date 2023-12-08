// 14.TypeOperations/04-4.templateLiteral.ts

type DataKey = "location" | "name" | "year";

type ExistenceChecks = {
  [key in `check${Capitalize<DataKey>}`]: () => boolean;
};
// {
//   checkLocation: () => boolean;
//   checkName: () => boolean;
//   checkYear: () => boolean;
// }

function checkExistence(checks: ExistenceChecks) {
  checks.checkLocation();
  checks.checkName();
  checks.checkYear();

  checks.checkWrong();
  //     ^^^^^^^^^^ Property 'checkWrong' does not exist on type 'ExistenceChecks'.
}
