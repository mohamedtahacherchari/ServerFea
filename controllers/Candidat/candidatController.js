const asyncHandler = require('express-async-handler')
const Candidat = require('../../models/Candidat/candidatModel')
const sendMail = require('./mail/firstMailModel/sendmail')
const senddynamicMail = require('./mail/firstMailModel/sendDynamicMail')
const senddynamictxtMail = require('./mail/firstMailModel/sendDynamictext')
const senddynamictxtMail2 = require('./mail/firstMailModel/sendDynamictext2')
const senddynamictxtMail3 = require('./mail/firstMailModel/sendDynamictext3')
const senddynamictxtMail4 = require('./mail/firstMailModel/sendDynamictext4')
const senddynamictxtMail5 = require('./mail/firstMailModel/sendDynamictext5')
const senddynamictxtMail6 = require('./mail/firstMailModel/sendDynamictext6')


// @desc Get Candidats 
// @route GET /api/candidats
// @access Private
const getCandidats = asyncHandler(async (req,res) => {
    try {
                                //{ user: req.user.id }
        const candidats = await Candidat.find()//.lean().populate()
        res.status(200).json(candidats)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc Add Candidats
// @route POST /api/candidats
// @access Private
const addCandidat = asyncHandler(async (req,res) => {

    const {FirstName, LastName, Email, Phone_Number, Position, Contract, Status, Ville, State, Cv, hardskill, softskill} = req.body

    //confirm data
    if( !FirstName || !LastName || !Email || 
        !Phone_Number || !Position || !Contract || 
        !Status || !Ville || !Cv || 
        !Array.isArray(hardskill) || !Array.isArray(softskill) ||
        !hardskill.length || !softskill.length )
    {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check for duplicate email 
    const duplicate = await Candidat.findOne({Email}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: 'Duplicate Email'})
    }

    const candidatObject = {FirstName, LastName, Email, Phone_Number, Position, Contract, Status, Ville, State, Cv, hardskill, softskill}
    
    const candidat = Candidat.create(candidatObject)

    if (candidat){
        res.status(201).json({ message: `New user ${Email} created` })
    }else{
        res.status(400).json({ message: 'Invalid candidat data received' })
    }

})

// @desc get Candidats by id
// @route POST /api/candidat/getbyid
// @access Private
const getcandidatbyid = asyncHandler(async (req,res) =>{
    try {
        const candidatid = await Candidat.findById(req.body.ide)
        res.status(200).json(candidatid)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// @desc get Candidats by id
// @route POST /api/candidat/getbyid
// @access Private
const sendmailTocandidat = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.selectedCandidatIds.length
        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.selectedCandidatIds[i])
            let email = candidatid.Email
            let firstname = candidatid.FirstName
            let lastname = candidatid.LastName
            let jobposition = candidatid.Position
            sendMail(email, firstname, lastname, jobposition)
        }
        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const senddynamicmailTocandidat = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.selectedCandidatIds.length
        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.selectedCandidatIds[i])
            let email = candidatid.Email
            senddynamicMail(email)
        }
        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
/***ceci   05  12  2022 */
const senddynamictxtmailTocandidat = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
        let emailsubject = req.body.emailsubject
         let emailbody= req.body.emailbody
        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            senddynamictxtMail(email,emailsubject,emailbody)
        }
        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

/*work of Taha*/
const sendmaillocaux = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
        let date = req.body.date
        let nomClient = req.body.nomClient
        let heur = req.body.heur
        let personne = req.body.personne 
        let lieu = req.body.lieu
        let poste = req.body.poste

        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            let FirstName= candidatid.FirstName
            let LastName = candidatid.LastName
            senddynamictxtMail(email,FirstName,LastName,poste,date,nomClient, heur, personne, lieu)
        } 
        //res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


const sendmailvisio = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
        let date = req.body.date
        let poste = req.body.poste

        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            let FirstName= candidatid.FirstName
            let LastName = candidatid.LastName
            senddynamictxtMail2(email,FirstName,LastName,poste,date)
        } 
        //res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


const sendmaildescriptiondeposte = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
      //  let date = req.body.date
         let poste = req.body.poste

        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            let FirstName= candidatid.FirstName
            let LastName = candidatid.LastName
            senddynamictxtMail3(email,FirstName,LastName,poste)
        } 
        //res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const sendmaillocaux2 = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
        let date = req.body.date
        let nomClient = req.body.nomClient
        let heur = req.body.heur
        let personne = req.body.personne 
        let lieu = req.body.lieu
        let poste = req.body.poste

        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            let FirstName= candidatid.FirstName
            let LastName = candidatid.LastName
            senddynamictxtMail4(email,FirstName,LastName,poste,date,nomClient, heur, personne, lieu)
        } 
        //res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const sendmailvisio2 = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
        let date = req.body.date
        let poste = req.body.poste

        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            let FirstName= candidatid.FirstName
            let LastName = candidatid.LastName
            senddynamictxtMail5(email,FirstName,LastName,poste,date)
        } 
        //res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})



const sendmaildescriptiondeposte2 = asyncHandler(async (req,res) =>{
    try {
        let l = req.body.candidatsend.length
      //  let date = req.body.date
         let poste = req.body.poste

        
        for(let i=0 ; i<l; i++){
            const candidatid = await Candidat.findById(req.body.candidatsend[i])
            let email = candidatid.Email
            let FirstName= candidatid.FirstName
            let LastName = candidatid.LastName
            senddynamictxtMail6(email,FirstName,LastName,poste)
        } 
        //res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

        res.status(200).json({ message: 'Email sent succefully' })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})





module.exports = {
    getCandidats,
    addCandidat,
    getcandidatbyid,
    sendmailTocandidat,
    senddynamicmailTocandidat,
    senddynamictxtmailTocandidat,
    sendmaillocaux,
    sendmailvisio,
    sendmaillocaux2,
    sendmailvisio2,
    sendmaildescriptiondeposte,
    sendmaildescriptiondeposte2
}