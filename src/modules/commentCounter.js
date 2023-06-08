const commentcount = async (comments) => {
  const header = document.querySelector('.counterheader');
  const count = comments.length;
  header.innerHTML = `Comments(${count})`;
  return count;
};
export default commentcount;