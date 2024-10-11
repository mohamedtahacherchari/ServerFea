const mongoose =require ('mongoose')

const clientfModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    Typeclient: {
      type: String,
      //required: true,
      
    },
    Refclient: {
      type: String,
      //required: true,
    },
    Company: {
      type: String,
      required: true,
    },
    NumberSiret: {
      type: String,
      //required: true,
    },
    VATnumber: {
      type: String,
      required: true,
    },
    Title: {
        type: String,
        //required: true,
      },
      Firstname: {
        type: String,
        //required: true,
      },
      Surname: {
        type: String,
        //required: true,
      },
      Email: {
        type: String,
        required: true,
      },
      Phone: {
        type: String,
        //required: true,
      },
      Portable: {
        type: String,
        required: true,
      },
      Addrees: {
        type: String,
        //required: true,
      },
      Codepostal: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
     PaymentTerms: {
        type: String,
        required: true,
      },
      Address: {
        type: String,
        required: true,
      },
 
  },
  {
    timestamps: true,
  }
)

//module.exports = mongoose.model('Clientf', clientfSchema)
const Clientf = mongoose.model("Clientf", clientfModel);

module.exports = Clientf;

