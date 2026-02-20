// Task 1: Weekly Fitness Tracker
console.log("\n--- Task 1: Weekly Fitness Tracker ---");
let weeklySteps = [4500, 6200, 5800, 7100, 4900, 8300, 6700];

function addSteps(dayIndex, steps) {
    if (dayIndex >= 0 && dayIndex < 7) {
        weeklySteps[dayIndex] = steps;
    } else {
        console.log("Invalid day index");
    }
}

function getHighestSteps() {
    return Math.max(...weeklySteps);
}

function getLowestSteps() {
    return Math.min(...weeklySteps);
}

function getAverageSteps() {
    const sum = weeklySteps.reduce((acc, curr) => acc + curr, 0);
    return sum / weeklySteps.length;
}

function getAboveAverageDays() {
    const avg = getAverageSteps();
    return weeklySteps.filter(step => step > avg);
}

console.log("Highest Steps:", getHighestSteps());
console.log("Lowest Steps:", getLowestSteps());
console.log("Average Steps:", getAverageSteps());
console.log("Days with Above Average Steps:", getAboveAverageDays());
