const router = require("express").Router();
const Investir = require("../../models/investir/InvestirModel");
const handleError = require("./investirError");
const auth = require("../../middleware/auth");
const { getInvestirById } = require("../../controllers/investir/investirController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    const investirs = await Investir.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(investirs);

    res.status(200).json(investirs);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const investir = await Investir.findOne({ _id: id, user: req.user.id });
    if (!investir) {
      return res.status(404).json({ error: "Investir not found" });
    }
    res.status(200).json(investir);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newInvestir = new Investir({ ...req.body, user: req.user.id });
    await newInvestir.save();
    const populatedInvestir = await Investir.findById(newInvestir._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Investir:', populatedInvestir);
  
    res.status(200).json(populatedInvestir);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const investir = await Investir.findOne({ _id: id, user: req.user.id });
    if (!investir) {
      return res.status(404).json({ error: "Investir not found" });
    }
    Object.assign(investir, req.body);
    await investir.save();
    res.status(200).json(investir);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const investir = await Investir.findOne({ _id: id, user: req.user.id });
    if (!investir) {
      return res.status(404).json({ error: "Investir not found" });
    }
    await Investir.findByIdAndRemove(id);
    res.status(200).json("Investir has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getInvestirById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const investir = await Investir.findOne({ _id: id, user: req.user.id });
    if (!investir) {
      return res.status(404).json({ error: "Investir not found" });
    }

    investir.isActive = isActive;
    await investir.save();

    res.status(200).json(investir);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;