import { StatusCodes } from "http-status-codes";
import * as Cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

export const LocalImageUpload = async (req, res) => {
  if (!req.files) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No Req Files available!" });
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Wrong file type!" });
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Greater Image size than allowed!" });
  }
  const imagePath = path.join(
    path.resolve(),
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

export const ImageUpload = async (req, res) => {
  const result = await Cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      folder: "upload",
      use_filename: true,
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};
