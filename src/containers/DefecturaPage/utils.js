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

const delDefectura = async (id) => {
  const response = await axios.delete(`/defectura/${id}`);
  return response.status === 200;
};

const toggleZD = async (id) => {
  const response = await axios.put(`/defectura/${id}`);
  return response.status === 200;
};

export { fetchDefectura, addDefectura, delDefectura, toggleZD };
