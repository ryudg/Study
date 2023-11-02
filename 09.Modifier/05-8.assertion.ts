// 9.Modifier/05-8.assertion.ts

let myValue = "Stella!" as number;
//            ^^^^^^^^^^^^^^^^^^^ Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

let myValueDouble = "1337" as unknown as number;
