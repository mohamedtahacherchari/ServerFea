const asyncHandler = require('express-async-handler')
const Sadaqa = require('../../models/sadaqa/SadaqaModel');

const getSadaqaById = asyncHandler(async (req, res) => {
    const sadaqa = await   Sadaqa.findById({_id:req.params.id, user: req.user.id
    })
    if (sadaqa) {
      res.json(sadaqa)
    } else {
      res.status(404)
      throw new Error('sadaqa not found')
    }
  })


  module.exports= {
   
    getSadaqaById,

  
  }