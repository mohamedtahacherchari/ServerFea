const mongoose = require('mongoose')

const candidatSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Users',
    },
    FirstName: {
        type: String,
        //required: [true, "Please enter first name!"],
        trim : true,
        ref: 'FirstName'
    },
    LastName: {
        type: String,
        //required: [true, "Please enter last name!"],
        trim : true,
        ref: 'LastName'
    },
    Email: {
        type: String,
        //required: [true, "Please enter email!"],
        trim : true,
        ref: 'Email',
        unique: true
    },
    Phone_Number: {
        type: String,
        //required: [true, "Please enter phone number!"],
        ref: 'Phone_Number',
    },
    Position: {
        type: String,
        //required: [true, "Please enter position!"],
        ref: 'Position',
    },
    Contract: {
        type: String,
        //required: [true, "Please enter Contract!"],
        ref: 'Contract',
    },
    Status: {
        type: String,
        //required: [true, "Please enter Status!"],
        ref: 'Status',
    },
    Photo: {
        type: String,
        default: "",
        ref: 'Photo'
    },
    Ville: {
        type: String,
        //required: [true, "Please enter Ville!"],
        ref: 'Ville',
    },
    State: {
        type: String,
        //required: [true, "Please enter Ville!"],
        ref: 'State',
    },
    hardskill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HardSkills',
    }],
    softskill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SoftSkills'
    }],
    Cv : {
        type: String,
        ref: 'Cv'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Candidat", candidatSchema)