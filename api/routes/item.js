const express = require('express');
const router = express.Router();
const { items, users } = require('../../data/sampleData');

// GET: Mendapatkan semua items
router.get('/items', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// GET: Mendapatkan item berdasarkan ID
router.get('/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item dengan ID ${id} tidak ditemukan`
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// POST: Menambahkan item baru
router.post('/items', (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Validasi input
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Harap isi semua field: name, description, price, category"
      });
    }
    
    // Buat item baru
    const newItem = {
      id: items.length + 1,
      name,
      description,
      price: parseFloat(price),
      category,
      createdAt: new Date().toISOString()
    };
    
    // Simulasi penyimpanan ke database
    items.push(newItem);
    
    res.status(201).json({
      success: true,
      message: "Item berhasil ditambahkan",
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// GET: Mendapatkan semua users
router.get('/users', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// POST: Menambahkan user baru
router.post('/users', (req, res) => {
  try {
    const { name, email, age, city } = req.body;
    
    // Validasi input
    if (!name || !email || !age || !city) {
      return res.status(400).json({
        success: false,
        message: "Harap isi semua field: name, email, age, city"
      });
    }
    
    // Validasi email unik
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar"
      });
    }
    
    // Buat user baru
    const newUser = {
      id: users.length + 1,
      name,
      email,
      age: parseInt(age),
      city
    };
    
    // Simulasi penyimpanan ke database
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// GET: Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API berjalan dengan baik",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET: Root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Selamat datang di REST API",
    endpoints: {
      items: {
        getAll: "GET /api/items",
        getById: "GET /api/items/:id",
        create: "POST /api/items"
      },
      users: {
        getAll: "GET /api/users",
        create: "POST /api/users"
      },
      health: "GET /api/health"
    },
    documentation: "Gunakan endpoint di atas untuk mengakses API"
  });
});

module.exports = router;
