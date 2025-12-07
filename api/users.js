// Data sementara di memory
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

export default async function handler(req, res) {
  console.log(`Users endpoint called: ${req.method} ${req.url}`);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    // GET - Ambil semua users
    if (req.method === 'GET') {
      console.log('GET users:', users);
      
      // Query parameters
      const { search, limit } = req.query;
      let filteredUsers = [...users];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      }
      
      if (limit) {
        filteredUsers = filteredUsers.slice(0, parseInt(limit));
      }
      
      return res.status(200).json({
        success: true,
        count: filteredUsers.length,
        data: filteredUsers,
        message: 'Users retrieved successfully'
      });
    }
    
    // POST - Buat user baru
    if (req.method === 'POST') {
      console.log('POST request body:', req.body);
      
      let body;
      try {
        // Parse body jika berupa string
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON format'
        });
      }
      
      const { name, email } = body;
      
      // Validasi sederhana
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Name and email are required'
        });
      }
      
      // Buat user baru
      const newUser = {
        id: users.length + 1,
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      
      console.log('New user created:', newUser);
      
      return res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully'
      });
    }
    
    // Method tidak didukung
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed. Use GET or POST.`
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
}
