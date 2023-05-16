import axios from "axios";
const URL = "http://localhost:8000";
let imageSrc = "";
export const uploadImage = async (formData) => {
  console.log(`${URL}/api/v1/products/upload`);
  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${URL}/api/v1/products/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imageSrc = src;
    console.log(imageSrc);
    return imageSrc;
  } catch (err) {
    imageSrc = "";
    console.log(err);
  }
};

export const createProduct = async (product) => {
  try {
    product.image = imageSrc;
    return await axios.post(`${URL}/api/v1/products/create`, product);
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = async () => {
  try {
    return await axios.get(`${URL}/api/v1/products/all`);
  } catch (err) {
    console.log(err);
  }
};
