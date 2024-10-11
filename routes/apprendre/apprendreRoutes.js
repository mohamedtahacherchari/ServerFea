const router = require("express").Router();
const Apprendre = require("../../models/apprendre/ApprendreModel");
const handleError = require("./apprendreError");
const auth = require("../../middleware/auth");
const { getApprendreById } = require("../../controllers/apprendre/apprendreController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const apprendres = await Apprendre.find({ user: req.user.id })
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(apprendres);

    res.status(200).json(apprendres);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const apprendre = await Apprendre.findOne({ _id: id, user: req.user.id });
    if (!apprendre) {
      return res.status(404).json({ error: "Apprendre not found" });
    }
    res.status(200).json(apprendre);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newApprendre = new Apprendre({ ...req.body, user: req.user.id });
    await newApprendre.save();
    const populatedApprendre = await Apprendre.findById(newApprendre._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Apprendre:', populatedApprendre);
  
    res.status(200).json(populatedApprendre);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const apprendre = await Apprendre.findOne({ _id: id, user: req.user.id });
    if (!apprendre) {
      return res.status(404).json({ error: "Apprendre not found" });
    }
    Object.assign(apprendre, req.body);
    await apprendre.save();
    res.status(200).json(apprendre);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const apprendre = await Apprendre.findOne({ _id: id, user: req.user.id });
    if (!apprendre) {
      return res.status(404).json({ error: "Apprendre not found" });
    }
    await Apprendre.findByIdAndRemove(id);
    res.status(200).json("Apprendre has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getApprendreById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const apprendre = await Apprendre.findOne({ _id: id, user: req.user.id });
    if (!apprendre) {
      return res.status(404).json({ error: "Apprendre not found" });
    }

    apprendre.isActive = isActive;
    await apprendre.save();

    res.status(200).json(apprendre);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;