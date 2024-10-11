const mongoose = require('mongoose')
const bcrypt = require ('bcryptjs')


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
           min: 3,
         max: 50,
         //  required: [true, "Please enter your firstName!"],
         trim : true,
        },
        lastName: {
            type: String,
            min: 3,
            max: 50,
           // required: [true, "Please enter your lastName!"],
            trim : true
        },
        email: {
            type: String,
          max: 50,
          //  required: [true, "Please enter your email!"],
            trim : true,
            unique : true,

        },
        password: {
            type: String,
           // required: [true, "Please enter your password!"],
        },
        phoneNumber: {
            type: Number,
        },
        city: {
          type: String,
      },
        country: {
            type: String
        },
        state: {
            type: String
        },
        role: {
            type: Number,
            default: 0, // Recruteur = 2 ,Admin = 1 , Charge Sourcing = 0
            
        },
        businessunit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BusinessUnits',
        },
        active: { 
            type: Boolean, 
            default: true 
        },
        avatar: {
            type: String,
            default: 'https://res.cloudinary.com/dcdei4osp/image/upload/v1655804847/samples/people/Multimedia__253_j5j3b5.jpg'
        },
      /*  role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles',
        },*/
      
        pic: {
            type: "String",
    
             default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            
          },
        
          accountLocked: { type: Boolean, default: false },

          // Champ pour le nombre de tentatives de connexion infructueuses
          failedLoginAttempts: { type: Number, default: 0 },
          lockedUntil: {
            type: Date,
            default: null
        },
        avatarPosition: {
            type: {
              x: { type: Number, default: 0 },
              y: { type: Number, default: 0 }
            },
            default: { x: 0, y: 0 }
          }
    },   

    { timestaps: true }

);  



/*userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  */
  //const User = mongoose.model('User', userSchema)

  const Users = mongoose.model("Users", userSchema);

  module.exports = Users;
  

//module.exports = mongoose.model("Users", userSchema)