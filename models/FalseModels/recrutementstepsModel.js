
const mongoose = require('mongoose')

const recrutementStepsSchema = new mongoose.Schema({
    StepName : {
        type: String,
        required: [true, "Please enter StepName!"],
        ref: 'StepName',
    },
    StepDescription : {
        type: String,
        required: [true, "Please enter StepDescription!"],
        ref: 'StepDescription',
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model("recrutementSteps", recrutementStepsSchema)