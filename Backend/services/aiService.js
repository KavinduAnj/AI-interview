const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateInterviewQuestions = async (
    jobRole,
    interviewType,
    difficulty,
    numberOfQuestions
) => {
    const prompt = `
Generate ${numberOfQuestions} interview questions for a ${jobRole} position.

Interview type: ${interviewType}
Difficulty: ${difficulty}

Requirements:
- Return only the questions.
- Do not provide answers.
- Do not provide explanations.
- Each question should be on a separate line.
`;

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.3-70b-versatile"
    });

    return response.choices[0].message.content;
};

module.exports = {
    generateInterviewQuestions
};