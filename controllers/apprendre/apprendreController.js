
const asyncHandler = require('express-async-handler')
const Apprendre = require('../../models/apprendre/ApprendreModel');

const getApprendreById = asyncHandler(async (req, res) => {
    const apprendre = await   Apprendre.findById({_id:req.params.id, user: req.user.id
    })
    if (apprendre) {
      res.json(apprendre)
    } else {
      res.status(404)
      throw new Error('apprendre not found')
    }
  })


  module.exports= {
   
    getApprendreById,

  
  }