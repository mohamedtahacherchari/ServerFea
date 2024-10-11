const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'
//const styles  = require('./Invoice.module.css')

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = (to,num,date1,echa,facture,totalHorsTva,total,pdfData,txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })
       // Convertir l'objet en JSON
       const pdfDataJson = JSON.stringify(pdfData);
       console.log(pdfData)
    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject:  txt ? txt : txt = 'Facture' , 
        html:
        `
        <html>
        <head>
            <title>Facture</title>
            <style>
            .column {
                flex-basis: 50%;
              }
                body {
                    font-family: 'Nunito', sans-serif;
                }
             
            .container {
             display: flex;
           align-items: flex-start;
         justify-content: space-between;


      }
              
                p {
                    font-size: 10px;
                }
                h1 {
                    width: 250px;
                    height: 50px;
                    margin-left: 50px;
                    margin-top: 200px;
                }
                .invoice-details {
                    margin-top: 0px;
                }
                .invoice-details h6 {
                    margin-left: 10px;
                    text-shadow: 2px 2px 5px grey;
                    font-size: 20px;
                    margin-top: 10px;
                }
                .invoice-details h6.small {
                    font-size: 15px;
                }
                table {
                    margin-top: 50px;
                    margin-right: 400px;
                    width: 930px;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #ddd;
                }
                .summary {
                    margin-left: 50px;
                    margin-top: 50px;
                }
                .summary .summary-item {
                    display: flex;
                }
                .summary .summary-item p {
                    margin-right: 10px;
                }
                .summary .summary-item h4 {
                    color: grey;
                    font-size: 18px;
                    line-height: 8px;
                }
                .payment-details {
                    margin-bottom: 20px;
                }
                .payment-details h1 {
                    margin-left: 100px;
                }
                button.print-button {
                    color: green;
                }  
                /*Invoice.module.css*/
        
                
        
        
        
          
          .invoiceSummary div {
            border-bottom: 1px solid rgb(231, 231, 231);
            font-family: 'Nunito', sans-serif;
            text-align: left;
            margin-left: 50%;
            font-size: 15px;
            display: flex;
            color: gray;
          }
          
          .summary {
            background-color: rgb(247, 247, 247);
            font-weight: 500;
            padding: 15px 0px;
            padding-left: 15px;
          }
          
          .summaryItem {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .summaryItem p, h4 {
            padding: 15px;
          }
          
          .summaryItem input {
            font-family: 'Nunito', sans-serif;
            font-size: 15px;
            border: none;
            outline: none;
            text-align: right;
          }
          
        
          .summaryItem span {
            text-align: left;
          }
         
        
        
          .but {
            background-color: #c2fbd7;
            border-radius: 100px;
            box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
            color: green;
            cursor: pointer;
            display: inline-block;
            font-family: 'Nunito', sans-serif;
            padding: 7px 20px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 16px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            position: relative;
          }
          
          .but:hover {
            box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
            transform: scale(1.05) rotate(-1deg);
          }
        
          .but2 {
            background-color: #c2fbd7;
            border-radius: 100px;
            box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
            color: green;
            cursor: pointer;
            display: inline-block;
            font-family: 'Nunito', sans-serif;
            padding: 7px 20px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 16px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            position: relative;
          }
          
          .but2:hover{
            box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
            transform: scale(1.05) rotate(-1deg);
          }
        
        
          .but2:hover::before {
            content: "Enregistez les modification avant de les imprimer!!";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #000;
            color: #fff;
            padding: 5px;
            border-radius: 5px;
            font-size: 14px;
          }
          
          
          
          
          
          
          
        
          @media print {
            /* Masquer le bouton d'impression */
            .print-button {
              display: none;
            }
          }
        
        
          @media screen and (max-width: 768px) {
                /* Styles spécifiques pour les écrans de taille inférieure à 768px */
            }
            
            @media screen and (min-width: 769px) {
                /* Styles spécifiques pour les écrans de taille supérieure ou égale à 769px */
            }
          
        
          
        
            </style>
        </head>
        
        <body>
        <div class="container" style='Nunito', sans-serif;">
        <form onSubmit={submitHandler} style="margin-left: 40px;">
        <div class="container">
        <div class="column">
          <img src="https://res.cloudinary.com/dcdei4osp/image/upload/v1692609330/green-links-logo-simplifie_mljnej.png" alt="logo"
             style="width :20% ; height : 30%"/>
          <div style="font-size: 10px;">111 rue Anselme Rondenay 94400 Vitry-sur-Seine France</div>
          <div style="font-size: 10px;">+33 (0) 1 88 32 77 68</div>
          <div style="font-size: 10px;">contact@greenlinks.fr</div>
          <div style="font-size: 10px;">www.greenlinks.fr</div>
        </div>
        <div class="column">
          <div class="invoice-details"  style = "margin-right: 600px; width:300px ">
            <div
              style="text-shadow: 2px 2px 5px grey; ">
              FACTURE-${num}</div>
            <div class="small"
              style="text-shadow:2px 2px 5px grey ; ">
              Date d'estimation : ${date1}</div>
            <div class="small"
              style="text-shadow: 2px 2px 5px grey; ">
              Valable jusqu'au  : ${echa}</div>
          </div>
        </div>
      </div>
          
          
              
                    <div style="margin-top :50px">
                    <div style="font-size: 12px">${facture.nomFacture}</div>
                    <div style="font-size: 12px">${facture.clientf}</div>
                    <div style="font-size: 12px">${facture.adresse}</div>
                    <div style="font-size: 12px">${facture.codePostale}</div>
                    </div>
                <div>
                  <table syle="width:50px;">
                    <thead>
                        <tr>
                            <th>Devise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>${facture.saveDevise}</td>
                    </tbody>
                    </div>
                  <div class="tb-container" style="margin-top: 50px; margin-right: 400px; width: 930px;">
             <table class="table" aria-label="simple table">
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Date</th>
                        <th>Quantité</th>
                        <th>Unité</th>
                        <th>Prix</th>
                        <th>TVA%</th>
                        <th>Montant HT</th>
                        <th>Montant</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${facture.items.map((itemField, index) => (
                        `<tr key="${index}" style="width: 600px;">
                            <td style="width: 20%">
                                <div name="product">${itemField.product}</div>
                            </td>
                            <td type="text" style="margin-left: 5px; width: 100px;" >
                               <div name="date2">${itemField.date2}</div> 
                            </td>
                            <td type="number" style="margin-left: 5px; width: 100px;"  value="" placeholder="0">
                              <div name="qte">${itemField.qte}</div>  
                            </td>
                            <td style="margin-right: 200px;">${itemField.unite}</td>
                            <td type="text" style="margin-left: 5px; width: 100px;" name="prix" value="">
                                ${itemField.prix}
                            </td>
                            <td style="margin-right: 200px;">${itemField.tva}</td>
                            <td type="text" style="margin-left: 5px; width: 100px;" name="montantHT" value="" >
                                ${itemField.qte * itemField.prix}
                            </td>
                            <td type="text" style="margin-left: 5px; width: 100px;" name="montant" value="">
                                ${(itemField.qte * itemField.prix) + (itemField.qte * itemField.prix) * itemField.tva / 100}
                            </td>
                        </tr>`
                    )).join('')}
                </tbody>
                </table>
                <table>
                <tbody>
                <td><div style="font-size : 14px; margin-left :400px">Remise</div></td>
                <td><div style="font-size : 14px ; margin-right :400px">${facture.remisetotal}%</div></td>
                </table>
                
        
                <div style="margin-top: 50px;">
                <div>Résumé de la facture</div>
                <table>
                    <thead>
                        <tr>
                            <th>Total HT</th>
                            <th>Remise</th>
                            <th>Total dû</th>
                            <th>Acompte</th>
                            <th>Dû le</th>
                            <th>Total dû après acompte</th>
                        </tr>
                        </thead>
        
                    <tbody>
                  <td>${facture.totalHorsTva}</td>
                <!-- Start of invoice items loop --
                      ${facture.items && facture.items.map((itemField, index) => {
                              return`
                                
                                      <td>${itemField.tva}</td>
                                   
                              `;
                          }).join('')}>
              
                End of invoice items loop --> 
                  <td>${facture.remisetotal}</td>
                  <td>${facture.total}</td>
                  
                  <td>${facture.Acompte} équivalent à
                    ${facture.Acompte && facture.Acompte.slice ? (total - (total - (total * (facture.Acompte.slice(0, -1) / 100)))).toFixed(2) : ""}
                  </td>
                  <td>${date1}</td>
                  <td>${facture.Acompte && facture.Acompte.slice ? (total - (total * (facture.Acompte.slice(0, -1) / 100))).toFixed(2) : ""}
                  
                  Payé le ${echa}</td>
                </tbody>
                </table>
              </div>
              
                </div>
                </div>
                <table>
                    <tbody>
                        <td><div style="margin-left:40px">Détails de paiement:</div></td>
                        <td>
                            <div style="margin-top:40px;">
                                <div style="margin-right: 1050 px;">Bank: Example Bank</div>
                                <div style="margin-right: 1050 px;">SWIFT/BIC: EXAMPL33XXX</div>
                                <div style="margin-right: 1050 px;">IBAN: GB26 MIDL 4005 1512 3456 74</div>
                            </div>
                        </td>
                    </tbody>
                </table>
                
            <table>
                    <tbody>
                        <td><div style="margin-left:40px">Modalités de paiement:</div></td>
                        <td>
                            <div style="margin-right: 200px; margin-bottom: 0px;">${facture.cond} jours</div>
                        </td>
                    </tbody>
                </table> 
                           
            <table>
            <tbody>
                <td><div style="margin-left:40px">Note:</div></td>
                <td>
                    <div style="margin-left: 200px; margin-bottom: 0px;">${facture.note} jours</div>
                </td>
            </tbody>
        </table> 
        </form>
         </div>
                </body>
               
               
                </html>  
        `,

        attachments: [
          {
            filename: 'mon_Facture.pdf', // Name for the attachment
            content: pdfDataJson, //The big problem hhhh
             encoding: 'base64',

          },] ,
    }
   // console.log(pdfDataJson)

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail