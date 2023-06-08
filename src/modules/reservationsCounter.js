const countReservations = () => {
  const reservationsContainer = document.getElementById('reservations_list');
  const reservationsCount = reservationsContainer.children.length;
  const reservationsCountElement = document.getElementById('reservationCounter');
  reservationsCountElement.textContent = reservationsCount;
};

export default countReservations;  