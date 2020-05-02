import { axiosInstance as axios } from "../../config/axiosInstance";

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

const delDefecturaRecord = async (id) => {
  return await axios.delete(`/defectura/${id}`);
};

const toggleZD = async (id) => {
  const response = await axios.put(`/defectura/${id}`);
  return response.status === 200;
};

const delDefecturaDayCard = async (date) => {
  return await axios.delete(`/defectura/card/${date}`);
};

export {
  fetchDefectura,
  addDefectura,
  delDefecturaRecord,
  toggleZD,
  delDefecturaDayCard,
};
