import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <DashboardNavbar />
        <main className="flex-1  mt-12">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
