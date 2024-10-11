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
const sendEmail = (to,firstname,lastname, jobposition, txt) => {
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
        html: `
        <!DOCTYPE>
        <html>
        <body>
        <div className='App'>
  

        <h1></h1>
         <h1>   MAIL CONFIRMATION ENTRETIEN VISIO :</h1>
        <div style="textAlign: center" , 
        alignItems: center, marginTop:50px
        }}>
        <p1 style="marginRight :460px">Bonjour ${firstname} ${lastname},</p1>
        <br/>
        
        <p  style="marginRight :40px">
        
        Comme convenu lors de notre échange d&#39;hier, je vous confirme votre entretien
        </p><p style="marginRight :220px"> pour
    le poste de ${jobposition}qui aura lieu </p>
        <p style="marginRight : 410px">
        <input style="fontWeight: bold , fontSize:16px"  placeholder='mardi 18 octobre à 11h'/>
        </p>
        <p style="marginRight :50px">
        avec Dominique Sanchez (CTO) en visioconférence :<a href='https://meet.google.com/' style="color:blue">( le lien visio du meeting).</a>
        </p>
        <p style="marginRight :180px">
    Pour vous renseigner sur la société :<a href='http://www.google.com' style="color:blue"> http://www.google.com</a>
    </p>
        <p  style="marginRight :180px" > 
        Je reste disponible pour toute information complémentaire.</p>
        <p style="fontWeight: bold,marginRight :200px">Merci de me confirmer la bonne réception de ce mail.</p>
        </div>
        <p  style="marginRight :400px   , marginTop:50px" >
        Cordialement / Best Regards,
        </p>
        <p style="marginRight :520px, marginTop: 40px ,fontWeight:bold" >
        Halim Refas
        </p>
        <p style="marginRight :420px,  fontFamily: Arial, Helvetica,sans-serif,fontWeight: bold">
        <em style="color:grey">Consultant</em> <em style="color:#7FFF00">en recrutement</em>
        </p><p style="marginTop:60px,marginRight :410px ,fontFamily: Tahoma, Verdana, sans-serif ,
        fontSize: 12px,fontWeight: 800,
        ">
        Green <em style="color:#7FFF00"}>Links </em>- Chasseurs de Talents
        </p>
        <p style="marginRight :480px ,fontFamily: Tahoma, Verdana, sans-serif ,fontWeight: 800,
        fontSize: '11px'
        }}>Tour CIT - Montparnasse</p>
        <p style="marginRight :440px ,fontFamily: Tahoma, Verdana, sans-serif ,fontWeight: 800,
        fontSize: 11px
        }}>3 rue de l&#39;Arrivée - 75015 Paris</p>
        <p style="marginRight :370px ,fontFamily: Tahoma, Verdana, sans-serif ,
        fontSize: 12px">
        <a href='hrefas@greenlinks.fr' style="color:blue">hrefas@greenlinks.fr</a> - +33 (0) 6 42 66 54 08
            </p>
         
          </div>
          </body>
          </html>
            
        `
    }
 
    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail