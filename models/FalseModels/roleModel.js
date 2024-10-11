const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema(
    {
        RoleName: {
            type: String,
            required: [true, "Please enter your Role name!"],
        },
        permissionList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
        }],
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("Roles", roleSchema)