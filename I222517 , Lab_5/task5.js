// Task 5: Username Formatter & Validator
console.log("\n--- Task 5: Username Formatter & Validator ---");

function cleanUsername(name) {

    return name.trim().toLowerCase().replace(/\s+/g, "_");
}

function validateUsername(name) {
    const cleaned = cleanUsername(name);
    
    if (cleaned.length < 5 || cleaned.length > 20) return false;
  
    if (!/^[a-z]/.test(cleaned)) return false;

    if (!/^[a-z0-9_]+$/.test(cleaned)) return false;

    return true;
}

// Testing
const uName = " AHMAD_kHan123 ";
console.log("Original:", uName);
console.log("Cleaned:", cleanUsername(uName));
console.log("Valid:", validateUsername(uName));
