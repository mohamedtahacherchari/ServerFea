
const asyncHandler = require('express-async-handler')
const Education = require('../../models/education/EducationModel');

const getEducationById = asyncHandler(async (req, res) => {
    const education = await   Education.findById({_id:req.params.id, user: req.user.id
    })
    if (education) {
      res.json(education)
    } else {
      res.status(404)
      throw new Error('education not found')
    }
  })


  module.exports= {
   
    getEducationById,

  
  }