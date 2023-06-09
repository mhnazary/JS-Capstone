import countReservations from './reservationsCounter.js';

describe('countReservations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="reservations_list">
        <li>Reservation 1</li>
        <li>Reservation 2</li>
      </ul>
      <span id="reservationCounter"></span>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should count reservations and update the counter element', () => {
    countReservations();

    const reservationsCountElement = document.getElementById('reservationCounter');
    expect(reservationsCountElement.textContent).toBe('2');
  });

  test('should set counter to 0 when there are no reservations', () => {
    document.getElementById('reservations_list').innerHTML = '';

    countReservations();

    const reservationsCountElement = document.getElementById('reservationCounter');
    expect(reservationsCountElement.textContent).toBe('0');
  });
});
