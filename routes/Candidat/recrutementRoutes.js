const router = require('express').Router()
const userController = require('../../controllers/userController')
const auth = require("../../middleware/auth")
const {
    addrecrutements,
    deleterecrutements,
    getRecrutement,
    updaterecrutements,
    getrecrutementsbyid
} = require('../../controllers/Candidat/recrutementCandidatController')

router.route('/').post(auth, addrecrutements).get(auth, getRecrutement)
router.route('/:id').delete(auth, deleterecrutements).patch(auth, updaterecrutements)
router.route('/:id').get(auth, getrecrutementsbyid)

module.exports = router