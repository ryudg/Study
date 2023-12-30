// 7.Interface/09-1.multipleInterface.ts

interface GivesNumber {
  giveNumber(): number;
}

interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
  instance.giveNumber(); // 타입은 number | string
  instance.giveString(); // 타입은 number
  instance.giveEither(); // 타입은 string
}
