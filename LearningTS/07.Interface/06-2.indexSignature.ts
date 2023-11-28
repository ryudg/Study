// 7.Interface/06-2.indexSignature.ts

interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818"),
};

publishDates.Frankenstein; // 타입은 Date
console.log(publishDates.Frankenstein.toString());

publishDates.Beloved; // 타입은 Date이지만, 런타임 값은 undefined
console.log(publishDates.Beloved.toString()); // 타입 시스템에서는 에러가 발생하지 않지만, 런타임에서는 에러가 발생한다.
