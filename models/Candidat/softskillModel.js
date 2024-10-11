const mongoose = require('mongoose')

const softskillSchema = new mongoose.Schema(
    {
        softskillName: {
            type: String,
            required: [true, "Please enter soft skills!"],
            unique: true
        }
    }

);

module.exports = mongoose.model("SoftSkills", softskillSchema)