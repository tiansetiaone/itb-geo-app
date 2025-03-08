import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Sistem Geolokasi Bangunan ITB</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded">
          Login
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">
          Or Register?
        </Link>
      </div>
    </div>
  );
};

export default Home;
