const express = require("express");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Dossier où stocker les fichiers
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Utilisez le nom de fichier original
  }
})
const upload = multer({ storage: storage });

const {
  allMessages,
  sendMessage2,
} = require("../../controllers/Chat/messageControllers");
const { protect } = require("../../middleware/authMiddleware");
//const auth = require("../middleware/auth")
const router = express.Router();
router.route("/:chatId").get(protect,allMessages);
router.route("/").post(protect,upload.single('file'),sendMessage2);

module.exports = router;
