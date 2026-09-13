const express = require("express");
const router = express.Router();

const {startInterview} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/start",protect, startInterview);

module.exports = router;