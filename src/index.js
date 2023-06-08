import './style.css';
import logo from './assets/Icons/logo.png';
import modal from './modules/comment-popup.js';
import Reserve from './modules/reservations.js';

const Logo = document.querySelector('.logo');
Logo.src = logo;

const filmAPI = 'https://api.tvmaze.com/shows';

const filmCardsContainer = document.getElementById('cards');

// This function fetches data for a specific TV show using the TVMaze API.
async function fetchFilmData(id) {
  const res = await fetch(`${filmAPI}/${id}`);
  const data = await res.json();
  return {
    name: data.name,
    image: data.image.medium,
    summary: data.summary,
    genres: data.genres,
    language: data.language,
    runtime: data.runtime,
  };
}

// This function creates a film card DOM element using data for a specific TV show.
function createMovieCard(movieData) {
  const newcard = document.createElement('div');
  newcard.classList.add('film-card');

  const title = document.createElement('h2');
  title.innerText = movieData.name;

  const pic = document.createElement('img');
  pic.src = movieData.image;

  const comment = document.createElement('button');
  comment.innerHTML = 'Comment';
  comment.classList.add('commentBtn');

  const reserve = document.createElement('button');
  reserve.innerHTML = 'Reservations';
  reserve.classList.add('reserveBtn');
  reserve.dataset.itemId = movieData.id;

  const genres = document.createElement('p');
  genres.innerHTML = `<strong>Categories:</strong> ${movieData.genres.join(', ')}`;

  // Add the h2, img, p, and button elements to the div element.
  newcard.appendChild(title);
  newcard.appendChild(pic);
  newcard.appendChild(genres);
  newcard.appendChild(comment);
  newcard.appendChild(reserve);
  reserve.addEventListener('click', () => {
    Reserve(movieData);
  });
  comment.addEventListener('click', () => {
    modal(movieData);
  });
  return newcard;
}

// An asynchronous function that fetches data for all TV shows and creates film cards for each one.
async function createMovieCards() {
  const res = await fetch(`${filmAPI}`);
  const showData = await res.json();
  const shows = showData.slice(0, 20);

  // For each TV show, fetch its data and create a film card for it.
  shows.forEach(async (show) => {
    const filmData = await fetchFilmData(show.id);
    const filmCard = createMovieCard(filmData);
    filmCardsContainer.appendChild(filmCard);
  });
}

// Call the createMovieCards function to fetch TV show data and create film cards.
createMovieCards();
