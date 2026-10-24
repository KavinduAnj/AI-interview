const express = require("express");
const router = express.Router();

const { startInterview, evaluateInterviewAnswer, saveInterview } = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/start", protect, startInterview);
router.post("/evaluate", protect, evaluateInterviewAnswer);
router.post("/save", protect, saveInterview);

module.exports = router;