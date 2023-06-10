const $ = document;

const cardCounter = (counter) => {
  const filmcounter = $.getElementById('count');
  filmcounter.textContent = counter;
};
export default cardCounter;