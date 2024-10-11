const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')

const {
    createDevis, 
    getDevis,
    deleteDevis,
    getDevisById,
    updateDevis,
    getDevisAdmin,
    sendMailwithoutDelivery,
    sendMailwithDeliveryTotalInPercentage,
    sendMailwithDeliveryTotalInDevise,
    sendMailwithDeliveryParLigneInPercentage,
    sendMailwithDeliveryParLigneInDevise,
    sendEmailWithAttachment,

    
} = require('../../controllers/servant/devisControllers')

router.route('/DevisAdmin').get(auth,authAdmin,getDevisAdmin)
router.route('/').get(auth, getDevis)
router.route('/:id').get(auth,getDevisById)
router.route('/adddevis').post(auth,createDevis)
router.route('/:id').delete(auth,deleteDevis)
router.route('/:id').put(auth,updateDevis)
//router.route('/upload').get(sendEmailWithAttachment)
router.route('/sendMailwithoutDelivery/:id').post(auth,sendMailwithoutDelivery)
router.route('/sendMailwithDeliveryTotalInPercentage/:id').post(auth,sendMailwithDeliveryTotalInPercentage)
router.route('/sendMailwithDeliveryTotalInDevise/:id').post(auth,sendMailwithDeliveryTotalInDevise)
router.route('/sendMailwithDeliveryParLigneInPercentage/:id').post(auth,sendMailwithDeliveryParLigneInPercentage)
router.route('/sendMailwithDeliveryParLigneInDevise/:id').post(auth,sendMailwithDeliveryParLigneInDevise)






//router.route('/getbyid/').patch(auth, getcandidatbyid)
//router.route('/sendmail').post(auth, sendmailTocandidat)

//router.route('/sendmaillocaux').post(sendmaillocaux)
//router.route('/sendmailvisio').post(sendmailvisio)
//router.route('/sendmailvisio2').post(sendmailvisio2)
//router.route('/sendmaildescriptiondeposte').post(sendmaildescriptiondeposte)
//router.route('/sendmaildescriptiondeposte2').post(sendmaildescriptiondeposte2)

//router.route('/senddynamictxtmail').post(auth, senddynamictxtmailTocandidat)

module.exports = router