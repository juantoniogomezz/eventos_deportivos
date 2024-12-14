const express = require("express");
const router = express.Router();

router.use("/users", require("./api_routes/user.routes"));
router.use("/events", require("./api_routes/event.routes"));

module.exports = router;