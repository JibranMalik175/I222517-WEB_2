const express = require('express');
const app = express();
const PORT = 3005;

app.use(express.json());


// Task 5: Request Time Middleware

const addRequestTime = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
};
app.use(addRequestTime);

// Route to get the request time
app.get('/request-time', (req, res) => {
    res.send(`This request was received at: ${req.requestTime}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Task 5 Server is running on http://localhost:${PORT}`);
});
