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
        model: "openai/gpt-oss-20b"
    });

    return response.choices[0].message.content;
};
const evaluateAnswer = async (
    jobRole, question, answer
) => {
    const prompt = `
You are an interview evaluator.

Job role: ${jobRole}

Interview question:
${question}

Return ONLY valid JSON in this exact format:

{
  "score": 8,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "suggestions": ["suggestion 1", "suggestion 2"]
}

Rules:
- score must be a number from 0 to 10
- strengths, weaknesses, and suggestions must be arrays of short strings
- Do not include markdown
- Do not include explanations outside the JSON
`;

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "openai/gpt-oss-20b"
    })

    console.log("AI Evaluation:", response.choices[0].message.content);
    return response.choices[0].message.content;
}

module.exports = {
    generateInterviewQuestions, evaluateAnswer
};