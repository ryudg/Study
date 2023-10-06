// 5.Function/16-2.this.ts

interface User {
  id: number;
  admin: boolean;
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

declare const getDB: () => DB;

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
