const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.json());


// Task 3: Request Counter Middleware

let requestCount = 0;

const countRequests = (req, res, next) => {
    requestCount++;
    next();
};
app.use(countRequests); // Increment count for every request

// Route to get the total number of API requests
app.get('/stats', (req, res) => {
    res.send(`Total API Requests: ${requestCount}`);
});

// General route to trigger the counter
app.get('/', (req, res) => {
    res.send('Send requests here to increment the counter and check /stats');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Task 3 Server is running on http://localhost:${PORT}`);
});
