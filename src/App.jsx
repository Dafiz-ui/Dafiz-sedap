import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Customers = lazy(() => import("./pages/Customers"));
const CustomerDetail = lazy(() => import("./pages/CustomerDetail"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const FiturXYZ = lazy(() => import("./pages/FiturXYZ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BadRequest = lazy(() => import("./pages/BadRequest"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Forbidden = lazy(() => import("./pages/Forbidden"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/fitur-xyz" element={<FiturXYZ />} />
          <Route path="/error/400" element={<BadRequest />} />
          <Route path="/error/401" element={<Unauthorized />} />
          <Route path="/error/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
