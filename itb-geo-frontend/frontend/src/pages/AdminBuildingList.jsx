import { useEffect, useState } from "react";
import { getBuildings, deleteBuilding } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const AdminBuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect ke login jika tidak ada token
    } else {
      const fetchBuildings = async () => {
        const data = await getBuildings();
        if (data.error) {
          setError("Gagal mengambil data bangunan.");
        } else {
          setBuildings(data);
        }
      };
      fetchBuildings();
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus bangunan ini?")) {
      await deleteBuilding(id, token);
      setBuildings(buildings.filter((b) => b._id !== id));
    }
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sistem Geolokasi Bangunan ITB</h1>
      <Link to="/admin/building/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Tambah Bangunan
      </Link>
      <div className="flex space-x-4">
        <Link to="/buildings" className="px-4 py-2 bg-blue-500 text-white rounded">
          Lihat Daftar Bangunan
        </Link>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((building) => (
            <tr key={building._id}>
              <td className="border px-4 py-2">{building.name}</td>
              <td className="border px-4 py-2">{building.status}</td>
              <td className="border px-4 py-2">
                <Link to={`/admin/building/edit/${building._id}`} className="bg-yellow-500 text-white px-4 py-1 rounded mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(building._id)} className="bg-red-500 text-white px-4 py-1 rounded">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBuildingList;
