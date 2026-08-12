require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require("./config/db");
app.use(cors());
app.use(express.json());
connectDB();

app.get("/",(req, res) => {
    res.json({
        message: "AI interview API is running"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
