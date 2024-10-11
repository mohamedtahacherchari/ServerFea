const asyncHandler = require('express-async-handler')
const Clientf = require('../../models/Zervant/clientfModel')

// @desc    Fetch all clientf
// @route   GET /api/clientf
// @access  Public
const getClientf = asyncHandler(async (req, res) => {
  try{

    const clientfs = await Clientf.find({user: req.user.id}).populate("user", "firstName lastName");

    res.status(200).json(clientfs)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
   

})

// @desc    Fetch all factures
// @route   GET /api/facture
// @access  Private/Admin
const getClientAdmin= asyncHandler(async (req, res) => {
  try{

    const clients = await Clientf.find().populate("user", "firstName lastName");

    res.status(200).json(clients)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
})
// @desc    Fetch single clientf
// @route   GET /api/clientf/:id
// @access  Public
const getClientfById = asyncHandler(async (req, res) => {
  const clientf = await Clientf.findById({_id:req.params.id,user: req.user.id})

  if (clientf) {
    res.json(clientf)
  } else {
    res.status(404)
    throw new Error('Clientfs not found')
  }
})

// @desc    Delete a clientf
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteClientf = asyncHandler(async (req, res) => {
  const clientf = await Clientf.findById({_id:req.params.id, user: req.user.id})

  if (clientf) {
    await clientf.remove()
    res.json({ message: 'Clientf removed'})
  } else {
    res.status(404)
    throw new Error('Clientf not found')
  }
})

// @desc    Create a clientf
// @route   POST /api/clientf
// @access  Private/Admin



const createClientf = asyncHandler(async (req, res) => {
  const clientf = new Clientf({
    user: req.user.id,
    Typeclient: 'prof',
    Refclient : 'prof',
    Company : 'prof',
    NumberSiret: '5',
    VATnumber : '44',
    Title : 'prof',
    Firstname : 'prof',
    Surname : 'prof',
    Email : 'prof',
    Phone : 'prof',
    Portable: 'prof',
    Addrees: 'prof',
    Codepostal : 'prof',
    City : 'prof',
    PaymentTerms:'prof',
    Address :'Address'
  })

  const createdClientf = await clientf.save()
  res.status(201).json(createdClientf)
})
const createClientf2 = asyncHandler(async (req, res) => {
  const clientf = await Clientf({
    Typeclient: req.body.selectedOption.label,
    Refclient : req.body.Refclient,
    Company : req.body.Company,
    NumberSiret: req.body.NumberSiret,
    VATnumber : req.body.VATnumber,
    Title : req.body.Title,
    Firstname : req.body.Firstname,
    Surname : req.body.Surname,
    Email : req.body.Email,
    Phone : req.body.Phone,
    Portable: req.body.Portable,
    Addrees: req.body.Addrees,
    Codepostal : req.body.Codepostal,
    City : req.body.City,
    PaymentTerms: req.body.selectedOption2.label,
  })

  const createdClientf = await clientf.save()
  res.status(201).json(createdClientf)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateClientf = asyncHandler(async (req, res) => {
  const {
    Typeclient,
    Refclient ,
    Company ,
    NumberSiret ,
    VATnumber ,
    Title ,
    Firstname ,
    Surname ,
    Email ,
    Phone ,
    Portable,
    Addrees,
    Codepostal ,
    City ,
    PaymentTerms,
    Address,
  } = req.body

  const clientf = await Clientf.findById(req.params.id)

  if (clientf) {
    clientf.Typeclient = Typeclient,
    clientf.Refclient = Refclient,   
    clientf.Company= Company,
    clientf.NumberSiret= NumberSiret ,
    clientf.VATnumber = VATnumber,
    clientf.Title = Title,
    clientf.Firstname = Firstname,
    clientf.Surname = Surname ,
    clientf.Email = Email ,
    clientf.Phone = Phone ,
    clientf.Portable =Portable,
    clientf.Addrees = Addrees,
    clientf.Codepostal = Codepostal ,
    clientf.City = City,
    clientf.PaymentTerms = PaymentTerms,
    clientf.Address = Address
    const updatedClientf = await clientf.save()
    res.json(updatedClientf)
    // res.status(400).json({selectedOption})
  

    
  } else {
    res.status(404)
    throw new Error('Clientf not found')
  }

})



 

module.exports= {
  updateClientf,
  getClientf,
  getClientfById,
  deleteClientf,
  createClientf,
  getClientAdmin,
}