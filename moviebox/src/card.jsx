import { Link } from "react-router-dom";

export default function Card(props) {
  const IMG_URL = "https://image.tmdb.org/t/p/w1280";

  function handleClick(e) {
    e.currentTarget.classList.toggle("redColor");
  }

  return (
    <>
      {" "}
      <div className='movie' data-testid:movie-card>
        <Link to={`${props.props.id}`}>
          <div className='movie-img-div'>
            <img
              src={IMG_URL + props.props.poster_path}
              alt='movie poster'
              data-testid:movie-poster
            />
          </div>
        </Link>
        <div className='movie-short-info'>
          <p
            style={{ color: "grey", fontWeight: 600, padding: "8px 0px" }}
            data-testid:movie-release-date
          >
            {props.props.release_date.slice(0, 4)}
          </p>
          <h3 className='title' data-testid:movie-title>
            {props.props.title}
          </h3>
          <div className='flex-hor'>
            <div className='flex-hor-gap'>
              <img
                className='logos'
                src='images/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@ 1.png'
                alt=''
              />
              <p style={{ fontWeight: 600 }}>{props.props.vote_average}</p>
            </div>
            <div className='flex-hor-gap tomato'>
              <img className='logos' src='/images/Rotten Tomatoes.png' alt='' />
              <p style={{ fontWeight: 600 }}>84%</p>
            </div>
          </div>
        </div>
      </div>
      <div className='heart-div' onClick={(e) => handleClick(e)}>
        <img src='images/heartclear.png' alt='' className='heart' />
      </div>
    </>
  );
}
