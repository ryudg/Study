// 10.Generic/06-2.genericModifier.ts

interface KeyValuePairs<Key, Value = Key> {
  key: Key;
  value: Value;
}

// 타입은 KeyValuePairs<string, string>
let allExplicit: KeyValuePairs<string, number> = {
  key: "rating",
  value: 10,
};

// 타입은 KeyValuePairs<string>
let oneEfaulting: KeyValuePairs<string> = {
  key: "rating",
  value: "ten",
};

let firstMissing: KeyValuePairs = {
  //              ^^^^^^^^^^^^^ Generic type 'KeyValuePairs<Key, Value>' requires between 1 and 2 type arguments.
  key: "rating",
  value: 10,
};
