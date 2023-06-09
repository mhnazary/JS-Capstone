import './style.css';
import logo from './assets/Icons/logo.png';
import modal from './modules/comment-popup.js';
import Reservation from './modules/reservations_api.js';
import Reserve from './modules/reservations.js';
import Comment from './modules/comment.js';
import commentcount from './modules/commentCounter.js';

const commentObj = new Comment();
const Logo = document.querySelector('.logo');
Logo.src = logo;

const reservationObj = new Reservation();

const filmAPI = 'https://api.tvmaze.com/shows';
const likesAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EK8AqlUP7MtIYG7gJYqn/likes/';

const filmCardsContainer = document.getElementById('cards');

const fetchLikes = async (id) => {
  const response = await fetch(`${likesAPI}?item_id=${id}`);
  const data = await response.json();
  // eslint-disable-next-line
  const res = data.find(({ item_id }) => item_id === id);
  return res ? res.likes : 0;
};

// This function fetches data for a specific TV show using the TVMaze API.
async function fetchFilmData(id) {
  const res = await fetch(`${filmAPI}/${id}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    image: data.image.medium,
    summary: data.summary,
    genres: data.genres,
    language: data.language,
    runtime: data.runtime,
  };
}

const updateLikes = async (showId, likes) => {
  const response = await fetch(`${likesAPI}`, {
    method: 'POST',
    body: JSON.stringify({ item_id: showId, likes }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.text();
  return data;
};

// This function creates a film card DOM element using data for a specific TV show.

const createMovieCard = async (movieData, id) => {
  const newcard = document.createElement('div');
  newcard.classList.add('film-card');
  newcard.id = `movie-${id}`;

  const title = document.createElement('h2');
  title.innerText = movieData.name;

  const pic = document.createElement('img');
  pic.src = movieData.image;

  const comment = document.createElement('button');
  comment.innerHTML = 'Comment';
  comment.classList.add('commentBtn');

  const likeBtn = document.createElement('button');
  likeBtn.classList.add('likes');
  likeBtn.innerHTML = 'Like';

  const likes = document.createElement('p');
  likes.innerHTML = 'Likes: 0';

  const filmLikes = await fetchLikes(id);
  likes.innerHTML = `Likes: ${filmLikes}`;

  likeBtn.addEventListener('click', async () => {
    const Clike = parseInt(likes.innerHTML.split(' ')[1], 10);
    const newLikes = Clike + 1;
    likes.innerHTML = `Likes: ${newLikes}`;
    await updateLikes(id, newLikes);
  });

  const reserve = document.createElement('button');
  reserve.innerHTML = 'Reservations';
  reserve.classList.add('reserveBtn');

  const genres = document.createElement('p');
  genres.innerHTML = `<strong>Categories:</strong> ${movieData.genres.join(', ')}`;

  // Add the h2, img, p, and button elements to the div element.
  newcard.appendChild(title);
  newcard.appendChild(pic);
  newcard.appendChild(genres);
  newcard.appendChild(likeBtn);
  newcard.appendChild(likes);
  newcard.appendChild(comment);
  newcard.appendChild(reserve);

  reserve.addEventListener('click', () => {
    Reserve(movieData, reservationObj);
  });
  comment.addEventListener('click', () => {
    modal(movieData, commentObj, commentcount);
  });
  return newcard;
};

// An asynchronous function that fetches data for all TV shows and creates film cards for each one.
const createMovieCards = async () => {
  const res = await fetch(`${filmAPI}`);
  const showData = await res.json();
  const shows = showData.slice(0, 20);

  // For each TV show, fetch its data and create a film card for it.
  shows.forEach(async (show) => {
    const filmData = await fetchFilmData(show.id);
    const filmCard = await createMovieCard(filmData, show.id);
    filmCardsContainer.appendChild(filmCard);
  });
};

createMovieCards();