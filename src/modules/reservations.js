import closeX from '../assets/Icons/close-circle-sharp.svg';

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
          <span class="feature"><b><i>Geners: </i></b>${item.genres.join(', ')}</span>
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
};
export default Reserve;
