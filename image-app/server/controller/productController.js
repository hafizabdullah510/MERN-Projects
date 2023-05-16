import P_Schema from "../Model/productModel.js";
import { StatusCodes } from "http-status-codes";

export const createProduct = async (req, res) => {
  const product = await P_Schema.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getProducts = async (req, res) => {
  const products = await P_Schema.find({});
  res.status(StatusCodes.OK).json({ products });
};
