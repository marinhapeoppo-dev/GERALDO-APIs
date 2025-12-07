export default function handler(request, response) {
  // Log untuk debugging
  console.log('Hello endpoint called');
  
  // Cek method
  if (request.method !== 'GET') {
    return response.status(405).json({
      error: 'Method not allowed. Use GET.'
    });
  }
  
  try {
    // Response sederhana
    response.status(200).json({
      success: true,
      message: 'Hello from Vercel API!',
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method
    });
  } catch (error) {
    console.error('Error in hello endpoint:', error);
    response.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
      }
