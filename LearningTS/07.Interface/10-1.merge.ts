// 7.Interface/10-1.merge.ts

interface Merged {
  formFirst: string;
}

interface Merged {
  fromSecond: number;
}

/*
병합된 인터페이스는 다음과 같이 동작한다.

interface Merged {
  formFirst: string;
  fromSecond: number;
}

*/
