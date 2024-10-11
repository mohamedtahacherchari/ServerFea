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
     items:[{product :String ,qte :String, prix :String, tva:String, unite: String, montant :String ,date2: String, montantHT:String, titre:String, remise:String,montantPoucent :String,montantHTPourcent:String,remisePourcent:String }],
    num: {
      type: String,
      //required: true,
    },
    cond: {
      type: String,
      //required: true,
    },
    echa: {
      type: String,
    // echa: true,
    },
    enga: {
      type: String,
      //required: true,
    },
    service: {
      type: String,
      //required: true,
    },
    ref: {
        type: String,
        //required: true,
      },
      ordre: {
        type: String,
        //required: true,
      },
      communication : {
        type: String,
        //required: true,
      },  
      items2: [{title : String, }],
      items3: [{champ: String, }],
      items4: [{sous: String, }],
      message: {
        type: String,
        //required: true,
      },
      note: {
        type: String,
        //required: true,
      },
      date1: {
        type: String,
        //required: true,
      },
      date3: {
        type: String,
        //required: true,
      },
      titredoc: {
        type: String,
        //required: true,
      },
      remiseParLignePourcent : {
        type: String,
        //required: true,
      },
      showqte: {
        type: Boolean,
        //required: true,
      },
      showDate: {
        type: Boolean,
        //required: true,
      },
    subTotal2: {
       type: Number,
        //required: true,
    },
      subTotal: {
        type: Number,
        //required: true,
      },
      showunite: {
        type: Boolean,
        //required: true,
      },
      showprix: {
        type: Boolean,
        //required: true,
      },
      showMontant: {
        type: Boolean,
        //required: true,
      },
      showMontantHT: {
        type: Boolean,
        //required: true,
      },
      shownum: {
        type: Boolean,
        //required: true,
      },
      showTva: {
        type: Boolean,
        //required: true,
      },
      showCode : {
        type: Boolean,
        //required: true,
      },
      showRefContrat: {
        type: Boolean,
        //required: true,
      },
      ordreAchat: {
        type: Boolean,
        //required: true,
      },
      inputValue: {
        type: String,
        //required: true,
      },
      inputValue2: {
        type: String,
        //required: true,
      },
      inputValue3: {
        type: String,
        //required: true,
      },
      selectedOption: {
        type: String,
        //required: true,
      },
      showRemise: {
        type: Boolean,
        //required: true,
      },
      showRemiseLigne: {
        type: Boolean,
        //required: true,
      },
      remisetotal: {
        type: String,
        //required: true,
      },
      remisetotal2: {
        type: String,
        //required: true,
      },
      showMontantPourcent: {
        type: Boolean,
        //required: true,
      },
      showMontantHTPourcent: {
        type: Boolean,
        //required: true,
      },
      showDeviseTab: {
        type: Boolean,
        //required: true,
      },
      showPourcentageTab: {
        type: Boolean,
        //required: true,
      },
   
      showTotalHT: {
        type: String,
        //required: true,
      },
      showTotalHTPourcent: {
        type: Boolean,
        //required: true,
      },
      showSommePourcent: {
        type: Boolean,
        //required: true,
      },
      showSommeDevise: {
        type: Boolean,
        //required: true,
      },
      email: {
        type: String,
        //required: true,
      },
      adresse: {
        type: String,
        //required: true,
      },

      codePostale: {
        type: String,
        //required: true,
      },

      nomDevis: {
        type: String,
        //required: true,
      },

      totalRemise: {
        type: String,
        //required: true,
      },
      totalRemise2: {
        type: String,
        //required: true,
      },
      showTotalHT_Tab: {
        type: Boolean,
        //required: true,
      },
      showTotalHTPourcent_Tab: {
        type: Boolean,
        //required: true,
      },
      showMontantOriginale: {
        type: Boolean,
        //required: true,
      },
      showResumeFacture: {
        type: Boolean,
        //required: true,
      },
      showMontantOriginaleHT: {
        type: Boolean,
        //required: true,
      },
      showResumeFacture2: {
        type: Boolean,
        //required: true,
      },

      Acompte1: {
        type: String,
        //required: true,
      },
      Acompte: {
        type: String,
        //required: true,
      },
      Acompte2: {
        type: String,
        //required: true,
      },
      Acompte3: {
        type: String,
        //required: true,
      },
      Acompte4: {
        type: String,
        //required: true,
      },
      showAcompte: {
        type: Boolean,
        //required: true,
      },
      showAcomptePourcent_Tab: {
        type: Boolean,
        //required: true,
      },
      showAcomptePourcent_Total: {
        type: Boolean,
        //required: true,
      },
      showDeviseTotal: {
        type: Boolean,
        //required: true,
      },
      showPourcentageTotal: {
        type: Boolean,
        //required: true,
      },
      showAcompteDevise_Total: {
        type: Boolean,
        //required: true,
      },

      saveDevise : {
        type: String,
        //required: true,
      },
      total : {
        type: Number,
        //required: true,
      },
      montrerHT : {
        type: Boolean,
        //required: true,
      },
      showSansRemise : {
        type: Boolean,
        //required: true,
      },
      showSansRemise : {
        type: Boolean,
        //required: true,
      },
      showResumeFactureDevise : {
        type: Boolean,
        //required: true,
      },

      showResumeFacturePourcent : {
        type: Boolean,
        //required: true,
      },
      totalHorsTva : {
        type: String,
        //required: true,
      },
      pdfTitle: {
        type: String,
      },
      pdfData: {
        type: Buffer, // Stockez le contenu du fichier PDF sous forme de Buffer
      },


  },
  {
    timestamps: true,
  }
)

//module.exports = mongoose.model('Clientf', clientfSchema)
const Devis = mongoose.model("Devis", devisModel);

module.exports = Devis;