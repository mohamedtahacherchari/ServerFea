
const asyncHandler = require('express-async-handler')
//const Product = require('../../models/Zervant/produitModel')
const Event = require('../../models/event/EventModel');
// @desc    Fetch single facture
// @route   GET /api/facture/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById({_id:req.params.id, user: req.user.id
    })
    if (event) {
      res.json(event)
    } else {
      res.status(404)
      throw new Error('Facturess not found')
    }
  })


  module.exports= {
   
    getEventById,

  
  }