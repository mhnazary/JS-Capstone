import closeX from '../assets/Icons/close-outline.svg';
import tvShow from '../assets/TvShows/Succesion.jpg';

const tvShowLocation = document.querySelector('.tvshow_img');
const tvShowImg = document.createElement('img');
tvShowImg.src = tvShow;
tvShowImg.alt = '';
tvShowLocation.appendChild(tvShowImg);

const closeLocation = document.querySelector('.closeX');
const closeImg = document.createElement('img');
closeImg.src = closeX;
closeImg.alt = '';
closeLocation.appendChild(closeImg);
