import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

// URL du serveur Render à ping
const SERVER_URL = 'https://rouelment.onrender.com/ping'; // Remplace si nécessaire

// Route principale
app.get('/ping', (req, res) => {
  console.log(`[${new Date().toISOString()}] 🔔 Reçu un ping sur / de ${req.ip}`);
  res.send('Ping bot is running');
});

// Lancement du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Serveur lancé sur le port ${PORT}`);
});

// Fonction pour ping un autre serveur Render
async function pingRender() {
  try {
    const res = await axios.get(SERVER_URL);
    console.log(`[${new Date().toISOString()}] ✅ Ping envoyé à ${SERVER_URL} - Status: ${res.status}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Erreur lors du ping: ${err.message}`);
  }
}

// Boucle de ping régulière
async function loop() {
  await pingRender();
  
  const delay = Math.floor(Math.random() * (7 - 2 + 1) + 2) * 60 * 1000;
  console.log(`🕒 Prochain ping dans ${(delay / 60000).toFixed(1)} minutes...\n`);
  setTimeout(loop, delay);
}

// Démarrage
loop();
