// 10.Generic/07-3.limitedGenerics.ts

function get<T>(container: T, key: keyof T) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "True Lies"],
};

const found = get(roles, "favorite"); // 타입은 string | string[]
