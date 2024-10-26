import React, { useContext, useState } from 'react'
import Layout from '../../layout/Layout'
import { Button, TextField } from '@mui/material'
import { ContextPanel } from '../../utils/ContextPanel';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { FaCheck, FaTimes } from 'react-icons/fa';

const UserCreate = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
      const [loading, setLoading] = useState(false);
      const { isPanelUp } = useContext(ContextPanel);
      const navigate = useNavigate();
    
      const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
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
            alert("User Added");
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
         <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Add User</h3>
        </div>
        <div className="grid grid-cols-1">
          <div className="bg-white p-6 shadow rounded-md">
            <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="mb-4">
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      autoComplete="Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <TextField
                      fullWidth
                      label="Mobile"
                      autoComplete="Name"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
                
              </div>

           

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                </Button>
                <Link to='/manufacturer'>
                  <Button className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                    <FaTimes className="mr-2" />
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default UserCreate