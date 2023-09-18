import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo() {
  const { id } = useParams();
  let movieId = id;
  const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w1280";
  const [cast, setCast] = useState("");
  const [movieInfo, setMovieInfo] = useState("");

  function getMovie() {
    fetch(BASE_URL + "/movie/" + movieId + "/credits?" + API_KEY)
      .then((response) => response.json())
      .then((data) => {
        setCast(data);
      });

    fetch(BASE_URL + "/movie/" + movieId + "?" + API_KEY)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovieInfo(data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <div className='main-movie-info-container'>
        <section className='side-panel'>
          <div style={{ gap: 10 }} className='panel-div'>
            <img className='logos' src='images/tv.png' alt='' />
            <h3>MovieBox</h3>
          </div>

          <div style={{ gap: 30 }} className='panel-div'>
            <img className='logos' src='images/Home.png' alt='' />
            <h4>Home</h4>
          </div>
          <div className='panel-div panel-highlight'>
            <img className='logos' src='images/Movie Projector.png' alt='' />
            <h4>Movie</h4>
          </div>
          <div style={{ gap: 10 }} className='panel-div'>
            <img className='logos' src='images/TV Show.png' alt='' />
            <h4>TV Series</h4>
          </div>
          <div style={{ gap: 10 }} className='panel-div'>
            <img className='logos' src='images/Calendar.png' alt='' />
            <h4>Upcoming</h4>
          </div>

          <div id='quiz-side-panel'>
            play movie quizzes and earn free tickets
            <p>no one is playing</p>
            <button>start playing</button>
          </div>

          <div style={{ gap: 10 }} className='panel-div'>
            <img className='logos' src='images/Logout.png' alt='' />
            <h4>Logout</h4>
          </div>
        </section>
        {movieInfo ? (
          <>
            <div className='movie-info-cont'>
              <div className='hero-video'>
                <img
                  style={{ borderRadius: 20 }}
                  src={IMG_URL + movieInfo.backdrop_path}
                  alt='movie-img'
                />
                <div className='over-view' style={{ borderRadius: 20 }}>
                  <img className='play-btn' src='images/Play.png' />
                  <h2 style={{ color: "white" }}>Watch Trailer</h2>
                </div>
              </div>
              <div className='movie-id-info flex-hor'>
                <div className='flex-hor moviepage-info info'>
                  <p data-testid:movie-title>{movieInfo.title}</p>
                  <p>.</p>
                  <p data-testid:movie-release-date>
                    {movieInfo.release_date.slice(0, 4)}
                  </p>
                  <p>.</p>
                  <p data-testid:movie-runtime>{movieInfo.runtime}m</p>
                  <p>.</p>
                  <p>{movieInfo.genres.map((item) => item.name).toString()}</p>
                </div>
                <div className='moviepage-info flex-hor'>
                  <img src='images/Star.png' />
                  <p>{movieInfo.vote_average}</p>
                </div>
              </div>
              <div className='grid'>
                <div>
                  <p data-testid:movie-overview>{movieInfo.overview}</p>
                  <div>
                    <p>Actors:</p>
                    <p className='red'>
                      {cast.cast
                        .splice(0, 5)
                        .map((cast) => cast.name)
                        .toString()}
                    </p>
                  </div>
                  <div>
                    <p>Director:</p>
                    <p className='red'>
                      {cast.crew
                        .filter(
                          (crew) => crew.known_for_department == "Directing"
                        )
                        .map((each) => each.name)
                        .toString()}
                    </p>
                  </div>
                  <div>
                    <p>Writers:</p>
                    <p className='red'>
                      {cast.crew
                        .filter(
                          (crew) => crew.known_for_department == "Writing"
                        )
                        .map((each) => each.name)
                        .toString()}
                    </p>
                  </div>
                  <div>
                    <img className='mt' src='images/Group 52 (1).png' />
                  </div>
                </div>
                <div>
                  <div className='flex-ver'>
                    <button>See Showtimes</button>
                    <button>More watch options</button>
                  </div>
                  <div className='flex-hor'>
                    <img src='images/Group 52.png' alt='' />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='movie-info-cont'>
            <h1 className='err-mess'>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
}
