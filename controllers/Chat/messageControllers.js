const asyncHandler = require("express-async-handler");
const Message = require("../../models/Chat/messageModel");
const Users = require("../../models/userModel");
const Chat = require("../../models/Chat/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({chat: req.params.chatId})
    .populate("sender firstName avatar email")
    .populate("chat");
    res.json(messages);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}); 

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  // Créez un nouvel objet message avec les données reçues
  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
   // let message =message.deliveredAt= Date.now()

    var message = await Message.create(newMessage);
    message.deliveredAt= Date()

    message = await message.populate("sender","firstName avatar").execPopulate();
    message = await message.populate("chat").execPopulate();
    //execPopulate vesion 9dima fil mongoose
    message = await Users.populate(message, {
      path: "chat.users",
      select: "firstName avatar email",
    });
    message= await message.save()
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    
   // res.status(200).json(Date.now)
   res.status(200).json(message)


    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage2 = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  // Créez un nouvel objet message avec les données reçues
  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
   // let message =message.deliveredAt= Date.now()
   let message;
   // Vérifiez si un fichier est envoyé
   if (req.file) {
    // Si oui, ajoutez le chemin du fichier à l'objet message
    newMessage.file = req.file.path; // Suppose que le chemin du fichier est stocké dans req.file.path
  }

  // Créez un nouveau message avec les données fournies
     message = await Message.create(newMessage);
     // Ajoutez l'heure de livraison au message
    message.deliveredAt= Date()
  // Populate les informations du sender et du chat dans le message
    message = await message.populate("sender","firstName avatar").execPopulate();
    message = await message.populate("chat").execPopulate();
    //execPopulate vesion 9dima fil mongoose
    message = await Users.populate(message, {
      path: "chat.users",
      select: "firstName avatar email",
    });
    // Enregistrez le message dans la base de données
    message= await message.save()
     // Mettez à jour le dernier message du chat avec le nouveau message
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    
   // res.status(200).json(Date.now)
    // Répondez avec le nouveau message
   res.status(200).json(message)


    res.json(message);
  } catch (error) {
     // En cas d'erreur, renvoyez un code d'état 400 avec le message d'erreur
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage2 };