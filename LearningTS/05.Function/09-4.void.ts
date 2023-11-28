// 5.Function/09-4.void.ts

const records: string[] = [];

function saveRecords(newRecords: string[]) {
  newRecords.forEach((record) => records.push(record));
}

saveRecords(["21", "Come On Over", "The Bodyguard"]);
