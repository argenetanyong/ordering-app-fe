import { mainAxios } from "../../configs/axios";

const moduleName = "order-details";

const findById = async (id) => {
  try {
    const res = await mainAxios({
      method: "get",
      url: `${moduleName}/${id}`,
    });
    return res.data;
  } catch (err) {
    console.log("err", err);
    return err.response;
  }
};

const findByOrderId = async (id) => {
  try {
    const res = await mainAxios({
      method: "get",
      url: `${moduleName}/find-by-order-id/${id}`,
    });
    return res.data;
  } catch (err) {
    console.log("err", err);
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
    return err.response;
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

const update = async (id, data) => {
  try {
    const res = await mainAxios({
      method: "put",
      url: `${moduleName}/${id}`,
      headers: { "Content-Type": "multipart/form-data" },
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
  list,
  create,
  remove,
  findById,
  findByOrderId,
  update,
};
