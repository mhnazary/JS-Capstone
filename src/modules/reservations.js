import closeX from '../assets/Icons/close-circle-sharp.svg';
import countReservations from './reservationsCounter.js';

const Reserve = async (item, reservation) => {
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
        <h4 id="reservs_title">Reservations <span id="reservationCounter"></span></h4>
        <ul id="reservations_list">
        </ul>
      </div>

      <form id="add_reservations">
        <h4 id="reservs_form">Add a reservation</h4>
        <input type="text" name="name" id="add-name" placeholder="Your name" required>
        <input type="text" name="start" id="start_date" placeholder="aaaa-mm-dd">
        <input type="text" name="end" id="end_date" placeholder="aaaa-mm-dd">
        <button type="button" value="Add" id="reserve_button">Reserve</button>
      </form>

    </div>
  `;
  popupReserve.style.display = 'flex';
  document.querySelector('.closeX').addEventListener('click', () => {
    document.querySelector('#reservation_page').style.display = 'none';
  });
  const list = document.querySelector('#reservations_list');
  const reservationForm = document.querySelector('#add_reservations');
  try {
    const reservations = await reservation.getReservations(item.id);
    reservations.forEach((reservation) => {
      const li = document.createElement('li');
      li.textContent = `${reservation.username}: From ${reservation.date_start} to ${reservation.date_end}`;
      list.appendChild(li);
    });
    countReservations();
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
  document.querySelector('#reserve_button').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('add-name').value;
    const startDateText = document.getElementById('start_date').value;
    const endDateText = document.getElementById('end_date').value;
    try {
      await reservation.addReservation(username, startDateText, endDateText, item.id);
      reservationForm.reset();
      const reservations = await reservation.getReservations(item.id);
      list.innerHTML = '';
      reservations.forEach((reservation) => {
        const li = document.createElement('li');
        li.textContent = `${reservation.username}: From ${reservation.date_start} to ${reservation.date_end}`;
        list.appendChild(li);
      });
      countReservations();
    } catch (error) {
      console.log('Error adding reservation:', error);
      list.innerHTML = '<span class="reservation_error">There was an error adding reservation</span>';
    }
  });
};
window.addEventListener('DOMContentLoaded', () => {
  countReservations();
});
export default Reserve;