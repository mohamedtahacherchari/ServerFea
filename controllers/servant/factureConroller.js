const asyncHandler = require('express-async-handler')
//const Product = require('../../models/Zervant/produitModel')
const Facture = require('../../models/Zervant/factureModel');
const Clientf = require('../../models/Zervant/clientfModel');
const expressAsyncHandler = require('express-async-handler');
const senddynamictxtMail = require('./mail/senddynamictxtMail');
const senddynamictxtMail2 = require('./mail/senddynamictxtMail2');
const senddynamictxtMail3 = require('./mail/senddynamictxtMail3');
const senddynamictxtMail4 = require('./mail/senddynamictxtMail4');
const senddynamictxtMail5 = require('./mail/senddynamictxtMail5');






// @desc    Fetch all factures
// @route   GET /api/facture
// @access  Public

const getFacture= asyncHandler(async (req, res) => {
  try{

    const factures = await Facture.find({user: req.user.id}).populate("user", "firstName lastName");

    res.status(200).json(factures)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  } })
/*const getFacture = asyncHandler(async (req, res) => {
  try {
    let factures;
    if (req.user.role === 1) {
      // user is admin, return all factures
      factures = await Facture.find({});
    } else {
      // user is not admin, return factures associated with the user
      factures = await Facture.find({ user: req.user.id });
    }
    res.status(200).json(req.user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});*/
