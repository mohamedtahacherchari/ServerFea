const router = require("express").Router();
const Permaculture = require("../../models/permaculture/PermacultureModel");
const handleError = require("./permacultureError");
const auth = require("../../middleware/auth");
const { getPermacultureById } = require("../../controllers/permaculture/permacultureController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const permacultures = await Permaculture.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(permacultures);

    res.status(200).json(permacultures);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const permaculture = await Permaculture.findOne({ _id: id, user: req.user.id });
    if (!permaculture) {
      return res.status(404).json({ error: "Permaculture not found" });
    }
    res.status(200).json(permaculture);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newPermaculture = new Permaculture({ ...req.body, user: req.user.id });
    await newPermaculture.save();
    const populatedPermaculture = await Permaculture.findById(newPermaculture._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Permaculture:', populatedPermaculture);
  
    res.status(200).json(populatedPermaculture);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const permaculture = await Permaculture.findOne({ _id: id, user: req.user.id });
    if (!permaculture) {
      return res.status(404).json({ error: "Permaculture not found" });
    }
    Object.assign(permaculture, req.body);
    await permaculture.save();
    res.status(200).json(permaculture);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const permaculture = await Permaculture.findOne({ _id: id, user: req.user.id });
    if (!permaculture) {
      return res.status(404).json({ error: "Permaculture not found" });
    }
    await Permaculture.findByIdAndRemove(id);
    res.status(200).json("Permaculture has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getPermacultureById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const permaculture = await Permaculture.findOne({ _id: id, user: req.user.id });
    if (!permaculture) {
      return res.status(404).json({ error: "Permaculture not found" });
    }

    permaculture.isActive = isActive;
    await permaculture.save();

    res.status(200).json(permaculture);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;