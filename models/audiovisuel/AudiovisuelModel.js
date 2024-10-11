
const mongoose = require("mongoose");


const AudiovisuelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
    title: {type: String, required: [true, "Please write a title for your Audiovisuel"]},
    describe: { type: String},
    describe2: { type: String},
    type: { type: String},
    youtubeTitre: { type: String },
    youtubeTitre2: { type: String },
    youtubeLink: { type: String },
    youtubeLink2: { type: String },
    imageUrl: { type: String },
    iconeUrl: { type: String },
    pdfUrl: { type: String },
    googleDriveVideoUrl: { type: String },
    googleDriveVideoUrl2: { type: String },
    fonction: { type: String },
    isActive: {
      type: Boolean,
      default: true, // Par défaut, l'élément est actif
    },
    selectedClients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'  // Now properly referencing Users
      }]
})


module.exports = mongoose.model("Audiovisuel", AudiovisuelSchema)