
const asyncHandler = require('express-async-handler')
const Permaculture = require('../../models/permaculture/PermacultureModel');

const getPermacultureById = asyncHandler(async (req, res) => {
    const permaculture = await   Permaculture.findById({_id:req.params.id, user: req.user.id
    })
    if (permaculture) {
      res.json(permaculture)
    } else {
      res.status(404)
      throw new Error('Permaculture not found')
    }
  })


  module.exports= {
   
    getPermacultureById,

  
  }