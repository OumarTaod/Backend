function errorHandler(err, req, res, next) {
  console.error('Erreur :', err.message);
  res.status(500).json({ message: 'Erreur au serveur', erreur: err.message });
}

module.exports = errorHandler;