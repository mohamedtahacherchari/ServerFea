const asyncHandler = require('express-async-handler') 
const HardSkills = require('../../models/Candidat/hardskillModel')

// @desc Get HardSkills
// @route GET /api/hardskills
// @access Private
const getoneHardSkills = asyncHandler(async (req,res) => {
    try {
        const hardskills = await HardSkills.findById(req.params.id)
        res.status(200).json(hardskills)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Add HardSkills
// @route POST /api/hardskills
// @access Private
const addHardSkills = asyncHandler(async (req,res) => {
    try {
        
        const hardskills = await HardSkills.create({
            typeHardskill: req.body.typeHardskill,
            hardskillName: req.body.hardskillName,
            hardskillImg: req.body.hardskillImg
        })

        res.status(200).json(hardskills)

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})

// @desc Update HardSkills
// @route PUT /api/hardskills/:id
// @access Private
const updateHardSkills = asyncHandler(async (req,res) => {

    const r = await HardSkills.findById(req.params.id)

    if(!r){
        res.status(400)
        throw new Error('HardSkills Not Found')
    }
    
    const updatedHardSkills = await HardSkills.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, }
    )

    res.status(200).json(updatedHardSkills)

})

// @desc Delete HardSkills
// @route DELETE /api/hardskills/:id
// @access Private
const deleteHardSkills = asyncHandler(async (req,res) => {

    const hardskills = await HardSkills.findById(req.params.id)

    if(!hardskills){
        res.status(400)
        throw new Error('hardskills Not Found')
    }

    await hardskills.remove()

    res.status(200).json({message: ` hardskills id : ${req.params.id} deleted succefully` })

})

// @desc Get All hardskills
// @route GET /api/hardskills
// @access Private
const getAllHardSkills = asyncHandler(async (req,res) => {
    try {

        const hardskills = await HardSkills.find()

        res.status(200).json(hardskills)
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports = {
    getoneHardSkills,
    addHardSkills,
    deleteHardSkills,
    getAllHardSkills,
    updateHardSkills
}