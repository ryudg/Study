// 5.Function/14-1.signature.ts
function createDate(mothnOrTimestamp, day, year) {
    return day === undefined || year === undefined
        ? new Date(mothnOrTimestamp)
        : new Date(year, mothnOrTimestamp, day);
}
createDate(55456800);
createDate(10, 6, 2023);
createDate(10, 6);
//^^^^^^^^^^^^^^^ No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
