// 9.Modifier/05-7.assertion.ts

interface Entertainer {
  acts: string[];
  name: string;
}

const declared: Entertainer = {
  //  ^^^^^^^^ Property 'acts' is missing in type '{ name: string; }' but required in type 'Entertainer'.
  name: "Moms Mabley",
};

const asserted = {
  name: "Moms Mabley",
} as Entertainer; // 허용되지만 런타임 시 오류 발생
