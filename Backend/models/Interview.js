const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            reuired: true
        },
        jobRole: {
            type: String,
            required: true
        },
        interviewType: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        answers: [
            {
                question: {
                    type: String,
                    required: true
                },
                answer: {
                    type: String,
                    required: true
                },
                evaluation: {
                    score: {
                        type: Number,
                        required: true
                    },
                    strengths: [String],
                    weaknesses: [String],
                    suggestions: [String]
                }
            }
        ],
        overallScore: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Interview", interviewSchema);