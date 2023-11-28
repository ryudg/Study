// 6.Array/03-1.spread.ts

const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"]; // 타입은 string[]

const soldierAges = [90, 19, 45]; // 타입은 number[]

const conjoined = [...soldiers, ...soldierAges]; // 타입은 (string | number)[]
