const router = require('express').Router()
const userController = require('../../controllers/userController')
const auth = require("../../middleware/auth")
const authAdmin = require("../../middleware/authAdmin")
const {
    addClient,
    deleteClient,
    getClients,
    updateClient,
    getclientbyid
} = require("../controllers/clientController")

router.route('/').get(auth, getClients).post(auth, addClient)

router.route('/:id').delete(auth, deleteClient).put(auth, updateClient)
router.route('/getbyid/').patch(auth, getclientbyid)

module.exports = router