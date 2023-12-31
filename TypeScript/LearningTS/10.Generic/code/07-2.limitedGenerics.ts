// 10.Generic/07-2.limitedGenerics.ts

function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "True Lies"],
};

const favorite = get(roles, "favorite"); // 타입은 string
const others = get(roles, "others"); // 타입은 string[]

const missing = get(roles, "missing");
//                         ^^^^^^^^^ Argument of type '"missing"' is not assignable to parameter of type '"favorite" | "others"'.
