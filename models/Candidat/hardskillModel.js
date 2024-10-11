const mongoose = require('mongoose')


const hardskillSchema = new mongoose.Schema(
    {
        typeHardskill: {
            type: String,
            required: [true, "Please enter soft skills!"],
        },
        hardskillName: {
            type: String,
            required: [true, "Please enter soft skills!"],
            unique: true
        },
        hardskillImg: {
            type: String
        }

    }

);

module.exports = mongoose.model("HardSkills", hardskillSchema)