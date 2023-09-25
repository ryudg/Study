interface Person {
  firstName: string;
  last: string;
}

const formatName = (p: Person) => `${p.last}, ${p.firstName}`;

const formatNameAny = (p: any) => `${p.last}, ${p.first}`;
