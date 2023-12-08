// 9.Modifier/03-3.predicates.ts

interface Comedian {
  funny: boolean;
}

interface StandupComedian extends Comedian {
  routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
  return "routine" in value;
}

function workWithComedian(value: Comedian) {
  if (isStandupComedian(value)) {
    console.log(value.routine); // value의 타입은 StandupComedian
  }

  console.log(value.routine); // value의 타입은 Comedian
  //                ^^^^^^^ Property 'routine' does not exist on type 'Comedian'.
}
