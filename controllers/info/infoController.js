
const asyncHandler = require('express-async-handler')
//const Product = require('../../models/Zervant/produitModel')
const Info = require('../../models/info/InfoModel');
// @desc    Fetch single facture
// @route   GET /api/facture/:id
// @access  Public
const getInfoById = asyncHandler(async (req, res) => {
    const info = await Info.findById({_id:req.params.id, user: req.user.id
    })
    if (info) {
      res.json(info)
    } else {
      res.status(404)
      throw new Error('info not found')
    }
  })


  module.exports= {
   
    getInfoById,

  
  }