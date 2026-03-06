const express = require('express');
const app = express();
const PORT = 3001; // Using 3001 to avoid conflict

// small array of student objects
const students = [
    { "id": 1, "name": "Ali", "semester": 5 },
    { "id": 2, "name": "Sara", "semester": 3 },
    { "id": 3, "name": "Ahmed", "semester": 8 }
];

app.get('/students', (req, res) => {
    const queryName = req.query.name;

    if (queryName) {
        // Search logic
        const matchedStudents = students.filter(s => s.name.toLowerCase() === queryName.toLowerCase());
        if (matchedStudents.length > 0) {
            res.json(matchedStudents);
        } else {
            res.send('No student found');
        }
    } else {
        // Return all
        res.json(students);
    }
});

app.listen(PORT, () => {
    console.log(`Task 7 Server is running on http://localhost:${PORT}`);
});
