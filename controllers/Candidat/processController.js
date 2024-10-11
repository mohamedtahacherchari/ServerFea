const asyncHandler = require('express-async-handler')
const process = require('../../models/Candidat/processModel')
const recrutement = require('../../models/Candidat/recrutementModel')

// @desc Get process 
// @route GET /api/process
// @access Private
const getprocess = asyncHandler(async (req,res) => {
    try {
        //{ user: req.user.id }//.lean().populate()
        const p = await process.find().populate('Recrutements')
        
        res.status(200).json(p)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Add process
// @route POST /api/process
// @access Private
const addprocess = asyncHandler(async (req,res) => {

    //add process
    try {
        if(req.body.StepName10){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })
            const r5 = await recrutement.create({
                RecrutmentStepName : req.body.StepName5,
                RecrutmentStepDescription : req.body.Description5,
                date : req.body.datetime5
            })
            const r6 = await recrutement.create({
                RecrutmentStepName : req.body.StepName6,
                RecrutmentStepDescription : req.body.Description6,
                date : req.body.datetime6
            })
            const r7 = await recrutement.create({
                RecrutmentStepName : req.body.StepName7,
                RecrutmentStepDescription : req.body.Description7,
                date : req.body.datetime7
            })
            const r8 = await recrutement.create({
                RecrutmentStepName : req.body.StepName8,
                RecrutmentStepDescription : req.body.Description8,
                date : req.body.datetime8
            })
            const r9 = await recrutement.create({
                RecrutmentStepName : req.body.StepName9,
                RecrutmentStepDescription : req.body.Description9,
                date : req.body.datetime9
            })
            const r10 = await recrutement.create({
                RecrutmentStepName : req.body.StepName10,
                RecrutmentStepDescription : req.body.Description10,
                date : req.body.datetime10
            })

            let Recrutements= [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName9){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })
            const r5 = await recrutement.create({
                RecrutmentStepName : req.body.StepName5,
                RecrutmentStepDescription : req.body.Description5,
                date : req.body.datetime5
            })
            const r6 = await recrutement.create({
                RecrutmentStepName : req.body.StepName6,
                RecrutmentStepDescription : req.body.Description6,
                date : req.body.datetime6
            })
            const r7 = await recrutement.create({
                RecrutmentStepName : req.body.StepName7,
                RecrutmentStepDescription : req.body.Description7,
                date : req.body.datetime7
            })
            const r8 = await recrutement.create({
                RecrutmentStepName : req.body.StepName8,
                RecrutmentStepDescription : req.body.Description8,
                date : req.body.datetime8
            })
            const r9 = await recrutement.create({
                RecrutmentStepName : req.body.StepName9,
                RecrutmentStepDescription : req.body.Description9,
                date : req.body.datetime9
            })

            let Recrutements= [r1, r2, r3, r4, r5, r6, r7, r8, r9]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName8){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })
            const r5 = await recrutement.create({
                RecrutmentStepName : req.body.StepName5,
                RecrutmentStepDescription : req.body.Description5,
                date : req.body.datetime5
            })
            const r6 = await recrutement.create({
                RecrutmentStepName : req.body.StepName6,
                RecrutmentStepDescription : req.body.Description6,
                date : req.body.datetime6
            })
            const r7 = await recrutement.create({
                RecrutmentStepName : req.body.StepName7,
                RecrutmentStepDescription : req.body.Description7,
                date : req.body.datetime7
            })
            const r8 = await recrutement.create({
                RecrutmentStepName : req.body.StepName8,
                RecrutmentStepDescription : req.body.Description8,
                date : req.body.datetime8
            })

            let Recrutements= [r1, r2, r3, r4, r5, r6, r7, r8]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName7){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })
            const r5 = await recrutement.create({
                RecrutmentStepName : req.body.StepName5,
                RecrutmentStepDescription : req.body.Description5,
                date : req.body.datetime5
            })
            const r6 = await recrutement.create({
                RecrutmentStepName : req.body.StepName6,
                RecrutmentStepDescription : req.body.Description6,
                date : req.body.datetime6
            })
            const r7 = await recrutement.create({
                RecrutmentStepName : req.body.StepName7,
                RecrutmentStepDescription : req.body.Description7,
                date : req.body.datetime7
            })

            let Recrutements= [r1, r2, r3, r4, r5, r6, r7]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName6){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })
            const r5 = await recrutement.create({
                RecrutmentStepName : req.body.StepName5,
                RecrutmentStepDescription : req.body.Description5,
                date : req.body.datetime5
            })
            const r6 = await recrutement.create({
                RecrutmentStepName : req.body.StepName6,
                RecrutmentStepDescription : req.body.Description6,
                date : req.body.datetime6
            })

            let Recrutements= [r1, r2, r3, r4, r5, r6]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName5){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })
            const r5 = await recrutement.create({
                RecrutmentStepName : req.body.StepName5,
                RecrutmentStepDescription : req.body.Description5,
                date : req.body.datetime5
            })

            let Recrutements= [r1, r2, r3, r4, r5]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName4){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })
            const r4 = await recrutement.create({
                RecrutmentStepName : req.body.StepName4,
                RecrutmentStepDescription : req.body.Description4,
                date : req.body.datetime4
            })

            let Recrutements= [r1, r2, r3, r4]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName3){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })
            const r3 = await recrutement.create({
                RecrutmentStepName : req.body.StepName3,
                RecrutmentStepDescription : req.body.Description3,
                date : req.body.datetime3
            })

            let Recrutements= [r1, r2, r3]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName2){
            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })
            const r2 = await recrutement.create({
                RecrutmentStepName : req.body.StepName2,
                RecrutmentStepDescription : req.body.Description2,
                date : req.body.datetime2
            })

            let Recrutements= [r1, r2]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }
        }
        else if(req.body.StepName1){

            const r1 = await recrutement.create({
                RecrutmentStepName : req.body.StepName1,
                RecrutmentStepDescription : req.body.Description1,
                date : req.body.datetime1
            })

            let Recrutements= [r1]

            const { candidat, namecandidat, client } = req.body

            if (!candidat || !client ){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const processObject = {candidat, client, namecandidat, Recrutements}
            
            const p = await process.create(processObject)

            if (p){
                res.status(201).json({ message: `New process ${p} created` })
            }else{
                res.status(400).json({ message: 'Invalid Process data received' })
            }

        }
        /*
        const p = await process.create({
            candidat: req.body.candidat,
            client: req.body.client,
            namecandidat: req.body.namecandidat,

        })
        res.status(200).json({ p })*/
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})

// @desc DELETE process
// @route DELETE /api/process/:id
// @access Private
const deleteprocess = asyncHandler(async (req,res) => {

    const p = await process.findById(req.params.id)

    if(!p){
        res.status(400)
        throw new Error('process Not Found')
    }

    await p.remove()

    res.status(200).json({message: `delete process ${req.params.id}` })

})

// @desc update process
// @route POST /api/process/:id
// @access Private
const updateprocess = asyncHandler(async (req,res) => {
    
    const p = await process.findById(req.params.id)

    if(!p){
        res.status(400)
        throw new Error('process Not Found')
    }
})

// @desc get process by id
// @route POST /api/process/getbyid
// @access Private
const getprocessbyid = asyncHandler(async (req,res) =>{
    try {
        const processid = await process.find({candidat: req.params.id}).populate('Recrutements')

        res.status(200).json(processid)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports = {
    getprocess,
    addprocess,
    deleteprocess,
    getprocessbyid
}