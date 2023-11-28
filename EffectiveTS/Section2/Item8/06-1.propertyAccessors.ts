// Section2/Item8/06-1.propertyAccessors.ts

interface Person {
  first: string;
  last: string;
}

const p: Person = { first: "Jane", last: "Jacobs" };

const first: Person["first"] = p["John"]; // 또는 p.first
//    -----                    --------- 값
//           ------ -------              타입

type PersonEl = Person["first" | "last"]; // 타입은 string
type Tuple = [string, number, Date];
type TupleEl = Tuple[number]; // 타입은 string | number | Date
