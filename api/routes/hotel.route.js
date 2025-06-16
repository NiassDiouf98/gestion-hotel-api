const express = require('express');
const router = express.Router();
const { getHotels, getHotel, createHotel, updateHotel, deleteHotel } = require('../controllers/hotel.controller.js');

const { upload } = require('../controllers/hotel.controller.js');

router.get('/', getHotels);
router.get('/:id', getHotel);
router.post('/', upload, createHotel);
router.put('/:id', upload, updateHotel);
router.delete('/:id', deleteHotel);

// const multer = require('multer');

// Configuration de multer pour le stockage des images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Dossier où les images seront stockées
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier avec un timestamp
//   }
// });

// const upload = multer({ storage: storage });

// // Routes
// router.get('/', getHotels);
// router.get('/:id', getHotel);
// router.post('/', upload.single('image'), createHotel); // Middleware pour gérer l'upload d'image
// router.put('/:id', upload.single('image'), updateHotel); // Middleware pour gérer l'upload d'image
// router.delete('/:id', deleteHotel);

// Les middlewares d'upload sont déjà gérés dans le contrôleur via multer-storage-cloudinary
// router.get('/', getHotels);
// router.get('/:id', getHotel);
// router.post('/', (req, res) => require('../controllers/hotel.controller').upload(req, res, function(err) {
//   if (err) return res.status(400).json({ message: "Erreur lors de l'upload de l'image." });
//   createHotel(req, res);
// }));
// router.put('/:id', (req, res) => require('../controllers/hotel.controller').upload(req, res, function(err) {
//   if (err) return res.status(400).json({ message: "Erreur lors de l'upload de l'image." });
//   updateHotel(req, res);
// }));
// router.delete('/:id', deleteHotel);

module.exports = router;