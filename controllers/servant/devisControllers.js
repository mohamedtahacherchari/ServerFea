const asyncHandler = require('express-async-handler')
//const Product = require('../../models/Zervant/produitModel')
const Devis = require('../../models/Zervant/devisModel')
const senddynamictxtMail = require('./mailDevis/senddynamictxtMail');
const senddynamictxtMail2 = require('./mailDevis/senddynamictxtMail2');
const senddynamictxtMail3 = require('./mailDevis/senddynamictxtMail3');
const senddynamictxtMail4 = require('./mailDevis/senddynamictxtMail4');
const senddynamictxtMail5 = require('./mailDevis/senddynamictxtMail5');
const sendPdfMail1 = require('./mailDevis/sendPdfMail1');

// @desc    Fetch all devis
// @route   GET /api/devis
// @access  Public
const getDevis= asyncHandler(async (req, res) => {
  try{

    const devis = await Devis.find({user: req.user.id}).populate("user", "firstName lastName");

    res.status(200).json(devis)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
   

})



const getDevisAdmin = asyncHandler(async (req, res) => {
  try{

    const devis = await Devis.find().populate("user", "firstName lastName");

    res.status(200).json(devis)
   }
    catch(err){
   return res.status(500).json({msg: err.message})
  }
   

})

// @desc    Fetch single devis
// @route   GET /api/devis/:id
// @access  Public
const getDevisById = asyncHandler(async (req, res) => {
  const devis = await Devis.findById({_id:req.params.id,user: req.user.id})

  if (devis) {
    res.json(devis)
  } else {
    res.status(404)
    throw new Error('Devis not found')
  }
})

// @desc    Delete a devis
// @route   DELETE /api/devis/:id
// @access  Private/Admin
const deleteDevis = asyncHandler(async (req, res) => {
  const devis = await Devis.findById({_id:req.params.id, user: req.user.id})

  if (devis) {
    await devis.remove()
    res.json({ message: 'devis removed'})
  } else {
    res.status(404)
    throw new Error('Devis not found')
  }
})

// @desc    Create a devis
// @route   POST /api/devis
// @access  Private/Admin



const createDevis = asyncHandler(async (req, res) => {
  const devis = new Devis({
    user: req.user.id,
    num: "hello",
     cond: "hello",
     echa:"hello",
     enga: "hello",
     service: "hello",
     ref:"hello", 
     ordre: "hello",
     communication :"hello" ,
     //qte : "0" ,
    // unite:"hello",
    // prix : "0",
   //  tva: "0",
     //montant : "0",
    // title: "hello" ,
    // champText : "hello",
     message : "hello",
     //soustotal:"hello",
     note : "hello",
    // items:"hello"
    })

  const createdDevis = await devis.save()
  res.status(201).json(createdDevis)
})


// @desc    Update a devis
// @route   PUT /api/devis/:id
// @access  Private/Admin
const updateDevis = asyncHandler(async (req, res) => {
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
     note ,
     date1,
     date3,
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
     email,
     adresse,
     codePostale,
     showAcompte,
     showMontantOriginaleHT,
     showMontantOriginale,
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
     totalHorsTva,
     nomDevis,
  }
    

   = req.body

  const devis = await Devis.findById(req.params.id)

  if (devis)
   {
    devis.clientf = clientf,
    //devis.product = product,
    devis.num = num,
    devis.cond= cond,
    devis.echa = echa,
    devis.enga= enga,
    devis.total= total,
    devis.service=service,
    devis.ref=ref, 
    devis.ordre= ordre,
    devis.communication=communication,
    devis.remiseParLignePourcent=remiseParLignePourcent,
    //devis.qte= qte  ,
  //  devis.unite=unite,
   // devis.prix =prix ,
    //devis.tva = tva ,
    //devis.montant= montant ,
//  devis.soustotal= soustotal,
    //devis.titre= titre ,
    //devis.champText =champText ,
    devis.message = message ,
    devis.note = note ,
    //devis.selectedOption2=selectedOption2.value,
    devis.date1=date1,
    devis.date3=date3,

    devis.subTotal2=subTotal2,
    devis.subTotal = subTotal,

    // devis.date2=date2,
    devis.items=items,
    devis.items2=items2,
    devis.items3=items3,
    devis.items4=items4,
    devis.titredoc=titredoc,
    devis.showqte=showqte,
    devis.showDate=showDate,
    devis.showunite=showunite,
    devis.showprix=showprix,
    devis.showMontant=showMontant,
    devis.showMontantHT=showMontantHT,
    devis.shownum=shownum,
    devis.showTva=showTva,
    devis.showCode= showCode,
    devis.showRefContrat=showRefContrat,
    devis.ordreAchat=ordreAchat,
    //devis.paiement=paiement,
    //devis.paiement2=paiement2,
    devis.inputValue=inputValue,
    devis.inputValue2=inputValue2,
    devis.inputValue3=inputValue3,
    devis.selectedOption=selectedOption,
    devis.showRemise= showRemise,
    devis.showRemiseLigne= showRemiseLigne,
    devis.showMontantPourcent=showMontantPourcent,
    devis.showMontantHTPourcent=showMontantHTPourcent,
    devis.remisetotal=remisetotal,
    devis.remisetotal2=remisetotal2,
    devis.showDeviseTab=showDeviseTab,
    devis.showPourcentageTab=showPourcentageTab,
    devis.showTotalHT=showTotalHT,
    devis.showTotalHTPourcent= showTotalHTPourcent,
    devis.showSommeDevise = showSommeDevise,
    devis.showSommePourcent =showSommePourcent,
    devis.totalRemise =totalRemise,
    devis.showTotalHT_Tab =showTotalHT_Tab,
    devis.totalRemise2 =totalRemise2,
    devis.showMontantOriginale = showMontantOriginale ,
    devis.total= total,
    devis.Acompte1= Acompte1,
    devis.Acompte2= Acompte2,
    devis.Acompte3= Acompte3,
    devis.Acompte4= Acompte4,
    devis.Acompte= Acompte,
    devis.showResumeFacture= showResumeFacture,
    devis.showResumeFacture2= showResumeFacture2,
    devis.showAcompte= showAcompte,
    devis.showAcomptePourcent_Tab=showAcomptePourcent_Tab,
    devis.showAcompteDevise_Total=showAcompteDevise_Total,
    devis.showAcomptePourcent_Total=showAcomptePourcent_Total,
    devis.saveDevise=saveDevise,
    devis.showTotalHTPourcent_Tab = showTotalHTPourcent_Tab,
    devis.montrerHT = montrerHT,
    devis.showDeviseTotal =showDeviseTotal,
    devis.showMontantOriginaleHT = showMontantOriginaleHT ,
    devis.showPourcentageTotal=showPourcentageTotal,
    devis.showSansRemise=showSansRemise,
    devis.showResumeFactureDevise=showResumeFactureDevise,
    devis.showResumeFacturePourcent=showResumeFacturePourcent,
    devis.nomDevis= nomDevis,
    devis.email=email,
    devis.adresse =adresse,
    devis.codePostale=codePostale,
    devis.totalHorsTva =totalHorsTva
    const updatedDevis = await devis.save();

     res.json(updatedDevis)
   // res.status(400).json({clientf})

  } else {
    res.status(404)
    throw new Error('Devis not found')
  }

})


