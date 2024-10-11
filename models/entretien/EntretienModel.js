
const mongoose = require("mongoose");


const EntretienSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
    title: {type: String, required: [true, "Please write a title for your Entraide"]},
    describe: { type: String},
    fonction: { type: String },
    imageUrl: { type: String },
    pdfUrl: { type: String },
    pdfUrl2: { type: String },
    isActive: {
      type: Boolean,
      default: true, // Par défaut, l'élément est actif
    },
    selectedClients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'  // Now properly referencing Users
      }]
})


module.exports = mongoose.model("Entretien", EntretienSchema)