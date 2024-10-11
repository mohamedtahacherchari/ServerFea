const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

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
const sendEmail = (to, FirstName, lastname,poste,date,txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

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
        subject:  txt ? txt : txt ='Candidat '  , 
        html:
        `
        <!DOCTYPE>
        <html>
        <body>
        <div className='App'>
  

        <h1></h1>
         <h1> </h1>
        <div 
        >
        <table>
        <tbody>
        <td>Bonjour</td>
        <td style="font-weight:bold ;font-size:16px">${FirstName} ${lastname}</td>
        </tbody>
        </table>
        
        
        <p>
        
        Comme convenu lors de notre échange d&#39;hier, je te confirme notre entretien
        </p>
        <table>
        <tbody>
        <td style="margin-right :px"> pour le poste de <em  style="font-weight:bold ; font-size:16px; color:black">${poste}</em> </td>
        <td>   qui aura lieu </td>
        <td style="font-weight:bold ;font-size:16px"> ${date}  </td>
        </tbody>
        </table>
    <p style="marginRight :120px">
    avec Dominique Sanchez (CTO) en visioconférence :</p>
    <p style="marginRight :300px"><a href="https://meet.google.com/" style="color:blue">( le lien visio du meeting).</a></p>
        <p style="marginRight :180px">
    Pour te renseigner sur la société :<a href='http://www.google.com' style="color:blue"> http://www.google.com</a>
    </p>
        <p  style="marginRight :180px" > 
        Je reste disponible pour toute information complémentaire.</p>
        <p style="font-weight:bold ;font-size:16px">Merci de me confirmer la bonne réception de ce mail.</p>
        </div>
        <p  style="margin-top:50px" >
        Cordialement / Best Regards,
        </p>
        <p style="margin-top: 40px ;font-weight:bold; color:black" >
        Halim Refas
        </p>
        <p style="font-family: Arial, Helvetica,sans-serif;font-weight: bold">
        <em style="color:grey">Consultant</em> <em style="color:#7FFF00">en recrutement</em>
        </p>
        <p  style="margin-top:20px; font-family: Tahoma, Verdana, sans-serif;
        font-size: 12px ;font-weight: 800;color:black">
        Green <em style="color:#7FFF00"}>Links </em>- Chasseurs de Talents
        </p>
        <p style="font-family: Tahoma, Verdana, sans-serif ;font-weight: 800;
        font-size: 11px">
        Tour CIT - Montparnasse</p>
        <p style="font-family: Tahoma, Verdana, sans-serif ;font-weight: 800;
        font-size: 11px"
        >3 rue de l&#39;Arrivée - 75015 Paris</p>
        <p style="font-family: Tahoma, Verdana, sans-serif ;
        font-size: 12px">
        <a href='hrefas@greenlinks.fr' style="color:blue">hrefas@greenlinks.fr</a> - +33 (0) 6 42 66 54 08
            </p>
         
          </div>
          </body>
          </html>
            
        `,
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail