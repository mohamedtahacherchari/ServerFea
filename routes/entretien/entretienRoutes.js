const router = require("express").Router();
const Entretien = require("../../models/entretien/EntretienModel");
const handleError = require("./entretienError");
const auth = require("../../middleware/auth");
const { getEntretienById } = require("../../controllers/entretien/entretienController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const entretiens = await Entretien.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(entretiens);

    res.status(200).json(entretiens);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const entretien = await Entretien.findOne({ _id: id, user: req.user.id });
    if (!entretien) {
      return res.status(404).json({ error: "Entretien not found" });
    }
    res.status(200).json(entretien);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newEntretien = new Entretien({ ...req.body, user: req.user.id });
    await newEntretien.save();
    const populatedEntretien = await Entretien.findById(newEntretien._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Entretien:', populatedEntretien);
  
    res.status(200).json(populatedEntretien);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const entretien = await Entretien.findOne({ _id: id, user: req.user.id });
    if (!entretien) {
      return res.status(404).json({ error: "Entretien not found" });
    }
    Object.assign(entretien, req.body);
    await entretien.save();
    res.status(200).json(entretien);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const entretien = await Entretien.findOne({ _id: id, user: req.user.id });
    if (!entretien) {
      return res.status(404).json({ error: "Entretien not found" });
    }
    await Entretien.findByIdAndRemove(id);
    res.status(200).json("Entretien has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getEntretienById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const entretien = await Entretien.findOne({ _id: id, user: req.user.id });
    if (!entretien) {
      return res.status(404).json({ error: "Entretien not found" });
    }

    entretien.isActive = isActive;
    await entretien.save();

    res.status(200).json(entretien);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;