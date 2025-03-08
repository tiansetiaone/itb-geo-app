import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../api/api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ username, password });

      console.log("Response dari API di frontend:", response); // Debugging di frontend
      console.log("Tipe dari onLogin:", typeof onLogin); // Cek tipe onLogin

      if (response.token) {
        localStorage.setItem("token", response.token);

        if (typeof onLogin === "function") {
          onLogin(response.token);
        } else {
          console.warn("onLogin is not a function. Pastikan props dikirim dari parent.");
        }

        navigate("/admin/buildings"); // Redirect ke halaman home setelah login
      } else {
        setError("Login gagal, periksa username/password.");
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat login:", err);
      setError("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="w-80 p-4 bg-gray-100 rounded">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

// ✅ Tambahkan defaultProps agar tidak error jika `onLogin` tidak diberikan
Login.defaultProps = {
  onLogin: () => console.warn("onLogin belum diberikan sebagai props!"),
};

export default Login;
