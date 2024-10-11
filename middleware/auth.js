const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async(req, res, next) => {
    try {
        
        const token = req.header("Authorization")
        const googleToken = token.length > 1000;

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        if(googleToken){

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            req.user = {
                id: payload.sub,
                name: payload.name,
                photoURL: payload.picture,
                role : payload.role,
            };
        }else{
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Invalid Authentication."})
    
                req.user = user
              
                next() 
            })   
          
        }  
       
   
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth