const router = require("express").Router();
const Sante = require("../../models/sante/SanteModel");
const handleError = require("./santeError");
const auth = require("../../middleware/auth");
const { getSanteById } = require("../../controllers/sante/santeController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const santes = await Sante.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(santes);

    res.status(200).json(santes);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const sante = await Sante.findOne({ _id: id, user: req.user.id });
    if (!sante) {
      return res.status(404).json({ error: "Sante not found" });
    }
    res.status(200).json(sante);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newSante = new Sante({ ...req.body, user: req.user.id });
    await newSante.save();
    const populatedSante = await Sante.findById(newSante._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Sante:', populatedSante);
  
    res.status(200).json(populatedSante);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const sante = await Sante.findOne({ _id: id, user: req.user.id });
    if (!sante) {
      return res.status(404).json({ error: "Sante not found" });
    }
    Object.assign(sante, req.body);
    await sante.save();
    res.status(200).json(sante);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const sante = await Sante.findOne({ _id: id, user: req.user.id });
    if (!sante) {
      return res.status(404).json({ error: "Santé not found" });
    }
    await Sante.findByIdAndRemove(id);
    res.status(200).json("Santé has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getSanteById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const sante = await Sante.findOne({ _id: id, user: req.user.id });
    if (!sante) {
      return res.status(404).json({ error: "Santé not found" });
    }

    sante.isActive = isActive;
    await sante.save();

    res.status(200).json(sante);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;