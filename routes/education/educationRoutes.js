const router = require("express").Router();
const Education = require("../../models/education/EducationModel");
const handleError = require("./educationError");
const auth = require("../../middleware/auth");
const { getEducationById } = require("../../controllers/education/educationController");

router.use(auth); 

router.get("/", async (req, res) => {
  try {
   // const educations = await Education.find({ user: req.user.id })
   const educations = await Education.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');
    console.log(educations);

    res.status(200).json(educations);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const education = await Education.findOne({ _id: id, user: req.user.id });
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.status(200).json(education);
  } catch (err) {
    handleError(err, res);
  }
});



router.post("/", async (req, res) => {
  try {
    const newEducation = new Education({ ...req.body, user: req.user.id });
    await newEducation.save();
    const populatedAudiovisuel = await Education.findById(newEducation._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    console.log('Populated Education:', populatedAudiovisuel);
  
    res.status(200).json(populatedAudiovisuel);
  } catch (err) {
    console.log(err); 
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const education = await Education.findOne({ _id: id, user: req.user.id });
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    Object.assign(education, req.body);
    await education.save();
    res.status(200).json(education);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const education = await Education.findOne({ _id: id, user: req.user.id });
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    await Education.findByIdAndRemove(id);
    res.status(200).json("Education has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getEducationById)

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const education = await Education.findOne({ _id: id, user: req.user.id });
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }

    education.isActive = isActive;
    await education.save();

    res.status(200).json(education);
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;