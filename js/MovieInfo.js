function getDateString(d = new Date()) {
	return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

(function setMovieDetails() {
	// Get movie Data
	let movieId = getFromThisURL()["id"] || -1;
	movieId = Number.parseInt(movieId);
	const movieData = MovieData.getMovieById(movieId);

	if (movieData == null) {
		// No movie found
		return;
	}

	// Avg rating will be NaN when no user has given a rating
	let avgRating = (isNaN(movieData["avgUserRating"]))
			? "N/A"
			: movieData["avgUserRating"].toString() + "/5";

	const getFromMovieDetails = (idName) => {
		let sel = ".movie-details #" + idName + " .info";
		return document.querySelector(sel);
	};

	// Get HTML elemets and set the data in them
	const movieDetailsWraps = {
		"title": document.getElementById("movie-title"),
		"trailerIframe": document.getElementById("movie-trailer-video"),
		"genre": getFromMovieDetails("movie-genre"),
		"releaseDate": getFromMovieDetails("movie-release-date"),
		"cast": getFromMovieDetails("movie-cast"),
		"director": getFromMovieDetails("movie-director"),
		"duration": getFromMovieDetails("movie-duration"),
		"ageRating": getFromMovieDetails("movie-age-rating"),
		"imdb": getFromMovieDetails("movie-imdb"),
		"userRating": getFromMovieDetails("movie-user-rating"),
		"plot": document.getElementById("movie-plot"),
	};

	console.table(movieData);

	movieDetailsWraps["title"].innerHTML = movieData["name"];
	movieDetailsWraps["trailerIframe"].setAttribute("src", "https://www.youtube.com/embed/" + movieData["ytTrailerId"]);
	movieDetailsWraps["genre"].innerHTML = movieData["genres"].join(", ");
	movieDetailsWraps["releaseDate"].innerHTML = getDateString(movieData["releaseDate"]);
	movieDetailsWraps["cast"].innerHTML = movieData["cast"].join(", ");
	movieDetailsWraps["director"].innerHTML = movieData["directors"].join(", ");
	movieDetailsWraps["duration"].innerHTML = movieData["duration"].toString() + " min";
	movieDetailsWraps["ageRating"].innerHTML = movieData["ageRating"];
	movieDetailsWraps["imdb"].innerHTML = movieData["imdb"].toString() + "/10";
	movieDetailsWraps["userRating"].innerHTML = avgRating;
	movieDetailsWraps["plot"].innerHTML = movieData["plot"];
})();