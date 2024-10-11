const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const {
    createFacture, 
    getFacture,
    deleteFacture,
    getFactureById,
    updateFacture,
    fechLastTotal,
    getFactureAdmin,
    sendMailwithoutDelivery,
    sendMailwithDeliveryTotalInPercentage,
    sendMailwithDeliveryTotalInDevise,
    sendMailwithDeliveryParLigneInPercentage,
    sendMailwithDeliveryParLigneInDevise,
    
    
} = require('../../controllers/servant/factureConroller')



router.route('/FactureAdmin').get(auth,authAdmin,getFactureAdmin)
router.route('/').get(auth,getFacture)
router.route('/:id').get(auth,getFactureById)
//router.route('/:id/addfacture').post(auth,createFacture)
router.route('/addfacture').post(auth,createFacture)
router.route('/sendMailwithoutDelivery/:id').post(auth,sendMailwithoutDelivery)
router.route('/sendMailwithDeliveryTotalInPercentage/:id').post(auth,sendMailwithDeliveryTotalInPercentage)
router.route('/sendMailwithDeliveryTotalInDevise/:id').post(auth,sendMailwithDeliveryTotalInDevise)
router.route('/sendMailwithDeliveryParLigneInPercentage/:id').post(auth,sendMailwithDeliveryParLigneInPercentage)
router.route('/sendMailwithDeliveryParLigneInDevise/:id').post(auth,sendMailwithDeliveryParLigneInDevise)
//router.route('/:id/last-total').get(auth,fechLastTotal)
router.route('/:id').delete(auth,deleteFacture)
router.route('/:id').put(auth,updateFacture)








//router.route('/getbyid/').patch(auth, getcandidatbyid)
//router.route('/sendmail').post(auth, sendmailTocandidat)

//router.route('/sendmaillocaux').post(sendmaillocaux)
//router.route('/sendmailvisio').post(sendmailvisio)
//router.route('/sendmailvisio2').post(sendmailvisio2)
//router.route('/sendmaildescriptiondeposte').post(sendmaildescriptiondeposte)
//router.route('/sendmaildescriptiondeposte2').post(sendmaildescriptiondeposte2)

//router.route('/senddynamictxtmail').post(auth, senddynamictxtmailTocandidat)

module.exports = router