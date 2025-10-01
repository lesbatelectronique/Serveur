// Import des modules
const express = require('express');
const https = require('https');

// Création d'un mini serveur web pour empêcher Replit de se mettre en veille
const app = express();
app.get('/', (req, res) => res.send('Ping bot is running'));
app.listen(3000, () => console.log("Mini web server lancé sur le port 3000"));

// URL de ton serveur Render à ping
const SERVER_URL = 'https://rouelment.onrender.com/'; // ← Remplace par ton vrai lien

// Fonction de ping avec délai aléatoire
function pingServer() {
  https.get(SERVER_URL, (res) => {
    console.log(`[${new Date().toISOString()}] ✅ Ping réussi: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] ❌ Erreur de ping:`, err.message);
  });

  const delay = Math.floor(Math.random() * (7 - 2 + 1) + 2) * 60 * 1000; // entre 2 et 7 minutes
  console.log(`🕒 Prochain ping dans ${(delay / 60000).toFixed(1)} minutes...\n`);
  setTimeout(pingServer, delay);
}

// Lancer la boucle de ping
pingServer();
