const express = require("express");
const router = express.Router();

const { startInterview, evaluateInterviewAnswer } = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/start", protect, startInterview);
router.post("/evaluate", protect, evaluateInterviewAnswer);

module.exports = router;