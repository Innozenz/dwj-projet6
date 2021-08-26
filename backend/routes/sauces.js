const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.updateSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislike);

module.exports = router;
