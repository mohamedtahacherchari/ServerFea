const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')

const {
    createProduct, 
    getProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    getProductAdmin,
    
} = require('../../controllers/servant/productControllers')

router.route('/ProductAdmin').get(auth,authAdmin,getProductAdmin)
router.route('/').get(auth, getProduct)
router.route('/addproduct').post(auth,createProduct)
router.route('/:id').delete(auth,deleteProduct)
router.route('/:id').put(auth,updateProduct)
router.route('/:id').get(auth,getProductById)





//router.route('/getbyid/').patch(auth, getcandidatbyid)
//router.route('/sendmail').post(auth, sendmailTocandidat)

//router.route('/sendmaillocaux').post(sendmaillocaux)
//router.route('/sendmailvisio').post(sendmailvisio)
//router.route('/sendmailvisio2').post(sendmailvisio2)
//router.route('/sendmaildescriptiondeposte').post(sendmaildescriptiondeposte)
//router.route('/sendmaildescriptiondeposte2').post(sendmaildescriptiondeposte2)

//router.route('/senddynamictxtmail').post(auth, senddynamictxtmailTocandidat)

module.exports = router