// Task 3: Movie Collection Manager
console.log("\n--- Task 3: Movie Collection Manager ---");
const movies = [];

function addMovie(title, director, genre, year) {
    movies.push({ title, director, genre, year });
}

function listMovies() {
    console.log(movies.map(movie => `${movie.title} by ${movie.director} (${movie.year}) - ${movie.genre}`).join("\n"));
}

function searchByDirector(director) {
    return movies.filter(movie => movie.director.toLowerCase() === director.toLowerCase());
}

function searchByGenre(genre) {
    return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
}

// Testing Task 3
addMovie("Inception", "Christopher Nolan", "Sci-Fi", 2010);
addMovie("Interstellar", "Christopher Nolan", "Sci-Fi", 2014);
addMovie("Parasite", "Bong Joon-ho", "Thriller", 2019);
listMovies();
console.log("Nolan Movies:", searchByDirector("Christopher Nolan"));
