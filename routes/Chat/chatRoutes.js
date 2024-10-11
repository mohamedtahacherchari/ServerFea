const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../../controllers/Chat/chatControllers");
//const {protect} = require("../../middleware/authMiddleware");
const auth = require("../../middleware/auth")
const router = express.Router();
router.route("/group").post(auth,createGroupChat);
router.route("/rename").put(auth,renameGroup);
router.route("/groupremove").put(auth,removeFromGroup);
router.route("/groupadd").put(auth,addToGroup);
router.route("/").post(auth,accessChat);
router.route("/").get(auth,fetchChats);


module.exports = router;
