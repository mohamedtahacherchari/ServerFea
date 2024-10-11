const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')

const {
    createClientf, 
    getClientf,
    deleteClientf,
    getClientfById,
    updateClientf,
    getClientAdmin,
    
} = require('../../controllers/servant/clientfControllers')

router.route('/ClientAdmin').get(auth,authAdmin,getClientAdmin)
router.route('/').get(auth, getClientf)
router.route('/addclientf').post(auth,createClientf)
router.route('/:id').delete(auth,deleteClientf)
router.route('/:id').put(auth,updateClientf)
router.route('/:id').get(auth,getClientfById)





//router.route('/getbyid/').patch(auth, getcandidatbyid)
//router.route('/sendmail').post(auth, sendmailTocandidat)

//router.route('/sendmaillocaux').post(sendmaillocaux)
//router.route('/sendmailvisio').post(sendmailvisio)
//router.route('/sendmailvisio2').post(sendmailvisio2)
//router.route('/sendmaildescriptiondeposte').post(sendmaildescriptiondeposte)
//router.route('/sendmaildescriptiondeposte2').post(sendmaildescriptiondeposte2)

//router.route('/senddynamictxtmail').post(auth, senddynamictxtmailTocandidat)

module.exports = router