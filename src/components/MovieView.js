import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

let trailerUrl =''
// let videoId = ''

let getVideoId = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('v');
};

const MovieView = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ytDetails, setYtDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoId,setVideoId] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setLoading(true);
    setVideoId('');

    fetch(
      
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
        
      })
      .catch(() => {
        setMovieDetails(null);
        setIsLoading(false);
      });

      

  }, [id]);

  useEffect(() => {
    // Fetch YouTube search results if movieDetails is loaded
    if (movieDetails && movieDetails.original_title) {
      // const API_KEY = `${process.env.REACT_APP_YT_API}`;
      const query = `${movieDetails.original_title} ${movieDetails.overview} trailer`;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${process.env.REACT_APP_YT_API}`;


      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setYtDetails(data.items);
          if (data.items.length > 0) {
            const trailerId = data.items[0].id.videoId;
            trailerUrl = `https://www.youtube.com/watch?v=${trailerId}`;
            const newVideoId = trailerUrl ? getVideoId(trailerUrl) : '';
            setVideoId(newVideoId);
            // console.log('Trailer URL:', trailerUrl);
            
          } else {
              console.log('No trailer found');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('YouTube Fetch Error:', error);
          setLoading(false);
        });
        
    }
  }, [movieDetails, id]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading..." />;
    }

    if (movieDetails) {
      
      let posterPath = movieDetails.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
      : `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;
      if(movieDetails.poster_path == null) {
        posterPath = `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`
      }
      const backdropUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`;

      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={posterPath}
                  alt="Movie poster"
                  className="img-fluid shadow rounded"
                />
              </div>
              <div className="col-md-9">
                <div style={{display: "grid", gridTemplateRows: "auto auto auto auto", gridTemplateColumns: "repeat(4, 1fr)"}}>
                    <h2
                    style={{gridColumnStart: "1", gridColumnEnd: "2"}}
                    >
                        {movieDetails.original_title}</h2>

                    <span
                    style={{gridColumnStart: "2", gridColumnEnd: "5"}}
                    >
                        {Math.round(movieDetails.vote_average* 10) / 10}/10 ({movieDetails.vote_count} votes)</span>
                    <h6
                    style={{gridColumnStart: "1", gridColumnEnd: "5", marginTop: "20px"}}
                    >
                        {movieDetails.release_date}</h6>
                    <p className="lead"
                    style={{marginTop: "10px", gridColumnStart: "1", gridColumnEnd: "5"}}
                    >
                        {movieDetails.overview}</p>
                        
                        
                        
  
                          {/* <a href={trailerUrl} target="_blank">Movie trailer</a> */}
                          
                
                </div>

                {/* <iframe src={`https://www.youtube.com/embed/${videoId}`}></iframe> */}
                <div className="wrapper">
                  {loading ? (
                    <span>Loading trailer...</span>
                  ) : (
                    <iframe src={`https://www.youtube.com/embed/${videoId}`}
                      key = {`https://www.youtube.com/embed/${videoId}`}
                      title="{movieDetails.original_title} - Trailer"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                      >
                    </iframe>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return renderMovieDetails();
};

export default MovieView;
