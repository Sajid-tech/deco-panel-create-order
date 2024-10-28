import React, { useEffect, useRef, useState } from "react";

import { Button, TextField, MenuItem, IconButton } from "@mui/material";
import {
  MdDelete as DeleteIcon,
  MdArrowBack as BackIcon,
} from "react-icons/md";

import { Dialog, DialogContent, DialogActions } from "@mui/material";
import SelectProduct from "../../components/SelectProduct";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import toast, { Toaster } from "react-hot-toast";
import { DialogFooter } from "@material-tailwind/react";

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;
  const [order, setOrder] = useState({
    orders_user_id: "",
    orders_date: todayback,
    orders_year: "2023-24",
    orders_count: "",
    order_sub_data: "",
  });
  const [order_sub_count, setCount] = useState(1);
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

  const quantityRefs = useRef([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/web-fetch-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data.profile);
        console.table("profileData", response.data.profile);
      } catch (error) {
        console.error("error while fetching select product ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    setLoading(false);
  }, [1]);

  const handleCreateOrder = () => {
    navigate("/home");
  };

  const handleOrderList = () => {
    navigate("/order-list");
  };

  const onInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [e.target.name]: e.target.value,
    };
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
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
    setCount(order_sub_count + 1);
    setShowDetails((prev) => ({ ...prev, [items.length]: false }));
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    const updatedVisibility = { ...showDetails };
    delete updatedVisibility[index];
    setCount(order_sub_count - 1);
    setShowDetails(updatedVisibility);
  };

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // modal
  const handleOpenDialog = (index) => {
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
      console.log("Updated items:", updatedItems);
      setItems(updatedItems);
      if (quantityRefs.current[index +1 ]) {
        console.table("index",index)
        quantityRefs.current[index + 1].focus();
      }
    }
    handleCloseDialog();
  };

  //

  const handleUserChange = (event) => {
    const selectedValue = event.target.value;

   
    if (selectedValue === 45) { 
      navigate(`/user/${selectedValue}`);
    } else {
      onInputChange(event);
    }
  };


  //

  const onSumbit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let data = {
        orders_user_id: order.orders_user_id,
        orders_year: order.orders_year,
        orders_date: order.orders_date,
        orders_count: order_sub_count,
        order_sub_data: items,
      };

      await axios.post(`${BASE_URL}/api/web-create-order`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order Created");
      setTimeout(() => {
        navigate("/order-list");
      }, 500);
    } catch (error) {
      console.error("Error update on create order ", error);
      toast.error("Error update on create order");
    }
  };

  const isFormValid = () => {
    return (
      items.every(
        (item) => item.orders_sub_quantity && item.orders_sub_product_id
      ) && items.length > 0
    );
  };

  const isAddMoreDisabled = () => {
    return items.some((item) => item.orders_sub_product_id === "");
  };
  return (
    <Layout>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "white",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="p-1  lg:p-4 md:p-6 max-w-screen mx-auto ">
        <div className="hidden md:flex justify-between mt-6 gap-4">
          <Button
            variant="contained"
            sx={{
              width: "50%",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              borderRadius: "4px",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              padding: "10px 20px",
              fontSize: "1.2rem",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#FF8E53",
                transform: "translateY(-3px)",
              },
            }}
            onClick={handleCreateOrder}
          >
            Create Order
          </Button>

          <Button
            variant="contained"
            sx={{
              width: "50%",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              borderRadius: "4px",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              padding: "10px 20px",
              fontSize: "1.2rem",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#21CBF3",
                transform: "translateY(-3px)",
              },
            }}
            onClick={handleOrderList}
          >
            Order List
          </Button>
        </div>

        <div className="  mt-2 p-2 md:p-6  ">
          <form id="addIndiv" autoComplete="off">
            <div className="flex flex-col lg:flex-row gap-4 mb-6 border-2  bg-white border-red-200 p-2 rounded-lg shadow-lg">

              <TextField
                fullWidth
                label="User"
                select
                InputProps={{ style: { border: "2px",height:"40px", } }}
                name="orders_user_id"
                onChange={handleUserChange}
                required
              >
                
                {profileData && profileData.length > 0 ? (
                  profileData.map((source) => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.full_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No profiles available</MenuItem>
                )}
              </TextField>
             

             

              <TextField
                fullWidth
                type="date"
                label="Date"
                name="orders_date"
                InputProps={{ style: { border: "2px",height:"40px", } }}
                value={order.orders_date}
                onChange={onInputChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </div>
            {/* <hr className="bg-black mb-2" /> */}

            {/* Mobile View */}
            <div className=" md:hidden border-2 border-blue-200  bg-white p-2 rounded-lg shadow-lg">
              <div className=" gap-4">
                {items.map((item, index) => (
                 <div className=" flex flex-col">
                   <div
                    key={index}
                    className=" p-2 flex flex-row gap-2  rounded-lg  "
                  >
                    <div>
                    <TextField
                      fullWidth
                      label="Products"
                      name="orders_sub_product_id"
                      value={item.orders_sub_product_id}
                      onClick={() => handleOpenDialog(index)}
                      onChange={(e) => onChange(e, index)}
                      InputProps={{ style: { border: "2px",height:"40px", } }}
                      className=""
                    />
                    <div className="">
                   
                   
                   
                    </div>
                    </div>
                    <div>
                    <TextField
                      fullWidth
                      label="Quantity"
                      required
                      name="orders_sub_quantity"
                      value={item.orders_sub_quantity}
                      onChange={(e) => onChange(e, index)}
                      inputRef={(el) => (quantityRefs.current[index] = el)} 
                      InputProps={{ style: { border: "none",height:"40px" } }}
                    />
                  
                    </div>
                    <div className="border rounded-lg border-gray-400 bg-red-50/50">
                    <IconButton  onClick={() => removeItem(index)}>
                      <DeleteIcon  className="text-red-600 w-5 h-5 hover:text-blue-600"/>
                    </IconButton>
                    
                    </div>

                    {/* Toggle Button for Each Item */}
                    {/* <Button
                      className="mb-4"
                      
                      color="primary"
                      variant="outlined"
                      onClick={() => toggleDetails(index)}
                      style={{ width: "100%" }}
                    >
                      {showDetails[index] ? "Close Details" : "Other Details"}
                    </Button> */}

                    {/* Details for Each Item */}
                    {showDetails[index] && (
                      <div className="p-6">
                        <TextField
                          fullWidth
                          label="Category"
                          name="orders_sub_catg_id"
                          value={item.orders_sub_catg_id}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Sub Category"
                          name="orders_sub_sub_catg_id"
                          value={item.orders_sub_sub_catg_id}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Brand"
                          name="orders_sub_brand"
                          value={item.orders_sub_brand}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Thickness"
                          name="orders_sub_thickness"
                          value={item.orders_sub_thickness}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Unit"
                          name="orders_sub_unit"
                          value={item.orders_sub_unit}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Length"
                          name="orders_sub_size1"
                          value={item.orders_sub_size1}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Breadth"
                          name="orders_sub_size2"
                          value={item.orders_sub_size2}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                        <TextField
                          fullWidth
                          label="Size Unit"
                          name="orders_sub_size_unit"
                          value={item.orders_sub_size_unit}
                          disabled
                          InputProps={{ style: { border: "none" } }}
                        />
                      </div>
                    )}
                  </div>
                  <div className=" flex  justify-around gap-2">
                  <span className=" text-black  rounded-lg p-1 text-[10px] font-thin">{item.orders_sub_catg_id}&nbsp;{item.orders_sub_sub_catg_id}</span>
                  <span className="  p-1 rounded-lg text-black text-[10px] font-thin">{item.orders_sub_brand}&nbsp;{item.orders_sub_thickness}{item.orders_sub_unit}</span>
                  <span className="  rounded-lg p-1 text-black text-[10px] font-thin">{item.orders_sub_size1}*{item.orders_sub_size2} {item.orders_sub_size_unit}</span>
                  </div>
                  {/* <hr  className="border-b border-blue-200 mt-1 mb-1"/> */}
                 </div>
                ))}
              </div>
            </div>

            {/* //larger viwe  */}
            <div className="hidden md:block p-6">
              <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col lg:flex-row gap-4">
                    <TextField
                      fullWidth
                      label="Products"
                      name="orders_sub_product_id"
                      onClick={() => handleOpenDialog(index)}
                      value={item.orders_sub_product_id}
                      onChange={(e) => onChange(e, index)}
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Category"
                      name="orders_sub_catg_id"
                      value={item.orders_sub_catg_id}
                      // inputRef={(el) => (quantityRefs.current[index] = el)} 
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Sub Category"
                      name="orders_sub_sub_catg_id"
                      value={item.orders_sub_sub_catg_id}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Brand"
                      name="orders_sub_brand"
                      value={item.orders_sub_brand}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Thickness"
                      name="orders_sub_thickness"
                      value={item.orders_sub_thickness}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Unit"
                      name="orders_sub_unit"
                      value={item.orders_sub_unit}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Length"
                      name="orders_sub_size1"
                      value={item.orders_sub_size1}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Breadth"
                      name="orders_sub_size2"
                      value={item.orders_sub_size2}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      label="Size Unit"
                      name="orders_sub_size_unit"
                      value={item.orders_sub_size_unit}
                      disabled
                      InputProps={{ style: { border: "none" } }}
                    />
                    <TextField
                      fullWidth
                      required
                      label="Quantity"
                      name="orders_sub_quantity"
                      value={item.orders_sub_quantity}
                      onChange={(e) => onChange(e, index)}
                      InputProps={{ style: { border: "none" } }}
                    />
                    <IconButton onClick={() => removeItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row mb-10 lg:mb-0 md:flex-row justify-between mt-6 gap-4 border-2  bg-white border-purple-200    p-2 rounded-lg shadow-lg">
              <Button
                variant="contained"
                color="primary"
                onClick={addItem}
                disabled={isAddMoreDisabled()}
              >
                Add More
              </Button>
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isFormValid()}
                  onClick={onSumbit}
                >
                  Submit
                </Button>
              </div>
            </div>
           
          </form>
       
        </div>
       
      </div>
      <Dialog  open={openDialog} onClose={handleCloseDialog}>
<DialogContent >
  <SelectProduct itemIndex={editIndex} onSelect={handleSelectProduct} />
</DialogContent>
<DialogActions>
  <Button variant="outlined" color="error" onClick={handleCloseDialog}>
    Cancel
  </Button>
</DialogActions>
</Dialog>
     
     
    </Layout>
  );
};




export default Home;
