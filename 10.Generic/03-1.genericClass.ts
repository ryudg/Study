// 10.Generic/03-1.genericClass.ts

class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

const storage = new Secret(12345, "luggage"); // 타입은 Secret<number, string>

const result = storage.getValue(54321); // 타입은 string | undefined
