const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')

const {
    sendmaillocaux,
    getCandidats,
    addCandidat,
    getcandidatbyid,
    sendmailTocandidat,
    senddynamictxtmailTocandidat,
    sendmailvisio,
    sendmaildescriptiondeposte,
    sendmaillocaux2,
    sendmailvisio2,
    sendmaildescriptiondeposte2
} = require('../../controllers/Candidat/candidatController')


router.route('/').get(auth, getCandidats).post(auth, addCandidat)
router.route('/getbyid/').patch(auth, getcandidatbyid)
//router.route('/sendmail').post(auth, sendmailTocandidat)
router.route('/sendmaillocaux2').post(sendmaillocaux2)
router.route('/sendmaillocaux').post(sendmaillocaux)
router.route('/sendmailvisio').post(sendmailvisio)
router.route('/sendmailvisio2').post(sendmailvisio2)
router.route('/sendmaildescriptiondeposte').post(sendmaildescriptiondeposte)
router.route('/sendmaildescriptiondeposte2').post(sendmaildescriptiondeposte2)

router.route('/senddynamictxtmail').post(auth, senddynamictxtmailTocandidat)

module.exports = router