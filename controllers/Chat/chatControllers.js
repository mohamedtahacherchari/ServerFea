const asyncHandler = require("express-async-handler");
const Chat = require("../../models/Chat/chatModel");
const Users = require("../../models/userModel");
const mongoose = require('mongoose');

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  
  isChat = await Users.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName avatar email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({_id: createdChat._id }).populate(
        "users",
        "-password"
      );
      //changer id et _id et tester
      //attention entre id et _id !!!!!!!!!
   // res.status(200).json(isChat.length);
     res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);    
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await Users.populate(results, {
          path: "latestMessage.sender",
          select: "firstName avatar email",
        });
       // res.status(200).json();

        res.status(200).send(results);
        
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat7 = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  const users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
// Filtrer les ID d'utilisateurs valides
const validUserIds = users.filter(userId => mongoose.Types.ObjectId.isValid(userId));
  
//users.push(req.user._id);
// Ajouter l'ID de l'utilisateur actuel à la liste
validUserIds.push(req.user._id);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    })

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: "Failed to create the chat", error: error.message });
  }
});
const createGroupChat8 = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  const users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  console.log("All users:", users);

  // Filtrer les ID d'utilisateurs valides
 /* const validUserIds = users.filter(userId => {
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) {
      console.log(`Invalid user ID: ${userId}`);
    }
    return isValid;
  });

  // Ajouter l'ID de l'utilisateur actuel à la liste
  validUserIds.push(req.user._id);*/
  const validUserIds = users.filter(userId => mongoose.Types.ObjectId.isValid(userId));

if (validUserIds.length < 2) {
  return res
    .status(400)
    .send("More than 2 valid users are required to form a group chat");
}

// Ajouter l'ID de l'utilisateur actuel à la liste
validUserIds.push(req.user._id);


  try {
    console.log("Creating group chat...");
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: validUserIds,
      isGroupChat: true,
      groupAdmin: req.user._id,
    }).populate("users", "-password").populate("groupAdmin", "-password");
    console.log("Group chat created:", groupChat);


    console.log("Group chat created:", groupChat);

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    console.log("Full group chat populated:", fullGroupChat);

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Failed to create the chat!", error);
    res.status(400).json({ message: "Failed to create the chat", error: error.message });
  }
});
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  const users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  // Filtrer les ID d'utilisateurs valides
  const validUserIds = users.filter(userId => mongoose.Types.ObjectId.isValid(userId));

  // Ajouter l'ID de l'utilisateur actuel à la liste
  validUserIds.push(req.user._id);
// Valider que l'ID de l'administrateur de groupe est parmi les utilisateurs
if (!validUserIds.includes(req.user._id)) {
  return res.status(400).send("Group admin must be one of the users");
}

  try {
    //console.log("Creating group chat...");
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: validUserIds,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });
    console.log(req.user)

    //console.log("Group chat created:", groupChat);

    // Exécuter la méthode populate après la création du chat
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   // console.log("Full group chat populated:", fullGroupChat);

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Failed to create the chat!", error);
    res.status(400).json({ message: "Failed to create the chat", error: error.message });
  }
});




// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};