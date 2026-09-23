import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Interview() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [setup, setSetup] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const savedSetup = localStorage.getItem("interviewSetup");

        if (!savedSetup) {
            navigate("/interview-setup");
            return;
        }

        setSetup(JSON.parse(savedSetup));
    }, [navigate]);

    useEffect(() => {
        if (setup && token) {
            startInterview();
        }
    }, [setup, token]);

    const startInterview = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/interviews/start",
                setup,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Interview started:", response.data);

            const generatedQuestions = response.data.questions;

            const questionList = generatedQuestions
                .split("\n")
                .map((question) => question.trim())
                .filter((question) => question !== "");

            setQuestions(questionList);

        } catch (error) {
            console.error(
                error.response?.data?.message ||
                "Failed to start interview"
            );

            setError(
                error.response?.data?.message ||
                "Failed to start interview"
            );
        } finally {
            setLoading(false);
        }
    };

    const evaluateCurrentAnswer = async () => {
        const response = await api.post(
            "/interviews/evaluate",
            {
                jobRole: setup.jobRole,
                question: questions[currentQuestion],
                answer: answer
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("AI Evaluation:", response.data.evaluation);
    };

    const handleNext = async () => {
        await evaluateCurrentAnswer();
        const newAnswer = {
            question: questions[currentQuestion],
            answer: answer
        };

        const updatedAnswers = [
            ...answers,
            newAnswer
        ];

        setAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer("");
        } else {
            console.log("Interview completed:", updatedAnswers);

            navigate("/results");
        }
    };

    if (!setup || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Generating your interview questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">{error}</p>

                <button
                    onClick={() => navigate("/interview-setup")}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Back to Interview Setup
                </button>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>No questions were generated.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    AI Interview
                </h1>

                <div className="mb-6 p-4 bg-gray-100 rounded">
                    <p>
                        <strong>Job Role:</strong>{" "}
                        {setup.jobRole}
                    </p>

                    <p>
                        <strong>Interview Type:</strong>{" "}
                        {setup.interviewType}
                    </p>

                    <p>
                        <strong>Difficulty:</strong>{" "}
                        {setup.difficulty}
                    </p>

                    <p>
                        <strong>Questions:</strong>{" "}
                        {questions.length}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-500">
                        Question {currentQuestion + 1} of{" "}
                        {questions.length}
                    </p>
                </div>

                <div className="p-6 border rounded-lg">

                    <h2 className="text-xl font-semibold mb-6">
                        {questions[currentQuestion]}
                    </h2>

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full h-40 p-4 border rounded-lg"
                    />

                    <button
                        onClick={handleNext}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
                    >
                        {currentQuestion === questions.length - 1
                            ? "Finish Interview"
                            : "Next Question"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Interview;