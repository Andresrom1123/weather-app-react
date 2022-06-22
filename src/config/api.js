import axios from "axios";
axios.defaults.baseURL = "https://www.universal-tutorial.com/api/";
const Token = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "api-token":
        "fw2D-By0Uj7ocJpeHBs8xJiS3vq-yQjOUVb77Qb1332Q-myNOYaEPrbTRWmdokqmM4g",
      "user-email": "andres@gmail.com",
    },
  };
  const { data } = await axios.get("getaccesstoken", config);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data["auth_token"]}`;
};
export const Countries = async () => {
  await Token();
  const { data } = await axios.get("countries");
  return data;
};

export const States = async (country) => {
  await Token();
  const { data } = await axios.get(`states/${country}`);
  return data;
};
