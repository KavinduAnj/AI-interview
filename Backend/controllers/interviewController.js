const startInterview = async (req, res) => {
    try{
        const{ jobRole, interviewType, difficulty, numberOfQuestions } = req.body;
        if(!jobRole || !interviewType || !difficulty || !numberOfQuestions){
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log("Interview settings received:", { jobRole, interviewType, difficulty, numberOfQuestions });
        res.status(200).json({ message: "Interview started successfully",settings: { jobRole, interviewType, difficulty, numberOfQuestions } });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = { startInterview };