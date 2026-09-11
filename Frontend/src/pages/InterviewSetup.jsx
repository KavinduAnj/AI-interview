import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewSetup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobRole: "",
        interviewType: "",
        difficulty: "",
        numberOfQuestions: 5
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Interview Setup:", formData);

        // For now, just move to the interview page
        navigate("/interview");
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Interview Setup
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Customize your interview before you begin
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Job Role */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Job Role
                        </label>

                        <select
                            name="jobRole"
                            value={formData.jobRole}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        >
                            <option value="">
                                Select a job role
                            </option>
                            <option value="Software Engineer">
                                Software Engineer
                            </option>
                            <option value="Frontend Developer">
                                Frontend Developer
                            </option>
                            <option value="Backend Developer">
                                Backend Developer
                            </option>
                            <option value="Full Stack Developer">
                                Full Stack Developer
                            </option>
                            <option value="Data Analyst">
                                Data Analyst
                            </option>
                        </select>
                    </div>

                    {/* Interview Type */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Interview Type
                        </label>

                        <select
                            name="interviewType"
                            value={formData.interviewType}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        >
                            <option value="">
                                Select interview type
                            </option>
                            <option value="Technical">
                                Technical
                            </option>
                            <option value="Behavioral">
                                Behavioral
                            </option>
                            <option value="Mixed">
                                Mixed
                            </option>
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Difficulty
                        </label>

                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        >
                            <option value="">
                                Select difficulty
                            </option>
                            <option value="Easy">
                                Easy
                            </option>
                            <option value="Medium">
                                Medium
                            </option>
                            <option value="Hard">
                                Hard
                            </option>
                        </select>
                    </div>

                    {/* Number of Questions */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Number of Questions
                        </label>

                        <select
                            name="numberOfQuestions"
                            value={formData.numberOfQuestions}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        >
                            <option value={5}>5 Questions</option>
                            <option value={10}>10 Questions</option>
                            <option value={15}>15 Questions</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                    >
                        Start Interview
                    </button>

                </form>
            </div>
        </div>
    );
}

export default InterviewSetup;