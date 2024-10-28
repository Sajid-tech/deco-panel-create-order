import React, { useContext, useState } from 'react'
import Layout from '../../layout/Layout'
import { Button, TextField } from '@mui/material'
import { ContextPanel } from '../../utils/ContextPanel';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserCreate = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
      const [loading, setLoading] = useState(false);
      const { isPanelUp } = useContext(ContextPanel);
      const navigate = useNavigate();
    
 
    
      const onSubmit = async (e) => {
        e.preventDefault();
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            `${BASE_URL}/api/web-create-user`,
            {name,
        mobile,},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.code == "200") {
            toast.success("User Added");
            navigate("/home");
          } else if (response.data.code == '401') {
            alert("monile no already regsutred");
          }else {
            alert.error("error")
          }

        } catch (error) {
          console.error("Error creating user", error);
        } finally {
          setLoading(false);
        }
      };
  return (
    <Layout>
         <div className="p-6 sm:p-4 bg-blue-50/50 mt-16 flex items-center justify-center">
  <div className="w-full max-w-lg bg-gray-100 border-2 border-dashed border-orange-500 rounded-lg shadow-md p-6">
    <div className="mb-4 text-center">
      <h3 className="text-2xl font-semibold text-gray-800">Add User</h3>
    </div>
    <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="mb-4">
          <TextField
            fullWidth
            required
            label="Full Name"
            autoComplete="name"
            InputProps={{ style: { border: "2px",height:"40px", } }}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <TextField
            fullWidth
            label="Mobile"
            autoComplete="tel"
            InputProps={{ style: { border: "2px",height:"40px", } }}
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          type="submit"
          className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <FaCheck className="mr-2" />
              Submit
            </>
          )}
        </button>
        <Link to="/home">
          <button className="flex items-center bg-red-700 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            <FaTimes className="mr-2 text-white" />
           <span className='text-white'>Cancel</span>
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>


    </Layout>
  )
}

export default UserCreate