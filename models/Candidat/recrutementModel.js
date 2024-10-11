const mongoose = require('mongoose')

const recrutementSchema = new mongoose.Schema({
    RecrutmentStepName : {
        type: String,
        required: [true, "Please enter StepName!"],
        ref: 'RecrutmentStepName',
    },
    RecrutmentStepDescription : {
        type: String,
        required: [true, "Please enter StepDescription!"],
        ref: 'RecrutmentStepDescription',
    },
    date: {
        type: String,
        ref: 'Date'
    },
    debrief: {
        type: String,
        ref: 'Debrief'
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model("recrutement", recrutementSchema)