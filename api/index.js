/**
 * MAIN ENTRY POINT - API Router
 * Path: /api
 * Handles all root-level API requests
 */

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Get the path from URL
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const pathname = url.pathname;
  
  // Main API response
  const response = {
    success: true,
    message: 'Welcome to Vercel REST API',
    data: {
      api: {
        name: 'Vercel REST API',
        version: '1.0.0',
        status: 'operational',
        timestamp: new Date().toISOString()
      },
      documentation: {
        base_url: `${url.protocol}//${url.host}/api`,
        endpoints: [
          {
            path: '/',
            method: 'GET',
            description: 'API root (this endpoint)'
          },
          {
            path: '/hello',
            method: 'GET',
            description: 'Simple greeting endpoint',
            parameters: ['name', 'lang'],
            example: '/api/hello?name=John&lang=id'
          },
          {
            path: '/users',
            method: 'GET',
            description: 'Get all users with filtering'
          },
          {
            path: '/users',
            method: 'POST',
            description: 'Create new user',
            body_format: {
              name: 'string (required)',
              email: 'string (required)',
              age: 'number (optional)'
            }
          },
          {
            path: '/test',
            method: 'GET',
            description: 'Server health check'
          },
          {
            path: '/working',
            method: 'GET',
            description: 'Always working endpoint'
          }
        ],
        usage_examples: {
          curl: {
            hello: "curl 'https://your-app.vercel.app/api/hello?name=Alice'",
            users_get: "curl 'https://your-app.vercel.app/api/users?limit=5'",
            users_post: "curl -X POST 'https://your-app.vercel.app/api/users' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Bob\",\"email\":\"bob@example.com\"}'"
          },
          javascript: {
            fetch: "fetch('https://your-app.vercel.app/api/hello')\n  .then(res => res.json())\n  .then(data => console.log(data))"
          }
        }
      },
      server: {
        environment: process.env.NODE_ENV || 'development',
        region: process.env.VERCEL_REGION || 'unknown',
        node_version: process.version,
        memory: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
      },
      statistics: {
        uptime: `${Math.floor(process.uptime())} seconds`,
        current_time: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Jakarta',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
    },
    metadata: {
      request: {
        method: req.method,
        url: req.url,
        path: pathname,
        query: Object.fromEntries(url.searchParams),
        headers: {
          'user-agent': req.headers['user-agent'] || 'unknown',
          'content-type': req.headers['content-type'] || 'none'
        }
      },
      response_time: Date.now()
    }
  };
  
  // Add response time calculation
  response.metadata.response_time = Date.now() - response.metadata.response_time;
  
  res.status(200).json(response);
}
