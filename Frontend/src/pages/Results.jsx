import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import api from "../services/api";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { answers, setup } = location.state || {};
    const totalScore = answers?.reduce(
        (total, item) => total + item.evaluation.score, 0
    )
    const averageScore = answers?.length
        ? totalScore / answers.length
        : 0;

    const saveInterview = async () => {
        try {
            const response = await api.post(
                "/interviews/save",
                {
                    ...setup,
                    answers,
                    overallScore: Number(averageScore.toFixed(1))
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data.message);
        } catch (error) {
            console.error(
                error.response?.data?.message ||
                "Failed to save interview"
            );
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold">Interview results</h1>
            <p>Job role:{setup.jobRole}</p>
            <p className="text-gray-500">Overall Score</p>
            <p className="text-4xl font-bold">
                {averageScore.toFixed(1)} / 10
            </p>
            <div className="mt-6">
                {answers?.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                        <p className="font-semibold">Question {index + 1}</p>
                        <p className="mt-2">{item.question}</p>
                        <div className="mt-3">
                            <p className="font-semibold">Your Answer:</p>
                            <p className="text-gray-600">
                                {item.answer}
                            </p>
                        </div>
                        <p className="mt-3 font-bold">Score: {item.evaluation.score}/10</p>
                        <div className="mt-3">
                            <p className="font-semibold">Strengths:</p>

                            <ul className="list-disc pl-6 text-green-700">
                                {item.evaluation.strengths.map((strength, i) => (
                                    <li key={i}>{strength}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Weaknesses:</p>

                            <ul className="list-disc pl-6 text-red-700">
                                {item.evaluation.weaknesses.map((weakness, i) => (
                                    <li key={i}>{weakness}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-3">
                            <p className="font-semibold">Improvement Suggestions:</p>

                            <ul className="list-disc pl-6 text-blue-700">
                                {item.evaluation.suggestions.map((suggestion, i) => (
                                    <li key={i}>{suggestion}</li>
                                ))}
                            </ul>
                        </div>

                    </div>

                ))}
            </div>

            <button onClick={() => navigate("/dashboard")} className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                Back to Dashboard   </button>

        </>
    );
}
export default Results;
