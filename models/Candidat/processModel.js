const mongoose = require('mongoose')

const processSchema = new mongoose.Schema({

    processlevel: {
        type: String,
        default: 'Entretient Client',
        ref: 'StepName',
    },
    candidat: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Candidat',
    },
    namecandidat: {
        type: String,
        ref: 'namecandidat'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Client',
    },
    Recrutements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recrutement'
        }
    ],
    
}, {
    timestamps: true
})

module.exports = mongoose.model("Process", processSchema)