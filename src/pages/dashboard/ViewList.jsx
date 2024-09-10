import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import ReactToPrint from "react-to-print";

const ViewList = () => {
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const printRef = useRef();
  useEffect(() => {
    const fetchViewOrder = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-order-view-by-Id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setViewOrder(response.data);
        console.log("set order list", response.data.order);
      } catch (error) {
        console.error("error while fetching select product ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchViewOrder();
    setLoading(false);
  }, [1]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!viewOrder) {
    return <div>No order found.</div>;
  }

  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto mt-5">
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
              Print Order Details
            </button>
          )}
          content={() => printRef.current}
        />

        <div ref={printRef} className="print-container">
          <div className="grid grid-cols-3 gap-4 mb-6 border-b pb-4">
            <div>
              <p className="font-semibold text-black">Client:</p>
              <p className="text-black">{viewOrder.order.full_name}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-black">Order No:</p>
              <p className="text-black">{viewOrder.order.orders_no}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-black">Order Date:</p>
              <p className="text-black">{viewOrder.order.orders_date}</p>
            </div>
          </div>

          <div className="mt-4">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left p-2 border border-gray-300">Item</th>
                  <th className="text-left p-2 border border-gray-300">Size</th>
                  <th className="text-left p-2 border border-gray-300">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewOrder.orderSub.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
                  >
                    <td className="p-2 border border-gray-300">
                      {item.orders_sub_thickness}MM {item.product_category}{" "}
                      {item.product_sub_category}
                      <p className="text-sm text-gray-500">
                        Brand: {item.orders_sub_brand}
                      </p>
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.orders_sub_size1}x{item.orders_sub_size2}{" "}
                      {item.orders_sub_size_unit}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.orders_sub_quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>
        {`
        @media print {
          @page {
            size: A5;
            margin: 10mm;
          }

          .print-container {
            font-size: 12px;
            color: black;
          }

          .print-container h1 {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .print-container p {
            margin: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          table, th, td {
            border: 1px solid black;
          }

          th, td {
            padding: 8px;
            text-align: left;
          }

          thead {
            background-color: #f0f0f0;
          }

          tbody tr:nth-child(even) {
            background-color: #EAF6FF; 
          }

          tbody tr:nth-child(odd) {
            background-color: white;
          }
        }
      `}
      </style>
    </Layout>
  );
};

export default ViewList;
