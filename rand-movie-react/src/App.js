import React, { useState, useEffect } from "react";
import "./App.css";



const App = () => {
const apiKey = "5ebbe4c466cdfc7b3af601c4b2ced640";
const apiUrl = "https://api.themoviedb.org/3/movie";
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const randomMovieId = Math.floor(Math.random() * 10000) + 1;

    fetch(`${apiUrl}/${randomMovieId}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const movieTitle = data.title;
        const path = data.poster_path;
        const year = data.release_date

        const posterUrl = `https://image.tmdb.org/t/p/w500${path}`;

        setMovie({
          title: movieTitle,
          posterUrl: posterUrl,
          year: year,
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching data, please reload");
      });
  },[apiKey]);

  return (
    <div className="app">
    <h1>today's rec</h1>
      {error && <p>{error}</p>}
      {movie && (
        <div className="content">
          <h2 >{movie.title}</h2>
          <div className="card">
          <img src={movie.posterUrl} alt={movie.title} />
          <p>Release date:<br />{movie.year}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
