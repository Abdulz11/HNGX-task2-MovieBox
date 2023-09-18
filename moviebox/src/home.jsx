import React from "react";
import Card from "./card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w1280";

  let searchPopular = BASE_URL + "/movie/top_rated?language=en-US&" + API_KEY;
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState([]);

  function getMovies(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovies(data.results.slice(1, 13));

        setMainMovie(data.results.slice(0, 1));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getMovies(searchPopular);
  }, []);

  return (
    <div className='container'>
      <nav>
        <div className='navbar'>
          <div className='flex-hor' style={{ gap: 15 }}>
            <img className='main-logo' src='images/tv.png' />
            <h2>MovieBox</h2>
          </div>
          <form>
            <input
              type='text'
              id='search-bar'
              placeholder='What do you want to watch?'
            />
          </form>
          <div className='profile'>
            <h4>Sign in</h4>
            <img className='logos' src='/images/Menu.png' alt='' />
          </div>
        </div>
      </nav>
      {!movies.length > 0 ? (
        <h2 className='err-mess'>Loading...</h2>
      ) : (
        <>
          <div className='img-div'>
            <img src={IMG_URL + mainMovie[0].backdrop_path} alt='movie-image' />
          </div>
          <div className='hero-info'>
            <h1>{mainMovie[0].title}</h1>
            <div className='ratings'>
              <p>{mainMovie[0].vote_average}</p>
              <p>97%</p>
            </div>
            <p className='synopsis' style={{ color: "white" }}>
              {mainMovie[0].overview}
            </p>
            <Link to={`${mainMovie[0].id}`}>
              <button>WATCH TRAILER</button>
            </Link>
          </div>
          <section>
            <div className='flex-hor' style={{ padding: 50 }}>
              <h2 style={{ fontSize: 40 + "px" }}>Featured Movie</h2>
              <p style={{ fontWeight: 600 }}>See more </p>
            </div>
          </section>
          <div className='movie-container'>
            {movies.map((movie) => {
              return (
                <div data-testid:movie-card key={movie.id} className='movie'>
                  <Card key={movie.id} props={movie} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
