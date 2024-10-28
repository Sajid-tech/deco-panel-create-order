import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";

const OrderList = () => {
  const [orderList, setOrderList] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-order-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderList(response.data.orders);
        console.log("set order list", response.data.orders);
      } catch (error) {
        console.error("error while fetching select product ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderList();
    setLoading(false);
  }, []);

  const handleCreateOrder = () => {
    navigate("/home");
  };

  const handleOrderList = () => {
    navigate("/order-list");
  };

  const columns = useMemo(
    () => [
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id) => {
            return (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/view-order/${id}`}
                  className="bg-blue-500 rounded-md p-2  text-black cursor-pointer"
                >
                  view
                </Link>
              </div>
            );
          },
        },
      },
      {
        name: "orders_date",
        label: "Order date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "orders_no",
        label: "order no",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "full_name",
        label: "user",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "orders_status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
        },
      },

      
    ],
    [orderList]
  );

  const options = {
    selectableRows: "none",
    elevation: 0,
 
    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
  };
  const data = useMemo(() => (orderList ? orderList : []), [orderList]);
  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-screen mx-auto ">
        <div className="hidden md:flex justify-between mt-6 gap-4">
          <Button
            variant="contained"
            sx={{
              width: "50%",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              borderRadius: "4px", // Rectangular border
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
              borderRadius: "4px", // Rectangular border
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

        <div className="bg-white mt-4 p-4 md:p-6 rounded-lg shadow-lg">
          <MUIDataTable
            title={"Order list"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrderList;
