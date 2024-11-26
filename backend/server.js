require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require("./src/routes/products");

const app = express();

const connectDB = require('./config/bd');
const PORT = process.env.PORT || 5000;
connectDB();



// Middlewares
app.use(cors());
app.use(express.json());

// Routes
productRoutes(app);

// Page d'accueil pour l'API
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API ClicketPaf!');
});

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
