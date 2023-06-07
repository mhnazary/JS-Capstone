const lists = async (comments, date) => {
    const list = document.querySelector('.listComment');
    try {
      list.innerHTML = '';
      if (comments && comments.length > 0) {
        comments.forEach((comment) => {
          const listElement = document.createElement('div');
          listElement.className = 'eachList';
          listElement.innerHTML = `<span class="name">${comment.username} : </span>
                                   <span class="comment">${comment.comment}</span>
                                   <span class="date">${comment.creation_date}</span>
          `;
          list.appendChild(listElement);
        });
      } else {
        list.innerHTML = '<div><span>No comments found<span></div>';
      }
    } catch (error) {
      console.error('Error in lists function:', error);
      list.innerHTML = '<div><span>There was an error showing comments<span></div>';
    }
  };
  
  
   export default lists