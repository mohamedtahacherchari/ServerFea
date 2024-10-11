
const asyncHandler = require('express-async-handler')
const Audiovisuel = require('../../models/audiovisuel/AudiovisuelModel');

const getAudiovisuelById = asyncHandler(async (req, res) => {
    const audiovisuel = await   Audiovisuel.findById({_id:req.params.id, user: req.user.id
    })
    if (audiovisuel) {
      res.json(audiovisuel)
    } else {
      res.status(404)
      throw new Error('audiovisuel not found')
    }
  })


  module.exports= {
   
    getAudiovisuelById,

  
  }