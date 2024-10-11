const nodemailer = require('nodemailer')
const {google} = require('googleapis');
const Devis = require('../../../models/Zervant/devisModel');
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
const sendEmail = (to,num,date1,date3,devis,pdfData,txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })
  // Convertir l'objet en JSON
  const pdfDataJson = JSON.stringify(pdfData);
  
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
            <title>Devis</title>
            <style>
            
                body {
                    font-family: 'Nunito', sans-serif;
                    margin: 0;
                    padding: 0;
                }
             
            .container {
              display: flex;
                    flex-direction: column;
                    align-items: center;
        
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
                    text-align: center;
                    margin-right: 0;
        
                }
              
                table {
                    margin : 20px 0;
                    width: 100%;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #ddd;
                }
                .summary {
                    text-align: center;
                }
           
            
             
                /*Invoice.module.css*/  
          .but ,.but2 {
            display: inline-block;
                    padding: 7px 20px;
                    font-size: 16px;
                    text-align: center;
                    text-decoration: none;
                    border: 0;
                    border-radius: 100px;
                    color: green;
                    cursor: pointer;
          }
          .custom-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        
        .custom-column {
            width: 49%;
        }

          @media screen and (min-width: 768px) {
                    .container {
                        flex-direction: row;
                    }
        
                    
        
                    .invoice-details {
                        margin-right: 0;
                    }
        
                    table {
                        margin: 50px 0;
                    }
        
                    .but:hover, .but2:hover {
                        transform: scale(1.05) rotate(-1deg);
                    }
        
                    .but2:hover::before {
                        content: "Enregistez les modifications avant de les imprimer!!";
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


                    .custom-wrapper {
                        flex-direction: column;
                    }
                    
                    .custom-column {
                        width: 100%;
                    }
                }
          
        
          
        
            </style>
        </head>
        
        <body>
         
            <div class="custom-wrapper">
            <div class="custom-column">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="">
                                <tr>
                                    <td>
                                        <img src="https://res.cloudinary.com/dcdei4osp/image/upload/v1692609330/green-links-logo-simplifie_mljnej.png" alt="logo" width="250" style="display: block;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        111 rue Anselme Rondenay 94400 Vitry-sur-Seine France
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        +33 (0) 1 88 32 77 68
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        contact@greenlinks.fr
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        www.greenlinks.fr
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="custom-column">
            <table>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>
                                DEVIS-${num}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Date d'estimation: ${date1}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Valable jusqu'au: ${date3}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            </table>
            </div>
            </div>

                    <div>
                    <div>${devis.nomDevis}</div>
                    <div>${devis.clientf}</div>
                    <div>${devis.adresse}</div>
                    <div>${devis.codePostale}</div>
                    </div>
                    <table>
                      <tbody>
                          <td>Devise :</td>
                         
                          <td> <div style="margin-right : 350px;">${devis.saveDevise}<div>
                          </td>
                      </tbody>
                  </table>
             <table>
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Date</th>
                        <th>Quantité</th>
                        <th>Unité</th>
                        <th>Prix</th>
                        <th>Remise %</th>
                        <th>TVA%</th>
                        <th>Montant HT</th>
                        <th>Montant</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${devis.items.map((itemField, index) => (
                        `<tr key="${index}">
                            <td>${itemField.product}</td>
                            <td>${itemField.date2} </td>
                            <td>${itemField.qte}</td>
                            <td>${itemField.unite}</td>
                            <td>${itemField.prix}</td>
                            <td>${itemField.remisePourcent}</td>
                            <td>${itemField.tva}</td>
                            <td>${(itemField.qte * itemField.prix * (1 - itemField.remisePourcent/ 100)).toFixed(2)}</td>
                            <td>${((itemField.qte * itemField.prix) * (1 - itemField.remisePourcent / 100) + (itemField.qte * itemField.prix) * itemField.tva / 100).toFixed(2)}</td>
                        </tr>`
                    )).join('')}
                </tbody>
                </table>
                <table>
                <tbody>
                <td>Somme de remise en devise :</td>
                <td><div style="margin-right :400px ;">${devis.remiseParLignePourcent}</div></td>
                </tbody>
                </table>
                
        
                <div style="margin-top: 50px;">
                <div>Résumé de devi</div>
                <table>
                    <thead>
                        <tr>
                            <th>Total HT</th>
                            <th>Remise</th>
                            <th>Total dû</th>
                          
                        </tr>
                        </thead>
        
                    <tbody>
                  <td>${devis.totalHorsTva}</td>
                  <td>${devis.remiseParLignePourcent}</td>
                  <td>${devis.total}</td>
                </tbody>
                </table>
              </div>
                
                <p>Signature du client</p>
                 <p>(Signé et accepté)</p>   
        </form>
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
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) {
          console.error(err);
          // Vous pouvez ajouter un traitement d'erreur ici si nécessaire.
      } else {
          console.log('E-mail sent:', info.response);
      }
  });
}

module.exports = sendEmail