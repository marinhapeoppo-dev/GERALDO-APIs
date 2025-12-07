const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/items');

// Inisialisasi Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di REST API untuk Vercel',
    status: 'online',
    timestamp: new Date().toISOString(),
    documentation: 'Akses /api untuk endpoint lengkap'
  });
});

// API routes
app.use('/api', routes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Export untuk Vercel
module.exports = app;
