const asyncHandler = require('express-async-handler')
const Product = require('../../models/Zervant/produitModel')

// @desc    Fetch all product
// @route   GET /api/product
// @access  Public
const getProduct= asyncHandler(async (req, res) => {
  try{

    const products = await Product.find({user: req.user.id}).populate("user", "firstName lastName");

    res.status(200).json(products)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
   

})

// @desc    Fetch all products
// @route   GET /api/facture
// @access  Private/Admin
const getProductAdmin= asyncHandler(async (req, res) => {
  try{

    const products = await Product.find().populate("user", "firstName lastName");

    res.status(200).json(products)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
})

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById({_id:req.params.id,user: req.user.id})

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById({_id:req.params.id, user: req.user.id})

  if (product) {
    await product.remove()
    res.json({ message: 'product removed'})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/product
// @access  Private/Admin



const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user.id,
    name : 'prof',
    note : 'prof',
    unite : 'prof',
    baseprix : '5',
    HTprix : '44',
    TVA: 'prof',
    TTCprix : 'prof',
    category :'category'

  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name ,
    note ,
    unite,
    baseprix,
    HTprix ,
    TVA,
    TTCprix ,
    category,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name,
    product.note = note,
    product.unite= unite,
    product.baseprix= baseprix,
    product.HTprix = HTprix,
    product.TVA = TVA,
    product.category = category,
    product.TTCprix = TTCprix


    const updatedProduct = await product.save()
    res.json(updatedProduct)
    res.status(400).json({name})

  } else {
    res.status(404)
    throw new Error('Product not found')
  }

})



module.exports= {
  updateProduct,
  getProduct,
  getProductById,
  deleteProduct,
  createProduct,
  getProductAdmin,

}