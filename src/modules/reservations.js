import closeX from '../assets/Icons/close-circle-sharp.svg';

const reservationsAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EK8AqlUP7MtIYG7gJYqn/reservations/';

const fetchReservations = async (itemId) => {
  try {
    const response = await fetch(`${reservationsAPI}?item_id=${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener las reservaciones:', error);
    return [];
  }
};

const createReservation = async (reservationData) => {
  try {
    const response = await fetch(`${reservationsAPI}`, {
      method: 'POST',
      body: JSON.stringify(reservationData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Reserva creada exitosamente');
    } else {
      console.error('Error al crear la reserva');
    }
  } catch (error) {
    console.error('Error al conectarse con la API de reservaciones', error);
  }
};

const updateReservationsList = (reservationsList, reservations) => {
  reservationsList.innerHTML = '';
  reservations.forEach((reservation) => {
    const reservationItem = document.createElement('li');
    reservationItem.innerText = `${reservation.username} - Start Date: ${reservation.date_start}, End Date: ${reservation.date_end}`;
    reservationsList.appendChild(reservationItem);
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
        <ul id="reservations_list"></ul>
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

  const reservationsList = document.getElementById('reservations_list');
  const reservations = await fetchReservations(item.id);
  updateReservationsList(reservationsList, reservations);

  const reservationForm = document.getElementById('add_reservations');
  reservationForm.addEventListener('submit', async (event) => {
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

    await createReservation(reservationData);

    const updatedReservations = await fetchReservations(item.id);
    updateReservationsList(reservationsList, updatedReservations);

    reservationForm.reset();
  });
};

export default Reserve;
