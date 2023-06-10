const commentcount = (comments) => {
  let count = 0;
  if (comments.length === 0) {
    return count;
  }
  count = comments.length;

  return count;
};
export default commentcount;