import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-50/50">
      <div className="hidden lg:flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl text-red-600 font-semibold">
          This website is only optimized for mobile devices.
        </p>
      </div>
      <div className="block lg:hidden">
      <div className="p-4">
        <DashboardNavbar />
        <main className="flex-1  mt-12">{children}</main>
      
        <Footer />
     
      </div>
      </div>
    </div>
  );
};

export default Layout;
