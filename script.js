const apiKey = '5ebbe4c466cdfc7b3af601c4b2ced640';
const apiUrl = 'https://api.themoviedb.org/3/movie';
// Generate a random movie ID between 1 and 100
const randomMovieId = Math.floor(Math.random() * 100) + 17;
const randomTvId= Math.floor(Math.random() * 100) + 1;

// Make a request to the API to retrieve the movie data
fetch(`${apiUrl}/${randomMovieId}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Extract the relevant movie information
    const movieTitle = data.title;
    console.log(data);
    const path=data.poster_path;
    const year=data.release_date.slice(0,4);
    console.log(year);
    const posterUrl = `https://image.tmdb.org/t/p/w500${path}`;
    
    // Update the HTML to display the movie information
    document.querySelector('#title').textContent = movieTitle;
    document.querySelector('#poster').setAttribute('src', posterUrl);
    document.querySelector('#year').textContent = year
  })
  .catch(error => console.error(error));

  