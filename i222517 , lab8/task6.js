const express = require('express');
const app = express();
const PORT = 3006;

app.use(express.json());


// Task 6: Wildlife Rescue Mission API

const checkAnimalType = (req, res, next) => {
    const { animalType } = req.body;
    if (!animalType) return res.status(400).json({ error: 'animalType is required' });

    req.animalType = animalType.toLowerCase();
    next();
};

// Middleware to check severity level
const checkSeverityLevel = (req, res, next) => {
    const { severity } = req.body;
    if (!severity) return res.status(400).json({ error: 'severity is required' });

    req.severity = severity.toLowerCase();
    next();
};

// Middleware to check resource availability
const checkResourceAvailability = (req, res, next) => {
    // Simulating resource availability based on severity
    if (req.severity === 'severe') {
        req.resourcesSufficient = Math.random() > 0.5; // 50% chance of enough resources
    } else {
        req.resourcesSufficient = true;
    }
    next();
};

// Middleware to determine mission outcome
const determineMissionOutcome = (req, res, next) => {
    if (!req.resourcesSufficient) {
        req.outcome = 'unsuccessful due to lack of resources';
    } else if (req.severity === 'severe') {
        req.outcome = 'delayed';
    } else {
        req.outcome = 'success';
    }
    next();
};

app.post('/rescue-mission', checkAnimalType, checkSeverityLevel, checkResourceAvailability, determineMissionOutcome, (req, res) => {
    res.json({
        message: 'Rescue mission processed',
        outcome: req.outcome
    });
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred!' });
};
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Task 6 Server is running on http://localhost:${PORT}`);
});
