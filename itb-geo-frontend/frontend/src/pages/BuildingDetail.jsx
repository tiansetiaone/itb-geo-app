import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBuildingById, getWeatherByCoords } from "../api/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const BuildingDetail = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`Mengambil data untuk ID bangunan: ${id}`); // Debugging

    if (!id) {
      setError("ID bangunan tidak ditemukan.");
      return;
    }

    const fetchBuilding = async () => {
      try {
        const data = await getBuildingById(id);
        console.log("Data bangunan diterima:", data); // Debugging

        if (!data || data.error) {
          setError("Bangunan tidak ditemukan.");
          return;
        }

        setBuilding(data);

        if (data.latitude && data.longitude) {
          const weatherData = await getWeatherByCoords(data.latitude, data.longitude);
          setWeather(weatherData);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setError("Gagal mengambil data bangunan.");
      }
    };

    fetchBuilding();
  }, [id]);

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!building) return <p className="text-center mt-10">Memuat data bangunan...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{building.name}</h2>
      <p>Status: {building.status}</p>

      {weather && (
        <div className="mt-4 p-4 border rounded shadow bg-gray-100">
          <h3 className="text-xl font-bold">Cuaca di Lokasi</h3>
          <p>Suhu: {weather.main.temp}°C</p>
          <p>Kelembaban: {weather.main.humidity}%</p>
          <p>Kondisi: {weather.weather[0].description}</p>
        </div>
      )}

      <h3 className="text-xl font-bold mt-6">Lokasi di Peta</h3>
      <MapContainer center={[building.latitude, building.longitude]} zoom={17} className="h-96 w-full mt-4">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[building.latitude, building.longitude]}>
          <Popup>{building.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BuildingDetail;
