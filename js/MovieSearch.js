const movieName = getFromThisURL()["movie-name"]?.[0] || "";

var genreFilterCheckboxes = [];

const filterSection = document.getElementById("filter-chooser-section");
const appliedFilterSection = document.querySelector(".all-applied-filters");

const movieGrid = document.querySelector(".movies-grid");

const setGenreFilterCheckboxes = () => {
	genreFilterCheckboxes = [...document.querySelectorAll("#genre-filters-list input[type=checkbox]")];
}

const setFiltersChecked = (genres = []) => {
	genreFilterCheckboxes.forEach(
		(cb) => {
			if (genres.includes(cb.value)) {
				cb.checked = true;
			}
		}
	);
}

const getFilterWrapHTML = (filterName = "", filterValue = "") => {
	return `
		<div class="filter-wrap">
			<input type="checkbox" value="${filterValue}">
			<label>${filterName}</label>
		</div>
	`;
};

const getFilterListHTML = (listTitle = "", listId = "", filterNames = [""], filterValues = [""]) => {
	let html = "";

	for (let i = 0; i < filterNames.length; i++) {
		html += getFilterWrapHTML(filterNames[i], filterValues[i]);
	}

	return `
		<div class="filters-list" id="${listId}">
			<div class="list-title">${listTitle}</div>
			${html}
		</div>
	`;
};

const getAppliedFilterHTML = (filterName = "", filterValue="") => {
	return `
		<div class="applied-filter">
			<input type="hidden" value="${filterValue}">
			<button class="remove-filter far fa-times-circle" onclick="closeAppliedFilter(this)"></button>
			<div class="filter-name">${filterName}</div>
		</div>
	`;
}

const getMovieCardHTML = (movieObj = {}) => {
	return `
		<div class="movie-card" title="${movieObj["name"]}">
			<div class="movie-poster">
				<img src="${movieObj["poster"]}" alt="Movie Poster">
			</div>
			<div class="movie-title">
				${movieObj["name"]}
			</div>
		</div>
	`;
}



const openFilterSection = () => {
	filterSection.classList.add("open");
}

const closeFilterSection = () => {
	filterSection.classList.remove("open");
}

const closeAppliedFilter = (button) => {
	let value = button.parentElement.getElementsByTagName("input")[0].value;
	button.parentElement.remove();

	let check = genreFilterCheckboxes.find(
		(cb) => {
			if (cb.value === value) {
				cb.checked = false;
				return true;
			}
		}
	);

	applyFilters();
}



const applyFilters = () => {
	let html = "";
	for (const checkbox of genreFilterCheckboxes) {
		if (checkbox.checked) {
			let genre = checkbox.parentElement.querySelector("label").innerHTML;
			let value = checkbox.value;
			html += getAppliedFilterHTML(genre, value);
		}
	}

	appliedFilterSection.innerHTML = html;
	closeFilterSection();
	searchMovie();
}

const searchMovie = () => {
	let genres = genreFilterCheckboxes.reduce(
		(genreArr, cb) => {
			if (cb.checked) {
				genreArr.push(cb.value);
			}
			return genreArr;
		},
		[]
	);

	let moviesFound = MovieData.searchByMovieNameNGenres(movieName, genres, 0);

	let html = moviesFound.reduce(
		(html, movie) => html += getMovieCardHTML(movie),
		""
	);

	movieGrid.innerHTML = html;
}


(function addFiltersOptions() {
	let movieGenreNames = MovieData.genreValues;
	let movieGenreValues = MovieData.genreKeys;
	let filterChooser = document.querySelector(".filter-chooser");

	filterChooser.innerHTML += getFilterListHTML("Genres", "genre-filters-list", movieGenreNames, movieGenreValues);
	setGenreFilterCheckboxes();

	setFiltersChecked(getFromThisURL()["genres"] || []);
	applyFilters();
})();