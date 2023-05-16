import React, { useEffect, useState } from "react";
import { getAllProducts } from "../service/api.js";
const ImageContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [products]);

  const getProducts = async () => {
    const allP = await getAllProducts();
    setProducts(allP.data.products);
  };

  return (
    <div className="img-cont">
      {products.map((item, index) => {
        const { name, price, image } = item;
        return (
          <div className="img-div" key={index}>
            <img src={image} className="img" />
            <div className="img-info">
              <p>{name}</p>
              <p>{`$${price}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageContainer;
