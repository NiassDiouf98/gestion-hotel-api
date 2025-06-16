const Hotel = require("../models/hotel.model");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hotels', // dossier dans Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage }).single('image');

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Erreur lors de la récupération des hôtels:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

const getHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé.' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'hôtel:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

const createHotel = async (req, res) => {
    try {
      const { name, address, email, phone, price, devise } = req.body;
      if (!name || !address || !email || !phone || !price || !devise || !req.file) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }
      const hotelData = {
        name,
        address,
        email,
        phone,
        price,
        devise,
        image: req.file.path // Cloudinary retourne l'URL de l'image
      };
      const hotel = await Hotel.create(hotelData);
      res.status(201).json({ message: 'Hôtel créé avec succès.', hotel });
    } catch (error) {
      console.error('Erreur lors de la création de l\'hôtel:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}

const updateHotel = async (req, res) => {
  const { id } = req.params;
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image.' });
    }
    try {
      const hotelData = req.body;
      if (req.file) {
        hotelData.image = req.file.path; // Mettre à jour l'URL de l'image si une nouvelle image est uploadée
      }
      const hotel = await Hotel.findByIdAndUpdate(id, hotelData, { new: true });
      if (!hotel) {
        return res.status(404).json({ message: 'Hôtel non trouvé.' });
      }
      res.status(200).json({ message: 'Hôtel mis à jour avec succès.', hotel });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'hôtel:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  });
}

const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé.' });
    }
    res.status(200).json({ message: 'Hôtel supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'hôtel:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

module.exports = { 
    getHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    upload
};