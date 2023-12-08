// 10.Generic/04-2.genericClassExtends.ts

class Quote<T> {
  lines: T;

  constructor(lines: T) {
    this.lines = lines;
  }
}

class AttributeQuote<Value> extends Quote<Value> {
  speaker: string;

  constructor(value: Value, speaker: string) {
    super(value);
    this.speaker = speaker;
  }
}

// 타입은 AttributeQuote<string>, Quote<string>를 확장
const result = new AttributeQuote<string>("Hello", "World");
