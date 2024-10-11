const asyncHandler = require('express-async-handler')
const Voyage = require('../../models/voyage/voyageModel');

const getVoyageById = asyncHandler(async (req, res) => {
    const voyage = await   Voyage.findById({_id:req.params.id, user: req.user.id
    })
    if (voyage) {
      res.json(voyage)
    } else {
      res.status(404)
      throw new Error('voyage not found')
    }
  })


  module.exports= {
   
    getVoyageById,

  
  }