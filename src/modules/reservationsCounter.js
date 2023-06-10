const countReservations = () => {
  const reservationsContainer = document.getElementById('reservations_list');
  let reservationsCount = 0;
  if (reservationsContainer.children.length > 0) {
    reservationsCount = reservationsContainer.children.length;
  }
  const reservationsCountElement = document.getElementById('reservationCounter');
  reservationsCountElement.textContent = reservationsCount;
};

export default countReservations;