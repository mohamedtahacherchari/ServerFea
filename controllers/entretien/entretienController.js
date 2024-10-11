const asyncHandler = require('express-async-handler')
const Entretien = require('../../models/entretien/EntretienModel');

const getEntretienById = asyncHandler(async (req, res) => {
    const entretien = await   Entretien.findById({_id:req.params.id, user: req.user.id
    })
    if (entretien) {
      res.json(entretien)
    } else {
      res.status(404)
      throw new Error('entretien not found')
    }
  })


  module.exports= {
   
    getEntretienById,

  
  }