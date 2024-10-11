const asyncHandler = require('express-async-handler') 
const SoftSkills = require('../../models/Candidat/softskillModel')

// @desc Get SoftSkills
// @route GET /api/softskills
// @access Private
const getSoftSkills = asyncHandler(async (req,res) => {
    try {
    const softskills = await SoftSkills.find()
    res.status(200).json(softskills)
    } catch (err) {
    return res.status(500).json({msg: err.message})
    }
})

// @desc Add SoftSkills
// @route POST /api/softskills
// @access Private
const addSoftSkills = asyncHandler(async (req,res) => {
    try {
        
        const softskills = await SoftSkills.create({
            softskillName: req.body.softskillName
        })

        res.status(200).json(softskills)

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})

// @desc Update SoftSkills
// @route PUT /api/softskills/:id
// @access Private
const updateSoftSkills = asyncHandler(async (req,res) => {

    const r = await SoftSkills.findById(req.params.id)

    if(!r){
        res.status(400)
        throw new Error('SoftSkills Not Found')
    }
    
    const updatedSoftSkills = await SoftSkills.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, }
    )

    res.status(200).json(updatedSoftSkills)

})

// @desc Delete SoftSkills
// @route DELETE /api/softskills/:id
// @access Private
const deleteSoftSkills = asyncHandler(async (req,res) => {

    const softskills = await SoftSkills.findById(req.params.id)

    if(!softskills){
        res.status(400)
        throw new Error('softskills Not Found')
    }

    await softskills.remove()

    res.status(200).json({message: ` softskills id : ${req.params.id} deleted succefully` })

})

// @desc Get All SoftSkills
// @route GET /api/softskills
// @access Private
const getAllSoftSkills = asyncHandler(async (req,res) => {
    try {

        const softskills = await SoftSkills.find()

        res.status(200).json(softskills)
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports = {
    getSoftSkills,
    addSoftSkills,
    updateSoftSkills,
    deleteSoftSkills,
    getAllSoftSkills
}