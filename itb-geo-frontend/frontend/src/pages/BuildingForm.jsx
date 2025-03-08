import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBuilding, updateBuilding, getBuildingById } from "../api/api";

const BuildingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    status: "aktif", // Default status
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect ke login jika tidak ada token
    } else if (id) {
      const fetchBuilding = async () => {
        const data = await getBuildingById(id);
        if (data) setFormData(data);
      };
      fetchBuilding();
    }
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBuilding(id, formData, token);
      } else {
        await createBuilding(formData, token);
      }
      navigate("/admin/buildings");
    } catch (error) {
      console.error("Error menyimpan bangunan:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Bangunan" : "Tambah Bangunan"}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama Bangunan" required className="w-full p-2 border rounded mb-2"/>

        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded mb-2">
          <option value="aktif">Aktif</option>
          <option value="tidak aktif">Tidak Aktif</option>
        </select>

        <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" required className="w-full p-2 border rounded mb-2"/>
        
        <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" required className="w-full p-2 border rounded mb-2"/>
        
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {id ? "Update Bangunan" : "Tambah Bangunan"}
        </button>
      </form>
    </div>
  );
};

export default BuildingForm;
