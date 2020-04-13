import { axiosInstance as axios } from "../../configs/axiosInstance";

const fetchDefectura = async () => {
  const response = await axios.get("/defectura/");
  if (response.status === 200) {
    return response.data;
  }
};

const addDefectura = async (drugName, comment, employeeName) => {
  const data = {
    drugName: drugName,
    comment: comment,
    employeeName: employeeName,
  };
  const response = await axios.post("/defectura/", data);
  return response.status === 201;
};

export { fetchDefectura, addDefectura };
