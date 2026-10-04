import { useLocation } from "react-router-dom";

function Results() {
    const location = useLocation();
    const { answers, setup } = location.state || {};
    const totalScore = answers?.reduce(
        (total,item) => total +item.evaluation.score,0
    )
    const averageScore = answers?.length
    ? totalScore / answers.length
    : 0;
    return (
        <>
            <h1 className="text-3xl font-bold">Interview results</h1>
            <p>Job role:{setup.jobRole}</p>
            <p className="text-gray-500">Overall Score</p>
            <p className="text-4xl font-bold">
                {averageScore.toFixed(1)} / 10
            </p>
            <div className="mt-6">
                {answers?.map((item, index) =>(
                    <div key={index} className="p-4 border rounded-lg">
                        <p className="font-semibold">Question {index + 1}</p>
                        <p className="mt-2">{item.question}</p>
                        <p className="mt-3 font-bold">Score: {item.evaluation.score}/10</p>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Results;
