import axios from 'axios';

const SERVER_URL = 'https://rouelment.onrender.com/ping';

async function pingServer() {
  try {
    const res = await axios.get(SERVER_URL);
    console.log(`[${new Date().toISOString()}] ✅ Ping réussi: ${res.status}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Erreur de ping:`, err.message);
  }

  const delay = Math.floor(Math.random() * (7 - 2 + 1) + 2) * 60 * 1000;
  console.log(`🕒 Prochain ping dans ${(delay / 60000).toFixed(1)} minutes...\n`);
  setTimeout(pingServer, delay);
}

pingServer();
