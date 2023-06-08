class Comment {
  constructor() {
    this.id = 'EK8AqlUP7MtIYG7gJYqn';
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  }

  async getcomment(itemid) {
    try {
      const response = await fetch(`${this.url}apps/${this.id}/comments?item_id=${itemid}`);
      const comments = await response.json();
      return comments;
    } catch (error) {
      return [];
    }
  }

  async addcomments(username, comment, id) {
    try {
      const requestBody = {
        item_id: id,
        username,
        comment,
      };
      const response = await fetch(`${this.url}apps/${this.id}/comments`, {
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

export default Comment;
