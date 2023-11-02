// 10.Generic/09-3.promise.ts

function labelBox<L, V>(l: L, v: V) {} // L과 V가 무엇인지 알 수 없다.

// 보다 명확하다
function labelBox2<Label, Value>(label: Label, value: Value) {}
