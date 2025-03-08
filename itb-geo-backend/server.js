require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const weatherRoutes = require("./routes/weatherRoutes");
app.use("/api/weather", weatherRoutes);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/buildings', require('./routes/buildingRoutes'));

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
