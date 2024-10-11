const express = require('express');
const multer = require('multer');
const path =require('path')

//const User = require('./models/User'); // Remplacez `User` par le nom de votre modèle Mongoose
const Users = require('../../models/userModel');
const auth = require('../../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Le dossier où les images seront stockées
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nommez le fichier avec un timestamp pour éviter les doublons
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/uploadAvatar').post(auth,
   upload.single('image'), async (req, res) => {
  if (req.file) {
    return res.status(400).json({ message: 'Aucun fichier sélectionné' });
   // return res.status(200).json(!req.file);

  }
  
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.user.id}, // Remplacez `req.userId` par l'identifiant de l'utilisateur concerné
      { avatar: req.file.path }, // Enregistrez le chemin de l'image dans le champ `avatar` du modèle User pour cet utilisateur spécifique
      { new: true }
    );

    return res.status(200).json({ message: 'Fichier téléchargé avec succès', user });
   

  } catch (error) {
    console.error(error);
    //return res.status(200).json(req.avatar);
     return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'avatar de l\'utilisateur' });
  }
});

module.exports = router;
