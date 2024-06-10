import { axios } from "@/utils/axios";

export const fetchData = async (data: any) => {
  const config = {
    method: "POST",
    url: `/`,
    data: data,
  };
  return axios(config);
};
