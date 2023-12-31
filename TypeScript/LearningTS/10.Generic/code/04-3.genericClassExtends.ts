// 10.Generic/04-3.genericClassExtends.ts

interface ActingCredit<Role> {
  role: Role;
}

class MoviePart implements ActingCredit<string> {
  role: string;
  speaking: boolean;

  constructor(role: string, speaking: boolean) {
    this.role = role;
    this.speaking = speaking;
  }
}

const part = new MoviePart("Hans Gruber", true);
const partRole = part.role; // 타입은 string

class IncorrectExtension implements ActingCredit<string> {
  role: boolean;
  //^^^^ Property 'role' in type 'IncorrectExtension' is not assignable to the same property in base type 'ActingCredit<string>'.
  //     Type 'boolean' is not assignable to type 'string'.
}
