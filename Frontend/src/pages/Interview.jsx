import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {
    const navigate = useNavigate();

    const setup = JSON.parse(
    localStorage.getItem("interviewSetup"));

    const questions = [
        "Tell me about yourself.",
        "What are your strengths and weaknesses?",
        "Why do you want to work for our company?",
        "Describe a challenging situation you've faced and how you handled it.",
        "Where do you see yourself in five years?",
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    const handleNext = () => {
        const updatedAnswers = [...answers,
            {question: questions[currentQuestion],
                answer: answer}];
        setAnswers(updatedAnswers);

        if(currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer("");
        }else{
            console.log("Interview completed. Answers:", updatedAnswers);
            navigate("/results");
        }
     };

     return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">
                        AI Interview Practice
                    </h1>
                    <p>Job Role: {setup?.jobRole}</p>
<p>Interview Type: {setup?.interviewType}</p>
<p>Difficulty: {setup?.difficulty}</p>
<p>Questions: {setup?.numberOfQuestions}</p>

                    <span className="text-gray-500">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                    <div
                        className="bg-black h-2 rounded-full transition-all"
                        style={{
                            width: `${((currentQuestion + 1) / questions.length) * 100}%`
                        }}
                    ></div>
                </div>

                {/* Question */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                        {questions[currentQuestion]}
                    </h2>
                </div>

                {/* Answer */}
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full min-h-40 border rounded-lg p-4 mb-6"
                />

                <button
                    onClick={handleNext}
                    disabled={!answer.trim()}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                    {currentQuestion === questions.length - 1
                        ? "Finish Interview"
                        : "Next Question"}
                </button>

            </div>
        </div>
    );
     
        
    }
    export default Interview;
