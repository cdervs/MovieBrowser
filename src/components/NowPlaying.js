import Hero from "./Hero";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



const NowPlaying = () => {
    const [movieDetails, setMovieDetails] = useState([]); // Changed to an array to store multiple movies

    useEffect(() => {
      
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=1`)
            .then((res) => res.json())
            .then((data) => {
                setMovieDetails(data.results); // Update state with the array of movies
                console.log(data.results); // Log to confirm the structure
            });
    },[]);

    const MovieCard = ({ movie }) => {
        let posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        
        if (!movie.poster_path) {
          posterUrl = `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;
        }

        const detailUrl = `/movies/${movie.id}`;
        return (
          <div className="col-lg-2 col-md-3 my-4">
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
                  Year: {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                </p>
                <div style={{display: "flex", gap : "2px"}}>
                  <div style={{display: "inline"}}>
                    {movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : '-'}
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

    return (
        <div>
            <Hero
              text="The biggest upcoming movies:"
              backdrop="https://moviesinothermovies.com/wp-content/uploads/2019/12/l3riijan1pexq2lawnpf33xb5r0.jpg"
            />
            <div className="container">
                <div className="row">
                    {movieDetails.length > 0 ? (
                        movieDetails.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))
                    ) : (
                        <p>No movies found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NowPlaying;
