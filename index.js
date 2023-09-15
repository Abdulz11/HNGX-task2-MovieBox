// fetching data
const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
let searchPopular = BASE_URL + "/movie/top_rated?language=en-US&" + API_KEY;

function getMovies(url) {
  fetch(url)
    .then((response) => {
      if (response.status == 404) {
        movieContainer.innerHTML = "<h2 class='err-mess'>Movie not found</h2>";
      }
      if (response.status == 200) {
        movieContainer.innerHTML = "<h2 class='err-mess'>Loading...</h2>";
      }

      return response.json();
    })
    .then((data) => {
      showMovies(data.results);
      console.log(data);
    })
    .catch((err) => console.log(err));
}
getMovies(searchPopular);

// IF OFFLINE
window.addEventListener("offline", () => {
  movieContainer.innerHTML =
    "<h2 class='err-mess'>Connect to the Internet</h2>";
});

// SHOWING MOVIES
let movieContainer = document.getElementById("movie-container");
let movieHero = document.querySelector(".movie-hero");

function showMovies(movies) {
  if (movies.length == 0) {
    movieContainer.innerHTML = "<h2 class='err-mess'>Movie not found</h2>";
    console.log("movie not found");
    return;
  }

  movieContainer.innerHTML = "";
  movieHero.innerHTML = "";
  // let moviesList = movie

  let { title, poster_path, vote_average, overview, backdrop_path } = movies[0];

  movieHero.innerHTML = `
  <div class="img-div" style="background-image='url()'">
        <img
          src="${IMG_URL + backdrop_path}" 
          alt="movie-image"
        />
      </div>
      <div class="hero-info">
        <h1>${title}</h1>
        <div class="ratings">
          <p>${vote_average}</p>
          <p>97%</p>
        </div>
        <p class="synopsis">
          ${overview}
        </p>
        <button>WATCH TRAILER</button>
       
      </div>
  `;
  movies.forEach((movie) => {
    let { title, poster_path, id, release_date, vote_average } = movie;
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie");
    movieCard.innerHTML = `<a onclick="movieSelected('${id}')" href=#>
      <div class="movie-img-div">
        <img src="${IMG_URL + poster_path}" alt="movie poster">
      <div>
    </a>
    <div class="movie-short-info">
      <p>${release_date}</p>
      <h3 class="title">${title}
      </h3>
      <div class="flex-hor">
        <p>${vote_average}
        </p>
        <p>84%</p>
      </div>
      <div>
        <p>Animation,Adventure</p>
      </div>
    </div>`;

    movieContainer.append(movieCard);
  });
}

//SEARCHING FOR MOVIES
let searchBar = document.getElementById("search-bar");
let searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", findMovies);

let searchParam =
  BASE_URL + "/search/movie?language=en-US&" + API_KEY + "&query=";

function findMovies(e) {
  let movieName = searchBar.value.trim();
  e.preventDefault();
  if (movieName) {
    getMovies(searchParam + movieName + "");
  } else if (movieName == "") {
    getMovies(searchPopular);
  }
  movieHeader.innerHTML = `'${searchBar.value}' Movies`;
  searchBar.value = " ";
}

// GETTING INDIVIDUAL MOVIE INFO
function movieSelected(id) {
  // let movieInfoHeader = movieHeader.textContent;
  sessionStorage.setItem("movieId", id);
  console.log(id);
  // sessionStorage.setItem("movieHeader", movieInfoHeader);
  window.location = "movieInfo.html";
}

// links to sidebar
let popular = document.getElementById("popular");
let newRelease = document.getElementById("new");
let highestRated = document.getElementById("rated");

// POPULAR MOVIES
popular.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks("/discover/movie?sort_by=popularity.desc&", "Most Popular");
});
// NEW MOVIES
newRelease.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks("/movie/upcoming?", "New Release");
});
// HIGH RATING MOVIES
highestRated.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks("/movie/top_rated?language=en-US&", "Highest Rated");
});

function navLinks(category, header) {
  getMovies(BASE_URL + category + API_KEY + "&language=en-US");
  movieHeader.innerHTML = header;
  closeNav();
}
