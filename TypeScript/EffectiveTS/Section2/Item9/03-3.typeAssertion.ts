// Section2/Item9/03-3.typeAssertion.ts

interface Person {
  name: string;
}
const body = document.body;
const el = body as Person;
//         ^^^^^^^^^^^^^^ Conversion of type 'HTMLElement' to type 'Person' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
//                        Property 'name' is missing in type 'HTMLElement' but required in type 'Person'.
