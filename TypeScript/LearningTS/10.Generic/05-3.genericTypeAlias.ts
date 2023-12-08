// 10.Generic/05-3.genericTypeAlias.ts
interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessResult<Data> {
  data: Data;
  succeeded: true;
}

type Result<Data> = FailureResult | SuccessResult<Data>;

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    console.log(`We did it! ${result.data}`); // result의 타입은 SuccessResult<string>
  } else {
    console.error(`Oh no! ${result.error}`); // result의 타입은 FailureResult
  }

  result.data;
  //     ^^^^ Property 'data' does not exist on type 'Result<string>'.
  //          Property 'data' does not exist on type 'FailureResult'.
}
