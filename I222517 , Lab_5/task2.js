// Task 2: Conference Attendee Management
console.log("\n--- Task 2: Conference Attendee Management ---");
const attendees = [];
const MAX_CAPACITY = 100;

function addAttendee(name, email, ticketType) {
    if (attendees.length < MAX_CAPACITY) {
        attendees.push({ name, email, ticketType });
        console.log(`Attendee ${name} added.`);
    } else {
        console.log("Conference is full.");
    }
}

function isFull() {
    return attendees.length >= MAX_CAPACITY;
}

function listAttendees() {
    attendees.forEach(attendee => {
        console.log(`Name: ${attendee.name}, Email: ${attendee.email}, Ticket: ${attendee.ticketType}`);
    });
}

function countByTicketType(type) {
    return attendees.filter(a => a.ticketType === type).length;
}

// Testing Task 2
addAttendee("Alice", "alice@example.com", "VIP");
addAttendee("Bob", "bob@example.com", "General");
listAttendees();
console.log("VIP Count:", countByTicketType("VIP"));
