const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req, res) => {
    res.json({
        message: "AI interview API is running"
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
