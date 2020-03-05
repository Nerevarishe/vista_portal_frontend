import { axiosInstance as axios } from "../../configs/axiosInstance";

const fetchData = async () => {
  const response = await axios.get("/defectura/");
  return Promise.resolve(response.data)
};

const addDefectura = async (drugName, comment, employeeName) => {
  const data = {
    drugName: drugName,
    comment: comment,
    employeeName: employeeName
  };
  const response = await axios.post("/defectura/", data);
  return response.status === 201;
};

const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

// const groupBy = (object, ) => {
//
// };

export { fetchData, addDefectura, groupBy }
