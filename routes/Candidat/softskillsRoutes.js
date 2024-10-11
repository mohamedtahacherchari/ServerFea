const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')

const {
    addSoftSkills,
    deleteSoftSkills,
    getAllSoftSkills,
    getSoftSkills,
    updateSoftSkills
} = require('../../controllers/Candidat/softskillController')

router.route('/').get(getAllSoftSkills).post(addSoftSkills)

router.route('/:id').delete(deleteSoftSkills).put(updateSoftSkills).get(getSoftSkills)

module.exports = router