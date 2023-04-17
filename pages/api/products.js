import { mainAxios } from "../../configs/axios";

const moduleName = "products";

const list = async (params) => {
  try {
    const res = await mainAxios({
      method: "get",
      url: `${moduleName}`,
      params: params,
    });
    return res.data;
  } catch (err) {
    console.log("err", err);
    return err.response.data;
  }
};

const create = async (data) => {
  try {
    const res = await mainAxios({
      method: "post",
      url: `${moduleName}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export default {
  list,
  create,
};
