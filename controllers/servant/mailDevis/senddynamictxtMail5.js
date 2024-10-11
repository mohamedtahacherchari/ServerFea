const nodemailer = require('nodemailer')
const {google} = require('googleapis');
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

// Convertir le JSON en base64
//const pdfDataBase64 = btoa(pdfDataJson);
  //console.log(pdfDataBase64)
 //const pdfData2 = fs.readFileSync(pdfData); // Lisez le fichier PDF en tant que buffer

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
        <!DOCTYPE html>
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

        .column {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .invoice-details {
            text-align: center;
        }

        table {
            width: 100%;
            margin: 20px 0;
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

        .but, .but2 {
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

        @media screen and (min-width: 768px) {
            .container {
                flex-direction: row;
            }

            .column {
                flex-basis: 50%;
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
        }
    </style>
</head>

<body>
<div class="container">
<div class="column">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="">
                    <tr>
                        <td align="center" valign="top" style="padding: 20px;">
                            <img src="https://res.cloudinary.com/dcdei4osp/image/upload/v1692609330/green-links-logo-simplifie_mljnej.png" alt="logo" width="250" style="display: block;"/>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px; font-size: 12px;">
                            111 rue Anselme Rondenay 94400 Vitry-sur-Seine France
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px; font-size: 12px;">
                            +33 (0) 1 88 32 77 68
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px; font-size: 12px;">
                            contact@greenlinks.fr
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px; font-size: 12px;">
                            www.greenlinks.fr
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<div style="margin-left: 20%;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
    <td align="center">
        <table width="300" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center" style="font-size: 16px; text-shadow: 2px 2px 5px grey;">
                    DEVIS-${num}
                </td>
            </tr>
            <tr>
                <td align="center" style="font-size: 15px; text-shadow: 2px 2px 5px grey;">
                    Date d'estimation: ${date1}
                </td>
            </tr>
            <tr>
                <td align="center" style="font-size: 15px; text-shadow: 2px 2px 5px grey;">
                    Valable jusqu'au: ${date3}
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</div>
</div>

<div style="margin-top: 50px;">
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
        <th>Remise</th>
        <th>TVA%</th>
        <th>Montant HT</th>
        <th>Montant</th>
    </tr>
    </thead>
    <tbody>
    ${devis.items.map((itemField, index) => (
    `<tr key="${index}">
        <td>${itemField.product}</td>
        <td>${itemField.date2}</td>
        <td>${itemField.qte}</td>
        <td>${itemField.unite}</td>
        <td>${itemField.prix}</td>
        <td>${itemField.remise}</td>
        <td>${itemField.tva}</td>
        <td>${(itemField.montantHT2 = itemField.qte * itemField.prix - itemField.remise).toFixed(2)}</td>
        <td>${(itemField.montant2 = (itemField.qte * itemField.prix) - itemField.remise + (itemField.qte * itemField.prix) * itemField.tva / 100).toFixed(2)}</td>
    </tr>`
    )).join('')}
    </tbody>
</table>

<table>
    <tbody>
    <tr>
        <td><div>Somme de remise : </div></td>
        <td><div style="margin-right: 400px ;">${devis.totalRemise}</div></td>
    </tr>
    </tbody>
</table>

<div style="margin-top: 50px;">
    <div>Résumé de devis</div>
    <table>
        <thead>
        <tr>
            <th>Total HT</th>
            <th>Remise</th>
            <th>Total dû</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>${devis.totalHorsTva}</td>
            <td>${devis.totalRemise}</td>
            <td>${devis.total}</td>
        </tr>
        </tbody>
    </table>
</div>

<p>Signature du client</p>
<p>(Signé et accepté)</p>

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