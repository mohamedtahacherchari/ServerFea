const mongoose =require ('mongoose')

const productModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    name: {
      type: String,
      //required: true,
    },
    note: {
      type: String,
      //required: true,
    },
    unite: {
      type: String,
     required: true,
    },
    baseprix: {
      type: String,
      //required: true,
    },
    HTprix: {
      type: String,
      //required: true,
    },
    TVA: {
        type: String,
        //required: true,
      },
      TTCprix: {
        type: String,
        //required: true,
      },
      Surname: {
        type: String,
        //required: true,
      },
      category: {
        type: String,
        //required: true,
      },
  },
  {
    timestamps: true,
  }
)

//module.exports = mongoose.model('Clientf', clientfSchema)
const Product = mongoose.model("Product", productModel);

module.exports = Product;

