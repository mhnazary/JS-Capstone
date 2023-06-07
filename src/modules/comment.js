class Comment {
    constructor() {
      this.id = 'LnXwgVRrp2EsjCl5tvcX';
      this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
    }
    async getcomment(itemid) {
        try {
          const response = await fetch(`${this.url}apps/${this.id}/comments?item_id=${itemid}`);
          const comments = await response.json();
          console.log('getcomment response:', comments);
          return comments.result;
        } catch (error) {
          console.error('Error in getcomment method:', error);
          return [];
        }
      }
      
      
      
  
      async addcomments(name, comment, item_id) {
  try {
    const response = await fetch(`${this.url}apps/${this.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id, username: name, comment }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

      
  }
  
  export default Comment;
  