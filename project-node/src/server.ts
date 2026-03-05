// Import modul http dari Node.js
import * as http from 'http';

const PORT = 3000;

// Data statis
const users = [
  { id: 1, name: "Adhelia" },
  { id: 2, name: "Issabel" }
];

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" }
];

// Middleware sederhana (logger + hitung waktu)
const server = http.createServer((req, res) => {
  const startTime = Date.now(); // mulai hitung waktu

  const url = req.url || '/';
  const method = req.method || 'GET';

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // Helper untuk kirim response JSON
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));

    // Hitung lama eksekusi
    const endTime = Date.now();
    console.log(`⏱ Waktu eksekusi: ${endTime - startTime} ms\n`);
  };

  // ================= ROUTING =================

  // GET /
  if (url === "/" && method === "GET") {
    return sendJSON(200, { message: "Selamat datang di halaman Home!" });
  }

  // GET /about
  if (url === "/about" && method === "GET") {
    return sendJSON(200, { message: "Halaman About" });
  }

  // GET /products
  if (url === "/products" && method === "GET") {
    return sendJSON(200, products);
  }

  // POST /products
  if (url === "/products" && method === "POST") {
    return sendJSON(201, { message: "Produk berhasil dibuat (simulasi)" });
  }

  // GET /users/:id  (PARAMETER DINAMIS)
  if (url.startsWith("/users/") && method === "GET") {
    const parts = url.split("/");
    const id = parseInt(parts[2]);

    const user = users.find(u => u.id === id);

    if (user) {
      return sendJSON(200, user);
    } else {
      return sendJSON(404, { message: "User tidak ditemukan" });
    }
  }

  // POST /users
  if (url === "/users" && method === "POST") {
    return sendJSON(201, { message: "User berhasil dibuat (simulasi)" });
  }

  // 404 Not Found
  return sendJSON(404, { message: "Route tidak ditemukan" });

});

// Jalankan server
server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});