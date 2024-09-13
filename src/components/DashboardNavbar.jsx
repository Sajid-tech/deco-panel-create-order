import { useLocation, Link } from "react-router-dom";
import { Navbar, IconButton } from "@material-tailwind/react";
import Logout from "./Logout";
import { useState } from "react";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const DashboardNavbar = () => {
  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleOpenLogout = () => setOpenModal(!openModal);

  return (
    <Navbar
      color="white"
      className="fixed top-0 left-0 w-full z-40 py-3 bg-gradient-to-br from-gray-800 text-white to-gray-700 shadow-lg border-none"
      fullWidth
    >
      <div className="flex justify-between gap-6 flex-row md:items-center">
        <div className="flex capitalize">
          <Link to="/home">
            <h1 className="text-2xl font-semibold flex justify-center">
              Deco Panel
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          {/* Settings icon */}
          <IconButton variant="text" color="red" onClick={handleOpenLogout}>
            <HiArrowRightStartOnRectangle className="h-5 w-5 text-red-500" />
          </IconButton>
        </div>
      </div>
      <Logout open={openModal} handleOpen={handleOpenLogout} />
    </Navbar>
  );
};

export default DashboardNavbar;
