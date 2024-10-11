const router = require('express').Router()
const auth = require('../../middleware/auth')
//const authAdmin = require('../../middleware/authAdmin')

const {
    getrecrutementstepbyid
} = require('../controllers/recrutementstepsController')

router.route('/getbyid/').patch(auth, getrecrutementstepbyid)

module.exports = router