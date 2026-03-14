const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

// ==========================================================
// Task 2: Space Mission Crew Management System
// ==========================================================
let astronauts = [
    { name: "Ayesha Khan", specialization: "Pilot", skillLevel: "Advanced" },
    { name: "Omar Malik", specialization: "Robotics Engineer", skillLevel: "Intermediate" },
    { name: "Sara Ali", specialization: "Space Medicine", skillLevel: "Expert" }
];

let missions = [];

app.get('/astronauts', (req, res) => {
    const assignedAstronauts = new Set();
    missions.forEach(m => m.crew.forEach(c => assignedAstronauts.add(c)));
    
    const availableAstronauts = astronauts.filter(a => !assignedAstronauts.has(a.name));
    res.json(availableAstronauts);
});

app.post('/missions', (req, res) => {
    const { missionName, crew } = req.body;
    
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

app.get('/missions/:missionName', (req, res) => {
    const mission = missions.find(m => m.missionName === req.params.missionName);
    if (!mission) {
        return res.status(404).send('Mission not found');
    }
    res.json(mission);
});

app.delete('/missions/:missionName', (req, res) => {
    const missionIndex = missions.findIndex(m => m.missionName === req.params.missionName);
    if (missionIndex === -1) {
        return res.status(404).send('Mission not found');
    }
    
    missions.splice(missionIndex, 1);
    res.send(`Mission "${req.params.missionName}" has been successfully cancelled.`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Task 2 Server is running on http://localhost:${PORT}`);
});
