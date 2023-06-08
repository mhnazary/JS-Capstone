import closeX from '../assets/Icons/close-circle-sharp.svg';
import { createReservation, getReservations} from './reservations_api.js';

const appId = 'EK8AqlUP7MtIYG7gJYqn';

const updateReservationsList = (reservationsList, reservations) => {
  reservationsList.innerHTML = '';
  
  if (!Array.isArray(reservations)) {
    reservations = Object.values(reservations);
  }

  if (reservations.length === 0) {
    reservationsList.innerHTML = '<li>No reservations yet</li>';
    return;
  }

  reservations.forEach((reservation) => {
    const listItem = document.createElement('li');
    listItem.classList.add('reservation');
    listItem.textContent = `${reservation.username} - ${reservation.date_start} to ${reservation.date_end}`;
    reservationsList.appendChild(listItem);
  });
};

const Reserve = async (item) => {
  const popupReserve = document.querySelector('#reservation_page');
  popupReserve.innerHTML = `
    <div id="subcontainer">
      <div id="head_reservations">
        <div class="tvshow_img"><img src="${item.image}" alt=""></div>
        <div class="closeX_box"><a class="closeX" href="#"><img src="${closeX}" alt =""></a></div>
      </div>
    
      <div id="show_description">
        <h3>${item.name}</h3>
        <div id="description_card">
          <span class="feature"><b><i>Language: </i></b>${item.language}</span>
          <span class="feature"><b><i>Run time: </i></b>${item.runtime} minutes</span>
          <span class="feature"><b><i>Genres: </i></b>${item.genres.join(', ')}</span>
        </div>
      </div>

      <div id="reservations">
        <h4 id="reservs_title">Reservations<span> (0) </span></h4>
        <ul id="reservations_list">
        </ul>
      </div>

      <form id="add_reservations">
        <h4 id="reservs_form">Add a reservation</h4>
        <input type="text" name="name" id="add-name" placeholder="Your name" required>
        <input type="date" name="start" id="start_date" placeholder="Start date" required>
        <input type="date" name="end" id="end_date" placeholder="End date" required>
        <button type="submit" id="reserve_button">Reserve</button>
      </form>

    </div>
  `;
  popupReserve.style.display = 'flex';
  document.querySelector('.closeX').addEventListener('click', () => {
    document.querySelector('#reservation_page').style.display = 'none';
  });

  const reservationsList = document.getElementById('reservations_list');
  const reservations = await getReservations(appId);
  updateReservationsList(reservationsList, reservations);

  const reservationForm = document.getElementById('add_reservations');
  const reservationBtn = document.getElementById('reserve_button');
  reservationBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const nameInput = reservationForm.querySelector('#add-name');
    const startDateInput = reservationForm.querySelector('#start_date');
    const endDateInput = reservationForm.querySelector('#end_date');

    const reservationData = {
      item_id: item.id,
      username: nameInput.value,
      date_start: startDateInput.value,
      date_end: endDateInput.value,
    };

    await createReservation(reservationData.item_id, 
      reservationData.username, reservationData.date_start, reservationData.date_end);

    const updatedReservations = await getReservations(appId);
    updateReservationsList(reservationsList, updatedReservations);

    reservationForm.reset();
  });
};

export default Reserve;
