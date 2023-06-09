const commentcount = async (comments) => {
  const header = document.querySelector('.counterheader');
  let count = 0;
  if (comments.length === 0) {
    header.innerHTML = `Comments(${count})`;
  } else {
    count = comments.length;
    header.innerHTML = `Comments(${count})`;
  }

  return count;
};
export default commentcount;