// @desc    Fetch all factures
// @route   GET /api/facture
// @access  Private/Admin
const getFactureAdmin= asyncHandler(async (req, res) => {
  try{

    const factures = await Facture.find().populate("user", "firstName lastName");

    res.status(200).json(factures)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
})


// @desc    Fetch single facture
// @route   GET /api/facture/:id
// @access  Public
const getFactureById = asyncHandler(async (req, res) => {
  const facture = await Facture.findById({_id:req.params.id, user: req.user.id
  })
  if (facture) {
    res.json(facture)
  } else {
    res.status(404)
    throw new Error('Facturess not found')
  }
})


// @desc    Fetch single facture
// @route   GET /api/facture/:id
// @access  Private/Admin
const getFactureByIdAdmin = asyncHandler(async (req, res) => {
  const facture = await Facture.findById(req.params.id)

  if (facture) {
    if (req.user.isAdmin || facture.user.toString() === req.user._id.toString()) {
      res.json(facture)
    } else {
      res.status(401)
      throw new Error('Not authorized to access this facture')
    }
  } else {
    res.status(404)
    throw new Error('Facture not found')
  }
})




// @desc    Delete a facture
// @route   DELETE /api/factures/:id
// @access  Private/Admin
const deleteFacture = asyncHandler(async (req, res) => {
  const facture = await Facture.findById({_id:req.params.id, user: req.user.id})

  if (facture) {
    await facture.remove()
    res.json({ message: 'facture removed'})
  } else {
    res.status(404)
    throw new Error('Facture not found')
  }
})

// @desc    Create a facture
// @route   POST /api/facture
// @access  Private/Admin



const createFacture = asyncHandler(async (req, res) => {
  const facture = new Facture({
     user: req.user.id, 
    // clientf : req.params.id,
     num: "Greenlinks Invoice",
     cond: "Greenlinks Invoice",
     echa:"Greenlinks Invoice",
     enga: "Greenlinks Invoice",
     service: "Greenlinks Invoice",
     ref:"Greenlinks Invoice", 
     ordre: "Greenlinks Invoice",
     communication :"Greenlinks Invoice" ,
     //qte : "0" ,
    // unite:"hello",
    // prix : "0",
   //  tva: "0",
     //montant : "0",
    // title: "hello" ,
    // champText : "hello",
     message : "Greenlinks Invoice",
     //soustotal:"hello",
     note : "Greenlinks Invoice",
    // items 
    })

  const createdFacture = await facture.save()
  res.status(201).json(createdFacture)
})


// @desc    Update a facture
// @route   PUT /api/facture/:id
// @access  Private/Admin
const updateFacture = asyncHandler(async (req, res) => {
  const {
    clientf ,
   // product,
    num ,
    cond,
    echa ,
    enga,
    service,
    ref, 
    ordre,
    communication,
    //qte  ,
    //unite ,
    //prix ,
   // tva ,
   // montant ,
    items3 ,
    items2 ,
    items4,
   // champText ,
    total,
    message ,
    subTotal2,
    subTotal,
    //subTotal4,
    note ,
    date1,
   // date2,
 //  soustotal,
    items,
    titredoc,
    showqte,
    showDate,
    showunite,
    showprix,
    showMontant,
    showMontantHT,
    shownum,
    showTva,
    showCode,
    showRefContrat,
    ordreAchat,
   // paiement,
    inputValue,
    inputValue2,
    inputValue3,
    selectedOption,
    showRemise,
    showRemiseLigne,
    remisetotal,
    remisetotal2,
    showMontantPourcent,
    showMontantHTPourcent,
    showDeviseTab,
    showPourcentageTab,
    showTotalHT,
    showTotalHTPourcent,
    showSommePourcent,
    showSommeDevise,
    remiseParLignePourcent,
    totalRemise,
    totalRemise2,
    showTotalHT_Tab,
    showTotalHTPourcent_Tab,
    showResumeFacture,
    showResumeFacture2,
    Acompte1,
    Acompte2,
    Acompte3,
    Acompte4,
    Acompte,
    showAcompte,
    showMontantOriginale,
    showMontantOriginaleHT,
    showAcomptePourcent_Tab,
    showAcomptePourcent_Total,
    showAcompteDevise_Total,
    montrerHT,
    showDeviseTotal,
    saveDevise,
    showPourcentageTotal,
    showSansRemise,
    showResumeFactureDevise,
    showResumeFacturePourcent,
    showAcompteDevise_Tab,
    email,
    adresse,
    codePostale,
    totalHorsTva,
    nomFacture,
    acompteEnDevise,
    totalHT,
  }
    

   = req.body

  const facture = await Facture.findById(req.params.id)

  if (facture)
   {
    facture.clientf = clientf,
    //facture.product = product,
    facture.num = num,
    facture.cond= cond,
    facture.echa = echa,
    facture.enga= enga,
    facture.total= total,
    facture.service=service,
    facture.ref=ref, 
    facture.ordre= ordre,
    facture.communication=communication,
    facture.remiseParLignePourcent=remiseParLignePourcent,
    //facture.qte= qte  ,
  //  facture.unite=unite,
   // facture.prix =prix ,
    //facture.tva = tva ,
    //facture.montant= montant ,
//  facture.soustotal= soustotal,
    //facture.titre= titre ,
    //facture.champText =champText ,
    facture.message = message ,
    facture.note = note ,
    //facture.selectedOption2=selectedOption2.value,
    facture.date1=date1,
    facture.subTotal2=subTotal2,
    facture.subTotal=subTotal,
   // facture.subTotal4=subTotal4,
 // facture.date2=date2,
    facture.items=items,
    facture.items2=items2,
    facture.items3=items3,
    facture.items4=items4,
    facture.titredoc=titredoc,
    facture.showqte=showqte,
    facture.showDate=showDate,
    facture.showunite=showunite,
    facture.showprix=showprix,
    facture.showMontant=showMontant,
    facture.showMontantHT=showMontantHT,
    facture.shownum=shownum,
    facture.showTva=showTva,
    facture.showCode= showCode,
    facture.showRefContrat=showRefContrat,
    facture.ordreAchat=ordreAchat,
    //facture.paiement=paiement,
    //facture.paiement2=paiement2,
    facture.inputValue=inputValue,
    facture.inputValue2=inputValue2,
    facture.inputValue3=inputValue3,
    facture.selectedOption=selectedOption,
    facture.showRemise= showRemise,
    facture.showRemiseLigne= showRemiseLigne,
    facture.showMontantPourcent=showMontantPourcent,
    facture.showMontantHTPourcent=showMontantHTPourcent,
    facture.remisetotal=remisetotal,
    facture.remisetotal2=remisetotal2,
    facture.showDeviseTab=showDeviseTab,
    facture.showPourcentageTab=showPourcentageTab,
    facture.showTotalHT=showTotalHT,
    facture.showTotalHTPourcent= showTotalHTPourcent,
    facture.showSommeDevise = showSommeDevise,
    facture.showSommePourcent =showSommePourcent,
    facture.totalRemise =totalRemise,
    facture.showTotalHT_Tab =showTotalHT_Tab,
    facture.totalRemise2 =totalRemise2,
    facture.showMontantOriginale = showMontantOriginale ,
    facture.showMontantOriginaleHT = showMontantOriginaleHT ,
    facture.total= total,
    facture.Acompte1= Acompte1,
    facture.Acompte2= Acompte2,
    facture.Acompte3= Acompte3,
    facture.Acompte4= Acompte4,
    facture.Acompte= Acompte,
    facture.showResumeFacture= showResumeFacture,
    facture.showResumeFacture2= showResumeFacture2,
    facture.showAcompte= showAcompte,
    facture.showAcomptePourcent_Tab=showAcomptePourcent_Tab,
    facture.showAcompteDevise_Total=showAcompteDevise_Total,
    facture.showAcomptePourcent_Total=showAcomptePourcent_Total,
    facture.saveDevise=saveDevise,
    facture.showTotalHTPourcent_Tab = showTotalHTPourcent_Tab,
    facture.montrerHT = montrerHT,
    facture.showDeviseTotal =showDeviseTotal,
    facture.showPourcentageTotal=showPourcentageTotal,
    facture.showSansRemise=showSansRemise,
    facture.showResumeFactureDevise=showResumeFactureDevise,
    facture.showResumeFacturePourcent=showResumeFacturePourcent,
    facture.showAcompteDevise_Tab=showAcompteDevise_Tab,
    facture.email=email,
    facture.adresse =adresse,
    facture.codePostale=codePostale,
    facture.totalHorsTva= totalHorsTva,
    facture.nomFacture=nomFacture,
    facture.acompteEnDevise=acompteEnDevise,
    facture.totalHT=totalHT
    const updatedFacture = await facture.save();

     res.json(updatedFacture)
   // res.status(400).json({clientf})

  } else {
    res.status(404)
    throw new Error('Facture not found')
  }

})



 // let num = facture.num
  //let date1= facture.date1
  //let echa = facture.echa
  //senddynamictxtMail3(num,date1,echa)

//res.status(200).json({ message: ` ${req.body.candidatsend.length}` })

//res.status(200).json({ message: 'Email sent succefully' })

// } catch (err) {
//   return res.status(500).json({msg: err.message})
// }
//})


// @desc    Fech lastTotal 
// @route   DELETE /api/factures/last-total
// @access  Private/Admin
  
const fechLastTotal = asyncHandler(async (req, res) => {
  const facture = await Facture.findById({_id:req.params.id,user: req.user.id})
  if (facture) {
    res.json({ last_total: facture.total });
  } else {
    res.status(404).json({ message: 'Facture not found' });
  }
});

const sendMailwithoutDelivery = asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body ;
  const facture = await Facture.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = facture.num
         let date1 = facture.date1
         let echa = facture.echa
         let email = facture.email
         let totalHT =facture.totalHT
         let total =facture.total
         let items = facture.items
         let Acompte = facture.Acompte
         let adresse = facture.adresse
         let codePostale = facture.codePostale
         let totalHorsTva = facture.totalHorsTva
         let nomFacture = facture.nomFacture
         senddynamictxtMail(email,num,date1,echa,facture,total,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryTotalInPercentage
= asyncHandler(async (req, res) => {

  try {
  const pdfData = req.body ;
  const facture = await Facture.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = facture.num
         let date1 = facture.date1
         let echa = facture.echa
         let email = facture.email
         let totalHT =facture.totalHT
         let subTotal =facture.subTotal
         let items = facture.items
         let Acompte = facture.Acompte
         let adresse = facture.adresse
         let codePostale = facture.codePostale
         let totalHorsTva = facture.totalHorsTva
         let nomFacture = facture.nomFacture
         let remisetotal = facture.remisetotal
         let total = facture.total
        // console.log(pdfData)
         senddynamictxtMail2(email,num,date1,echa,facture,totalHorsTva,total,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryTotalInDevise
= asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body;
  const facture = await Facture.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = facture.num
         let date1 = facture.date1
         let echa = facture.echa
         let email = facture.email
         let totalHT =facture.totalHT
         let subTotal =facture.subTotal
         let items = facture.items
         let Acompte = facture.Acompte
         let adresse = facture.adresse
         let codePostale = facture.codePostale
         let totalHorsTva = facture.totalHorsTva
         let nomFacture = facture.nomFacture
         let total = facture.total
         let remisetotal2 = facture.remisetotal2
         senddynamictxtMail3(email,num,date1,echa,facture,total,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryParLigneInPercentage
= asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body;
  const facture = await Facture.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = facture.num
         let date1 = facture.date1
         let echa = facture.echa
         let email = facture.email
         let totalHT =facture.totalHT
         let subTotal =facture.subTotal
         let items = facture.items
         let Acompte = facture.Acompte
         let adresse = facture.adresse
         let codePostale = facture.codePostale
         let totalHorsTva = facture.totalHorsTva
         let nomFacture = facture.nomFacture
         let total = facture.total
         let remiseParLignePourcent = facture.remiseParLignePourcent
         let remisePourcent = facture.remisePourcent
         senddynamictxtMail4(email,num,date1,echa,facture,total,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryParLigneInDevise
= asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body;
  const facture = await Facture.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = facture.num
         let date1 = facture.date1
         let echa = facture.echa
         let email = facture.email
         let totalHT =facture.totalHT
         let subTotal =facture.subTotal
         let items = facture.items
         let Acompte = facture.Acompte
         let adresse = facture.adresse
         let codePostale = facture.codePostale
         let totalHorsTva = facture.totalHorsTva
         let nomFacture = facture.nomFacture
         let total = facture.total
         let remiseParLignePourcent = facture.remiseParLignePourcent
         let remise = facture.remise
         let totalRemise = facture.totalRemise
         senddynamictxtMail5(email,num,date1,echa,facture,total,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})

module.exports= {
  updateFacture,
  getFacture,
  getFactureAdmin,
  getFactureById,
  deleteFacture,
  createFacture,
  fechLastTotal,
  sendMailwithoutDelivery,
  sendMailwithDeliveryTotalInPercentage,
  sendMailwithDeliveryTotalInDevise,
  sendMailwithDeliveryParLigneInPercentage,
  sendMailwithDeliveryParLigneInDevise

}