const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/noteController');

router.post('/', noteCtrl.creerNote);
router.get('/', getNotes);
router.get('/:id', noteCtrl.getNote);
router.put('/:id', noteCtrl.updateNote);
router.delete('/:id', noteCtrl.deleteNote);

module.exports = router;