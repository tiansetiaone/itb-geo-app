import { useEffect, useState } from "react";
import { getBuildings } from "../api/api";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBuildings();
        setBuildings(data);
      } catch (error) {
        console.error("Gagal mengambil data bangunan:", error);
      }
    };
    fetchData();
  }, []);

  const filteredBuildings = buildings.filter((building) =>
    filter === "all" ? true : building.status === filter
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Bangunan ITB</h2>
      <div className="mb-4">
        <button onClick={() => setFilter("all")} className="px-4 py-2 bg-gray-500 text-white rounded mx-1">
          Semua
        </button>
        <button onClick={() => setFilter("aktif")} className="px-4 py-2 bg-green-500 text-white rounded mx-1">
          Aktif
        </button>
        <button onClick={() => setFilter("tidak aktif")} className="px-4 py-2 bg-red-500 text-white rounded mx-1">
          Tidak Aktif
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBuildings.map((building) => (
          <div key={building._id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{building.name}</h3>
            <p>Status: {building.status}</p>
            <Link to={`/building/${building._id}`} className="text-blue-500">
  Lihat Detail
</Link>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6">Peta Bangunan</h3>
      <MapContainer center={[-6.8915, 107.6107]} zoom={15} className="h-96 w-full mt-4">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredBuildings.map((building) => (
          <Marker key={building._id} position={[building.latitude, building.longitude]}>
            <Popup>
              <b>{building.name}</b> <br />
              Status: {building.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BuildingList;