const sendMailwithoutDelivery = asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body;
  const devis = await Devis.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
        // let adresse = devis.adresse
         let email = devis.email
         let num = devis.num
         let date1 = devis.date1
         let date3 = devis.date3
         let saveDevise = devis.saveDevise
         let subTotal = devis.subTotal

         senddynamictxtMail(email,num,date1,date3,devis,saveDevise,subTotal,pdfData)

         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryTotalInPercentage
= asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body;

  const devis = await Devis.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = devis.num
         let date1 = devis.date1
         let date3= devis.date3
         let email = devis.email
         let saveDevise = devis.saveDevise
         let subTotal = devis.subTotal
         let remisetotal = devis.remisetotal
         senddynamictxtMail2(email,num,date1,date3,devis,saveDevise,remisetotal,subTotal,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryTotalInDevise = asyncHandler(async (req, res) => {
try {

  const pdfData = req.body;

const devis = await Devis.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num = devis.num
         let date1 = devis.date1
         let date3 = devis.date3
         let email = devis.email
         senddynamictxtMail3(email,num,date1,date3,devis,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryParLigneInPercentage
= asyncHandler(async (req, res) => {

  try {
    const pdfData = req.body;
  const devis = await Devis.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
         let num   = devis.num
         let date1 = devis.date1
         let date3 = devis.date3
         let email = devis.email
     
         senddynamictxtMail4(email,num,date1,date3,devis,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})


const sendMailwithDeliveryParLigneInDevise
= asyncHandler(async (req, res) => {

  try {
     //console.log(req.body)
        const pdfData = req.body;

        const devis = await Devis.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
     
         let num = devis.num
         let date1 = devis.date1
         let date3 = devis.date3
         let email = devis.email

         senddynamictxtMail5(email,num,date1,date3,devis,pdfData)
         res.status(200).json({ message: 'Email sent succefully' })
  } catch (err) {
    return res.status(500).json({msg: err.message})
}
 
})

/*const sendEmailWithAttachment = async (req, res) => {
  try {
    const devis = await Devis.findById({_id:req.params.id,user:req.user.id}).populate("user", "firstName");
    let email = devis.email
    const pdfData = req.body;
    await sendPdfMail1(email,pdfData); // Attendre la fin de l'opération asynchrone

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send the email.' });
  }
};*/



module.exports= {
  updateDevis,
  getDevis,
  getDevisById,
  deleteDevis,
  createDevis,
  getDevisAdmin,
  sendMailwithoutDelivery,
  sendMailwithDeliveryTotalInPercentage,
  sendMailwithDeliveryTotalInDevise,
  sendMailwithDeliveryParLigneInPercentage,
  sendMailwithDeliveryParLigneInDevise
 // sendEmailWithAttachment

}