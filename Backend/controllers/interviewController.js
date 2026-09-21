const {
    generateInterviewQuestions, evaluateAnswer
} = require("../services/aiService");

const startInterview = async (req, res) => {
    try {
        const {
            jobRole,
            interviewType,
            difficulty,
            numberOfQuestions
        } = req.body;

        if (
            !jobRole ||
            !interviewType ||
            !difficulty ||
            !numberOfQuestions
        ) {
            return res.status(400).json({
                message: "All interview settings are required"
            });
        }

        const questions = await generateInterviewQuestions(
            jobRole,
            interviewType,
            difficulty,
            numberOfQuestions
        );

        console.log("Generated questions:", questions);

        res.status(200).json({
            message: "Interview started successfully",
            settings: {
                jobRole,
                interviewType,
                difficulty,
                numberOfQuestions
            },
            questions
        });

    } catch (error) {
        console.error("Interview error:", error);

        res.status(500).json({
            message: "Failed to generate interview questions"
        });
    }
};

const evaluateInterviewAnswer = async (req, res) => {
    try {
        const {
            jobRole,
            question,
            answer
        } = req.body;

        if (!jobRole || !question || !answer) {
            return res.status(400).json({
                message: "Job role, question, and answer are required"
            });
        }

        const evaluation = await evaluateAnswer(
            jobRole,
            question,
            answer
        );

        res.status(200).json({
            evaluation
        });

    } catch (error) {
        console.error("Evaluation error:", error);

        res.status(500).json({
            message: "Failed to evaluate answer"
        });
    }
};

module.exports = {
    startInterview,
    evaluateInterviewAnswer
};