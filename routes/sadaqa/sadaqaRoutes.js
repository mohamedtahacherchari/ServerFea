const router = require("express").Router();
const Sadaqa = require("../../models/sadaqa/SadaqaModel");
const handleError = require("./sadaqaError");
const auth = require("../../middleware/auth");
const { getSadaqaById } = require("../../controllers/sadaqa/sadaqaController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const sadaqas = await Sadaqa.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(sadaqas);

    res.status(200).json(sadaqas);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const sadaqa = await Sadaqa.findOne({ _id: id, user: req.user.id });
    if (!sadaqa) {
      return res.status(404).json({ error: "Sadaqa not found" });
    }
    res.status(200).json(sadaqa);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newSadaqa = new Sadaqa({ ...req.body, user: req.user.id });
    await newSadaqa.save();
    const populatedSadaqa = await Sadaqa.findById(newSadaqa._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Sadaqa:', populatedSadaqa);
  
    res.status(200).json(populatedSadaqa);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const sadaqa = await Sadaqa.findOne({ _id: id, user: req.user.id });
    if (!sadaqa) {
      return res.status(404).json({ error: "Sadaqa not found" });
    }
    Object.assign(sadaqa, req.body);
    await sadaqa.save();
    res.status(200).json(sadaqa);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const sadaqa = await Sadaqa.findOne({ _id: id, user: req.user.id });
    if (!sadaqa) {
      return res.status(404).json({ error: "Sadaqa not found" });
    }
    await Sadaqa.findByIdAndRemove(id);
    res.status(200).json("Sadaqa has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getSadaqaById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const sadaqa = await Sadaqa.findOne({ _id: id, user: req.user.id });
    if (!sadaqa) {
      return res.status(404).json({ error: "Sadaqa not found" });
    }

    sadaqa.isActive = isActive;
    await sadaqa.save();

    res.status(200).json(sadaqa);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;