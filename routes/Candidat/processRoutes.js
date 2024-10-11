const router = require('express').Router()
const auth = require('../../middleware/auth')

const {
    addprocess,
    getprocess,
    deleteprocess,
    getprocessbyid
} = require('../../controllers/Candidat/processController')

router.route('/').get(auth, getprocess).post(auth, addprocess)
router.route('/:id').delete(auth, deleteprocess)

router.route('/getbyid/:id').get(auth, getprocessbyid)

module.exports = router