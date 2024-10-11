const asyncHandler = require('express-async-handler')
const recrutement = require('../../models/Candidat/recrutementModel')

// @desc Get recrutement 
// @route GET /api/recrutement
// @access Private
const getRecrutement = asyncHandler(async (req,res) => {
    try {
        const recrutements = await recrutement.find()
        
        res.status(200).json(recrutements)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Add Candidats
// @route POST /api/candidats
// @access Private
const addrecrutements = asyncHandler(async (req,res) => {
    try {
            
        const r = await recrutement.create({
            RecrutmentStepName : req.body.RecrutmentStepName,
            RecrutmentStepDescription : req.body.RecrutmentStepDescription,
            date : req.body.date,
            debrief: req.body.debrief
        })

        res.status(200).json(r)

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Update Candidat recrutements
// @route PUT /api/Candidat recrutements/:id
// @access Private
const updaterecrutements = asyncHandler(async (req,res) => {

    const r = await recrutement.findById(req.params.id)

    if(!r){

        res.status(400)
        throw new Error('recrutement Not Found')

    }
    
    const updatedProcess = await recrutement.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, }
    )

    res.status(200).json(updatedProcess)

})

// @desc Delete Candidat recrutements
// @route DELETE /api/Candidat recrutements/:id
// @access Private
const deleterecrutements = asyncHandler(async (req,res) => {
    const cp = await recrutement.findById(req.params.id)

    if(!cp){
        res.status(400)
        throw new Error('Candidat Process Not Found')
    }

    await cp.remove()

    res.status(200).json({message: `delete Candidat Process ${req.params.id}` })
})

// @desc get Candidat recrutements
// @route get /api/Candidat recrutements/:id
// @access Private
const getrecrutementsbyid = asyncHandler(async (req,res) => {

    const cp = await recrutement.findById(req.params.id)

    if(!cp){
        res.status(400)
        throw new Error('recrutement Process Not Found')
    }

    res.status(200).json(cp)
    
})

module.exports = {
    getRecrutement,
    addrecrutements,
    updaterecrutements,
    deleterecrutements,
    getrecrutementsbyid
}