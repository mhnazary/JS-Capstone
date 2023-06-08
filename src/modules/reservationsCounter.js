const countReservations = () => {
  const reservationsContainer = document.getElementById('reservations_list');
  const reservationsCount = reservationsContainer.children.length;
  const reservationsCountElement = document.getElementById('reservationCounter');
  reservationsCountElement.textContent = reservationsCount;
  if (reservationsCount === 0) {
    reservationsCountElement.textContent = '0';
  } else {
    reservationsCountElement.textContent = reservationsCount;
  }
};

export default countReservations;