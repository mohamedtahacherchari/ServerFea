const asyncHandler = require('express-async-handler')
const Sante = require('../../models/sante/SanteModel');

const getSanteById = asyncHandler(async (req, res) => {
    const sante = await   Sante.findById({_id:req.params.id, user: req.user.id
    })
    if (sante) {
      res.json(sante)
    } else {
      res.status(404)
      throw new Error('sante not found')
    }
  })


  module.exports= {
   
    getSanteById,

  
  }