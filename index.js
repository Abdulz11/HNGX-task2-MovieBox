// fetching data
const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
let searchPopular = BASE_URL + "/movie/top_rated?language=en-US&" + API_KEY;

function getMovies(url) {
  // fetch(BASE_URL + "/genre/movie/list?language=en" + API_KEY)
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  fetch(url)
    .then((response) => {
      if (response.status == 404) {
        movieHero.innerHTML = "<h2 class='err-mess'>Movie not found</h2>";
      }
      if (response.status == 200) {
        movieContainer.innerHTML = "<h2 class='err-mess'>Loading...</h2>";
        movieHero.innerHTML = "<h2 class='err-mess'>Loading...</h2>";
      }

      return response.json();
    })
    .then((data) => {
      showMovies(data.results);
      console.log(data.results);
    })
    .catch((err) => console.log(err));
}
getMovies(searchPopular);

// IF OFFLINE
window.addEventListener("offline", () => {
  movieHero.innerHTML = "<h2 class='err-mess'>Connect to the Internet</h2>";
});

// SHOWING MOVIES
let movieContainer = document.getElementById("movie-container");
let movieHero = document.querySelector(".movie-hero");

// favorite
function showMovies(movies) {
  if (movies.length == 0) {
    movieContainer.innerHTML = "<h2 class='err-mess'>Movie not found</h2>";
    console.log("movie not found");
    return;
  }

  movieContainer.innerHTML = "";
  movieHero.innerHTML = "";

  let main = movies.slice(0, 1);
  let movieList = movies.slice(1, 13);

  let { title, vote_average, overview, backdrop_path, id } = main[0];
  movieHero.innerHTML = `
  <div class="img-div" >
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
        <button onclick="movieSelected('${id}')">WATCH TRAILER</button>
       
      </div>
  `;
  movieList.forEach((movie) => {
    let { title, poster_path, id, release_date, vote_average } = movie;
    let releaseDate = release_date.slice(0, 4);

    // creating moviecard
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    // creating heart-div
    let heartDiv = document.createElement("div");
    heartDiv.classList.add("heart-div");
    // creating image
    let heartImage = document.createElement("img");
    heartImage.classList.add("heart");
    heartImage.src = "images/heartclear.png";
    heartImage.onclick = function (e) {
      e.stopPropagation();
      heartDiv.classList.toggle("redColor");
    };
    heartDiv.classList.add("heart-div");

    movieCard.innerHTML = `<a onclick="movieSelected('${id}')" href=#>
      <div class="movie-img-div">
        <img src="${IMG_URL + poster_path}" alt="movie poster">
      <div>
    </a>
    <div class="movie-short-info">
      <p style="color: grey;font-weight: 600;padding: 8px 0">${releaseDate}</p>
      <h3 class="title">${title}
      </h3>
    
      <div class="flex-hor">
              <div class="flex-hor-gap">
                <img class='logos'  src="images/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@ 1.png" alt="">
                <p style="font-weight: 600">${vote_average}</p>
              </div>
              <div class="flex-hor-gap">
                <img class='logos' src="images/PngItem_1381056 1.png" alt="">
                <p style="font-weight: 600">84%</p>
              </div>
            </div>
      </div>
      
    </div>`;

    heartDiv.append(heartImage);
    movieCard.append(heartDiv);
    movieContainer.append(movieCard);
  });
}
{
}
