import Dexie from "dexie";

const db = new Dexie("vistaDb");
db.version(1).stores({
  // refresh token have id 1, access token - 2
  tokensTable: "id",
});

const REFRESH_TOKEN = 1;
const ACCESS_TOKEN = 2;

export { db, REFRESH_TOKEN, ACCESS_TOKEN };
