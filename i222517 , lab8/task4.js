const express = require('express');
const app = express();
const PORT = 3004;

app.use(express.json());


// Task 4: Input Validation Middleware

let astronauts = [
    { name: "Ayesha Khan", specialization: "Pilot", skillLevel: "Advanced" },
    { name: "Omar Malik", specialization: "Robotics Engineer", skillLevel: "Intermediate" },
    { name: "Sara Ali", specialization: "Space Medicine", skillLevel: "Expert" }
];
let missions = [];

// Task 4: Input Validation Middleware for POST /missions
const validateMission = (req, res, next) => {
    const { missionName, crew } = req.body;
    if (!missionName || !crew) {
        return res.status(400).send("400 Invalid Request: Required fields missing");
    }
    next();
};

app.post('/missions', validateMission, (req, res) => {
    const { missionName, crew } = req.body;

    // Validations implementation
    let missionCapabilityScore = 0;
    for (let crewMemberName of crew) {
        const astronaut = astronauts.find(a => a.name === crewMemberName);
        if (!astronaut) {
            return res.status(400).json({ error: `Astronaut ${crewMemberName} does not exist.` });
        }

        const isAssigned = missions.some(m => m.crew.includes(crewMemberName));
        if (isAssigned) {
            return res.status(400).json({ error: `Astronaut ${crewMemberName} is already assigned to another mission.` });
        }

        if (astronaut.skillLevel === "Expert") missionCapabilityScore += 60;
        else if (astronaut.skillLevel === "Advanced") missionCapabilityScore += 50;
        else if (astronaut.skillLevel === "Intermediate") missionCapabilityScore += 30;
        else missionCapabilityScore += 20;
    }

    const newMission = {
        missionName,
        crew,
        missionCapabilityScore
    };

    missions.push(newMission);
    res.status(201).json(newMission);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Task 4 Server is running on http://localhost:${PORT}`);
});
