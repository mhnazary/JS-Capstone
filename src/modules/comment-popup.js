import closeIcon from '../assets/Icons/close1.jpeg';

const modal = async (item, comment, commentcount) => {
  const popup = document.querySelector('#popup-container');
  popup.innerHTML = `
    <div class="modal">
    <div class="modalHeader">
    <img src="${closeIcon}" alt ="close" class="close">
    </div>
    <div class="modalBody">
    <img class="modalImg" src="${item.image}" alt="modal img">
    <h3 class="title">${item.name}</h3>
    <div class="moreInfo">
        <span><b><i>Language :</i></b>${item.language} </span>
        <span><b><i>Run time  :</i></b>${item.runtime}</span>
        <span><b><i>Geners  :</i></b>${item.genres.join(', ')}</span>
    </div>
    <div class="showComment">
        <h2 class="counterheader"></h2>
        <div class="listComment">
    
        </div>
    </div>
    <div class="divForm">
        <h3>Add your comment</h3>
        <form action="" method="post" id="add-form">
          
            <label for="name-input"></label>
            <input type="text" id="name-input" placeholder="Name" required>
            <label for="comment-input"></label>
            <textarea type="text" id="comment-input" placeholder="comment here.." required></textarea>
            <input type="button" value="Add" class="add" id="add-btn">
      </form>
    </div>
    </div>
    </div>
    `;
  popup.style.display = 'flex';
  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('#popup-container').style.display = 'none';
  });
  const list = document.querySelector('.listComment');
  const commentForm = document.querySelector('#add-form');
  const updateCounter = (count) => {
    const header = document.querySelector('.counterheader');
    header.textContent = `Comments (${count})`;
  };

  try {
    const comments = await comment.getcomment(item.id);
    comments.forEach((comment) => {
      const li = document.createElement('li');
      li.textContent = `${comment.username}: ${comment.comment} :${comment.creation_date}`;
      list.appendChild(li);
    });
    updateCounter(commentcount(comments));
  } catch (error) {
    return;
  }
  document.querySelector('#add-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('name-input').value;
    const commentText = document.getElementById('comment-input').value;
    try {
      await comment.addcomments(username, commentText, item.id);
      commentForm.reset();
      const comments = await comment.getcomment(item.id);
      list.innerHTML = '';
      comments.forEach((comment) => {
        const li = document.createElement('li');
        li.textContent = `${comment.username}: ${comment.comment}:${comment.creation_date}`;
        list.appendChild(li);
      });
      updateCounter(list.children.length);
    } catch (error) {
      list.innerHTML = '<span>There was an error adding comment<span>';
    }
  });
};
export default modal;
