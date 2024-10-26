import React, { useEffect, useMemo, useState } from "react";

import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button } from "@mui/material";
import BASE_URL from "../base/BaseUrl";
const SelectProduct = ({ onSelect, itemIndex }) => {
  const [selectProducts, setSelectProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/web-fetch-product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectProducts(response.data.products);
      } catch (error) {
        console.error("error while fetching select product ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    setLoading(false);
  }, []);

  const handleSelect = (id) => {
    const product = selectProducts.find((product) => product.id === id);
    if (product && itemIndex !== null) {
      onSelect(product, itemIndex);
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "product_category",
        label: "Category Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            const product_category = tableMeta.rowData[0];

            const product_subcategory = tableMeta.rowData[1];
            const products_brand = tableMeta.rowData[2];
            const products_thickness = tableMeta.rowData[3];
            const products_size1 = tableMeta.rowData[4];
            const products_size = tableMeta.rowData[5];
            const products_size2 = tableMeta.rowData[6];
            const products_unit = tableMeta.rowData[7];
            return (
              <div className=" p-[5px]]" >
                <p className=" text-blue-900 text-xs">
                  {product_category} - {product_subcategory}
                </p>
                <p className=" text-black text-xs">
                  {products_brand}- {products_thickness} {products_size1}
                </p>
                <p className=" text-blue-900 text-xs">
                 {products_size}X{products_size2}
                {products_unit}
                </p>
              </div>
            );
          },
        },
      },
      {
        name: "product_sub_category",
        label: "Sub Category",
        options: {
          display: false,
        },
      },
      {
        name: "products_brand",
        label: "Brand",
        options: {
          display: false,
        },
      },
      {
        name: "products_thickness",
        label: "Thickness",
        options: {
          display: false,
          customBodyRender: (value, tableMeta) => {
            const products_thickness = tableMeta.rowData[3];
            const products_unit = tableMeta.rowData[4];
            return `${products_thickness} ${products_unit}`;
          },
        },
      },
      {
        name: "products_unit",
        label: "Unit",
        options: {
          display: false,
        },
      },

      {
        name: "products_size1",
        label: "Size",
        options: {
          display: false,
          customBodyRender: (value, tableMeta) => {
            const products_size1 = tableMeta.rowData[5];
            const products_size2 = tableMeta.rowData[6];
            const products_size_unit = tableMeta.rowData[7];
            return `${products_size1}x${products_size2} ${products_size_unit}`;
          },
        },
      },

      {
        name: "products_size2",
        label: "size2",
        options: {
          display: false,
        },
      },
      {
        name: "products_size_unit",
        label: "size unit",
        options: {
          display: false,
        },
      },

      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => {
            return (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleSelect(value)}
                  className="bg-blue-500  text-black cursor-pointer"
                >
                  Select
                </Button>
              </div>
            );
          },
        },
      },
    ],
    [selectProducts]
  );

  const options = {
    selectableRows: "none",
    elevation: 0,

    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
    filter: false,
  };

  const data = useMemo(
    () => (selectProducts ? selectProducts : []),
    [selectProducts]
  );
  return (
  
      <MUIDataTable
      title={"select product"}
      data={data}
      columns={columns}
      options={options}
    />

  );
};

export default SelectProduct;
