import axios from "axios";

const API_URL = "/api/notlar/";

const notOlustur = async (notData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, notData, config);

  return response.data;
};

const notlarGetir = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const notSil = async (notId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + notId, config);

  return response.data;
};

const dataService = {
  notOlustur,
  notlarGetir,
  notSil
};

export default dataService;