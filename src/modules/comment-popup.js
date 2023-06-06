import closeIcon from '../assets/Icons/close.png';

const modal = async (item) => {
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
        <span><b><i>Language :</i></b>${item.languadge} </span>
        <span><b><i>Run time  :</i></b>${item.runtime}</span>
        <span><b><i>Geners  :</i></b>${item.genres.join(', ')}</span>
    </div>
    <div class="showComment">
        <h2>comment()</h2>
        <div class="listComment">
    
        </div>
    </div>
    <div class="divForm">
        <h3>Add your comment</h3>
        <form action="" method="post" id="add-score">
          
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
};
export default modal;
