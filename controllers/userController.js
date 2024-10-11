const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const userController = {
    register : async (req, res) => {
        try {
            const {firstName, lastName, email, password} = req.body

            if(!email || !password || !firstName|| !lastName)
                return res.status(400).json({msg : "Please fill in all fields ."})

            if(!validateEmail(email))
                return res.status(400).json({msg : "Invalid email ."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg : "This email already exists ."})

            if (password.length < 6)
                return res.status(400).json({msg : "Password must be at least 6 characters ."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                firstName, lastName, email, password: passwordHash
            }
            
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`

            sendMail(email, url)
            
            res.json({msg: "Please activate mail to start"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    activateEmail: async (req, res) =>{
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {firstName, lastName, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg: "This email already exists."})

            const newUser = new Users({
                firstName, lastName, email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {

            const {email, password} = req.body

            const user = await Users.findOne({email})

            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken1({id: user._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
                role: user.role,
                pic: user.pic,
                token: createRefreshToken1(user._id),
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err){
                    return res.status(400).json({msg: "Please login now!"})
                }
                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body

            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {firstName, lastName, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                firstName, lastName, avatar
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInformation: async (req, res) => {
        try {

            const user = await Users.findById(req.params.id).select('-password')

            res.json(user)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    loginGoogle: async (req, res) =>{
        res.status(201).json({ success: true, result: { id: 123, title: 'test room' } });
    },

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
allUsers : async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await Users.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  },
  
  //@description     Register new user
  //@route           POST /api/user/
  //@access          Public
 /*  registerUser :async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  },
  
  //@description     Auth the user
  //@route           POST /api/users/login
  //@access          Public
   authUser :async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
}*/





}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}
const createActivationToken1 = (id) => {
    return jwt.sign({id}, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken= (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
const createRefreshToken1 = (id) => {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}




module.exports = userController