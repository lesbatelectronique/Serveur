import express from 'express';
import axios from 'axios';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;
const SERVER_URL = 'https://rouelment.onrender.com/ping'; // À adapter

// Route de test
app.get('/ping', (req, res) => {
  const msg = `[${new Date().toISOString()}] 🔔 Reçu un ping de ${req.ip}`;
  console.log(msg);
  io.emit('pingStatus', msg);
  res.send('Ping bot is running');
});

// Fonction de ping
async function pingRender() {
  try {
    const res = await axios.get(SERVER_URL);
    const msg = `[${new Date().toISOString()}] ✅ Ping envoyé à ${SERVER_URL} - Status: ${res.status}`;
    console.log(msg);
    io.emit('pingStatus', msg);
  } catch (err) {
    const msg = `[${new Date().toISOString()}] ❌ Erreur ping: ${err.message}`;
    console.error(msg);
    io.emit('pingStatus', msg);
  }
}

// Boucle de ping
async function loop() {
  await pingRender();
  const delay = Math.floor(Math.random() * (7 - 2 + 1) + 2) * 60 * 1000;
  const msg = `🕒 Prochain ping dans ${(delay / 60000).toFixed(1)} minutes...\n`;
  console.log(msg);
  io.emit('pingStatus', msg);
  setTimeout(loop, delay);
}

// Route pour voir le dashboard
app.get('/', (req, res) => {
  res.sendFile(new URL('./dashboard.html', import.meta.url).pathname);
});

// Lancement
httpServer.listen(PORT, () => {
  console.log(`🌐 Serveur lancé sur le port ${PORT}`);
  loop();
});
