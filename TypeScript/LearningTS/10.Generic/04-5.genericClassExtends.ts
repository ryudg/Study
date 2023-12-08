// 10.Generic/04-5.genericClassExtends.ts

class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log(value);
    return value;
  }

  static staticLog<OnStatic>(value: OnStatic) {
    let fromInstance: OnInstance;
    //                ^^^^^^^^^^ Static members cannot reference class type parameters.

    console.log(value);
    return value;
  }
}

// 타입은 number[]
const logger = new BothLogger<number[]>();
logger.instanceLog([1, 2, 3]);

// 유추된 OnStatic 타입 인수 boolean[]
const logger2 = BothLogger.staticLog([false, true]);

// 유추된 OnStatic 타입 인수 string
const logger3 = BothLogger.staticLog<string>("Log me");
