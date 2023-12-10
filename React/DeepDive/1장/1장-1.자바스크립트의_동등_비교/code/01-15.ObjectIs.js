-0 === +0; // true
Object.is(-0, +0); // false

Number.NaN === NaN; // false
Object.is(Number.NaN, NaN); // true

NaN === 0 / 0; // false
Object.is(NaN, 0 / 0); // true
