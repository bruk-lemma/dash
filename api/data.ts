import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getTotal = async () => {
  const response = await axios.get(`${API_BASE_URL}/analytics/region/overall`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getRegions = async () => {
  const response = await axios.get(`${API_BASE_URL}/analytics/all/region`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
