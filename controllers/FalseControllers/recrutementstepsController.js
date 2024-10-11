const asyncHandler = require('express-async-handler')
const recrutementsteps = require('../models/recrutementstepsModel')

// @desc get Candidats by id
// @route POST /api/candidat/getbyid
// @access Private
const getrecrutementstepbyid = asyncHandler(async (req,res) =>{
    try {
        const rs = await recrutementsteps.findById(req.body.ide)
        res.status(200).json(rs)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports = {
    getrecrutementstepbyid
}