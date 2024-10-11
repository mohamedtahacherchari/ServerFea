const router = require("express").Router();
const Info = require("../../models/info/InfoModel");
const handleError = require("./infoErrors");
const auth = require("../../middleware/auth");
const { getInfoById } = require("../../controllers/info/infoController");

router.use(auth); // Apply auth middleware to all routes in this router

router.get("/", async (req, res) => {
  // Retrieve infos belonging to the authenticated user
  try {
    const infos = await Info.find();
    res.status(200).json(infos);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const info = await Info.findOne({ _id: id, });
    if (!info) {
      return res.status(404).json({ error: "Info not found" });
    }
    res.status(200).json(info);
  } catch (err) {
    handleError(err, res);
  }
});

router.post("/", async (req, res) => {
  // Create a new event associated with the authenticated user
  try {
    const newInfo = new Info({ ...req.body, user: req.user.id });
    await newInfo.save();
    res.status(200).json(newInfo);
  } catch (err) {
    handleError(err, res);
  }
});

router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const info = await Info.findOne({ _id: id});
    if (!info) {
      return res.status(404).json({ error: "Info not found" });
    }
    Object.assign(info, req.body);
    await info.save();
    res.status(200).json(info);
  } catch (err) {
    handleError(err, res);
    console.log(err)
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  console.log(req.user.id,"taha")
  try {
    const info = await Info.findOne({ _id: id });
 console.log(info)
    if (!info) {
      return res.status(404).json({ error: "Info not found" });
    }
    await Info.findByIdAndRemove(id);
    res.status(200).json("Info has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getInfoById)



module.exports = router;
