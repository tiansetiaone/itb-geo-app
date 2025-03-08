const express = require('express');
const { getBuildings, getBuildingById, createBuilding, updateBuilding, deleteBuilding, getWeather } = require('../controllers/buildingController');
const auth = require('../middleware/auth');
const router = express.Router();

// CRUD Bangunan
router.get("/", getBuildings);
router.get("/:id", getBuildingById);  // ✅ Pastikan ini tidak undefined

router.post("/", auth, createBuilding);
router.put("/:id", auth, updateBuilding);
router.delete("/:id", auth, deleteBuilding);
// API Cuaca
router.get('/weather/:latitude/:longitude', getWeather);

module.exports = router;
