const router = require("express").Router();
const Audiovisuel = require("../../models/audiovisuel/AudiovisuelModel");
const handleError = require("./audiovisuelErrors");
const auth = require("../../middleware/auth");
const { getAudiovisuelById } = require("../../controllers/audiovisuel/audiovisuelController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
    //const audiovisuels = await Audiovisuel.find({ user: req.user.id })
    const audiovisuels = await Audiovisuel.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(audiovisuels);

    res.status(200).json(audiovisuels);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const audiovisuel = await Audiovisuel.findOne({ _id: id, user: req.user.id });
    if (!audiovisuel) {
      return res.status(404).json({ error: "Audiovisuel not found" });
    }
    res.status(200).json(audiovisuel);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newAudiovisuel = new Audiovisuel({ ...req.body, user: req.user.id });
    await newAudiovisuel.save();
    const populatedAudiovisuel = await Audiovisuel.findById(newAudiovisuel._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Audiovisuel:', populatedAudiovisuel);
  
    res.status(200).json(populatedAudiovisuel);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const audiovisuel = await Audiovisuel.findOne({ _id: id, user: req.user.id });
    if (!audiovisuel) {
      return res.status(404).json({ error: "Audiovisuel not found" });
    }
    Object.assign(audiovisuel, req.body);
    await audiovisuel.save();
    res.status(200).json(audiovisuel);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const audiovisuel = await Audiovisuel.findOne({ _id: id, user: req.user.id });
    if (!audiovisuel) {
      return res.status(404).json({ error: "Audiovisuel not found" });
    }
    await Audiovisuel.findByIdAndRemove(id);
    res.status(200).json("Audiovisuel has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getAudiovisuelById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const audiovisuel = await Audiovisuel.findOne({ _id: id, user: req.user.id });
    if (!audiovisuel) {
      return res.status(404).json({ error: "Audiovisuel not found" });
    }

    audiovisuel.isActive = isActive;
    await audiovisuel.save();

    res.status(200).json(audiovisuel);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;