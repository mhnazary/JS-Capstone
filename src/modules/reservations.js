import closeX from '../assets/Icons/close-circle-sharp.svg';

function formatDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
}

const Reserve = async (item, Reservation) => {
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
        <input type="text" name="start" id="start_date" placeholder="dd/mm/aaaa" required>
        <input type="text" name="end" id="end_date" placeholder="dd/mm/aaaa" required>
        <button type="submit" id="reserve_button">Reserve</button>
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
    const reservations = await Reservation.getReservations(item.id);
    reservations.forEach((Reservation) => {
      const li = document.createElement('li');
      li.textContent = `${Reservation.username}: From ${Reservation.date_start} to ${Reservation.date_end}`;
      list.appendChild(li);
    });
  } catch (error) {
    return;
  }
  document.querySelector('#reserve_button').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('add-name').value;
    const startDateText = document.getElementById('start_date').value;
    const endDateText = document.getElementById('end_date').value;
    const formattedStartDate = formatDate(startDateText);
    const formattedEndDate = formatDate(endDateText);
    try {
      await Reservation.addReservation(username, formattedStartDate, formattedEndDate, item.id);
      reservationForm.reset();
      const reservations = await Reservation.getReservations(item.id);
      list.innerHTML = '';
      reservations.forEach((Reservation) => {
        const li = document.createElement('li');
        li.textContent = `${Reservation.username}: ${Reservation.date_start}:${Reservation.end_date}`;
        list.appendChild(li);
      });
    } catch (error) {
      list.innerHTML = '<span>There was an error adding reservation<span>';
    }
  });
};

export default Reserve;
