import { get } from "./callsFetch";

export const getOptions = async () => {
  try {
    const request = await get(`${process.env.REACT_APP_API_URL}/api/options`);
    return request;
  } catch (err) {
    console.log("error");
  }
};
