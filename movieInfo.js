// fetching data
const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";

//EACH MOVIE
let outerContainer = document.querySelector(".outer");
let eachMovieContainer = document.getElementById("eachMovie-container");

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  // console.log(movieId);
  // let header = sessionStorage.getItem("movieHeader");
  // console.log(header);
  fetch(BASE_URL + "/movie/" + movieId + "?" + API_KEY)
    .then((response) => response.json())
    .then((data) => {
      showMovieInfo(data);
      console.log(data);
    });
}

function showMovieInfo(movieInfo) {
  let {
    imdb_id,
    overview,
    title,
    poster_path,
    backdrop_path,
    tagline,
    vote_average,
    release_date,
    runtime,
  } = movieInfo;
  // let genre =
  //   movieInfo.genres[0].name.charAt(0).toUpperCase() +
  //   movieInfo.genres[0].name.slice(1);
  // eachMovieContainer.innerHTML = "";
  let movieContainer = document.querySelector(".movie-info-cont");
  movieContainer.innerHTML = `
<div class="hero-video">
  <img src="${IMG_URL + backdrop_path}" alt='movie-img'>
  <div class='over-view'>
    <img style="width: 70px; height: 70px;cursor: pointer;background-color: grey;border-radius: 50%;padding: 10px" src='images/Play.png'>
    <h2 style="color: white">Watch Trailer</h2>
  </div>
</div>
<div class="movie-id-info flex-hor">
  <div class="flex-hor moviepage-info info">
    <p>${title}</p>
    <p>.</p>
    <p>Tom cruise</p>
    <p>.</p>
    <p>${runtime}</p>
    <p>.</p>
    <p>ACTION</p>
  </div>
  <div class="moviepage-info flex-hor">
    <img src="images/Star.png" />
    <p>${vote_average}</p>
  </div>
</div>
<div class="grid">
  <div>
    <p>
      ${overview}
    </p>
    <div>
      <p>Cast:</p>
      <p class="red">tom cruise</p>
    </div>
    <div>
      <p>Cast:</p>
      <p class="red">tom cruise</p>
    </div>
    <div>
      <p>Cast:</p>
      <p class="red">tom cruise</p>
    </div>
    <div>
      <img class='mt'src='images/Group 52 (1).png'>
    </div>
  </div>
  <div>
    <div class="flex-ver">
      <button>See Showtimes</button>
      <button>More watch options</button>
    </div>
    <div class="flex-hor">
    <img src="images/Group 52.png" alt="" />
    </div>
  </div>
</div> 
  `;
  //   eachMovie.innerHTML = `<div id='movie'>
  //         <div class='movie-info'>
  //         <div class="movieposter">
  //         <img src="${IMG_URL + poster_path}" alt="movie-poster">
  //         </div>
  //         <h3 class="title">${title}</h3>
  //         <h3 class="tagline">${tagline}</h3>
  //         <span>Release: ${release_date}</span>
  //         </div>
  //         <div class='info-desc'>
  //         <h3>Rating:${vote_average}</h3>
  //         <h3>Genre:${genre}</h3>
  //         </div>
  //         <div class='movie-overview'>
  //             <h3>${overview}</h3>
  //         </div>
  //         <div class='info-btn'>
  //             <a class="btn" id='backbtn' href='index.html'>Go back</button>
  //             <a class="btn" target=_blank href="https://www.imdb.com/title/${imdb_id}">IMDB</a>
  //         </div>
  // </div>
  //     </div>
  //     `;

  // eachMovieContainer.append(eachMovie);
  // let span = document.querySelector("span");
  // let newHeader = header.trim().replace(" ", "");
  // if (newHeader !== "NewRelease") {
  //   span.style.display = "none";
  // }
}
