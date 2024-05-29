import { Routes, Route } from "react-router-dom";
import Oops from "../pages/Players/Oops";
import Home from "../pages/Home";
import Admin from "../admin/Dashboard.jsx";
import AddPlayer from "../admin/AddPlayer.jsx";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Players from "../pages/Players/Players";
import PlayerDetails from "../pages/Players/PlayerDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/player-account/Dasboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/Players/CheckoutSuccess.jsx";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oops" element={<Oops />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/players" element={<Players />} />
      <Route path="/players/:id" element={<PlayerDetails />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />

      {/*===== Admin Routes ===== */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-player"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddPlayer />
          </ProtectedRoute>
        }
      />

      {/*===== User Routes ===== */}
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["sponsor"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />

      {/* ===== Player Routes ===== */}
      <Route
        path="/players/profile/me/"
        element={
          <ProtectedRoute allowedRoles={["player"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
