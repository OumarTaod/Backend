require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const PORT = process.env.PORT || 3000;

const app = express();

// --- Import des routes ---
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

// --- Import des middlewares ---
const authMiddleware = require('./middlewares/authmiddleware');
const errorHandler = require('./middlewares/errorHandler');

// --- Middlewares globaux ---
app.use(helmet());        // Sécurité HTTP headers
app.use(cors());          // Autorisation CORS
app.use(express.json());  // Parse JSON body
app.use(morgan('dev'));   // Logger des requêtes

// --- Configuration Multer (upload de fichiers) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// --- Route pour uploader un fichier ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier envoyé' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(201).json({
    message: 'Fichier uploadé avec succès',
    fileUrl
  });
});

// --- Servir les fichiers statiques du dossier uploads ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes publiques (authentification) ---
app.use('/api/auth', authRoutes);

// --- Routes protégées par authentification ---
// Ici, toutes les routes notes sont protégées
app.use('/api/notes', noteRoutes);

// --- Route test protégée ---
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenue sur la route protégée !', user: req.user });
});

// --- Middleware global de gestion des erreurs ---
app.use(errorHandler);

// --- Connexion à la base de données MongoDB et démarrage serveur ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    }); 
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de donnée MongoDB:', err);
  });
