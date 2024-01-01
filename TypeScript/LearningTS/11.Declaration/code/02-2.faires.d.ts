// 11.Declaration/02-2.faires.d.ts

declare function canGrantWish(wish: string): boolean;

declare function grantWish(wish: string) {
  return true;
};
//                                       ^               ^ An implementation cannot be declared in ambient contexts.

class Fairy {
  canGrantWish(wish: string): boolean;

  grantWish(wish: string) {
    return true;
  }
  //                      ^ An implementation cannot be declared in ambient contexts.
}
