const bigInt1 = 9007199254740995n;
const bigInt2 = BigInt("9007199254740995");

bigInt1 + bigInt2; // 18014398509481990n
bigInt1 + 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
