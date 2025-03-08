const Building = require('../models/Building');
const axios = require('axios');

// 🔹 Ambil semua bangunan
exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    console.error("Error mengambil data bangunan:", error);
    res.status(500).json({ message: "Gagal mengambil data bangunan" });
  }
};

// 🔹 Ambil bangunan berdasarkan ID (Pastikan fungsi ini ada)
exports.getBuildingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Request masuk untuk bangunan ID: ${id}`); // Debugging

    if (!id) {
      return res.status(400).json({ message: "ID bangunan diperlukan" });
    }

    const building = await Building.findById(id);
    if (!building) {
      console.log(`Bangunan dengan ID ${id} tidak ditemukan.`);
      return res.status(404).json({ message: "Bangunan tidak ditemukan" });
    }

    console.log(`Bangunan ditemukan:`, building);
    res.json(building);
  } catch (error) {
    console.error("Error mengambil data bangunan:", error);
    res.status(500).json({ message: "Gagal mengambil data bangunan" });
  }
};


exports.createBuilding = async (req, res) => {
  try {
    const { name, status, latitude, longitude } = req.body;
    const newBuilding = new Building({ name, status, latitude, longitude });
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const { status } = req.body;
    const building = await Building.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!building) return res.status(404).json({ message: 'Bangunan tidak ditemukan' });

    res.json(building);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) return res.status(404).json({ message: 'Bangunan tidak ditemukan' });

    res.json({ message: 'Bangunan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWeather = async (req, res) => {
    try {
      const { latitude, longitude } = req.params;
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil data cuaca' });
    }
  };
  