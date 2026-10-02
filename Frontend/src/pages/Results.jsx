import { useLocation } from "react-router-dom";

function Results() {
    const location = useLocation();
    const { answers, setup } = location.state || {};
    console.log("Results data:", {
        answers,
        setup
    });
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
            <p>Total score: {totalScore}</p>
            <p>Average score: {averageScore.toFixed(2)}</p>
        </>
    );
}
export default Results;
