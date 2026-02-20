// Task 4: Debug & Correct the Code
console.log("\n--- Task 4: Debug & Correct the Code ---");

// A)
console.log("Part A:");
const getAverage = (arr) => {
    let sum = 0;
    arr.forEach(num => sum += num); // Fixed: map -> forEach
    return sum / arr.length;
};
console.log(getAverage([10, 20, 30]));

// B)
console.log("Part B:");
function findLongestWord(str) {
    // Check if string is valid
    if (!str || typeof str !== 'string') return "";

    let words = str.split(" ");
    if (words.length === 0) return "";

    return words.reduce((a, b) => {
        if (a.length > b.length)
            return a;
        else
            return b; // Fixed: Added else case
    });
}
console.log(findLongestWord("JavaScript is very powerful language"));

// C)
console.log("Part C:");
const checkPass = (marks) => {
    // Fixed logic to check if any mark is passing (assuming existing logic intent was 'some')
    if (marks.filter(m => m >= 50).length > 0)
        return "Pass";
    else
        return "Fail";
}
console.log(checkPass([20, 30, 40]));
