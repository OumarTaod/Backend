const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Créer un token JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// INSCRIPTION
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {res.status(400).json({ message: 'Erreur lors de l’inscription', error: err.message });}
};

// CONNEXION
exports.login = async (req, res) => {
  try {const { username, password } = req.body;const user = await User.findOne({ username });

    if (!user) {return res.status(404).json({ message: 'Utilisateur introuvable' });    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {return res.status(401).json({ message: 'Mot de passe incorrect' });    }

    const token = createToken(user);
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {res.status(500).json({ message: 'Erreur serveur', error: err.message });};
};