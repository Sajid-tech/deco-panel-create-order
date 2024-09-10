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

  return (
    <footer className="fixed bottom-0 left-0 w-full py-2 bg-gradient-to-r from-white via-gray-100 to-white shadow-md border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-between px-4">
        <div onClick={handleHome} className="flex items-center space-x-2">
          <div className="p-2 bg-green-500 rounded-full shadow-sm border border-blue-200 flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-blue-600">
            <FaPlusCircle className="text-white w-4 h-4" />
          </div>
          <Button className=" bg-black font-medium">Create Order</Button>
        </div>

        <div className="relative">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-sm border border-blue-200 transition-transform transform hover:scale-110 hover:bg-blue-600">
            <RxDashboard onClick={handleHome} className="text-white w-5 h-5" />
          </div>
        </div>

        <div onClick={handleOrder} className="flex items-center space-x-2">
          <Button className="text-gray-700 font-medium">Order List</Button>
          <div className="p-2 bg-red-500 rounded-full shadow-sm border border-blue-200 flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-blue-600">
            <FaListAlt className="text-white w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
