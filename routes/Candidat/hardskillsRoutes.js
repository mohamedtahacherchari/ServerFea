const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')

const {
    addHardSkills,
    deleteHardSkills,
    getAllHardSkills,
    getoneHardSkills,
    updateHardSkills
} = require('../../controllers/Candidat/hardskillController')

router.route('/').get(getAllHardSkills).post(addHardSkills)

router.route('/:id').delete(deleteHardSkills).put(updateHardSkills).get(getoneHardSkills)

module.exports = router