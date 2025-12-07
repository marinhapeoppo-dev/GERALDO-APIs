export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    server: 'Vercel Serverless Function',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    endpoints: [
      '/api/hello',
      '/api/users',
      '/api/test'
    ]
  });
}
