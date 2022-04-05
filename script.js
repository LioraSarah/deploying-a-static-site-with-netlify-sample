const tmdbKey = '57f35ba837cf6f55eb5d266b63119aac';
const tmdbBaseUrl = 'https://api.themoviedb.org/3/';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = "?api_key=" + tmdbKey;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }

  } catch (error) {
    console.error(error);
  }
};

const getMovies = async () => {
  const randomPage = (Math.floor(Math.random() * 1000) + 1);
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "discover/movie";
  const requestParams = "?api_key=" + tmdbKey + "&page=" + randomPage + "&with_genres=" + selectedGenre;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch); 

    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }

  } catch (error) {

    console.error(error);

  }

};

const getMovieInfo = async (movie) => {

  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = "?api_key=" + tmdbKey;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {

    const response = await fetch(urlToFetch);

    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }

  } catch (error) {
    console.log(error);
  }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  try {

    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);

  } catch (error) {

        console.log(error);
        document.getElementById("moviePoster").innerHTML = "Sorry, Movie could not load: please try again!";

  }
  
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
