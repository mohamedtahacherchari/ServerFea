const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({

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
        ref: 'Email',
        unique: true
    },
    Phone_Number: {
        type: String,
        //required: [true, "Please enter phone number!"],
        ref: 'Phone_Number',
    },
    Phone_Number2: {
        type: String,
        //required: [true, "Please enter phone number!"],
        ref: 'Phone_Number2',
    },
    CompanyName: {
        type: String,
        //required: [true, "Please enter position!"],
        ref: 'CompanyName',
    },
    Country: {
        type: String,
        //required: [true, "Please enter Ville!"],
        ref: 'Country',
    },
    State: {
        type: String,
        //required: [true, "Please enter Ville!"],
        ref: 'State',
    },
    RecrutementSteps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recrutementSteps'
        }
    ]

}, {
    timestamps: true
})

module.exports = mongoose.model("Client", clientSchema)