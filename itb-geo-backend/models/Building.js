const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['aktif', 'tidak aktif'], default: 'aktif' },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Building', BuildingSchema);
