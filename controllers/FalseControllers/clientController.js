const asyncHandler = require('express-async-handler')
const Client = require('../models/clientModel')
const RecrutementStep = require('../models/recrutementstepsModel')
// @desc Get Client 
// @route GET /api/clients
// @access Private
const getClients = asyncHandler(async (req,res) => {
    try {
        const clients = await Client.find()
        res.status(200).json(clients)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Add Client
// @route POST /api/clients
// @access Private
const addClient = asyncHandler(async (req,res) => {

    try{
        
        if(req.body.StepName10){
            
            const recrutementStep1 = await RecrutementStep.create({
                StepName : req.body.StepName1,
                StepDescription : req.body.Description1
            })
            const recrutementStep2 = await RecrutementStep.create({
                StepName : req.body.StepName2,
                StepDescription : req.body.Description2
            })
            const recrutementStep3 = await RecrutementStep.create({
                StepName : req.body.StepName3,
                StepDescription : req.body.Description3
            })
            const recrutementStep4 = await RecrutementStep.create({
                StepName : req.body.StepName4,
                StepDescription : req.body.Description4
            })
            const recrutementStep5 = await RecrutementStep.create({
                StepName : req.body.StepName5,
                StepDescription : req.body.Description5
            })
            const recrutementStep10 = await RecrutementStep.create({
                StepName : req.body.StepName10,
                StepDescription : req.body.Description10
            })
            const recrutementStep9 = await RecrutementStep.create({
                StepName : req.body.StepName9,
                StepDescription : req.body.Description9
            })
            const recrutementStep8 = await RecrutementStep.create({
                StepName : req.body.StepName8,
                StepDescription : req.body.Description8
            })
            const recrutementStep6 = await RecrutementStep.create({
                StepName : req.body.StepName6,
                StepDescription : req.body.Description6
            })
            const recrutementStep7 = await RecrutementStep.create({
                StepName : req.body.StepName7,
                StepDescription : req.body.Description7
            })
            const RecrutementSteps = [
                recrutementStep1, recrutementStep2, recrutementStep3, recrutementStep4, recrutementStep5, 
                recrutementStep6, recrutementStep7, recrutementStep8, recrutementStep9, recrutementStep10
            ]
            const {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State} = req.body
            
            if( !FirstName || !LastName || !Email || !Phone_Number || !Phone_Number2 || !CompanyName || !Country || !State){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const duplicate = await Client.findOne({Email}).lean().exec()

            if(duplicate) {
                return res.status(409).json({message: 'Duplicate Email'})
            }
            const clientObject = {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State, RecrutementSteps}
            
            const client = Client.create(clientObject)

            if (client){
                res.status(201).json({ message: `New client ${Email} created` })
            }else{
                res.status(400).json({ message: 'Invalid Client data received' })
            }

        }else if(req.body.StepName9){
            const recrutementStep1 = await RecrutementStep.create({
                StepName : req.body.StepName1,
                StepDescription : req.body.Description1
            })
            const recrutementStep2 = await RecrutementStep.create({
                StepName : req.body.StepName2,
                StepDescription : req.body.Description2
            })
            const recrutementStep3 = await RecrutementStep.create({
                StepName : req.body.StepName3,
                StepDescription : req.body.Description3
            })
            const recrutementStep4 = await RecrutementStep.create({
                StepName : req.body.StepName4,
                StepDescription : req.body.Description4
            })
            const recrutementStep5 = await RecrutementStep.create({
                StepName : req.body.StepName5,
                StepDescription : req.body.Description5
            })
            const recrutementStep9 = await RecrutementStep.create({
                StepName : req.body.StepName9,
                StepDescription : req.body.Description9
            })
            const recrutementStep8 = await RecrutementStep.create({
                StepName : req.body.StepName8,
                StepDescription : req.body.Description8
            })
            const recrutementStep6 = await RecrutementStep.create({
                StepName : req.body.StepName6,
                StepDescription : req.body.Description6
            })
            const recrutementStep7 = await RecrutementStep.create({
                StepName : req.body.StepName7,
                StepDescription : req.body.Description7
            })
            const RecrutementSteps = [
                recrutementStep1, recrutementStep2, recrutementStep3, recrutementStep4, recrutementStep5, 
                recrutementStep6, recrutementStep7, recrutementStep8, recrutementStep9
            ]
            const {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State} = req.body
            
            if( !FirstName || !LastName || !Email || !Phone_Number || !Phone_Number2 || !CompanyName || !Country || !State){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const duplicate = await Client.findOne({Email}).lean().exec()

            if(duplicate) {
                return res.status(409).json({message: 'Duplicate Email'})
            }
            const clientObject = {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State, RecrutementSteps}
            
            const client = Client.create(clientObject)

            if (client){
                res.status(201).json({ message: `New client ${Email} created` })
            }else{
                res.status(400).json({ message: 'Invalid Client data received' })
            }
        }else if(req.body.StepName8){
            const recrutementStep1 = await RecrutementStep.create({
                StepName : req.body.StepName1,
                StepDescription : req.body.Description1
            })
            const recrutementStep2 = await RecrutementStep.create({
                StepName : req.body.StepName2,
                StepDescription : req.body.Description2
            })
            const recrutementStep3 = await RecrutementStep.create({
                StepName : req.body.StepName3,
                StepDescription : req.body.Description3
            })
            const recrutementStep4 = await RecrutementStep.create({
                StepName : req.body.StepName4,
                StepDescription : req.body.Description4
            })
            const recrutementStep5 = await RecrutementStep.create({
                StepName : req.body.StepName5,
                StepDescription : req.body.Description5
            })
            const recrutementStep8 = await RecrutementStep.create({
                StepName : req.body.StepName8,
                StepDescription : req.body.Description8
            })
            const recrutementStep6 = await RecrutementStep.create({
                StepName : req.body.StepName6,
                StepDescription : req.body.Description6
            })
            const recrutementStep7 = await RecrutementStep.create({
                StepName : req.body.StepName7,
                StepDescription : req.body.Description7
            })
            const RecrutementSteps = [
                recrutementStep1, recrutementStep2, recrutementStep3, recrutementStep4, recrutementStep5, 
                recrutementStep6, recrutementStep7, recrutementStep8
            ]
            const {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State} = req.body
            
            if( !FirstName || !LastName || !Email || !Phone_Number || !Phone_Number2 || !CompanyName || !Country || !State){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const duplicate = await Client.findOne({Email}).lean().exec()

            if(duplicate) {
                return res.status(409).json({message: 'Duplicate Email'})
            }
            const clientObject = {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State, RecrutementSteps}
            
            const client = Client.create(clientObject)

            if (client){
                res.status(201).json({ message: `New client ${Email} created` })
            }else{
                res.status(400).json({ message: 'Invalid Client data received' })
            }
            
        }else if(req.body.StepName7){
            const recrutementStep1 = await RecrutementStep.create({
                StepName : req.body.StepName1,
                StepDescription : req.body.Description1
            })
            const recrutementStep2 = await RecrutementStep.create({
                StepName : req.body.StepName2,
                StepDescription : req.body.Description2
            })
            const recrutementStep3 = await RecrutementStep.create({
                StepName : req.body.StepName3,
                StepDescription : req.body.Description3
            })
            const recrutementStep4 = await RecrutementStep.create({
                StepName : req.body.StepName4,
                StepDescription : req.body.Description4
            })
            const recrutementStep5 = await RecrutementStep.create({
                StepName : req.body.StepName5,
                StepDescription : req.body.Description5
            })
            const recrutementStep6 = await RecrutementStep.create({
                StepName : req.body.StepName6,
                StepDescription : req.body.Description6
            })
            const recrutementStep7 = await RecrutementStep.create({
                StepName : req.body.StepName7,
                StepDescription : req.body.Description7
            })
            const RecrutementSteps = [
                recrutementStep1, recrutementStep2, recrutementStep3, recrutementStep4, recrutementStep5, 
                recrutementStep6, recrutementStep7
            ]
            const {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State} = req.body
            
            if( !FirstName || !LastName || !Email || !Phone_Number || !Phone_Number2 || !CompanyName || !Country || !State){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const duplicate = await Client.findOne({Email}).lean().exec()

            if(duplicate) {
                return res.status(409).json({message: 'Duplicate Email'})
            }
            const clientObject = {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State, RecrutementSteps}
            
            const client = Client.create(clientObject)

            if (client){
                res.status(201).json({ message: `New client ${Email} created` })
            }else{
                res.status(400).json({ message: 'Invalid Client data received' })
            }

        }else if(req.body.StepName6){
            const recrutementStep1 = await RecrutementStep.create({
                StepName : req.body.StepName1,
                StepDescription : req.body.Description1
            })
            const recrutementStep2 = await RecrutementStep.create({
                StepName : req.body.StepName2,
                StepDescription : req.body.Description2
            })
            const recrutementStep3 = await RecrutementStep.create({
                StepName : req.body.StepName3,
                StepDescription : req.body.Description3
            })
            const recrutementStep4 = await RecrutementStep.create({
                StepName : req.body.StepName4,
                StepDescription : req.body.Description4
            })
            const recrutementStep5 = await RecrutementStep.create({
                StepName : req.body.StepName5,
                StepDescription : req.body.Description5
            })            
            const recrutementStep6 = await RecrutementStep.create({
                StepName : req.body.StepName6,
                StepDescription : req.body.Description6
            })

            const RecrutementSteps = [
                recrutementStep1, recrutementStep2, recrutementStep3, recrutementStep4, recrutementStep5, 
                recrutementStep6
            ]
            const {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State} = req.body
            
            if( !FirstName || !LastName || !Email || !Phone_Number || !Phone_Number2 || !CompanyName || !Country || !State){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const duplicate = await Client.findOne({Email}).lean().exec()

            if(duplicate) {
                return res.status(409).json({message: 'Duplicate Email'})
            }

            const clientObject = {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State, RecrutementSteps}
            
            const client = Client.create(clientObject)

            if (client){
                res.status(201).json({ message: `New client ${Email} created` })
            }else{
                res.status(400).json({ message: 'Invalid Client data received' })
            }
            
        }else{

            const recrutementStep1 = await RecrutementStep.create({
                StepName : req.body.StepName1,
                StepDescription : req.body.Description1
            })
            const recrutementStep2 = await RecrutementStep.create({
                StepName : req.body.StepName2,
                StepDescription : req.body.Description2
            })
            const recrutementStep3 = await RecrutementStep.create({
                StepName : req.body.StepName3,
                StepDescription : req.body.Description3
            })
            const recrutementStep4 = await RecrutementStep.create({
                StepName : req.body.StepName4,
                StepDescription : req.body.Description4
            })
            const recrutementStep5 = await RecrutementStep.create({
                StepName : req.body.StepName5,
                StepDescription : req.body.Description5
            })
            
            const RecrutementSteps = [
                recrutementStep1, recrutementStep2, recrutementStep3, recrutementStep4, recrutementStep5
            ]
            const {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State} = req.body
            
            if( !FirstName || !LastName || !Email || !Phone_Number || !Phone_Number2 || !CompanyName || !Country || !State){
                return res.status(400).json({ message: 'All fields are required' })
            }

            const duplicate = await Client.findOne({Email}).lean().exec()

            if(duplicate) {
                return res.status(409).json({message: 'Duplicate Email'})
            }
            
            const clientObject = {FirstName, LastName, Email, Phone_Number, Phone_Number2, CompanyName, Country, State, RecrutementSteps}
            
            const client = Client.create(clientObject)

            if (client){
                res.status(201).json({ message: `New client ${Email} created` })
            }else{
                res.status(400).json({ message: 'Invalid Client data received' })
            }

        }        
    }catch(err){
        return res.status(500).json({msg: err.message})
    }

})

// @desc Add Client
// @route POST /api/clients
// @access Private
const updateClient = asyncHandler(async (req,res) => {

    try {
        const updatedClient = await Client.findByIdAndUpdate(req.body.ide,
            req.body,
        { 
            new: true, 
        })

        res.status(200).json(updatedClient)

    }catch(err)
    {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Delete Client
// @route DELETE /api/client/:id
// @access Private
const deleteClient = asyncHandler(async (req,res) => {
    const client = await Client.findById(req.params.id)

    if(!client){
        res.status(400)
        throw new Error('Client Not Found')
    }

    await candidat.remove()

    res.status(200).json({message: `delete Candidat ${req.params.id}` })
})

// @desc get client by id
// @route POST /api/client/getbyid
// @access Private
const getclientbyid = asyncHandler(async (req,res) =>{
    try {
        const clientid = await Client.findById(req.body.ide)
        res.status(200).json(clientid)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports = {
    addClient,
    getClients,
    updateClient,
    deleteClient,
    getclientbyid
}