const apiKey = '5ebbe4c466cdfc7b3af601c4b2ced640';
const apiUrl = 'https://api.themoviedb.org/3/movie';
const randomMovieId = Math.floor(Math.random() * 100) + 17;
const randomTvId = Math.floor(Math.random() * 100) + 1;

const CLIENT_ID = '0a238fc86b4542b7b5c98ff64a9942a5';
const CLIENT_SECRET = '78421e7983d94742ab006b3cf0d28c75';
const AUTH_URL = 'https://accounts.spotify.com/api/token';

const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
const encodedAuthString = btoa(authString);

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${encodedAuthString}`
  },
  body: 'grant_type=client_credentials'
};

// Define an async function to wrap the top-level code
async function main() {
  const response = await fetch(AUTH_URL, options);
  const data = await response.json();

  const accessToken = data.access_token;

  fetch(`${apiUrl}/${randomMovieId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const movieTitle = data.title;
      const path = data.poster_path;
      const year = data.release_date.slice(0, 4);
      const posterUrl = `https://image.tmdb.org/t/p/w500${path}`;

      document.querySelector('#title').textContent = movieTitle;
      document.querySelector('#poster').setAttribute('src', posterUrl);
      document.querySelector('#year').textContent = year;
    })
    .catch(error => console.error(error));

  const searchSong = async () => {
    const searchEndpoint = `https://api.spotify.com/v1/search?q=song%3A&type=track&limit=50`;
    const response = await fetch(searchEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  };

  const getRandomSong = async () => {
    const data = await searchSong();
    const songs = data.tracks.items;
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
  };

  const displaySong = async () => {
    const song = await getRandomSong();
    console.log(song);
    const songName = song.name;
    const artistName = song.artists[0].name;
    const albumName = song.album.name;
    const albumArtUrl = song.album.images[0].url;
    const spotify=song.external_urls.spotify;
    console.log(spotify);

    const songDetailsContainer = document.getElementById("song-details");
    document.querySelector('#song-title').textContent = songName;
    document.querySelector('#song-poster').setAttribute('src', albumArtUrl);
    document.querySelector('#artist').textContent =artistName;
    document.querySelector('#album').textContent =albumName;
    document.querySelector('#sp-link').href=spotify;

  };

  // Call the displaySong function inside the main async function
  displaySong();
}

// Call the main function to start
main();
