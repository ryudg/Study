// 10.Generic/04-4.genericClassExtends.ts

class CreatePairFactory<Key> {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  createPair<Value>(value: Value) {
    return { key: this.key, value };
  }
}

const factory = new CreatePairFactory("role"); // 타입은 CreatePairFactory<string>

const numberPair = factory.createPair(10); // 타입은 CreatePairFactory<number>

const stringPair = factory.createPair("Sophie"); // 타입은 { key: string, value: string }
