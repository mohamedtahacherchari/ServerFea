
const asyncHandler = require('express-async-handler')
const Entraide = require('../../models/Entraide/EntraideModel');

const getEntraideById = asyncHandler(async (req, res) => {
    const entraide = await   Entraide.findById({_id:req.params.id, user: req.user.id
    })
    if (entraide) {
      res.json(entraide)
    } else {
      res.status(404)
      throw new Error('entraide not found')
    }
  })


  module.exports= {
   
    getEntraideById,

  
  }