const jwt = require("jsonwebtoken");
//const users = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
    try {
      const token = req.header("Authorization")
        const googleToken = token.length > 1000

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})
     if(googleToken){const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = await Users.findById(decoded.id).select("-password");}
      
      else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user
            
        })
    }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  
)

module.exports = { protect };