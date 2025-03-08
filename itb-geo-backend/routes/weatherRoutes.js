const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Endpoint untuk mendapatkan data cuaca berdasarkan koordinat (latitude & longitude)
router.get("/", async (req, res) => {
  try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
          return res.status(400).json({ message: "Latitude dan longitude diperlukan" });
      }

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
              lat,
              lon,
              appid: process.env.OPENWEATHER_API_KEY,
              units: "metric",
          },
      });

      res.json(response.data);
  } catch (error) {
      console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
      res.status(500).json({ message: "Gagal mendapatkan data cuaca", error: error.response ? error.response.data : error.message });
  }
});


module.exports = router;
