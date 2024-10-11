const mongoose =require ('mongoose')

const devisModel = mongoose.Schema(
  {


    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },

    clientf: {
     type : String ,
    },
    product: {
      type : String ,
     },
    }
)

//module.exports = mongoose.model('Clientf', clientfSchema)
const Devis = mongoose.model("Devis", devisModel);

module.exports = Devis;