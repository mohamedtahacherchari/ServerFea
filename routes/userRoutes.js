const router = require('express').Router()
const userController = require('../controllers/userController4')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const Users = require("../models/userModel");
//const router = require("express").Router();
//const bcrypt = require("bcrypt");
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
// Middleware pour gérer les tentatives de connexion infructueuses
const handleFailedLoginAttempts = async (req, res, next) => {
  const { email } = req.body;

  try {
      // Récupérer l'utilisateur depuis la base de données
      const user = await Users.findOne({ email });

      if (!user) {
          // Utilisateur non trouvé, gérer l'erreur ici
          return res.status(401).json({ msg: "Invalid credentials." });
      }
  
      if (user.accountLocked) {
          // Compte verrouillé, renvoyer un message d'erreur approprié
          return res.status(401).json({ msg: "Account locked. Please contact support." });
      }

      // Incrémenter le compteur de tentatives de connexion infructueuses
      user.failedLoginAttempts += 1;

      // Vérifier si le seuil de tentatives de connexion infructueuses est dépassé
      if (user.failedLoginAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
          // Verrouiller le compte
          user.accountLocked = true;
          // Réinitialiser le compteur de tentatives de connexion infructueuses
          user.failedLoginAttempts = 0;
          // Enregistrer les modifications dans la base de données
          await user.save();
          // Renvoyer un message d'erreur approprié
          return res.status(401).json({ msg: "Account locked due to too many failed login attempts. Please try again later or contact support." });
      } 

      // Si nous sommes ici, les tentatives de connexion ne sont pas trop nombreuses, donc passer au middleware suivant
      next();
  } catch (error) {
      // Gérer les erreurs ici
      console.error(error);
      res.status(500).json({ msg: "Server error." });
  }
};

router.post('/register', userController.register)
router.post('/activation', userController.activateEmail)
router.post('/login',handleFailedLoginAttempts,userController.login)
router.post('/storeSession', userController.storeSession)
router.post('/refresh_token', userController.getAccessToken)
router.post('/forgot', userController.forgotPassword)
router.post('/reset',auth, userController.resetPassword)
router.get('/infor', auth, userController.getUserInfor)
router.get('/infor/:id', auth, userController.getUserInformation)
router.get('/all_infor', auth, authAdmin, userController.getUsersAllInfor)
router.get('/logout', userController.logout)
router.patch('/update', auth, userController.updateUser)
router.patch('/update/:id', auth, userController.updateUserAccountLocked)
router.patch('/updateAvatar', auth, userController.updateAvatar)
router.patch('/update_role/:id', auth, authAdmin, userController.updateUsersRole)
router.delete('/delete/:id', auth, authAdmin, userController.deleteUser)
router.post('/loginGoogle', auth, userController.loginGoogle)
router.get('/allusers' ,auth,userController.allUsers)
router.get('/' ,auth,userController.allUser)
router.get('/profile' ,auth,userController.getUserProfile)
router.put('/profile' ,auth,userController.updateUserProfile)
router.get('/avatar/position' ,auth,userController.getPosition)
router.patch('/avatar/position', auth,userController.patchPosition);


/*router.get('/avatar/position', auth, async (req, res) => {
  console.log(req, "hihihihihihihihihihihihi")
  try {
    const user = await Users.findById(req.user.id);
  
    if (!user.avatarPosition) {
      res.json({ success: false, message: 'No avatar position defined for the user' });
    } else {
      res.json({ success: true, position: user.avatarPosition });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
*/

//update user


//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await Users.findById(userId)
      : await Users.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    const friends = await Promise.all(
      users.followings.map((friendId) => {
        return Users.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user



//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await Users.findById(req.params.id);
      const currentUser = await Users.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await Users.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});



module.exports = router 