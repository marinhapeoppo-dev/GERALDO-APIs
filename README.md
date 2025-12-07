# REST API untuk Vercel

API sederhana dengan endpoint GET dan POST yang siap di-deploy ke Vercel.

## Endpoint yang Tersedia

### 1. Root
- `GET /` - Informasi dasar API

### 2. Items
- `GET /api/items` - Mendapatkan semua items
- `GET /api/items/:id` - Mendapatkan item berdasarkan ID
- `POST /api/items` - Menambahkan item baru

### 3. Users
- `GET /api/users` - Mendapatkan semua users
- `POST /api/users` - Menambahkan user baru

### 4. Health Check
- `GET /api/health` - Memeriksa status API

## Contoh Request

### GET semua items:
```bash
curl https://your-api.vercel.app/api/items