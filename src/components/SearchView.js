import Hero from "./Hero";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you want to use

// TMDB API KEY = 912e32f04c7112e3f1091b4001451475
// exampleMovie = 'https://api.themoviedb.org/3/search/movie?query=carlito%27s%20way&include_adult=false&language=en-US&page=1&include_adult=false'

const MovieCard = ({ movie }) => {
  let posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  
  if (movie.poster_path == null) {
    posterUrl = `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;
  }
  if (movie.release_date === "") {
    movie.release_date = "????";
  }
  if (movie.vote_average === 0 || movie.vote_average === '-') {
    movie.vote_average = '-'
  } else {
    movie.vote_average = Math.round(movie.vote_average* 10) / 10
  }
  const detailUrl = `/movies/${movie.id}`;
  return (
    <div className="col-lg-2 col-md-3 my-4"
    // style={{ display: "flex", flexDirection: "column", gap: "1px", position: "relative", zIndex: "-1" }}
    >
      <div className="card" style={{ height: "500px", display: "flex", flexDirection: "column"}}>
        <img
          src={posterUrl}
          style={{ height: "250px" }}
          className="card-img-top"
          alt={movie.original_title}
        />
        <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <h5 className="card-title">{movie.original_title}</h5>
          </div>
          <p className="card-text">
            Year: {movie.release_date.substring(0, 4)}
          </p>

          <div style={{display: "flex", gap : "2px"}}>
            <div style={{display: "inline"}}>
            {movie.vote_average}
            </div>
            <FontAwesomeIcon icon={faStar} />
          </div>

          <Link
            to={detailUrl}
            className="btn btn-primary"
            style={{ marginBottom: "2px" }}
          >
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
};

const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching for ${keyword}`;

  const resultsHtml = searchResults.length ? (
    searchResults.map((obj, i) => <MovieCard movie={obj} key={i} />)
  ) : (
    <div className="text-center my-5">
      <h3>No results found for "{keyword}"</h3>
    </div>
  );

  return (
    <>
      <Hero
        text={title}
        backdrop={`https://moviesinothermovies.com/wp-content/uploads/2019/12/l3riijan1pexq2lawnpf33xb5r0.jpg`}
      />
      {resultsHtml && (
        <div className="container">
          <div className="row">{resultsHtml}</div>
        </div>
      )}
    </>
  );
};

export default SearchView;
