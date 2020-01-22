import Dexie from 'dexie';
import {refreshToken} from "./axiosInstance";

const db = new Dexie('vistaPortal');

db.version(1).stores({
  refreshTokenTable: 'id'
});

const saveRefreshToken = async (refreshToken) => {
  await db.refreshTokenTable.put({id: 1, refreshToken: refreshToken});
};

const loadRefreshToken = async () => {
  const data = await db.refreshTokenTable
    .where('id')
    .equals(1)
    .toArray()
    .then(data => {
      console.log(data[0]['refreshToken']);
      return Promise.resolve();
    });

};

const deleteRefreshToken = async () => {
  await db.refreshTokenTable
    .where('id')
    .equals(1)
    .delete();
};

export { saveRefreshToken, loadRefreshToken, deleteRefreshToken }
