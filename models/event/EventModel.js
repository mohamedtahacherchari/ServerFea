const moment = require("moment");
const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
    title: {type: String, required: [true, "Please write a title for your event"]},
    start: {
     type: Date,
     required: [true, "Please Insert The Start of your event" ],
     min: [new Date(), "can't be before now!!"],
    },
    end: {
     type: Date,
     //setting a min function to accept any date one hour ahead of start
     min: [function(){
       const date = new Date(this.start)
       const validDate = new Date(date.setHours(date.getHours()+1)) 
       return validDate
     },"Event End must be at least one hour a head of event time"],
    default: function(){
      const date = new Date(this.start)
      return date.setDate(date.getDate()+1)
    },
    },
    describe: { type: String},
    type: { type: String},
    youtubeLink: { type: String },
    imageUrl: { type: String },
    pdfUrl: { type: String },
    googleDriveVideoUrl: { type: String },
     selectedClients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'  // Now properly referencing Users
    }]
})


module.exports = mongoose.model("Event", EventSchema)