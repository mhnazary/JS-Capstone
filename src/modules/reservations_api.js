const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const appId = 'EK8AqlUP7MtIYG7gJYqn';

const createReservation = async (itemId, username, dateStart, dateEnd) => {
  const url = `${BASE_URL}/apps/${appId}/reservations`;
  const body = {
    item_id: itemId,
    username,
    date_start: dateStart,
    date_end: dateEnd,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

const getReservations = async (appId) => {
  const url = `${BASE_URL}/apps/${appId}/reservations`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export {
  createReservation,
  getReservations,
  appId,
};
