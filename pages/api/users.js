import { mainAxios } from "../../configs/axios";

const moduleName = "users";

const findById = async (id) => {
  try {
    const res = await mainAxios({
      method: "get",
      url: `${moduleName}/${id}`,
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

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
    return err.response;
  }
};

const loginWithJwt = (jwt) => {
  localStorage.setItem("token", jwt);
};

const update = async (id, data) => {
  try {
    const res = await mainAxios({
      method: "put",
      url: `${moduleName}/${id}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

const remove = async (id) => {
  try {
    const res = await mainAxios({
      method: "delete",
      url: `${moduleName}/${id}`,
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export default {
  create,
  list,
  findById,
  update,
  remove,
  loginWithJwt,
};
