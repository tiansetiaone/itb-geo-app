import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuildingList from "./pages/BuildingList";
import BuildingDetail from "./pages/BuildingDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminBuildingList from "./pages/AdminBuildingList";
import BuildingForm from "./pages/BuildingForm";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buildings" element={<BuildingList />} />
      <Route path="/building/:id" element={<BuildingDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/buildings" element={<AdminBuildingList />} />
      <Route path="/admin/building/new" element={<BuildingForm />} />
      <Route path="/admin/building/edit/:id" element={<BuildingForm />} />
    </Routes>
  );
};

export default AppRouter;
