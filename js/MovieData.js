class MovieData {
	static idCount = 0;
	static allMoviesList = [];

	static get allGenres() {
		return [
			"Action",
			"Adventure",
			"Animation",
			"Biopic",
			"Comedy",
			"Crime",
			"Drama",
			"Fantasy",
			"Horror",
			"Romance",
			"Science Fiction",
			"Thriller"
		];
	}

	static get allMovies() {
		return this.allMoviesList.map(v => v.getAsJSONObject());
	}

	static addMovieByObject(movie = {}) {
		this.addMovie(
			movie["name"],
			movie["ytTrailerId"],
			movie["poster"],
			movie["plot"],
			movie["genres"],
			movie["release"],
			movie["cast"],
			movie["directors"],
			movie["imdb"],
			movie["duration"],
			movie["ageRating"]
		);
	}

	static addMovie(name, trailer, poster, plot, genresList, releaseDate, castList, directorsList, imdbRating, durationMinutes, ageRating) {
		this.idCount++;

		let genres = this.allGenres;
		let validGenres = genresList.map(
			(value) => {
				if (genres.includes(value)) {
					return value;
				}
			}
		);

		let m = new Movie(this.idCount, name, trailer, poster, plot, validGenres, releaseDate, castList, directorsList, imdbRating, durationMinutes, ageRating);
		this.allMoviesList.push(m);
	}

	static searchByMovieNameNGenres(name = "", genreNames = [], offset = 0, limit = 20) {
		let moviesFound = [];

		for (const movie of this.allMoviesList) {
			if (movie.name.indexOf(name) != 1) {
				let hasGenres = genreNames.every(v => movie.genres.includes(v));

				if (hasGenres) {
					moviesFound.push(movie.getAsJSONObject());
				}
			}
		}

		return moviesFound.slice(offset, limit);
	}

	static getMoviesOfGenre(genreName = "", offset = 0, limit = 20) {

		// Check if the passed genre actually exists
		let genre = "";
		for (const g in this.allGenres) {
			if (Object.hasOwnProperty.call(this.allGenres, g)) {
				if (g === genreName) {
					genre = genreName;
					break;
				}
			}
		}

		if (genre != "") return null;
		return this.searchByMovieName("", [genre], offset, limit);
	}

	static getMovieById(id = -1) {
		if (id === -1) {
			return null;
		}

		for (const movie of this.allMoviesList) {
			if (movie.id === id) {
				return movie.getAsJSONObject();
			}
		}

		return null;
	}
}

class Movie {
	constructor(id = 0, name = "", ytTrailerId = "", posterLocation = "", plot = "", genresList = [], releaseDate = new Date(0), castList = [], directorsList = [], imdbRating = 0, duration = 0, ageRating = "") {
		this.id = id;
		this.name = name;
		this.trailerLocation = ytTrailerId;
		this.posterLocation = posterLocation;
		this.plot = plot;

		this.genres = genresList;
		this.releaseDate = releaseDate;
		this.cast = castList;
		this.directors = directorsList;
		this.imdb = imdbRating;
		this.duration = duration;
		this.ageRating = ageRating;

		this.userRating = 0;
		this.totalUsers = 0;
	}

	addUserRating(rating) {
		this.userRating += rating;
		this.totalUsers++;
	}

	getAsJSONObject() {
		return {
			"id": this.id,
			"name": this.name,
			"ytTrailerId": this.trailerLocation,
			"poster": this.posterLocation,
			"plot": this.plot,
			"genres": this.genres,
			"releaseDate": this.releaseDate,
			"cast": this.cast,
			"directors": this.directors,
			"imdb": this.imdb,
			"duration": this.duration,
			"ageRating": this.ageRating,
			"avgUserRating": (this.userRating / this.totalUsers)
		};
	}
}

