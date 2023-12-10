const a = 1;

const maxInterger = Math.pow(2, 53);
maxInterger - 1 === Number.MAX_SAFE_INTEGER; // true

const minInterger = -(Math.pow(2, 53) - 1);
minInterger === Number.MIN_SAFE_INTEGER; // true
