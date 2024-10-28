import { Button } from "@mui/material";
import { FaListAlt, FaPlusCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const handleOrder = () => {
    navigate("/order-list");
  };

  // className="fixed bottom-0 left-0 w-full py-2 bg-gradient-to-r from-white via-gray-100 to-white shadow-md border-t border-gray-200 md:hidden"
  return (
    <div className=" fixed bottom-0 left-0 w-full py-2  bg-gradient-to-br from-yellow-400 via-blue-100 to-gray-300  shadow-md border-t border-red-200 ">
   
      <div className=" flex justify-around items-center ">
        <div onClick={handleHome} className="flex items-center space-x-2">
         
          <Button className=" bg-black font-medium">Create Order</Button>
        </div>

        <div className="relative">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-sm border border-blue-200 transition-transform transform hover:scale-110 hover:bg-blue-600">
            <RxDashboard onClick={handleHome} className="text-white w-5 h-5" />
          </div>
        </div>

        <div onClick={handleOrder} className="flex items-center space-x-2">
          <Button className="text-gray-700 font-medium">Order List</Button>
          
        </div>
      </div>
    </div>
   
  );
}

export default Footer;
