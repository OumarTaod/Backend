const Note = require('../models/Note');

// Créer une note
exports.creerNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

 // Lister toutes les notes
exports.getNotes = async (req, res, next) => {
  try {
    // Récupère le numéro de page demandé, ou 1 par défaut
    const page = parseInt(req.query.page) || 1;
    // Récupère le nombre d'éléments par page, ou 10 par défaut
    const limit = parseInt(req.query.limit) || 10;
    // Calcule combien d'éléments il faut ignorer (pour passer à la bonne page)
    const skip = (page - 1) * limit;

    // Récupère le champ de tri (par défaut 'date') et l'ordre (ascendant ou descendant)
    const sortBy = req.query.sortBy || 'date'; // Peut être 'date' ou 'cours'
    const order = req.query.order === 'asc' ? 1 : -1; // 1 = croissant, -1 = décroissant

    // Affiche dans la console les paramètres reçus pour aider au débogage
    console.log('Pagination/tri params:', { page, limit, sortBy, order });

    // Vérifie que le champ de tri demandé est autorisé
    const allowedSortFields = ['date', 'cours'];
    if (!allowedSortFields.includes(sortBy)) {
      // Si le champ n'est pas autorisé, retourne une erreur
      return res.status(400).json({ message: `Le champ de tri '${sortBy}' n'est pas autorisé.` });
    }

    // Cherche les notes dans la base, les trie, saute les éléments des pages précédentes et limite le nombre de résultats
    const notes = await Note.find()
      .sort({ [sortBy]: order }) // Trie par le champ choisi
      .skip(skip) // Ignore les éléments des pages précédentes
      .limit(limit); // Limite le nombre de résultats à la taille de la page

    // Compte le nombre total de notes dans la base (pour calculer le nombre de pages côté client)
    const total = await Note.countDocuments();

    // Retourne la réponse avec le total, la page, la limite et les notes trouvées
    res.status(200).json({
      total, // nombre total de notes
      page, // page actuelle
      limit, // nombre de notes par page
      items: notes // tableau des notes retournées
     });
  } catch (error) {
    // Affiche l'erreur dans la console si problème
    console.error('Erreur pagination/tri:', error);
    // Passe l'erreur au middleware de gestion des erreurs
    next(error);
  }
};

// Obtenir une note
exports.getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note introuvable' });
    res.status(200).json(note);
  } catch (error) {next(error);}
};

// Mettre à jour
exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ message: 'Note introuvable' });
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Supprimer
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note introuvable' });
    res.status(200).json({ message: 'Note supprimée' });
  } catch (error) {next(error);}
};


