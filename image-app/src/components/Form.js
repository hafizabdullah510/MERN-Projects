import React, { useState } from "react";
import {
  Input,
  FormGroup,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  Button,
} from "@mui/material";
import { styled } from "@mui/material";
import { createProduct, uploadImage } from "../service/api.js";
const FC = styled(FormControl)`
  margin-top: 20px;
`;
const Form = () => {
  const [disabled, setDisabled] = useState(true);
  const [divCont, setDivCont] = useState("Add Product");
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const handleValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImage = async (e) => {
    setDisabled(true);

    setDivCont("Uploading...");
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const imageSrc = await uploadImage(formData);
    if (imageSrc) {
      setDivCont("Add Product");
      setDisabled(false);
    } else {
      setDivCont("Error Uploading...");
      setDisabled(true);
    }
  };
  const addProduct = async () => {
    await createProduct(product);
    setProduct({
      name: "",
      price: "",
    });
  };

  return (
    <div className="form-cont">
      <FormGroup>
        <Typography variant="h4">Upload File</Typography>
        <FC>
          <InputLabel>Name</InputLabel>
          <Input
            placeholder="Enter Name..."
            name="name"
            value={product.name}
            onChange={(e) => handleValueChange(e)}
          />
        </FC>
        <FC>
          <InputLabel>Price</InputLabel>
          <Input
            placeholder="Enter Price..."
            name="price"
            value={product.price}
            onChange={(e) => handleValueChange(e)}
          />
        </FC>
        <FC>
          <OutlinedInput
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleImage(e)}
          />
        </FC>
        <FC>
          <Button
            variant="contained"
            onClick={() => addProduct()}
            disabled={disabled}
          >
            {divCont}
          </Button>
        </FC>
      </FormGroup>
    </div>
  );
};

export default Form;
