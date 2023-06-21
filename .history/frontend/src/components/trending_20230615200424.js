import { useEffect, useState } from "react";
import axios from 'axios';
import Movie from "./movie";
import Youtube from "react-youtube";

function Triller() {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie";
  const API_KEY = "ecb4693acabff45ab8dd3456c2d62d31";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

  const [playing, setPlaying] = useState(false);
  const [triller, setTriller] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
        api_key: API_KEY,
        query: searchKey
      }
    });

    console.log(data.results[0]);
    setMovies(data.results);
    setMovie(data.results[0]);

    if (data.results.length) {
      await fetchMovie(data.results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos"
      }
    });

    if (data.videos && data.videos.results) {
      const triller = data.videos.results.find(vid => vid.name === "Official Trailer");
      setTriller(triller ? triller : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = () => (
    movies.map(movie => (
      <Movie
        selectMovie={selectMovie}
        key={movie.id}
        movie={movie}
      />
    ))
  );

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "15px", textTransform: "uppercase" }}>
        <span style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>d<b>MOVIE</b></span>
        <form onSubmit={fetchMovies} style={{ position: "relative" }}>
          <input type="text" id="search" onInput={(event) => setSearchKey(event.target.value)} style={{ border: "1px solid darkslategray", outline: "transparent", backgroundColor: "transparent", padding: "5px 10px", borderRadius: "25px", color: "white" }} />
          <button type="submit" style={{ position: "absolute", right: "5px", top: "5px", backgroundColor: "transparent", color: "white", border: "none", cursor: "pointer" }}><i className="fa fa-search"></i></button>
        </form>
      </header>
      {movies.length ?
        <main>
          {movie ?
            <div style={{ backgroundSize: "cover", backgroundPosition: "top center", minHeight: "600px", display: "flex", alignItems: "flex-end", paddingBottom: "50px", position: "relative", backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
              {playing ?
                <>
                  <Youtube
                    videoId={triller.key}
                    className="triller-youtube"
                    containerClassName="triller-youtube-container"
                    opts={{
                      width: "490%", // Increase the width of the video
                      height: "600px", // Increase the height of the video
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0
                      }
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="triller-button close-video">Close</button>
                </> :
                <div style={{ width: "80%" }} className="triller-center-max-size">
                  <div className="triller-poster-content">
                    {triller ?
                      <button className="triller-button play-video" onClick={() => setPlaying(true)} type="button">Play Trailer</button>
                      : 'Sorry, no trailer available'}
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              }
            </div>
            : null}

          <div className="triller-center-max-size triller-container">
            {renderMovies()}
          </div>
        </main>
        : 'Sorry, no movies found'}
    </div>
  );
}

export default Triller;
