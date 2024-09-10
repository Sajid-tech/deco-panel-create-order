import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);

    //create a formData object and append state values
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/web-login`, formData);

      if (res.status === 200) {
        const token = res.data.UserInfo?.token;
        if (token) {
          // Store the token in localStorage
          localStorage.setItem("token", token);
          navigate("/home");
        } else {
          toast.error("Login Failed, Token not received.");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
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
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 lg:w-3/5 m-4 lg:m-12  px-4 lg:px-8">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              DECO PANEL
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Enter your username and password to Sign In.
            </Typography>
          </div>
          <form
            onSubmit={handleSumbit}
            method="POST"
            className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
          >
            <div className="mb-6 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Username
              </Typography>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                placeholder="Enter the username"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <Input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button type="sumbit" disabled={loading} className="mt-6" fullWidth>
              {loading ? "Checking..." : "Sign In"}
            </Button>

            <div className="flex items-center justify-between gap-2 mt-6">
              <Typography variant="small" className="font-medium text-gray-900">
                <Link to="/forget-password">Reset Password</Link>
              </Typography>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-2/5 h-auto lg:h-full hidden  lg:block">
          <img
            src="/img/pattern.png"
            className="h-full max-h-screen w-full object-cover  rounded-none"
            alt="Sign In Background"
          />
        </div>
      </section>
    </>
  );
};

export default SignIn;
