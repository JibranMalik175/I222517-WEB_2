const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// ==========================================================
// Task 1: University Course Registration API
// ==========================================================
let courses = [
    { id: 1, name: "Data Structures", seats: 30 },
    { id: 2, name: "Operating Systems", seats: 25 }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('Course not found');
    }
    res.json(course);
});

app.post('/courses', (req, res) => {
    const { name, seats } = req.body;
    if (!name || seats === undefined) {
        return res.status(400).send('Missing required fields: name and seats');
    }
    
    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        name,
        seats
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
    const { seats } = req.body;
    if (seats === undefined) {
        return res.status(400).send('Missing required fields: seats');
    }
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('Course not found');
    }
    
    course.seats = seats;
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }
    
    courses.splice(courseIndex, 1);
    res.send('Course deleted successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Task 1 Server is running on http://localhost:${PORT}`);
});
