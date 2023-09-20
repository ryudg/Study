interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery("SELECT FIRST, LAST FROM AUTHORS");
  return authorRows.map((row) => ({
    first: row[0],
    last: row[1],
  }));
}
