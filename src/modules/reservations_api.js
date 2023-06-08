class Reservation {
  constructor() {
    this.id = 'EK8AqlUP7MtIYG7gJYqn';
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  }

  async getReservations(itemid) {
    try {
      const response = await fetch(`${this.url}apps/${this.id}/reservations?item_id=${itemid}`);
      const reservations = await response.json();
      return reservations;
    } catch (error) {
      return [];
    }
  }

  async addReservation(username, date_start, date_end, id) {
    try {
      const requestBody = {
        item_id: id,
        username,
        date_start: date_start.toISOString().slice(0, 10),
        date_end: date_end.toISOString().slice(0, 10),
      };
      const response = await fetch(`${this.url}apps/${this.id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }
}

export default Reservation;