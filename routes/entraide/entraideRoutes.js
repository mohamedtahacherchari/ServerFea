const router = require("express").Router();
const Entraide = require("../../models/Entraide/EntraideModel");
const handleError = require("./entraideError");
const auth = require("../../middleware/auth");
const { getEntraideById } = require("../../controllers/entraide/entraideController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const entraides = await Entraide.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(entraides);

    res.status(200).json(entraides);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const entraide = await Entraide.findOne({ _id: id, user: req.user.id });
    if (!entraide) {
      return res.status(404).json({ error: "Entraide not found" });
    }
    res.status(200).json(entraide);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newEntraide = new Entraide({ ...req.body, user: req.user.id });
    await newEntraide.save();
    const populatedEntraide = await Entraide.findById(newEntraide._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Entraide:', populatedEntraide);
  
    res.status(200).json(populatedEntraide);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const entraide = await Entraide.findOne({ _id: id, user: req.user.id });
    if (!entraide) {
      return res.status(404).json({ error: "Entraide not found" });
    }
    Object.assign(entraide, req.body);
    await entraide.save();
    res.status(200).json(entraide);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const entraide = await Entraide.findOne({ _id: id, user: req.user.id });
    if (!entraide) {
      return res.status(404).json({ error: "Entraidre not found" });
    }
    await Entraide.findByIdAndRemove(id);
    res.status(200).json("Entraide has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getEntraideById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const entraide = await Entraide.findOne({ _id: id, user: req.user.id });
    if (!entraide) {
      return res.status(404).json({ error: "Entraide not found" });
    }

    entraide.isActive = isActive;
    await entraide.save();

    res.status(200).json(entraide);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;