import { Link, NavLink, useLocation } from "react-router-dom";
import { HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";

const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-blue-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 h-full w-72 transition-transform duration-300 z-50 border-none md:relative md:translate-x-0 md:z-0`}
    >
      <div className="relative">
        <Link to="/home" className="flex items-center justify-center p-4">
          <div className="flex items-center">
            <img
              src="https://www.ag-solutions.in/assets/images/logo.png"
              alt="Logo"
              className="h-12 w-auto"
            />
            <div className="ml-3 text-white">
              <div className="text-lg font-bold">
                <span className="font-black">AG</span> Solution
              </div>
              <div className="text-gray-400 text-sm">Single Click Solution</div>
            </div>
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 p-2 xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <NavLink to="/home">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Create Order
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          {/* Add more hardcoded routes here as needed */}
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
