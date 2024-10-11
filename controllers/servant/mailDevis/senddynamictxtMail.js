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
const sendEmail = (to,num,date1,date3,devis,saveDevise,subTotal,pdfData,txt) => {
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
        subject:  txt ? txt : txt ='Devis'  , 
        html:
        `
        <html>
        <head>
            <meta charset="UTF-8">

            <title>Devis</title>
   
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

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
            font-family: 'Nunito' ,sans-serif;
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
            font-family: 'Nunito',sans-serif;
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
            font-family: 'Nunito',sans-serif;
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
              DEVIS-${num}</div>
            <div class="small"
              style="text-shadow:2px 2px 5px grey ; ">
              Date d'estimation : ${date1}</div>
            <div class="small"
              style="text-shadow: 2px 2px 5px grey; ">
              Valable jusqu'au  : ${date3}</div>
          </div>
        </div>
      </div>
          
              
          <div style="margin-top :50px">
          <div style="font-size: 12px">${devis.nomDevis}</div>
          <div style="font-size: 12px">${devis.clientf}</div>
          <div style="font-size: 12px">${devis.adresse}</div>
          <div style="font-size: 12px">${devis.codePostale}</div>
          </div>
                <div>
                  <table syle="width:50px;">
                    <thead>
                        <tr>
                            <th>Devise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>${saveDevise}</td>
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
                    ${devis.items.map((itemField, index) => (
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
                
        
                <div style="margin-top: 50px;">
                <div>Résumé de la devis</div>
                <table>
                    <thead>
                        <tr>
                            <th>Total HT</th>
                            <th>Total dû</th>
                        </tr>
                        </thead>
        
                    <tbody>
        
                    <td>${devis.totalHorsTva}</td>
                    <!-- Start of invoice items loop --
                          ${devis.items && devis.items.map((itemField, index) => {
                                  return`
                                    
                                          <td>${itemField.tva}</td>
                                       
                                  `;
                              }).join('')}>
                  
                    End of invoice items loop --> 
<td>${subTotal.toFixed(2)}</td>
                </tbody>
                </table>
              </div>
                </div>
                  </div>      
                
        </form>
        <p style="margin-left:40px">Signature du client</p>
        <p style="margin-left:40px">(Signé et accepté)</p>
         </div>
                </body>
               
               
                </html>  
        `,

        attachments: [
          {
            filename: 'mon_Devis.pdf', // Name for the attachment
            content: pdfDataJson, //The big problem hhhh
             encoding: 'base64',

          },
        ],
    }
 console.log(pdfData)
    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail