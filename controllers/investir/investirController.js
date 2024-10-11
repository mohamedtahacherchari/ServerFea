
const asyncHandler = require('express-async-handler')
const Investir = require('../../models/investir/InvestirModel');

const getInvestirById = asyncHandler(async (req, res) => {
    const investir = await   Investir.findById({_id:req.params.id, user: req.user.id
    })
    if (investir) {
      res.json(investir)
    } else {
      res.status(404)
      throw new Error('investissement not found')
    }
  })


  module.exports= {
   
    getInvestirById,

  
  }