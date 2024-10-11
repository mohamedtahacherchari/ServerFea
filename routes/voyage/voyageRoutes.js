const router = require("express").Router();
const Voyage = require("../../models/voyage/voyageModel");
const handleError = require("./voyageError");
const auth = require("../../middleware/auth");
const { getVoyageById } = require("../../controllers/voyage/voyageController");
const voyageModel = require("../../models/voyage/voyageModel");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const voyages = await Voyage.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(voyages);

    res.status(200).json(voyages);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const voyage = await Voyage.findOne({ _id: id, user: req.user.id });
    if (!voyage) {
      return res.status(404).json({ error: "Voyage not found" });
    }
    res.status(200).json(voyage);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newVoyage = new Voyage({ ...req.body, user: req.user.id });
    await newVoyage.save();
    const populatedVoyage = await Voyage.findById(newVoyage._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Voiyage:', populatedVoyage);
  
    res.status(200).json(populatedVoyage);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const voyage = await Voyage.findOne({ _id: id, user: req.user.id });
    if (!voyage) {
      return res.status(404).json({ error: "Voyage not found" });
    }
    Object.assign(voyage, req.body);
    await voyage.save();
    res.status(200).json(voyage);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const voyage = await Voyage.findOne({ _id: id, user: req.user.id });
    if (!voyage) {
      return res.status(404).json({ error: "Voyage not found" });
    }
    await Voyage.findByIdAndRemove(id);
    res.status(200).json("Santé has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getVoyageById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const voyage = await Voyage.findOne({ _id: id, user: req.user.id });
    if (!voyage) {
      return res.status(404).json({ error: "Santé not found" });
    }

    voyage.isActive = isActive;
    await voyage.save();

    res.status(200).json(voyage);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;