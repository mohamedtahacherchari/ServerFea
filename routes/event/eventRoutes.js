const router = require("express").Router();
const Event = require("../../models/event/EventModel");
const handleError = require("./eventErrors");
const auth = require("../../middleware/auth");
const { getEventById } = require("../../controllers/event/eventController");

router.use(auth); // Apply auth middleware to all routes in this router

router.get("/", async (req, res) => {
  // Retrieve events belonging to the authenticated user
  try {
    const events = await Event.find()
    .populate('user', 'firstName lastName')
    .populate('selectedClients', 'firstName lastName');;
    res.status(200).json(events);
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id/show", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findOne({ _id: id, user: req.user.id });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    handleError(err, res);
  }
});

/*router.post("/", async (req, res) => {
  // Create a new event associated with the authenticated user
  try {
    const newEvent = new Event({ ...req.body, user: req.user.id });
    await newEvent.save();
    res.status(200).json(newEvent);
  } catch (err) {
    handleError(err, res);
  }
});*/

router.post("/", async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, user: req.user.id });
    await newEvent.save();

    // Debugging: Check if the event is saved correctly
    //console.log('Event Saved:', newEvent);

    const populatedEvent = await Event.findById(newEvent._id)
                                      .populate('user', 'firstName lastName')
                                      .populate('selectedClients', 'firstName lastName');
    // Debugging: Check what the populated event looks like
    console.log('Populated Event:', populatedEvent);
  
    res.status(200).json(populatedEvent);
  } catch (err) {
    console.log(err);  // More detailed error logging
    handleError(err, res);
  }
});


router.put("/:id/update", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findOne({ _id: id });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    Object.assign(event, req.body);
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findOne({ _id: id });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await Event.findByIdAndRemove(id);
    res.status(200).json("Event has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

router.route('/:id').get(auth,getEventById)



module.exports = router;