(function addMovies() {
	let movies = [
		{
			"name": "Avengers: Endgame",
			"ytTrailerId": "TcMBFSGVi1c",
			"poster": "",
			"plot": "Avengers - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus est in libero ornare tempor. Cras convallis orci ut nunc interdum, tristique rutrum nisi suscipit. Morbi molestie id velit et rutrum. Suspendisse convallis orci nunc, vitae tempus erat mollis nec. Cras a blandit nunc, vel ullamcorper odio. Nam imperdiet mauris et leo euismod, euismod eleifend metus gravida. Cras ac tincidunt eros, id tristique sapien.",
			"genres": ["Action", "Science Fiction"],
			"release": new Date(2019, 4, 26),
			"cast": ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr."],
			"directors": ["Anthony Russo", "Joey Russo"],
			"imdb": 8.4,
			"duration": 181,
			"ageRating": "PG-13",
		},
		{
			"name": "John Wick: Chapter 3 - Parabellum",
			"ytTrailerId": "M7XM597XO94",
			"poster": "",
			"plot": "John - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus est in libero ornare tempor. Cras convallis orci ut nunc interdum, tristique rutrum nisi suscipit. Morbi molestie id velit et rutrum. Suspendisse convallis orci nunc, vitae tempus erat mollis nec. Cras a blandit nunc, vel ullamcorper odio. Nam imperdiet mauris et leo euismod, euismod eleifend metus gravida. Cras ac tincidunt eros, id tristique sapien.",
			"genres": ["Action", "Crime", "Thriller"],
			"release": new Date(2019, 5, 9),
			"cast": ["Anjelica Houston", "Keanu Reaves"],
			"directors": ["Chad Stahelski"],
			"imdb": 7.5,
			"duration": 131,
			"ageRating": "R",
		},
		{
			"name": "A Silent Voice",
			"ytTrailerId": "nfK6UgLra7g",
			"poster": "",
			"plot": "Silent - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus est in libero ornare tempor. Cras convallis orci ut nunc interdum, tristique rutrum nisi suscipit. Morbi molestie id velit et rutrum. Suspendisse convallis orci nunc, vitae tempus erat mollis nec. Cras a blandit nunc, vel ullamcorper odio. Nam imperdiet mauris et leo euismod, euismod eleifend metus gravida. Cras ac tincidunt eros, id tristique sapien.",
			"genres": ["Animation", "Drama"],
			"release": new Date(2019, 6, 5),
			"cast": ["Aoi Yuki", "Miyu Irino", "Saori Hayami"],
			"directors": ["Aoi Yuki", "Koichi Yamadera"],
			"imdb": 8.2,
			"duration": 130,
			"ageRating": "N/A",
		},
		{
			"name": "The Jungle Book",
			"ytTrailerId": "HcgJRQWxKnw",
			"poster": "",
			"plot": "Mowgli - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus est in libero ornare tempor. Cras convallis orci ut nunc interdum, tristique rutrum nisi suscipit. Morbi molestie id velit et rutrum. Suspendisse convallis orci nunc, vitae tempus erat mollis nec. Cras a blandit nunc, vel ullamcorper odio. Nam imperdiet mauris et leo euismod, euismod eleifend metus gravida. Cras ac tincidunt eros, id tristique sapien.",
			"genres": ["Adventure", "Fantasy"],
			"release": new Date(2016, 4, 15),
			"cast": ["Bill Murray", "Christopher Walken"],
			"directors": ["Jon Favreau"],
			"imdb": 7.4,
			"duration": 106,
			"ageRating": "PG",
		},
		{
			"name": "Harry Potter and the Goblet of Fire",
			"ytTrailerId": "4xkFJgcCQRE",
			"poster": "",
			"plot": "Magic - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus est in libero ornare tempor. Cras convallis orci ut nunc interdum, tristique rutrum nisi suscipit. Morbi molestie id velit et rutrum. Suspendisse convallis orci nunc, vitae tempus erat mollis nec. Cras a blandit nunc, vel ullamcorper odio. Nam imperdiet mauris et leo euismod, euismod eleifend metus gravida. Cras ac tincidunt eros, id tristique sapien.",
			"genres": ["Adventure", "Fantasy"],
			"release": new Date(2005, 11, 18),
			"cast": ["Daniel Radcliffe", "Emma Watson"],
			"directors": ["Mike Newell"],
			"imdb": 7.7,
			"duration": 157,
			"ageRating": "PG-13",
		},
	];

	for (const movie of movies) {
		MovieData.addMovieByObject(movie);
	}
})();
