import React, { useState, useEffect, useRef } from "react";
import { TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderForm = () => {
  const [items, setItems] = useState([
    {
      orders_sub_product_id: "",
      orders_sub_catg_id: "",
      orders_sub_sub_catg_id: "",
      orders_sub_brand: "",
      orders_sub_thickness: "",
      orders_sub_unit: "",
      orders_sub_size1: "",
      orders_sub_size2: "",
      orders_sub_size_unit: "",
      orders_sub_quantity: "",
    },
  ]);

  // refs array for each item
  const quantityRefs = useRef([]);

  const handleSelectProduct = (product, index) => {
    console.log("Selected product:", product);
    console.log("Item index:", index);

    if (index !== null) {
      const updatedItems = [...items];
      updatedItems[index] = {
        orders_sub_product_id: product.id,
        orders_sub_catg_id: product.product_category,
        orders_sub_sub_catg_id: product.product_sub_category,
        orders_sub_brand: product.products_brand,
        orders_sub_thickness: product.products_thickness,
        orders_sub_unit: product.products_unit,
        orders_sub_size1: product.products_size1,
        orders_sub_size2: product.products_size2,
        orders_sub_size_unit: product.products_size_unit,
        orders_sub_quantity: "",
      };
      setItems(updatedItems);

      // Focus on the next quantity TextField if it exists
      if (quantityRefs.current[index + 1]) {
        quantityRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <form>
      {items.map((item, index) => (
        <div key={index}>
          <TextField
            fullWidth
            label="Products"
            name="orders_sub_product_id"
            value={item.orders_sub_product_id}
            onClick={() => handleOpenDialog(index)}
            onChange={(e) => onChange(e, index)}
            InputProps={{ style: { border: "none" } }}
          />
          <span className=" text-gray-700 text-xs font-thin">
            {item.orders_sub_sub_catg_id} - {item.orders_sub_brand}
          </span>
          <TextField
            fullWidth
            label="Quantity"
            required
            name="orders_sub_quantity"
            value={item.orders_sub_quantity}
            onChange={(e) => onChange(e, index)}
            InputProps={{ style: { border: "none" } }}
            inputRef={(el) => (quantityRefs.current[index] = el)} // Set ref
          />
          <IconButton onClick={() => removeItem(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </form>
  );
};

export default OrderForm;
