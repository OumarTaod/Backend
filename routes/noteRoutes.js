const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/noteController');

router.post('/ajouter', noteCtrl.creerNote);
router.get('/afficher', noteCtrl.getNotes);
router.get('/afficher/:id', noteCtrl.getNote);
router.put('/modifier/:id', noteCtrl.updateNote);
router.delete('/supprimer/:id', noteCtrl.deleteNote);

module.exports = router;