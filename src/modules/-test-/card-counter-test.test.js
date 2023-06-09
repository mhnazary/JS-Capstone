import cardCounter from '../counter.js';

describe('cardCounter', () => {
  test('should update the film card count', () => {
    // Set up the test by creating a new element and appending it to the document
    const movieCardCount = document.createElement('span');
    movieCardCount.id = 'count';
    document.body.appendChild(movieCardCount);
    // Call the function with a count of 5
    cardCounter(5);
    expect(movieCardCount.textContent).toEqual('5');
    document.body.removeChild(movieCardCount);
  });
});