// Import modul http dari Node.js
import * as http from 'http';

// Tentukan port yang akan digunakan
const PORT = 3000;

// Buat server HTTP
const server = http.createServer((req, res) => {
  // Ambil URL dan metode HTTP dari objek request
  // Jika req.url undefined, gunakan '/' sebagai default
  const url = req.url || '/';
  const method = req.method || 'GET';

  // Tampilkan log di terminal (untuk debugging)
  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // --- ROUTING MANUAL DENGAN PERCABANGAN ---

  // Rute: GET /
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message:"Selamat datang dihalaman Home Semuanya!!!"}));
  }

  // Rute: GET /about
  else if (url === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message:"Halaman About"}));
  }

  // Rute: GET /api/users
  else if (url?.startsWith("/users/") && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, name: 'Adhelia' },
      { id: 2, name: 'Issabel' }
    ]));
  }

  // Rute: POST /api/users
  else if (url === '/api/users' && method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User berhasil dibuat (contoh)' }));
  }

  // Jika tidak ada rute yang cocok → 404
  else {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Router tidak ditemukan' }));
  }
});

// Jalankan server
server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});