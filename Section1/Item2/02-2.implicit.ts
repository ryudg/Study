// { "compilerOptions": { "strictNullChecks": true } }

const y: number = null;
// ^ 'null' 형식은 'number' 형식에 할당할 수 없습니다.

const z: number = undefined;
// ^ 'undefined' 형식은 'number' 형식에 할당할 수 없습니다.

const num: number | null = null;
