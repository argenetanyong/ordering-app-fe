import config from "../configs";

const setUploadedImage = (val) => {
  return val ? `${config.apiBaseUrl}/${val}` : "/images/no-image.png";
};

export { setUploadedImage };
