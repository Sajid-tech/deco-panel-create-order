import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderList from "./pages/dashboard/OrderList";
import ViewList from "./pages/dashboard/ViewList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />

        <Route
          path="/order-list"
          element={<ProtectedRoute element={<OrderList />} />}
        />
        <Route path="/view-order/:id" element={<ViewList />} />

        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
    </>
  );
};

export default App;
