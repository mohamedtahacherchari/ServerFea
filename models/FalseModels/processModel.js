const mongoose = require('mongoose')

const processSchema = new mongoose.Schema({
    Candidat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat',
        unique: true,
    },
    Date: {
        type: String,
        required: [true, "Please enter Date!"],
        trim : true,
        ref: 'Date'
    },
    Client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        unique: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("process", processSchema)